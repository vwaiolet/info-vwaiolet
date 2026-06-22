# Project Nexus

Docker Compose 환경에서 동일 네트워크 내 컨테이너 상태, Healthcheck, DNS/TCP 연결성, 인증 실패 로그 패턴을 주기적으로 감시하는 .NET 10 모니터링 데몬입니다.

## 🚀 Key Architectures
- **Docker Socket Integration**: Docker API를 구독하여 실시간 네트워크 토폴로지 및 컨테이너 메타데이터 수집
- **Active Probing**: DNS 분석과 TCP 연결성 검사, REST API 헬스체크를 수행하는 비동기 워커 서비스
- **Web Dashboard**: ASP.NET Core 기반 실시간 컨테이너 상태 가시화 및 알림 전송 기능

## 🛠 Tech Stack
- `.NET 10`, `Docker API`, `ASP.NET Core`, `Monitoring`, `Dashboard`

## 📈 Performance & Results
- **10초** 주기 감시를 통해 인프라 연결 장애 시 1초 내로 복구를 위한 얼럿을 전송합니다.
- 복잡한 가상화 네트워크 내 DNS 해석 장애 지점을 조기에 추적하여 모니터링 가용성을 향상했습니다.
