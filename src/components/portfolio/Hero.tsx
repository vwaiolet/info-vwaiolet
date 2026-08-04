import { Badge } from "@/components/ui/badge"
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
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} id="home" className="container mx-auto max-w-6xl px-4 py-24 md:py-32 lg:py-40 relative flex flex-col items-center justify-center">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-float-glow" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-600/5 rounded-full blur-3xl -z-10 animate-float-glow" style={{ animationDelay: "-5s" }} />

      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div data-hero-badge>
          <Badge variant="outline" className="glassmorphism-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm rounded-full">
            ⚡ SYSTEM & SERVING INFRA ENGINEER
          </Badge>
        </div>

        <h1
          data-hero-title
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-foreground font-heading break-keep"
        >
          단순 AI 연동을 넘어, <br />
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent text-glow">
            컨테이너 최적화와 OS/네트워크 병목을 해결하는
          </span> <br />
          엔지니어입니다.
        </h1>

        <p
          data-hero-copy
          className="max-w-[750px] text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mt-2 break-keep"
        >
          단순히 "돌아가는 기능"을 넘어 "왜 이 아키텍처여야 하는가?"를 끊임없이 고민합니다. 클라우드부터 엣지 디바이스까지, 효율성을 고려한 최적의 AI 서빙 환경을 구축합니다.
        </p>
      </div>
    </div>
  )
}

