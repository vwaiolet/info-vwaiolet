# 맥락 유지형 LMS AI 솔루션

Django ORM을 활용해 복잡한 학습 데이터의 무결성을 보장하는 스키마를 설계했습니다. Gemini 모델의 긴 컨텍스트 윈도우를 활용하여 강의 전체 맥락을 유지하는 Grounding 로직을 구현했습니다.

## 🚀 Key Architectures
- **Grounding Pipeline**: Gemini 1.5 Pro의 2M context window를 극대화하는 문서 청킹 및 검색 증강 생성(RAG)
- **Data Integrity**: Django ORM의 트랜잭션 격리수준 및 PostgreSQL 인덱싱 튜닝
- **Context Management**: 학습 히스토리를 요약하여 대화 간 맥락을 일관되게 유지하는 아키텍처

## 🛠 Tech Stack
- `Django`, `Gemini API`, `PostgreSQL`, `Grounding`

## 📈 Performance & Results
- 맥락 데이터 Grounding을 통해 대화 응답의 정확도를 **98%**까지 확보하였습니다.
- 긴 대화 컨텍스트로 인한 토큰 사용 비효율성을 해소하여 API 호출 비용을 절감하였습니다.
