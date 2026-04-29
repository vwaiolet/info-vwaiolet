import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const techData = [
  {
    category: "AI & Serving",
    skills: ["Ollama", "Vertex AI", "Gemini API", "OpenAI API", "BERT", "USAD"]
  },
  {
    category: "Backend & DB",
    skills: ["Python", "FastAPI", "Django", "PostgreSQL", "MySQL", "Redis"]
  },
  {
    category: "Cloud & Edge Infra",
    skills: ["AWS", "GCP", "Azure", "K3s", "Docker", "Docker Compose"]
  },
  {
    category: "Tools & Others",
    skills: ["Git", "GitHub Actions", "Codex", "Notion", "Google Workspace", "React", "Next.js"]
  }
]

export default function TechStack() {
  return (
    <div id="tech-stack" className="container mx-auto max-w-6xl px-4 md:px-8 flex flex-col justify-center">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Technical Stack</h2>
        <p className="text-muted-foreground text-xl">비즈니스 효율성과 안정적인 AI 서빙을 위해 활용하는 핵심 기술입니다.</p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-3">
        {techData.map((tech, index) => (
          <motion.div
            key={tech.category}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="bg-card/50 border-primary/10 hover:border-primary/30 transition-colors h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{tech.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {tech.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm py-1.5 px-3 border-primary/20 bg-primary/5 text-primary">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
