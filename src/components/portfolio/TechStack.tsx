import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const techData = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "NestJS", "PostgreSQL", "Redis", "Docker", "Prisma"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "AWS", "Vercel", "Slack", "Figma"]
  }
]

export default function TechStack() {
  return (
    <div id="tech-stack" className="container mx-auto max-w-6xl px-4 md:px-8 h-full flex flex-col justify-center">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Technical Stack</h2>
        <p className="text-muted-foreground text-xl">사용하고 있는 주요 기술들입니다.</p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-3">
        {techData.map((tech, index) => (
          <motion.div
            key={tech.category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
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
