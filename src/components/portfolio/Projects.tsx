import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitGraph } from "lucide-react"

const projects = [
  {
    title: "AI 기반 일정 관리 서비스",
    description: "자연어 처리를 통해 일정을 자동으로 등록하고 관리해주는 웹 애플리케이션입니다.",
    tags: ["Next.js", "OpenAI API", "Supabase"],
    github: "#",
    demo: "#"
  },
  {
    title: "실시간 협업 화이트보드",
    description: "Websocket을 이용해 여러 사용자가 동시에 그림을 그리고 문서를 편집할 수 있는 도구입니다.",
    tags: ["React", "Socket.io", "Express"],
    github: "#",
    demo: "#"
  },
  {
    title: "E-commerce 대시보드",
    description: "판매 데이터 시각화 및 재고 관리를 위한 관리자 전용 대시보드 시스템입니다.",
    tags: ["React", "Recharts", "Prisma"],
    github: "#",
    demo: "#"
  }
]

export default function Projects() {
  return (
    <section id="projects" className="container py-24 max-w-5xl px-4 md:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Selected Projects</h2>
        <p className="text-muted-foreground text-lg">최근에 진행한 주요 프로젝트들입니다.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col bg-card/50 border-border/50 overflow-hidden transition-all hover:border-primary/50">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Project Preview</span>
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <GitGraph className="w-4 h-4" /> Code
              </Button>
              <Button size="sm" className="w-full gap-2">
                <ExternalLink className="w-4 h-4" /> Demo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
