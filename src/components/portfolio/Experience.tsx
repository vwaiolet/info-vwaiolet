import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"
import { Calendar, Briefcase, ChevronRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    company: "주식회사 이더블에스",
    role: "Edge AI Engineer",
    period: "2025.09 - Present",
    description: "K3s 기반 엣지 디바이스 내 sLLM 온디바이스 서빙 파이프라인을 구축하고, VSS 데이터 아키텍처를 분석했습니다.",
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
      "응답 최적화를 위해 경량 BERT 모델을 선정하고, 고성능 LLM을 활용한 데이터 증강 전략으로 파인튜닝 수행"
    ]
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-experience-heading]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-experience-heading]",
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        },
      )

      gsap.fromTo(
        "[data-experience-item]",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: "[data-experience-list]",
            start: "top 78%",
            toggleActions: "play none none reset",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="experience" className="container mx-auto max-w-5xl px-4 md:px-8 flex flex-col justify-center py-20 relative">
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div
        data-experience-heading
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 md:text-5xl font-heading bg-gradient-to-r from-foreground via-foreground to-purple-400/80 bg-clip-text text-transparent">
          Experience
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          현업에서 AI 모델을 서비스로 연결하며 인프라 자원을 효율화하고 시스템 성능을 최적화한 경험입니다.
        </p>
      </div>

      <div data-experience-list className="relative border-l border-primary/40 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12 py-2">
        {/* Neon Gradient Timeline Line Overlay */}
        <div className="absolute left-[-1.5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500/10 pointer-events-none" />

        {experiences.map((exp, idx) => (
          <div
            key={idx}
            data-experience-item
            className="relative group"
          >
            {/* Pulsing glow point on timeline */}
            <div className="absolute left-[-39px] md:left-[-55px] top-6 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_rgba(167,139,250,0.8)] group-hover:scale-125 transition-transform duration-300 z-10" />

            {/* Timeline Card */}
            <div className="glassmorphism p-6 md:p-8 rounded-xl border border-primary/10 hover:border-primary/25 hover:bg-[#0c0c16]/50 transition-all duration-300 shadow-xl shadow-black/25">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-primary text-sm font-bold tracking-wide uppercase">{exp.company}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{exp.role}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 glassmorphism-primary border border-primary/10 px-3 py-1 rounded-full w-fit">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-base text-slate-300 mb-6 leading-relaxed border-l-2 border-primary/30 pl-4 py-0.5">
                {exp.description}
              </p>

              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Key Achievements</h4>
              <ul className="space-y-3.5 text-sm text-slate-400">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
