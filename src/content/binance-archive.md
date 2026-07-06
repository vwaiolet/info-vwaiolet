### 시스템 컴포넌트 아키텍처

```mermaid
graph TD
    classDef client fill:#0c2340,stroke:#0ea5e9,stroke-width:2px,color:#fff;
    classDef server fill:#1f133c,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    classDef db fill:#0f2c1b,stroke:#10b981,stroke-width:2px,color:#fff;

    %% Client Layer
    subgraph ClientLayer ["Client / Data Source"]
        Client["Archive Data Sender<br/>(HTTP POST /api/v1/archive)"]:::client
    end

    %% Application Server Layer
    subgraph ServerLayer ["Binance Archive Server (ASP.NET Core / Native AOT)"]
        Kestrel["Kestrel Web Server<br/>(Body Size Limit: MAX_BODY_BYTES)"]:::server
        Auth["ApiKeyAuthenticator<br/>(Header: x-api-key / Authorization)"]:::server
        IngestService["[Service] ArchiveIngestService<br/>(Ingestion Orchestrator)"]:::server
        Parser["[Parser] TradePayloadParser<br/>(PipeReader + Utf8JsonReader)"]:::server
        CHClient["[Client] ClickHouseIngestClient<br/>(HttpClient & Deduplication)"]:::server
        RowBinaryContent["[Formatter] RowBinaryTradeContent<br/>(Custom HttpContent)"]:::server
    end

    %% Database Layer
    subgraph DBLayer ["Database"]
        ClickHouse["ClickHouse DBMS<br/>(HTTP Endpoint: 8123)"]:::db
        Table["Table: binance_spot_trades<br/>(ReplacingMergeTree Engine)"]:::db
    end

    %% Connections
    Client -- "1. POST JSON Payload (Streaming)" --> Kestrel
    Kestrel -- "2. Check Key" --> Auth
    Kestrel -- "3. Read Request Body Reader" --> IngestService
    IngestService -- "4. Advance & Parse Bytes" --> Parser
    Parser -.-> |"Extract Row & Add to Buffer"| IngestService
    
    IngestService -- "5. Flush Chunk (CHUNK_ROWS)" --> CHClient
    
    CHClient -- "6. Check Existing IDs (Optional)<br/>(EXISTING_ID_LOOKUP_ROWS)" --> ClickHouse
    ClickHouse -- "7. Return duplicate trade_ids" --> CHClient
    
    CHClient -- "8. Filter & Pass Remaining Rows" --> RowBinaryContent
    CHClient -- "9. POST Ingest Payload (FORMAT RowBinary)" --> ClickHouse
    ClickHouse --> Table
```

### 데이터 수집 흐름 시퀀스 다이어그램

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client / Sender
    participant Kestrel as Kestrel Web Server
    participant Auth as ApiKeyAuthenticator
    participant Ingest as ArchiveIngestService
    participant Parser as TradePayloadParser
    participant CHClient as ClickHouseIngestClient
    participant CH as ClickHouse DB

    Client->>Kestrel: POST /api/v1/archive (Big JSON Stream)
    activate Kestrel
    Kestrel->>Auth: IsAuthorized(Headers)
    Note over Auth: Header check (x-api-key or Bearer)
    Auth-->>Kestrel: HTTP 200 OK / 401 Unauthorized

    Kestrel->>Ingest: StreamJsonRequestAsync(BodyReader)
    activate Ingest

    loop Read HTTP Body Stream (Chunk by Chunk)
        Ingest->>Kestrel: ReadAsync() from PipeReader
        Kestrel-->>Ingest: Buffer bytes
        Ingest->>Parser: Parse(Buffer, JsonReaderState)
        Note over Parser: Utf8JsonReader sequential parsing<br/>(No full DOM deserialization)
        Parser-->>Ingest: ParseResult (Buffered rows, bytesConsumed)
        Ingest->>Kestrel: AdvanceTo(ConsumedPosition)

        alt ShouldFlush (Buffered Rows >= CHUNK_ROWS)
            Ingest->>CHClient: InsertTradesAsync(symbol, BufferedRows)
            activate CHClient
            
            opt CHECK_EXISTING_IDS == true
                CHClient->>CH: SELECT trade_id WHERE trade_id IN (batch)
                CH-->>CHClient: List of existing trade_ids
                Note over CHClient: Filter out duplicate trade_ids
            end

            CHClient->>CHClient: Prepare RowBinaryTradeContent
            CHClient->>CH: POST /?query=INSERT... FORMAT RowBinary
            CH-->>CHClient: HTTP 200 OK
            CHClient-->>Ingest: Inserted count
            deactivate CHClient
            Ingest->>Parser: ClearBufferedRows()
        end
    end

    Note over Ingest: Processing EOF (End Of File)
    
    rect rgb(240, 240, 240)
        Note over Ingest: Remaining Buffered Rows Flush
        Ingest->>CHClient: InsertTradesAsync(symbol, RemainingRows)
        CHClient->>CH: POST (FORMAT RowBinary)
        CH-->>CHClient: HTTP 200 OK
    end

    Ingest-->>Kestrel: IngestResult (Total, Inserted, Skipped, Chunks)
    deactivate Ingest
    Kestrel-->>Client: Response Text Summary
    deactivate Kestrel
```

### 핵심 아키텍처 디자인 특징

1. 스트리밍 JSON 파서:
    - 큰 용량의 JSON 페이로드 전체를 한 번에 메모리 객체 그래프(`List<T>`)로 로드하지 않음
    - `PipeReader`와 `Utf8JsonReader`를 조합하여 네트워크 버퍼에 들어오는 대로 순차 파싱을 처리하므로, 가비지 컬렉터 부하와 메모리 풋프린트를 극도로 억제함
2. 이중 중복 제거:
    - 애플리케이션 단 필터링: `CHECK_EXISTING_IDS=true`인 경우 ClickHouse에 쿼리를 날려 이미 존재하는 `trade_id`를 걸러내고 새 데이터만 인서트 함
    - 데이터베이스 단 병합: ClickHouse 테이블 엔진으로 `ReplacingMergeTree(symbol, trade_id)`를 채택하여, 백그라운드 머지 시점에 자동 중복 제거가 이루어지도록 설계 되어 있음
3. 고속 바이너리 인서트:
    - ClickHouse 전송 시 텍스트 기반 SQL이나 JSON 포맷을 사용하지 않고, CPU/네트워크 대역폭 효율이 극대화된 ClickHouse 네이티브 `RowBinary` 포맷으로 직접 인코딩하여 전송함
4. 네이티브 AOT:
    - `CreateSlimBuilder` 기반으로 빌드되어 .NET 런타임 없이 단독 실행 가능한 Native AOT 컨테이너 빌드를 완벽히 지원하며, 컨테이너 부팅 시간 단축과 메모리 사용량 최소화를 실현함