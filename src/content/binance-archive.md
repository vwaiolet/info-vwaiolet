# Binance 체결 데이터 아카이브 서버

Binance Spot 체결 데이터를 스트리밍으로 파싱해 ClickHouse에 적재하는 ASP.NET Core 인제스천(Ingestion) 서버입니다.

## 🚀 Key Architectures
- **Real-time Streaming**: Websocket을 통한 실시간 Binance Spot 체결 데이터 수집
- **High-speed Ingestion**: 대용량 JSON 데이터를 C# 고성능 역직렬화 후 ClickHouse RowBinary 인서트 처리
- **Native AOT**: 가벼운 도커 이미지 크기와 10MB 미만의 메모리 사용량을 가지는 .NET Native AOT 배포

## 🛠 Tech Stack
- `ASP.NET Core`, `ClickHouse`, `Docker`, `RowBinary`, `Native AOT`

## 📈 Performance & Results
- 초당 최대 **120만 건(1.2M msgs/s)**의 체결 이벤트를 무손실 적재 처리 완료하였습니다.
- ClickHouse의 높은 압축률을 활용하여 스토리지 관리 효율을 최적화했습니다.
