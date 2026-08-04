> **프로젝트 구분**: **(주)PS오닉스** 외주 구축 프로젝트

### 아키텍처 다이어그램

```mermaid
flowchart TD
    %% Styling
    classDef client fill:#0a2040,stroke:#1565c0,stroke-width:2px,color:#fff;
    classDef proxy fill:#25113d,stroke:#9333ea,stroke-width:2px,color:#fff;
    classDef core fill:#0f2c1b,stroke:#059669,stroke-width:2px,color:#fff;
    classDef auth fill:#3c1f08,stroke:#ea580c,stroke-width:2px,color:#fff;
    classDef ai fill:#3b1111,stroke:#dc2626,stroke-width:2px,color:#fff;
    classDef service fill:#1e1e24,stroke:#52525b,stroke-width:2px,color:#fff;

    subgraph External_Layer["🌐 외부 요청 및 SSL 계층"]
        User(["사용자 브라우저 / 외부 클라이언트"]):::client
        CF["Cloudflare DNS / Edge SSL"]:::client
    end

    subgraph Proxy_Layer["🔀 역방향 프록시 & 라우팅 계층 (tool-network)"]
        Nginx["Nginx Reverse Proxy Container"]:::proxy
    end

    subgraph Auth_Identity_Layer["🔐 중앙 인증 & 계정 관리 계층"]
        OpenLDAP["OpenLDAP Server (Directory Service)"]:::auth
        LAM["LDAP Account Manager (LAM Web UI)"]:::auth
    end

    subgraph Core_PMS_Layer["📋 통합 프로젝트 및 코드 관리 계층"]
        GitLab["GitLab CE (소스 코드 & CI/CD)"]:::core
        GitLabRunner["GitLab Runner (Docker Executor)"]:::core
        OpenProject["OpenProject Proxy & Web"]:::core
        OP_Plugin["openproject-edoubles_plugin (Custom Submodule)"]:::core
        OP_DB[("PostgreSQL Database")]:::service
    end

    subgraph AI_Sync_Services["🧠 AI & 마이크로서비스 연동 계층"]
        Ollama["Ollama AI (Local LLM Server)"]:::ai
        CILogAnalyzer["CI Log Analyzer (FastAPI Service)"]:::service
        TodoSync["Microsoft Entra Todo Sync (Graph API & Ollama)"]:::service
    end

    %% Flow Connections
    User ==> CF
    CF ==>|HTTP/HTTPS| Nginx

    Nginx -->|"gitlab.YOUR_DOMAIN.com"| GitLab
    Nginx -->|"pms.YOUR_DOMAIN.com"| OpenProject
    Nginx -->|"lam.YOUR_DOMAIN.com"| LAM

    GitLab <-->|"LDAP Bind / SSO Auth"| OpenLDAP
    OpenProject <-->|"LDAP Bind / SSO Auth"| OpenLDAP
    LAM <-->|"LDAP Admin API (389)"| OpenLDAP

    GitLab -->|Trigger Pipelines| GitLabRunner
    GitLabRunner -->|CI Logs Hook| CILogAnalyzer
    CILogAnalyzer <-->|AI Log Summary| Ollama

    OpenProject <-->|Plugin Assets & ORM| OP_DB
    OpenProject --- OP_Plugin

    TodoSync <-->|"Microsoft Graph API"| User
    TodoSync <-->|"Work Item Sync"| OpenProject
    TodoSync <-->|"NLP Analysis"| Ollama
```

## 주요 구성 요소 설명

### 1. Nginx 역방향 프록시 & 도메인 격리 네트워크
* 외부 단일 접점으로 Nginx 컨테이너를 배치하고 Cloudflare 엣지 SSL과 연동하여 SSL/TLS 암호화 통신을 처리함
* 서브도메인 기반 라우팅(`pms.*`, `gitlab.*`, `lam.*`)을 수행하며, Docker 커스텀 브릿지 네트워크(`tool-network`)로 컨테이너 간 안전한 격리 통신을 제공함

### 2. 중앙ized OpenLDAP & LAM 통합 인증 계층
* 기업 내부 사용자 계정, 부서 그룹, 접근 권한 정보를 OpenLDAP 디렉터리 서버로 단일 중앙화함
* LDAP Account Manager (LAM) 웹 인프라를 구축하여 GUI 상에서 실시간 사용자 등록/수정/그룹 할당이 가능하도록 함
* GitLab CE 및 OpenProject의 회원가입/인증 프로세스를 OpenLDAP과 연동하여 단일 계정 기반 SSO(Single Sign-On)를 구현함

### 3. OpenProject (커스텀 플러그인 & Git 서브모듈)
* OpenProject 코어 패키지에 자체 개발 젬/플러그인(`openproject-edoubles_plugin`)을 독립 Git 서브모듈로 통합 관리함
* Docker Multi-stage 빌드 파이프라인을 구축하여 에셋 precompile 및 Rails/Node 파이프라인을 컨테이너화하여 일관된 실행 환경을 보장함
* PostgreSQL 데이터베이스 및 Background Worker 프로세스와 연동하여 프로젝트/이슈/간트차트 및 작업 흐름을 총괄 관리함

### 4. GitLab CE & Automated CI Log Analyzer
* 자체 호스팅 GitLab CE 및 Docker Executor 기반 GitLab Runner를 구축하여 소스 코드 버전 관리와 CI/CD 파이프라인 자동화를 수행함
* CI/CD 파이프라인 실행 중 발생하는 빌드/테스트 실패 로그를 `ci-log-analyzer` 마이크로서비스로 전달하고, 로컬 LLM(Ollama)과 연동하여 실패 원인 및 해결 방안을 자동 요약 분석함

### 5. Microsoft Entra & Todo Sync 마이크로서비스
* Microsoft Entra (Azure AD) Graph API와 연동하여 Office 365 / To-Do 일정을 OpenProject 및 Ollama AI 기반 작업 항목과 양방향 자동 동기화함
