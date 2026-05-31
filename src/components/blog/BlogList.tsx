import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { blogPosts, formatPostDate } from "@/content/blog"
import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays, Clock } from "lucide-react"

export default function BlogList() {
  return (
    <main className="container mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="mb-12 max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <a href="/#home" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </a>
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            Study Notes
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          Blog
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
          공부하면서 남긴 AI 백엔드, 모델 서빙, 인프라 설계 기록을 모아두는 공간입니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            <Card className="h-full gap-0 rounded-lg border-primary/10 bg-[#07070d]/60 py-0 shadow-xl shadow-black/30 transition-all duration-300 hover:border-primary/45 hover:bg-[#0c0c16]/80 hover-glow-card">
              <div className="flex items-start justify-between gap-4 border-b border-primary/10 bg-primary/5 px-5 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">{post.category}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatPostDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} min
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <CardTitle className="text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-3 text-sm leading-relaxed text-slate-400">
                  {post.summary}
                </CardDescription>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="border border-white/5 bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </main>
  )
}
