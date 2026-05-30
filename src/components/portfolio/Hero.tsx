import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Eye } from "lucide-react"
import { ResumeModal } from "./ResumeModal"
import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })

      timeline
        .fromTo("[data-hero-badge]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo("[data-hero-title]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.55")
        .fromTo("[data-hero-copy]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45")
        .fromTo("[data-hero-actions]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.35")
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} id="home" className="container mx-auto max-w-6xl px-4 py-24 md:py-32 lg:py-40 relative flex flex-col items-center justify-center">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-float-glow" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl -z-10 animate-float-glow" style={{ animationDelay: "-5s" }} />

      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div data-hero-badge>
          <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider border-primary/30 bg-primary/5 text-primary">
            ⚡ AI BACKEND & SERVING ENGINEER
          </Badge>
        </div>

        <h1
          data-hero-title
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-foreground font-heading"
        >
          안녕하세요, <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent text-glow">
            모델의 가치를 서비스로
          </span> <br />
          연결하는 엔지니어입니다.
        </h1>

        <p
          data-hero-copy
          className="max-w-[750px] text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mt-2"
        >
          단순히 "돌아가는 기능"을 넘어 "왜 이 아키텍처여야 하는가?"를 끊임없이 고민합니다. 클라우드부터 K3s 기반 엣지 디바이스까지, 비즈니스 효율성을 고려한 최적의 AI 서빙 환경을 구축합니다.
        </p>

        <div
          data-hero-actions
          className="flex flex-col gap-4 sm:flex-row mt-6 w-full sm:w-auto justify-center"
        >
          <Button asChild size="lg" className="px-8 text-base h-12 bg-primary hover:bg-primary/95 text-primary-foreground font-medium shadow-lg shadow-primary/25 cursor-pointer">
            <a href="#projects">
              내 프로젝트 보기
              <ArrowDown className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <ResumeModal>
            <Button size="lg" variant="outline" className="px-8 text-base h-12 border-primary/20 hover:border-primary/50 bg-background/50 hover:bg-background/80 cursor-pointer">
              이력서 열람
              <Eye className="ml-2 w-4 h-4 text-primary" />
            </Button>
          </ResumeModal>
        </div>
      </div>
    </div>
  )
}
