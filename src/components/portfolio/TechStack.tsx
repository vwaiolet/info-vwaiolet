import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Cpu, Database, Network, Cloud, Activity } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const techData = [
  {
    category: "Serving & Virtualization",
    icon: Brain,
    description: "제한된 자원 환경 하의 AI 추론 및 경량 가속화",
    skills: ["Ollama", "TensorRT", "ONNX Runtime", "K3s", "Docker", "Docker Compose"]
  },
  {
    category: "Backend & Systems",
    icon: Cpu,
    description: "고성능 비동기 분산 서버 및 시스템 소프트웨어 설계",
    skills: ["C#", ".NET 10", "ASP.NET Core", "Python", "FastAPI"]
  },
  {
    category: "Data & Ingestion",
    icon: Database,
    description: "대용량 시계열 데이터 파이프라인 및 고속 적재",
    skills: ["ClickHouse", "Redis", "PostgreSQL", "MySQL"]
  },
  {
    category: "Systems & Networks",
    icon: Network,
    description: "OS 하부 시스템 제어 및 네트워크 통신 제어",
    skills: ["Linux", "SocketCAN", "TCP/IP", "WebSocket", "DNS/TCP Probe"]
  },
  {
    category: "Cloud Infrastructure",
    icon: Cloud,
    description: "퍼블릭 클라우드 및 하이브리드 가상 인프라 설계",
    skills: ["AWS", "GCP", "Azure", "NCP"]
  },
  {
    category: "Monitoring & CI/CD",
    icon: Activity,
    description: "인프라 실시간 관제 및 빌드/배포 자동화",
    skills: ["Docker API", "Container Healthcheck", "Log Pattern Scan", "Git", "GitHub Actions", "Shell Scripting"]
  }
]

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tech-heading]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-tech-heading]",
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        },
      )

      gsap.fromTo(
        "[data-tech-card]",
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-tech-grid]",
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="tech-stack" className="container mx-auto max-w-6xl px-4 py-20 md:py-28 lg:py-32 flex flex-col justify-center relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div
        data-tech-heading
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 md:text-5xl font-heading bg-gradient-to-r from-foreground via-foreground to-purple-400/80 bg-clip-text text-transparent">
          Technical Stack
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed break-keep">
          AI 서빙, 고성능 백엔드, 실시간 대용량 데이터 적재, 컨테이너 가상화 운영을 위해 활용하는 핵심 기술입니다.
        </p>
      </div>

      <div data-tech-grid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {techData.map((tech) => {
          const Icon = tech.icon
          return (
            <div
              key={tech.category}
              data-tech-card
              className="h-full"
            >
              <Card className="bg-[#07070d]/60 border-primary/10 hover:border-primary/45 hover:bg-[#0c0c16]/80 transition-all duration-300 h-full flex flex-col relative overflow-hidden group shadow-lg shadow-black/30 hover:shadow-primary/5 hover-glow-card">
                {/* Glow border overlay */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight text-foreground">{tech.category}</CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{tech.description}</p>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-2.5 mt-auto pt-2">
                  {tech.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs py-1 px-2.5 border-primary/15 bg-primary/5 hover:bg-primary/15 text-slate-200 font-medium transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
