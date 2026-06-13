import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"
import { Trophy, Award, Calendar } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const awards = [
  {
    title: "로봇융합해커톤 대학일반부 대상",
    organization: "대전광역시 주최 / 우송대학교 주관",
    date: "2023.08"
  }
]

const certificates = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    date: "2024.11"
  },
  {
    title: "PCCE Lv.3 (Python)",
    organization: "프로그래머스",
    date: "2024.05"
  }
]

export default function CertificatesAndAwards() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-certs-heading]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-certs-heading]",
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        },
      )

      gsap.fromTo(
        "[data-certs-card]",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "[data-certs-grid]",
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="awards" className="container mx-auto max-w-5xl px-4 md:px-8 py-20 relative flex flex-col justify-center">
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div
        data-certs-heading
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 md:text-5xl font-heading bg-gradient-to-r from-foreground via-foreground to-purple-400 bg-clip-text text-transparent">
          Awards & Certifications
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          기술 역량을 입증하는 전문 자격증 취득 및 대외 수상 내역입니다.
        </p>
      </div>

      <div data-certs-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Awards Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-foreground">Awards</h3>
          </div>
          {awards.map((award, idx) => (
            <div
              key={idx}
              data-certs-card
              className="glassmorphism p-6 rounded-xl border border-primary/10 hover-glow-card transition-all duration-300 shadow-xl shadow-black/25"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1 leading-snug">{award.title}</h4>
                  <p className="text-primary text-xs font-semibold">{award.organization}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span>{award.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-bold text-foreground">Certifications</h3>
          </div>
          <div className="space-y-6">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                data-certs-card
                className="glassmorphism p-6 rounded-xl border border-primary/10 hover-glow-card transition-all duration-300 shadow-xl shadow-black/25"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1 leading-snug">{cert.title}</h4>
                    <p className="text-primary text-xs font-semibold">{cert.organization}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
