### 프로젝트 개요

| 항목 | 내용 |
| :--- | :--- |
| 기간 | 2026.03 - 2026.05 (약 2개월) |
| 역할 | 단독 설계/개발/운영 (1인 프로젝트) |
| 기술 스택 | ASP.NET Core 10 Minimal API, ClickHouse, Docker, Native AOT |
| 한 줄 요약 | 바이낸스 거래소 체결 데이터를 스트리밍 파싱 -> 청크 단위 중복 제거 -> RowBinary 직렬화로 ClickHouse에 고속 적재 하는 인제스션 서버 |

### 정량적 성과

| 지표 | 수치 |
| :--- | :--- |
| 요청당 최대 처리 건수 | 500,000 rows/req |
| 청크 단위 처리 | 50,000 rows/chunk - 메모리에 전체 payload를 쌓지 않음 |
| 최대 요청 body 크기 | 256 MB (Kestrel 수준 제어) |
| Native AOT 이미지 | runtime-deps 베이스 이미지로 런타임 의존성 제거, 이미지 크기 감소 |
| 중복 제거 최적화 | EXISTING_ID_LOOKUP_ROWS=20,000 단위 배치 조회로 ClickHouse max_query_size 내 안전 운영 |

### 대용량 JSON 스트리밍 파싱 파이프라인 구축

- 바이낸스 체결 아카이브 데이터를 수집해 분석/백테스팅에 활용해야 했음. 한 번의 요청에 최대 50만 건의 체결 row가 JSON으로 전송되며, 이를 ClickHouse에 안정적으로 적재해야 했음
- 요청 전체를 메모리에 올리지 않아 메모리 사용량이 CHUNK_ROWS x sizeof(TradeRow) + PipeReader 버퍼 수준으로 제한됨
- 50만 건 요청도 OOM 없이 안정적으로 처리 가능함
- ClickHouse ReplacingMergeTree와 앱 레벨 중복 제거를 이중으로 적용해 데이터 정합성을 확보했음