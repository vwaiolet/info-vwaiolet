import { motion } from "framer-motion"

const experiences = [
  {
    company: "주식회사 이더블에스",
    role: "Edge AI Engineer",
    period: "2025.09 - Present",
    description: "K3s 기반 엣지 디바이스 내 SLM 온디바이스 서빙 파이프라인을 구축하고, VSS 데이터 아키텍처를 분석했습니다.",
    achievements: [
      "K3s Resource Quota 및 LimitRange를 엄격하게 설정하여 Control Plane과 Worker Node 간 리소스 경합 문제 해결",
      "LLM(Ollama)의 효율적인 스케줄링 및 배포 실패(CrashLoopBackOff) 트러블슈팅으로 안정적인 서빙 환경 구축",
      "AWS IoT FleetWise 도입 타당성 검토(PoC)를 수행하여, 사내 자체 VSS 데이터 파싱 파이프라인 구축의 핵심 레퍼런스 제공"
    ]
  },
  {
    company: "주식회사 디엑스아이소프트",
    role: "AI Backend Developer",
    period: "2023.10 - 2025.06",
    description: "BERT/LLM 기반 개인화 교육 솔루션의 AI 모델 선정부터 고성능 백엔드 연동 및 최적화를 주도했습니다.",
    achievements: [
      "트래픽 부하가 높은 AI 모델 연동 구간에 비동기 아키텍처를 도입하여 서비스 응답 속도 대폭 개선",
      "Google Vertex AI 및 Cloud Storage를 긴밀하게 연동하여 대용량 PDF/오디오 처리 파이프라인 설계",
      "응답 최적화를 위해 경량화된 BERT 모델을 선정하고, 고성능 LLM을 활용한 데이터 증강 전략으로 파인튜닝 수행"
    ]
  }
]

export default function Experience() {
  return (
    <div id="experience" className="container mx-auto max-w-6xl px-4 md:px-8 flex flex-col justify-center py-12">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Experience</h2>
        <p className="text-muted-foreground text-xl">현업에서 AI 모델을 서비스로 연결하며 시스템을 최적화한 경험입니다.</p>
      </motion.div>
      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="relative pl-10 border-l-2 border-primary/20 pb-4 last:pb-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div className="absolute left-[-9px] top-0 w-[16px] h-[16px] rounded-full bg-primary border-4 border-background" />
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <p className="text-primary text-lg font-medium">{exp.company}</p>
              </div>
              <span className="text-sm font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-full mt-2 md:mt-0">
                {exp.period}
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
            <ul className="grid gap-3 text-base text-muted-foreground/80">
              {exp.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
