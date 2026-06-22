# 대용량 트래픽 처리를 위한 비동기 AI 백엔드

대형 AI 모델(LLM/BERT)의 응답 대기 시간 동안 서버가 블로킹되지 않도록 FastAPI 비동기 아키텍처를 도입했습니다.

## 🚀 Key Architectures
- **Async API Layer**: FastAPI `async/await` 아키텍처 및 Uvicorn 최적화
- **Cloud Pipelines**: Vertex AI API 및 Google Cloud Storage (GCS) 연동
- **Concurrency Control**: 비동기 데이터베이스 커넥션 및 동시성 제어 설계

## 🛠 Tech Stack
- `FastAPI`, `Vertex AI`, `GCP`, `BERT`, `Python`

## 📈 Performance & Results
- 비동기 아키텍처 도입을 통해 서버의 대기 지연(Latency)을 **95% 단축**하였습니다.
- 대용량 파일 업로드 및 추론 파이프라인의 처리 병목을 대폭 해결하였습니다.
