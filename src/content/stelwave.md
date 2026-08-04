### 시스템 컴포넌트 아키텍처

```mermaid
graph TD
    classDef ui fill:#0c2340,stroke:#0ea5e9,stroke-width:2px,color:#fff;
    classDef service fill:#1f133c,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    classDef audio fill:#2d1a15,stroke:#a1887f,stroke-width:2px,color:#fff;
    classDef db fill:#0f2c1b,stroke:#10b981,stroke-width:2px,color:#fff;

    %% Presentation Layer
    subgraph PresentationLayer ["UI Layer (WinUI 3 / XAML)"]
        MainPage["MainPage (Player UI Controller)"]:::ui
        TrackListView["Virtualizing TrackListView (Data Virtualization)"]:::ui
        SpecBadge["Realtime Audio Spec Badge (Registry & BASS)"]:::ui
    end

    %% Business & Processing Layer
    subgraph ServiceLayer ["Core Services & Virtualization"]
        AudioService["AudioService (ManagedBass Wrapper)"]:::service
        LibraryService["LibraryService (Parallel Enumerate & TagLib)"]:::service
        VirtualTrackList["VirtualizingTrackList (SQLite Async Paging)"]:::service
        PlaylistTrackList["PlaylistTrackList (Shuffle & Loop State)"]:::service
    end

    %% Audio Engine & Native DLLs
    subgraph AudioEngine ["Native BASS Audio Engine (x64 C++)"]
        BASSCore["bass.dll / ManagedBass"]:::audio
        BASSWasapi["basswasapi.dll (WASAPI Exclusive)"]:::audio
        BASSAsio["bassasio.dll (ASIO Drivers)"]:::audio
        BASSFlac["bassflac.dll (FLAC Decoder)"]:::audio
    end

    %% Data Storage Layer
    subgraph DBLayer ["Local Storage"]
        SQLiteDB["SQLite Database (WAL Mode)"]:::db
        TrackTable["Table: Tracks (Indexed Metadata & Path)"]:::db
    end

    %% Connections
    MainPage -->|Data Binding| TrackListView
    MainPage -->|Displays Audio Format| SpecBadge
    TrackListView -->|Requests Paged Rows| VirtualTrackList
    VirtualTrackList -->|Queries Paged Data| SQLiteDB
    SQLiteDB --> TrackTable

    MainPage -->|Play / Pause / Seek / Device Switch| AudioService
    MainPage -->|Trigger Scan Folder| LibraryService

    LibraryService -->|Parallel Tag Extraction| LibraryService
    LibraryService -->|Batch Insert - 500 Rows Transaction| SQLiteDB

    AudioService -->|Invoke Native APIs| BASSCore
    AudioService -->|WASAPI Exclusive Direct Access| BASSWasapi
    AudioService -->|ASIO Low Latency Output| BASSAsio
    AudioService -->|Decode Lossless Stream| BASSFlac
```

### 음원 스캔 및 오디오 재생 흐름 시퀀스 다이어그램

```mermaid
sequenceDiagram
    autonumber
    actor User as Listener / User
    participant UI as WinUI 3 MainPage
    participant Lib as LibraryService
    participant DB as SQLite DB
    participant Audio as AudioService
    participant BASS as BASS Native Engine

    User->>UI: 1. Select Folder & Click "Scan Folder"
    activate UI
    UI->>Lib: ScanDirectoryAsync(folderPath)
    activate Lib

    Note over Lib: Multi-Thread Parallel Processing (Parallel.ForEach)
    Lib->>Lib: Extract Audio Metadata & Album Art (TagLibSharp)
    Lib->>DB: Batch Insert Tracks (500 items per SQLite Transaction)
    DB-->>Lib: Sync Complete
    Lib-->>UI: Scan Finished
    deactivate Lib

    UI->>UI: Refresh VirtualizingTrackList
    deactivate UI

    User->>UI: 2. Double-Click Track & Select WASAPI Exclusive Mode
    activate UI
    UI->>Audio: SetDeviceOutputMode(Device, WASAPI_EXCLUSIVE)
    activate Audio
    Audio->>BASS: Init WASAPI Exclusive Channel & Direct Device Access
    BASS-->>Audio: Device Locked & Channel Initialized
    
    UI->>Audio: PlayStreamAsync(trackPath)
    Audio->>BASS: Create FLAC/BASS Stream & Start Playback
    BASS-->>Audio: Audio Buffer Streaming
    Audio-->>UI: Playback Started (Bit-Perfect Active)
    deactivate Audio

    UI->>Audio: Query Current Spec (Source vs Output Format)
    Audio->>BASS: Query Bits/SampleRate/Channels & Registry Device Spec
    BASS-->>Audio: Returns Active Audio Format
    Audio-->>UI: Update Realtime Audio Spec Badges
    deactivate UI
```

### 핵심 아키텍처 디자인 특징

1. 하이파이(Hi-Fi) 비트퍼펙트 재생 파이프라인:
    - **WASAPI Exclusive & ASIO 모드**: Windows 오디오 엔진의 믹서를 우회하고 사운드카드를 직접 제어하여 음원의 원본 샘플링 레이트와 비트 깊이를 왜곡 없이 출력
    - **네이티브 BASS 엔진 통합**: `ManagedBass`, `ManagedBass.Wasapi`, `ManagedBass.Asio`, `ManagedBass.Flac` 네이티브 C++ DLL 래핑을 통해 초저지연 FLAC 무손실 재생 보장
2. 대용량 라이브러리 고속 스캔 및 DB 배치 최적화:
    - **병렬 메타데이터 파싱**: `Parallel.ForEach`를 이용해 태그 정보(`TagLibSharp`)와 앨범 아트를 다중 스레드로 고속 추출
    - **SQLite 배치 트랜잭션**: 500개 단위 배치 트랜잭션을 채택하여 디스크 I/O 병목을 최소화하고 트랜잭션 수백 배 최적화
3. UI 데이터 가상화 (Data Virtualization):
    - **VirtualizingTrackList 구현**: 수만 곡의 라이브러리 스크롤 시 메모리 상승과 UI 멈춤 현상을 방지하기 위해 SQLite 비동기 페이징(100개 단위) 기반 Virtualization 적용
4. 실시간 오디오 스펙 트래킹 & 검출:
    - Windows 레지스트리 직조회를 통해 하드웨어 실제 비트 깊이를 검출하고, 재생 중인 음원의 원본 스펙과 실제 출력 장치 스펙을 실시간 비교 뱃지로 표시
