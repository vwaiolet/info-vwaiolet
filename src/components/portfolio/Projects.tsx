import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cpu, Database, Lock, Server } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "차량 데이터(VSS) 기반 엣지 AI 시스템",
    description: "K3s 환경의 엣지 디바이스에서 시계열 모델(USAD)과 경량화 LLM(SLM)을 결합하여 오탐률을 획기적으로 줄인 온디바이스 AI 서빙 파이프라인입니다. CAN 데이터를 VSS 포맷으로 실시간 매핑하는 모듈을 개발했습니다.",
    tags: ["K3s", "Ollama", "Docker", "TensorRT", "USAD", "CAN", "VSS"],
    visualLabel: "Edge AI Serving",
    icon: Cpu
  },
  {
    title: "대용량 트래픽 처리를 위한 비동기 AI 백엔드",
    description: "무거운 생성형 모델(LLM/BERT) 응답 대기 시간 동안 서버가 블로킹되지 않도록 FastAPI 비동기 아키텍처를 도입했습니다. Vertex AI와 GCS를 연동하여 대용량 파일 처리 파이프라인을 최적화했습니다.",
    tags: ["FastAPI", "Vertex AI", "GCP", "BERT"],
    visualLabel: "Async AI Backend",
    icon: Server
  },
  {
    title: "맥락 유지형 LMS AI 솔루션",
    description: "Django ORM을 활용해 복잡한 학습 데이터의 무결성을 보장하는 스키마를 설계했습니다. Gemini 모델의 긴 컨텍스트 윈도우를 활용하여 강의 전체 맥락을 유지하는 Grounding 로직을 구현했습니다.",
    tags: ["Django", "Gemini API", "PostgreSQL", "Grounding"],
    visualLabel: "Context Grounding",
    icon: Database
  }
]

export default function Projects() {
  return (
    <div id="projects" className="container mx-auto max-w-6xl px-4 md:px-8 flex flex-col justify-center">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Selected Projects</h2>
        <p className="text-muted-foreground text-xl">실제 운영 환경과 엣지 디바이스에서의 AI 서빙 최적화 및 백엔드 설계 경험입니다.</p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

type Project = (typeof projects)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="flex flex-col bg-card/40 border-border/50 overflow-hidden transition-all hover:border-primary/50 group h-full">
        <div className="border-b border-border/50 bg-muted/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{project.visualLabel}</span>
            </div>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-3 pt-6">
          <Button variant="outline" size="sm" className="w-full gap-2 h-10" disabled>
            <Lock className="w-4 h-4" /> Private Work
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
