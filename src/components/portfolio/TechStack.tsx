import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <section id="tech-stack" className="container mx-auto py-24 max-w-6xl px-4 md:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Stack</h2>
        <p className="text-muted-foreground text-lg">사용하고 있는 주요 기술들입니다.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {techData.map((tech) => (
          <Card key={tech.category} className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl">{tech.category}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tech.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
