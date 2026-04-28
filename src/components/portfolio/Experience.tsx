import { motion } from "framer-motion"

const experiences = [
  {
    company: "테크 스타트업 (Tech Startup)",
    role: "Senior Full Stack Developer",
    period: "2022 - Present",
    description: "고성능 마이크로서비스 아키텍처 설계 및 프론트엔드 성능 최적화 주도.",
    achievements: [
      "메인 서비스 응답 속도 40% 개선",
      "CI/CD 파이프라인 자동화로 배포 시간 60% 단축",
      "주니어 개발자 멘토링 및 코드 리뷰 문화 정착"
    ]
  },
  {
    company: "소프트웨어 솔루션즈 (SW Solutions)",
    role: "Web Developer",
    period: "2020 - 2022",
    description: "다양한 B2B SaaS 제품의 웹 대시보드 개발 및 유지보수.",
    achievements: [
      "실시간 데이터 시각화 모듈 개발",
      "전사적 컴포넌트 라이브러리 구축으로 개발 효율 30% 향상"
    ]
  }
]

export default function Experience() {
  return (
    <div id="experience" className="container mx-auto max-w-6xl px-4 md:px-8 h-full flex flex-col justify-center py-12">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Experience</h2>
        <p className="text-muted-foreground text-xl">지금까지 걸어온 여정입니다.</p>
      </motion.div>
      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="relative pl-10 border-l-2 border-primary/20 pb-4 last:pb-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div className="absolute left-[-9px] top-0 w-[16px] h-[16px] rounded-full bg-primary border-4 border-background" />
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <p className="text-primary text-lg font-medium">{exp.company}</p>
              </div>
              <span className="text-sm font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-full mt-2 md:mt-0">
                {exp.period}
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
            <ul className="grid gap-3 text-base text-muted-foreground/80">
              {exp.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
