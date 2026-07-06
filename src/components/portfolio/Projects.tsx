import React, { useEffect, useState, useRef } from "react"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Archive, Cpu, Lock, Network, Server, FileText, Code, Maximize2, ZoomIn } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import mermaid from "mermaid"

function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // rendering logic helper
  const renderDiagram = async (targetNode: HTMLDivElement) => {
    try {
      targetNode.innerHTML = chart
      targetNode.removeAttribute("data-processed")
      
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        themeVariables: {
          background: "transparent",
          primaryColor: "#a78bfa",
          primaryTextColor: "#fff",
          lineColor: "#7c3aed",
          nodeBorder: "#a78bfa",
          mainBkg: "#07070d",
        }
      })

      await mermaid.run({
        nodes: [targetNode]
      })
    } catch (err: any) {
      console.error("Mermaid run error:", err)
      setError(err.message || String(err))
    }
  }

  useEffect(() => {
    if (!containerRef.current) return
    setError(null)
    
    // Small delay to ensure React lifecycle mounting is complete
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        renderDiagram(containerRef.current)
      }
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [chart])

  // Render modal diagram once open
  useEffect(() => {
    if (isOpen && previewRef.current) {
      const timeoutId = setTimeout(() => {
        if (previewRef.current) {
          renderDiagram(previewRef.current)
        }
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [isOpen])

  if (error) {
    return (
      <div className="p-4 my-6 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-400 font-mono">
        <p className="font-bold mb-1">Architecture Diagram Rendering Error:</p>
        <pre className="whitespace-pre-wrap">{error}</pre>
        <details className="mt-2 opacity-70">
          <summary className="cursor-pointer">Mermaid Code Source</summary>
          <pre className="mt-1 bg-black/40 p-2 rounded overflow-x-auto text-[10px]">{chart}</pre>
        </details>
      </div>
    )
  }

  return (
    <div className="relative w-full group">
      {/* Dynamic override styles for Mermaid dark mode compatibility */}
      <style>{`
        .mermaid svg {
          max-width: 100% !important;
          height: auto !important;
        }
        .mermaid svg .label, 
        .mermaid svg .label text,
        .mermaid svg .node text,
        .mermaid svg .node .label {
          fill: #f1f5f9 !important;
          color: #f1f5f9 !important;
          font-family: inherit !important;
        }
        .mermaid svg .edgePath .path {
          stroke: #7c3aed !important;
          stroke-width: 1.5px !important;
        }
        .mermaid svg .edgePath .markerPath {
          fill: #7c3aed !important;
          stroke: #7c3aed !important;
        }
        .mermaid svg .edgeLabel rect {
          fill: #0c0c16 !important;
        }
        .mermaid svg .edgeLabel text,
        .mermaid svg .edgeLabel span {
          fill: #a78bfa !important;
          color: #a78bfa !important;
        }
        .mermaid svg .cluster rect {
          fill: rgba(167, 139, 250, 0.03) !important;
          stroke: rgba(167, 139, 250, 0.15) !important;
          stroke-width: 1px !important;
        }
        .mermaid svg .cluster .label text,
        .mermaid svg .cluster .label {
          fill: #a78bfa !important;
          color: #a78bfa !important;
          font-weight: 700 !important;
        }
        /* Style for fullscreen zoomed container */
        .zoom-mermaid svg {
          max-width: none !important;
          width: 125% !important;
          height: auto !important;
        }
      `}</style>

      {/* Hover maximize button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button 
            className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-background/80 text-muted-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:text-primary hover:border-primary/45 transition-all duration-300 cursor-pointer shadow-lg"
            title="다이어그램 확대 보기"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] md:max-w-[90vw] max-h-[92vh] overflow-hidden bg-[#07070d]/98 border-primary/25 backdrop-blur-xl text-slate-300 shadow-2xl p-6 md:p-8 flex flex-col gap-4 rounded-2xl z-[100]">
          <DialogHeader className="pb-2 border-b border-primary/10 shrink-0">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <ZoomIn className="w-5 h-5 text-primary" />
              <span>시스템 아키텍처 다이어그램 확대</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              마우스 스크롤이나 드래그를 이용해 다이어그램 구조를 상세히 확인할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto flex items-start justify-center p-4 bg-black/40 border border-primary/10 rounded-xl">
            <div 
              ref={previewRef}
              className="zoom-mermaid select-none flex justify-center w-full min-w-[800px] md:min-w-[1200px] p-6"
            >
              <span className="text-xs text-muted-foreground animate-pulse">확대 다이어그램 로딩 중...</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div 
        ref={containerRef}
        onClick={() => setIsOpen(true)}
        className="mermaid flex justify-center p-4 my-6 bg-[#07070d]/60 border border-primary/10 rounded-xl overflow-x-auto w-full select-none shadow-inner cursor-pointer hover:border-primary/30 transition-all duration-300"
      >
        {chart}
      </div>
    </div>
  )
}

// Markdown Content Imports (separated from code)
import vehicleVssMd from "@/content/vehicle-vss.md?raw"
import asyncBackendMd from "@/content/async-backend.md?raw"
import binanceArchiveMd from "@/content/binance-archive.md?raw"
import projectNexusMd from "@/content/project-nexus.md?raw"

gsap.registerPlugin(ScrollTrigger)

const projectGroups = [
  {
    title: "Company Projects",
    description: "실무 환경에서 가상화 오케스트레이션 및 서버 리소스 최적화를 설계하고 구현한 프로젝트입니다.",
    footerLabel: "Company Work (Private IP)",
    gridClassName: "md:grid-cols-2",
    projects: [
      {
        title: "차량 데이터(VSS) 기반 엣지 AI 시스템",
        description: "socketcand Bridge를 통해 원격 차량 ECU 데이터를 수집하고, can_raw_streamer(Rust)를 통해 실시간 CAN 프레임을 Redis Stream에 고속 인제스천한 뒤, 이중 AI 파이프라인(ai_watcher + anomaly_verifier) 및 vcan/vsomeip 통신을 제어하는 고안정성 차량 엣지 가상화 시스템입니다.",
        tags: ["K3s", "SocketCAN", "socketcand", "vsomeip", "Uptane TUF", "ONNX Runtime", "Ollama"],
        visualLabel: "Edge AI Serving",
        icon: Cpu,
        metrics: [
          { label: "인제스천 아키텍처", value: "Rust / SocketCAN" },
          { label: "ECU 보안 표준", value: "Uptane TUF OTA" },
          { label: "로컬 통신 프로토콜", value: "vsomeip & CAN Bus" }
        ],
        markdownContent: vehicleVssMd,
        repoUrl: "",
      },
      {
        title: "대용량 트래픽 처리를 위한 비동기 AI 백엔드",
        description: "FastAPI ASGI 라우터와 SQLAlchemy ORM을 결합한 비동기 백엔드 환경에서, Vertex AI 및 AWS Polly/Stability AI 호출 레이턴시 동안 스레드가 잠기는 병목을 해결하고 GCS 업로드 I/O를 최적화한 고가용성 API 플랫폼입니다.",
        tags: ["FastAPI (ASGI)", "SQLAlchemy ORM", "Vertex AI (Gemini)", "AWS Polly", "GCS Integration", "PostgreSQL"],
        visualLabel: "Async AI Backend",
        icon: Server,
        metrics: [
          { label: "비동기 라우터", value: "FastAPI / ASGI" },
          { label: "데이터 영속성", value: "SQLAlchemy ORM" },
          { label: "외부 연동 API", value: "Vertex / AWS / Stability" }
        ],
        markdownContent: asyncBackendMd,
        repoUrl: "",
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
        description: "대용량 스트리밍 JSON 데이터를 PipeReader + Utf8JsonReader 순차 파싱으로 처리하고, ApiKeyHeader 검증 레이어를 거쳐 Native RowBinary 포맷으로 ClickHouse(ReplacingMergeTree 엔진)에 고속 적재하는 고성능 인제스천 서버입니다.",
        tags: ["ASP.NET Core", "ClickHouse", "PipeReader", "RowBinary", "Native AOT", "ReplacingMergeTree"],
        visualLabel: "Streaming Ingest",
        icon: Archive,
        metrics: [
          { label: "파싱 아키텍처", value: "PipeReader 스트리밍" },
          { label: "중복 제거", value: "이중 필터링 (DB/App)" },
          { label: "배포 방식", value: "Native AOT" }
        ],
        markdownContent: binanceArchiveMd,
        repoUrl: "",
      },
      {
        title: "Project Nexus",
        description: "Docker Socket(UDS)에 직접 밀착하여 컨테이너 상태 변화를 이벤트 단위로 구독하고, 격리망 내부의 가용성(DNS/TCP) 실시간 프로빙 및 로그 스트림 정규식 매칭을 통해 무의존성(Native AOT)으로 동작하는 초경량 시스템 관제 데몬입니다.",
        tags: ["C# / .NET 10", "Docker Socket (UDS)", "SocketsHttpHandler", "Native AOT", "Container Monitor", "Zero-Dependency"],
        visualLabel: "Docker Monitor",
        icon: Network,
        metrics: [
          { label: "연동 아키텍처", value: "Docker Socket (UDS)" },
          { label: "실시간 프로빙", value: "DNS/TCP & Log Stream" },
          { label: "장애 탐지 지연", value: "1초 미만 (실시간)" }
        ],
        markdownContent: projectNexusMd,
        repoUrl: "",
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
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed break-keep">
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
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

type Project = (typeof projectGroups)[number]["projects"][number]

function ProjectCard({ project }: { project: Project }) {
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
              className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight flex items-center mb-2 break-keep"
              style={{ height: '56px' }}
            >
              {project.title}
            </CardTitle>
            <CardDescription
              className="text-sm leading-relaxed text-slate-400 block overflow-y-auto break-keep"
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
        <CardFooter className="grid grid-cols-2 gap-2 pt-4 pb-6 px-4 border-t border-primary/10 bg-black/20 shrink-0 mt-auto">
          {/* Technical Document Button */}
          {project.markdownContent ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 h-10 border-primary/15 hover:border-primary/40 hover:text-primary text-[11px] sm:text-xs font-semibold bg-background/30 hover:bg-background/80 transition-all duration-300 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>기술 문서</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl max-h-[88vh] overflow-hidden bg-[#07070d]/95 border-primary/20 backdrop-blur-md text-slate-300 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col gap-0 rounded-xl">
                <DialogHeader className="mb-6 pb-4 border-b border-primary/10 shrink-0">
                  <DialogTitle className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <FileText className="w-5.5 h-5.5 text-primary" />
                    <span>{project.title}</span>
                  </DialogTitle>
                  <DialogDescription className="text-slate-400 text-xs mt-1">
                    {project.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-1">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      /* eslint-disable @typescript-eslint/no-unused-vars */
                      h1: ({ node, ...props }) => <h1 className="text-2xl font-extrabold tracking-tight mb-4 mt-6 bg-gradient-to-r from-foreground via-foreground to-purple-400/80 bg-clip-text text-transparent border-b border-primary/10 pb-2 font-heading" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-xl font-bold tracking-tight mb-3 mt-5 text-glow font-heading text-white" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-lg font-bold tracking-tight mb-2 mt-4 text-white/90" {...props} />,
                      p: ({ node, ...props }) => <p className="text-sm leading-relaxed text-slate-300 mb-4" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 text-slate-300 space-y-1" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 text-slate-300 space-y-1" {...props} />,
                      li: ({ node, ...props }) => <li className="text-sm leading-relaxed" {...props} />,
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "")
                        const isMermaid = match && match[1] === "mermaid"
                        return isMermaid ? (
                          <Mermaid chart={String(children).replace(/\n$/, "")} />
                        ) : (
                          <code className="bg-primary/10 border border-primary/25 rounded px-1.5 py-0.5 text-xs text-primary font-mono" {...props}>
                            {children}
                          </code>
                        )
                      },
                      pre: ({ children, ...props }) => {
                        const isMermaid = React.Children.toArray(children).some((child: any) => {
                          return (
                            child?.props?.className === "language-mermaid" ||
                            child?.props?.children?.props?.className === "language-mermaid"
                          )
                        })
                        if (isMermaid) {
                          return <>{children}</>
                        }
                        return (
                          <pre className="bg-black/50 border border-primary/15 rounded-lg p-4 overflow-x-auto mb-4 font-mono text-xs text-slate-300" {...props}>
                            {children}
                          </pre>
                        )
                      },
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-2 border-primary/40 pl-4 italic text-muted-foreground my-4 bg-primary/5 py-1 pr-2 rounded-r" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-primary hover:underline font-semibold" target="_blank" rel="noopener noreferrer" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-6 border border-primary/10 rounded-lg">
                          <table className="w-full text-sm border-collapse text-slate-300" {...props} />
                        </div>
                      ),
                      th: ({ node, ...props }) => (
                        <th className="border-b border-primary/10 bg-primary/5 px-4 py-2 font-bold text-left text-white" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="border-b border-primary/5 px-4 py-2 text-slate-400" {...props} />
                      ),
                      /* eslint-enable @typescript-eslint/no-unused-vars */
                    }}
                  >
                    {project.markdownContent}
                  </ReactMarkdown>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 h-10 border-primary/10 text-[11px] sm:text-xs font-semibold bg-background/20 cursor-default text-slate-500 hover:bg-background/20"
              disabled
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>문서 비공개</span>
            </Button>
          )}

          {/* Code Repository Button */}
          {project.repoUrl ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full gap-1.5 h-10 border-primary/15 hover:border-primary/40 hover:text-primary text-[11px] sm:text-xs font-semibold bg-background/30 hover:bg-background/80 transition-all duration-300 cursor-pointer"
            >
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Code className="w-3.5 h-3.5" />
                <span>코드 저장소</span>
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 h-10 border-primary/10 text-[11px] sm:text-xs font-semibold bg-background/20 cursor-default text-slate-500 hover:bg-background/20"
              disabled
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>저장소 비공개</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
