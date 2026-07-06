import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"
import { Trophy, Award, Calendar, GraduationCap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    title: "기업멤버십 AI SW 과정 이수",
    institution: "우송대학교",
    date: "2023.03 - 2023.08"
  },
  {
    title: "LG CNS 스마트 팩토리 특별 과정 수료",
    institution: "우송대학교",
    date: "2022.08 - 2022.12"
  },
  {
    title: "마이크로소프트 러닝 프로그램 수료 (Querying Data with Transact-SQL)",
    institution: "우송대학교",
    date: "2022.03 - 2022.06"
  }
]

const awards = [
  {
    title: "로봇융합해커톤 대학일반부 대상",
    organization: "대전광역시 주최 / 우송대학교 주관",
    date: "2023.09"
  }
]

const certificates = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    date: "2025.06"
  },
  {
    title: "PCCE Lv.3 (Python)",
    organization: "프로그래머스",
    date: "2023.05"
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
          stagger: 0.1,
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
    <div ref={sectionRef} id="awards" className="container mx-auto max-w-6xl px-4 md:px-8 py-20 relative flex flex-col justify-center">
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div
        data-certs-heading
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 md:text-5xl font-heading bg-gradient-to-r from-foreground via-foreground to-purple-400 bg-clip-text text-transparent">
          Education & Credentials
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          성장과 전문성 확보를 위한 학력, 교육 이수 내역 및 수상/자격증입니다.
        </p>
      </div>

      <div data-certs-grid className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Education Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-foreground">Education</h3>
          </div>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                data-certs-card
                className="glassmorphism p-6 rounded-xl border border-primary/10 hover-glow-card transition-all duration-300 shadow-xl shadow-black/25"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-base font-bold text-foreground mb-1 leading-snug break-keep">{edu.title}</h4>
                    <p className="text-primary text-xs font-semibold">{edu.institution}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{edu.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-foreground">Awards</h3>
          </div>
          <div className="space-y-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                data-certs-card
                className="glassmorphism p-6 rounded-xl border border-primary/10 hover-glow-card transition-all duration-300 shadow-xl shadow-black/25"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-base font-bold text-foreground mb-1 leading-snug break-keep">{award.title}</h4>
                    <p className="text-primary text-xs font-semibold">{award.organization}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{award.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                    <h4 className="text-base font-bold text-foreground mb-1 leading-snug break-keep">{cert.title}</h4>
                    <p className="text-primary text-xs font-semibold">{cert.organization}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
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
