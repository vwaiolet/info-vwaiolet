import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

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
    <div id="projects" className="container mx-auto max-w-6xl px-4 md:px-8 h-full flex flex-col justify-center">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Selected Projects</h2>
        <p className="text-muted-foreground text-xl">최근에 진행한 주요 프로젝트들입니다.</p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="flex flex-col bg-card/40 border-border/50 overflow-hidden transition-all hover:border-primary/50 group h-full">
              <div className="aspect-video bg-muted/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <span className="text-muted-foreground relative z-10 font-medium">Project Preview</span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-base">{project.description}</CardDescription>
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
                <Button variant="outline" size="sm" className="w-full gap-2 h-10">
                  <Github className="w-4 h-4" /> Code
                </Button>
                <Button size="sm" className="w-full gap-2 h-10">
                  <ExternalLink className="w-4 h-4" /> Demo
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
