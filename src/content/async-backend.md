### 아키텍처 다이어그램

```mermaid
flowchart TB
    %% Styling
    classDef client fill:#0a2040,stroke:#1565c0,stroke-width:2px,color:#fff;
    classDef api fill:#0f2c1b,stroke:#2e7d32,stroke-width:2px,color:#fff;
    classDef gemini fill:#25113d,stroke:#6a1b9a,stroke-width:2px,color:#fff;
    classDef db fill:#3d2008,stroke:#ef6c00,stroke-width:2px,color:#fff;
    classDef external fill:#1e1e24,stroke:#37474f,stroke-width:2px,color:#fff;

    subgraph ClientLayer["클라이언트 계층 (Client Layer)"]
        Client["웹 클라이언트 (https://aid-english.com)"]:::client
    end

    subgraph APILayer["FastAPI 백엔드 계층 (FastAPI Backend Layer)"]
        direction TB
        MainApp["app.main:app (FastAPI)"]:::api
        
        subgraph Routes["API 라우터 (Routes)"]
            AuthRoute["인증 라우터 (/api/auth)"]:::api
            TeacherRoute["선생님 라우터 (/api/teacher)"]:::api
            LearningRoute["AI 학습 라우터 (/api/learning)"]:::api
            ExamRoute["시험 라우터 (/api/exam)"]:::api
            OverviewRoute["대시보드 라우터 (/api/overview)"]:::api
            AudioRoute["오디오 라우터 (/api/audio)"]:::api
            VisionRoute["비전 라우터 (/api/vision)"]:::api
        end
        
        subgraph CoreUtils["코어 및 유틸리티 (Core & Utils)"]
            DB_Core["데이터베이스 연결 (app.core.db)"]:::api
            JWT_Util["인증 및 토큰 (app.utils.jwt)"]:::api
            GSUpload["GCS 파일 업로드 (app.utils.gs_upload)"]:::api
        end
    end

    subgraph ExternalServices["외부 연동 서비스 계층 (External Services Layer)"]
        subgraph GCP["Google Cloud Platform (GCP)"]
            VertexAI["Vertex AI (Gemini)<br>- 본문 추출 및 분석<br>- 실시간 대화식 AI 수업<br>- 시험 자동 출제 & 채점"]:::gemini
            GCS_Content["Google Cloud Storage (교재 PDF 버킷)"]:::external
            GCS_Audio["Google Cloud Storage (학생 음성 버킷)"]:::external
        end
        
        AWSPolly["AWS Polly<br>(Text-to-Speech)"]:::external
        StabilityAI["Stability AI<br>(Text-to-Image)"]:::external
    end

    subgraph DatabaseLayer["데이터 영속성 계층 (PostgreSQL Database)"]
        direction TB
        subgraph AuthData["사용자 및 인증 정보"]
            Member["Member (학생/선생님 정보)"]:::db
            Role["Role / School (역할/학원 정보)"]:::db
            Session["UserSession / RefreshToken / TokenBlackList"]:::db
        end
        
        subgraph SyllabusData["학습 관리 정보"]
            Syllabus["Syllabus / SyllabusResource"]:::db
            Schedule["LearningSchedule / ResourceFile"]:::db
        end

        subgraph LogData["수업 진행 정보"]
            LearningLog["LearningLog (AI 수업 챗로그)"]:::db
        end

        subgraph ExamData["시험 및 분석 정보"]
            Test["Test / TestQuestion / TestOption / TestAnswer"]:::db
            Score["TestScore / TestAnalysis / TestGuideline"]:::db
        end
    end

    %% Connections
    Client <== "HTTPS / CORS (JSON)" ==> MainApp
    
    MainApp --> Routes
    
    %% Route dependencies
    Routes --> JWT_Util
    Routes --> DB_Core
    TeacherRoute --> GSUpload
    LearningRoute --> GSUpload
    
    %% DB connections
    DB_Core <== "SQLAlchemy ORM" ==> DatabaseLayer
    
    %% Service integrations
    LearningRoute ==> VertexAI
    TeacherRoute ==> VertexAI
    ExamRoute ==> VertexAI
    
    LearningRoute --> GCS_Audio
    TeacherRoute --> GCS_Content
    GSUpload --> GCP
    
    AudioRoute ==> AWSPolly
    VisionRoute ==> StabilityAI
```

## 주요 구성 요소 설명

### 1. 클라이언트 계층
* `https://aid-english.com` 주소로 배포된 웹 프론트엔드 애플리케이션임 (현재는 폐쇄)
* 백엔드 API와는 CORS 정책(자격증명 포함) 하에 HTTPS를 통해 통신하며 JSON 포맷의 데이터를 교환함

### 2. FastAPI 백엔드 계층
* **API Routers**: 기능별 엔드포인트를 제공함
  * `auth`: 회원가입, 로그인, 토큰 갱신, 로그아웃 등 세션 관리
  * `teacher`: 선생님 대시보드 데이터 조회, 학생 및 학습 계획 관리, 학원 관리 등
  * `learning`: AI와 함께하는 실시간 영어 수업(문법, 작문, 리딩, 스피킹) 진행 및 학습 로그 기록
  * `exam`: 학습 내용 기반 단어/리딩/작문 시험 생성 및 학생 답안 자동 채점 & 평가
  * `audio`: 텍스트 기반 TTS 음성 합성 및 오디오 스트림 반환
  * `vision`: 단어 연상 그림 및 교재 리소스 일러스트 생성 지원
* **Core & Utils**: 데이터베이스 커넥션 풀(SQLAlchemy) 관리, JWT 토큰 인코딩/디코딩, Google Cloud Storage 파일 업로드 유틸리티 등을 수행함

### 3. 외부 연동 서비스 계층
* **Google Vertex AI (Gemini)**: 
  * 학습 일정에 필요한 PDF 교재 내용 추출
  * 문법, 쓰기, 말하기, 읽기 등 실시간 인터랙티브 수업 생성 및 스트리밍 지원
  * AI 기반 단어/읽기/쓰기 시험 생성 및 자동 채점
  * 시험 결과 요약 및 학습 추천 가이드라인 생성
* **Google Cloud Storage (GCS)**:
  * 교재 PDF 및 수업 첨부파일 저장용 버킷
  * 학생이 제출한 음성 녹음 파일 저장용 버킷
* **AWS Polly**: TTS(Text-to-Speech)를 활용하여 자연스러운 원어민 음성을 실시간 오디오 스트림 파일로 생성 및 배포
* **Stability AI**: 텍스트 프롬프트를 바탕으로 고품질 교육용 이미지를 자동 생성하여 화면에 노출

### 4. 데이터 영속성 계층 (PostgreSQL Database)
* **SQLAlchemy ORM**을 통해 모든 데이터를 관계형으로 저장하고 쿼리함
* **회원 및 세션**: 학원 및 역할 정보, 로그인 상태 유지를 위한 사용자 세션 및 리프레시 토큰, 로그아웃된 토큰 블랙리스트를 관리함
* **학습 계획 및 일정**: 교재별 실습 코스가 정의된 Syllabus, 세부 학습 날짜와 본문이 포함된 LearningSchedule을 관리함
* **수업 진행 정보**: 실시간 AI 튜터와 주고받은 메시지 로그를 누적 기록하여 문법/쓰기/읽기/말하기별 흐름을 유지함
* **시험 및 평가**: 스케줄에 따른 시험 생성 정보(문제, 보기, 학생 제출 답안)와 점수, 분석 레포트, 맞춤 가이드라인을 저장함
