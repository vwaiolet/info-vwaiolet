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
    <section id="experience" className="container py-24 max-w-5xl px-4 md:px-8 mb-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
        <p className="text-muted-foreground text-lg">지금까지 걸어온 여정입니다.</p>
      </div>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-8 border-l border-border/50 pb-8 last:pb-0">
            <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-primary" />
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
              </div>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded mt-2 md:mt-0">
                {exp.period}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{exp.description}</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground/80">
              {exp.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
