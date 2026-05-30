import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Archive, Cpu, Database, Lock, Network, Server } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const projectGroups = [
  {
    title: "Company Projects",
    description: "실무 환경에서 AI 서빙과 백엔드 설계를 맡아 진행한 프로젝트입니다.",
    footerLabel: "Company Work (Private IP)",
    gridClassName: "md:grid-cols-2 lg:grid-cols-3",
    projects: [
      {
        title: "차량 데이터(VSS) 기반 엣지 AI 시스템",
        description: "K3s 환경의 엣지 디바이스에서 시계열 모델(USAD)과 소형 언어 모델(sLLM)을 결합하여 오탐률을 획기적으로 줄인 온디바이스 AI 서빙 파이프라인입니다. CAN 데이터를 VSS 포맷으로 실시간 매핑하는 모듈을 개발했습니다.",
        tags: ["K3s", "Ollama", "Docker", "TensorRT", "USAD", "CAN", "VSS"],
        visualLabel: "Edge AI Serving",
        icon: Cpu,
        metrics: [
          { label: "오탐률", value: "80% 감소" },
          { label: "추론 속도", value: "18ms" },
          { label: "대상 환경", value: "Jetson Orin" }
        ]
      },
      {
        title: "대용량 트래픽 처리를 위한 비동기 AI 백엔드",
        description: "대형 AI 모델(LLM/BERT)의 응답 대기 시간 동안 서버가 블로킹되지 않도록 FastAPI 비동기 아키텍처를 도입했습니다. Vertex AI와 GCS를 연동하여 대용량 파일 처리 파이프라인을 최적화했습니다.",
        tags: ["FastAPI", "Vertex AI", "GCP", "BERT"],
        visualLabel: "Async AI Backend",
        icon: Server,
        metrics: [
          { label: "대기 지연", value: "95% 단축" },
          { label: "동시 처리", value: "FastAPI Async" },
          { label: "클라우드", value: "GCP Vertex AI" }
        ]
      },
      {
        title: "맥락 유지형 LMS AI 솔루션",
        description: "Django ORM을 활용해 복잡한 학습 데이터의 무결성을 보장하는 스키마를 설계했습니다. Gemini 모델의 긴 컨텍스트 윈도우를 활용하여 강의 전체 맥락을 유지하는 Grounding 로직을 구현했습니다.",
        tags: ["Django", "Gemini API", "PostgreSQL", "Grounding"],
        visualLabel: "Context Grounding",
        icon: Database,
        metrics: [
          { label: "맥락 크기", value: "2M Tokens" },
          { label: "기반 모델", value: "Gemini 1.5 Pro" },
          { label: "정확도", value: "98% 보장" }
        ]
      }
    ]
  },
  {
    title: "Personal Projects",
    description: "개인적으로 설계하고 구현한 서버, 모니터링, 데이터 인프라 프로젝트입니다.",
    footerLabel: "Personal Project",
    gridClassName: "md:grid-cols-2",
    projects: [
      {
        title: "Binance 체결 데이터 아카이브 서버",
        description: "Binance Spot 체결 데이터를 스트리밍으로 파싱해 ClickHouse에 적재하는 ASP.NET Core 인제스천(Ingestion) 서버입니다. 대용량 JSON 요청을 청크 단위 RowBinary insert로 처리하고, API Key 인증과 Native AOT Docker 배포 구성을 함께 설계했습니다.",
        tags: ["ASP.NET Core", "ClickHouse", "Docker", "RowBinary", "Native AOT"],
        visualLabel: "Streaming Ingest",
        icon: Archive,
        metrics: [
          { label: "적재 속도", value: "1.2M msgs/s" },
          { label: "저장 엔진", value: "ClickHouse" },
          { label: "최적화", value: "Native AOT" }
        ]
      },
      {
        title: "Project Nexus",
        description: "Docker Compose 환경에서 동일 네트워크 내 컨테이너 상태, Healthcheck, DNS/TCP 연결성, 인증 실패 로그 패턴을 주기적으로 감시하는 .NET 8 모니터링 데몬입니다. Docker Socket 기반 네트워크 자동 감지와 내장 웹 대시보드를 구현했습니다.",
        tags: [".NET 8", "Docker API", "ASP.NET Core", "Monitoring", "Dashboard"],
        visualLabel: "Docker Monitor",
        icon: Network,
        metrics: [
          { label: "감시 주기", value: "10초" },
          { label: "상태 감지", value: "Docker Socket" },
          { label: "네트워크", value: "DNS/TCP Probe" }
        ]
      }
    ]
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-projects-heading]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-projects-heading]",
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        },
      )

      gsap.utils.toArray<HTMLElement>("[data-project-group]").forEach((group) => {
        const groupCopy = group.querySelector("[data-project-group-copy]")
        const projectCards = group.querySelectorAll("[data-project-card]")

        if (groupCopy) {
          gsap.fromTo(
            groupCopy,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                toggleActions: "play none none reset",
              },
            },
          )
        }

        if (projectCards.length > 0) {
          gsap.fromTo(
            projectCards,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: group,
                start: "top 76%",
                toggleActions: "play none none reset",
              },
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="projects" className="container mx-auto max-w-6xl px-4 py-20 md:py-28 lg:py-32 flex flex-col justify-center relative">
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div
        data-projects-heading
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 md:text-5xl font-heading bg-gradient-to-r from-foreground via-foreground to-purple-400/80 bg-clip-text text-transparent">
          Selected Projects
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          실제 운영 환경과 엣지 디바이스에서의 AI 서빙 최적화, 대용량 데이터 적재 아키텍처, 그리고 인프라 모니터링 설계 사례입니다.
        </p>
      </div>

      <div className="space-y-24">
        {projectGroups.map((group) => (
          <section key={group.title} data-project-group aria-labelledby={`${group.title.toLowerCase().replaceAll(" ", "-")}-heading`}>
            <div data-project-group-copy className="mb-10 text-center md:text-left">
              <h3 id={`${group.title.toLowerCase().replaceAll(" ", "-")}-heading`} className="text-3xl font-bold tracking-tight text-glow">
                {group.title}
              </h3>
              <p className="mt-2 text-base text-muted-foreground max-w-2xl">{group.description}</p>
            </div>
            <div className={`grid gap-8 ${group.gridClassName}`}>
              {group.projects.map((project) => (
                <ProjectCard key={project.title} project={project} footerLabel={group.footerLabel} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

type Project = (typeof projectGroups)[number]["projects"][number]

function ProjectCard({ project, footerLabel }: { project: Project; footerLabel: string }) {
  const Icon = project.icon

  return (
    <div
      data-project-card
      className="h-full"
    >
      <Card className="flex flex-col bg-[#07070d]/50 border-primary/10 overflow-hidden transition-all duration-300 hover:border-primary/45 hover:bg-[#0c0c16]/70 group h-full shadow-xl shadow-black/40 hover-glow-card py-0">
        {/* Top bar header */}
        <div className="border-b border-primary/10 bg-primary/5 px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-primary tracking-wide uppercase">{project.visualLabel}</span>
          </div>
        </div>

        {/* Content body wrapper with flex-grow to occupy space */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          {/* Title and description wrapper (block layout with fixed heights for absolute alignment) */}
          <div className="shrink-0">
            <CardTitle
              className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight flex items-center mb-2"
              style={{ height: '56px' }}
            >
              {project.title}
            </CardTitle>
            <CardDescription
              className="text-sm leading-relaxed text-slate-400 block overflow-y-auto"
              style={{ height: '130px' }}
            >
              {project.description}
            </CardDescription>
          </div>

          <div className="flex flex-col flex-1 justify-between gap-4 mt-auto">
            {/* Metrics/Stats Block */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-primary/5 border border-primary/10 rounded-lg text-center shrink-0">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{metric.label}</span>
                  <span className="text-xs font-bold text-primary mt-0.5 whitespace-nowrap">{metric.value}</span>
                </div>
              ))}
            </div>

            {/* Tags block pushed to bottom */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[11px] font-medium py-0.5 px-2 bg-secondary/80 text-slate-400 border border-white/5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer locked at bottom, preventing shrinking */}
        <CardFooter className="gap-3 pt-4 pb-6 border-t border-primary/10 bg-black/20 shrink-0 mt-auto">
          <Button variant="outline" size="sm" className="w-full gap-2 h-10 border-primary/10 hover:border-primary/30 text-xs font-semibold bg-background/30 hover:bg-background/80 cursor-default" disabled>
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 text-xs">{footerLabel}</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
