import { useEffect, useMemo, useRef, type MouseEvent, type ReactNode } from "react"

type Tech = {
  category: string
  description: string
  skills: string[]
}

type Project = {
  group: "회사 프로젝트" | "개인 / 팀 프로젝트"
  label: string
  title: string
  description: string
  tags: string[]
  metrics: { label: string; value: string }[]
  repoUrl?: string
}

const techStack: Tech[] = [
  { category: "Serving & Virtualization", description: "제한된 자원 환경 하의 AI 추론 및 경량 가속화", skills: ["Ollama", "TensorRT", "ONNX Runtime", "K3s", "Docker", "Docker Compose"] },
  { category: "Backend & Systems", description: "고성능 비동기 분산 서버 및 시스템 소프트웨어 설계", skills: ["C#", ".NET 10", "ASP.NET Core", "Python", "FastAPI"] },
  { category: "Data & Ingestion", description: "대용량 시계열 데이터 파이프라인 및 고속 적재", skills: ["ClickHouse", "Redis", "PostgreSQL", "MySQL"] },
  { category: "Systems & Networks", description: "OS 하부 시스템 제어 및 네트워크 통신 제어", skills: ["Linux", "SocketCAN", "TCP/IP", "WebSocket", "DNS/TCP Probe"] },
  { category: "Cloud Infrastructure", description: "퍼블릭 클라우드 및 하이브리드 가상 인프라 설계", skills: ["AWS", "GCP", "Azure", "NCP"] },
  { category: "Monitoring & CI/CD", description: "인프라 실시간 관제 및 빌드/배포 자동화", skills: ["Docker API", "Container Healthcheck", "Log Pattern Scan", "Git", "GitHub Actions", "Shell Scripting"] },
]

const projects: Project[] = [
  {
    group: "회사 프로젝트", label: "Edge AI Serving", title: "차량 데이터(VSS) 기반 엣지 AI 시스템",
    description: "socketcand Bridge를 통해 원격 차량 ECU 데이터를 수집하고, can_raw_streamer(Rust)를 통해 실시간 CAN 프레임을 Redis Stream에 고속 인제스천한 뒤 이중 AI 파이프라인 및 vcan/vsomeip 통신을 제어하는 고안정성 차량 엣지 가상화 시스템입니다.",
    tags: ["K3s", "SocketCAN", "ONNX Runtime", "Ollama"],
    metrics: [{ label: "인제스천", value: "Rust / SocketCAN" }, { label: "ECU 보안", value: "Uptane TUF OTA" }, { label: "통신", value: "vsomeip & CAN Bus" }],
  },
  {
    group: "회사 프로젝트", label: "Async AI Backend", title: "대용량 트래픽 처리를 위한 비동기 AI 백엔드",
    description: "FastAPI ASGI 라우터와 SQLAlchemy ORM을 결합한 비동기 백엔드 환경에서 Vertex AI 및 AWS Polly/Stability AI 호출 중의 병목을 해결하고, GCS 업로드 I/O를 최적화한 고가용성 API 플랫폼입니다.",
    tags: ["FastAPI", "SQLAlchemy", "Vertex AI", "PostgreSQL"],
    metrics: [{ label: "라우터", value: "FastAPI / ASGI" }, { label: "영속성", value: "SQLAlchemy ORM" }, { label: "외부 연동", value: "Vertex / AWS" }],
  },
  {
    group: "회사 프로젝트", label: "Enterprise PMS", title: "통합 PMS 모노레포 및 인프라 오케스트레이션",
    description: "GitLab, OpenProject(커스텀 플러그인), OpenLDAP(LAM SSO 인증), Ollama AI 및 CI 로그 분석기/To-Do 동기화 마이크로서비스를 Docker 환경 기반으로 통합 구축한 엔터프라이즈 PMS 플랫폼입니다.",
    tags: ["Docker Compose", "OpenProject", "OpenLDAP", "Ollama"],
    metrics: [{ label: "프로젝트", value: "PS오닉스 외주 구축" }, { label: "인증", value: "OpenLDAP / Nginx" }, { label: "협업", value: "OpenProject / Ollama" }],
  },
  {
    group: "개인 / 팀 프로젝트", label: "Hi-Fi Audio Player", title: "StelWave (스텔웨이브)",
    description: "WinUI 3(Windows App SDK)와 BASS 오디오 엔진을 결합해 제작한 비트퍼펙트·저지연 Hi-Fi 오디오 플레이어입니다. SQLite 기반 초고속 대용량 라이브러리 가상화 스캔과 실시간 오디오 스펙 트래킹을 제공합니다.",
    tags: ["WinUI 3", "BASS", "WASAPI / ASIO", "SQLite"],
    metrics: [{ label: "출력", value: "WASAPI / ASIO" }, { label: "엔진", value: "BASS & FLAC" }, { label: "데이터", value: "SQLite Virtualization" }],
    repoUrl: "https://github.com/vwaiolet/stel-wave",
  },
  {
    group: "개인 / 팀 프로젝트", label: "Streaming Ingest", title: "Binance 체결 데이터 아카이브 서버",
    description: "대용량 스트리밍 JSON 데이터를 PipeReader + Utf8JsonReader 순차 파싱으로 처리하고, ApiKeyHeader 검증 레이어를 거쳐 Native RowBinary 포맷으로 ClickHouse에 고속 적재하는 고성능 인제스천 서버입니다.",
    tags: ["ASP.NET Core", "ClickHouse", "PipeReader", "Native AOT"],
    metrics: [{ label: "파싱", value: "PipeReader" }, { label: "중복 제거", value: "DB / App 이중 필터" }, { label: "배포", value: "Native AOT" }],
    repoUrl: "https://github.com/TriNeural/binance-archive-server",
  },
  {
    group: "개인 / 팀 프로젝트", label: "Docker Monitor", title: "Project Nexus",
    description: "Docker Socket(UDS)에 직접 밀착해 컨테이너 상태 변화를 이벤트 단위로 구독하고, 격리망 내부의 DNS/TCP 실시간 프로빙과 로그 스트림 정규식 매칭을 통해 Native AOT으로 동작하는 초경량 시스템 관제 데몬입니다.",
    tags: [".NET 10", "Docker Socket", "Native AOT", "Container Monitor"],
    metrics: [{ label: "연동", value: "Docker Socket (UDS)" }, { label: "프로빙", value: "DNS / TCP / Log" }, { label: "탐지", value: "1초 미만" }],
    repoUrl: "https://github.com/vwaiolet/project-nexus",
  },
]

const experiences = [
  {
    company: "주식회사 이더블에스", role: "Edge AI Engineer", period: "2025.09 - Present",
    description: "K3s 기반 엣지 디바이스 내 sLLM 온디바이스 서빙 파이프라인을 구축하고 VSS 데이터 아키텍처를 분석했습니다.",
    points: ["K3s ResourceQuota와 LimitRange로 노드 간 리소스 경합 해결", "Ollama 스케줄링·CrashLoopBackOff 트러블슈팅으로 서빙 안정화", "AWS IoT FleetWise PoC로 사내 VSS 파싱 파이프라인 레퍼런스 제공"],
  },
  {
    company: "주식회사 디엑스아이소프트", role: "AI Backend Developer", period: "2023.10 - 2025.06",
    description: "BERT/LLM 기반 개인화 교육 솔루션의 모델 선정부터 고성능 백엔드 연동과 최적화를 주도했습니다.",
    points: ["AI 모델 연동 구간에 비동기 아키텍처를 도입해 응답 성능 개선", "Vertex AI와 Cloud Storage 기반의 대용량 PDF·오디오 처리 파이프라인 설계", "경량 BERT 선정과 LLM 데이터 증강으로 파인튜닝 수행"],
  },
]

const credentials = [
  {
    section: "Education", items: [
      ["기업멤버십 AI SW 과정 이수", "우송대학교", "2023.03 - 2023.08"],
      ["LG CNS 스마트 팩토리 특별 과정 수료", "우송대학교", "2022.08 - 2022.12"],
      ["Microsoft 러닝 프로그램 수료", "우송대학교", "2022.03 - 2022.06"],
    ]
  },
  { section: "Awards", items: [["로봇융합해커톤 대학일반부 대상", "대전광역시 주최 / 우송대학교 주관", "2023.09"]] },
  { section: "Certifications", items: [["Microsoft Certified: Azure Fundamentals", "Microsoft", "2025.06"], ["PCCE Lv.3 (Python)", "프로그래머스", "2023.05"]] },
]

const chapters = [
  { number: "01", title: "Profile", subtitle: "표지", section: "home", page: "01" },
  { number: "02", title: "About the Author", subtitle: "학력 · 수상 · 자격증", section: "awards", page: "03" },
  { number: "03", title: "Technical Stack", subtitle: "기술 스택", section: "tech-stack", page: "04" },
  { number: "04", title: "Selected Projects", subtitle: "프로젝트", section: "projects", page: "07" },
  { number: "05", title: "Experience", subtitle: "경력 사항", section: "experience", page: "14" },
]

function Sheet({ chapter, title, children }: { chapter: string; title?: string; children: ReactNode }) {
  return (
    <div className="mobile-reader-sheet">
      <div className="mobile-reader-running-head"><span>{chapter}</span><span className="mobile-reader-imprint">VWAIOLET</span></div>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}

function Keywords({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <p className={`mobile-reader-keywords${compact ? " is-compact" : ""}`}>
      <span>KEYWORDS</span>
      {items.map((item) => <em key={item}>{item}</em>)}
    </p>
  )
}

function Cover() {
  return (
    <div className="mobile-reader-cover">
      <p className="mobile-reader-kicker">SYSTEM &amp; SERVING INFRA ENGINEER</p>
      <h1>단순 AI 연동을 넘어,<br /><em>컨테이너 최적화와 OS/네트워크 병목을 해결하는</em> 엔지니어입니다.</h1>
      <p>왜 이 아키텍처여야 하는가를 고민하며, 클라우드부터 엣지 디바이스까지 효율적인 AI 서빙 환경을 구축합니다.</p>
    </div>
  )
}

function Contents() {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, section: string) => {
    event.preventDefault()
    const reader = document.querySelector<HTMLElement>(".mobile-reader-book")
    const destination = reader?.querySelector<HTMLElement>(`[data-reader-section="${section}"]`)
    if (!reader || !destination) return

    const desktopSpread = window.matchMedia("(min-width: 1024px)").matches
      ? destination.closest<HTMLElement>(".mobile-reader-spread")
      : destination
    const targetPosition = reader.scrollLeft + (desktopSpread?.getBoundingClientRect().left ?? 0) - reader.getBoundingClientRect().left
    const previousScrollBehavior = reader.style.scrollBehavior
    reader.style.scrollBehavior = "auto"
    reader.scrollLeft = targetPosition
    window.requestAnimationFrame(() => {
      reader.style.scrollBehavior = previousScrollBehavior
    })
    window.history.replaceState(null, "", `#${section}`)
  }

  return (
    <div className="mobile-reader-sheet mobile-reader-contents">
      <div className="mobile-reader-running-head"><span>00 · 읽기의 길잡이</span><span className="mobile-reader-imprint">VWAIOLET</span></div>
      <h2>Contents</h2>
      <p className="mobile-reader-contents-note">SYSTEM &amp; SERVING INFRA ENGINEER<br />PORTFOLIO EDITION 01</p>
      <nav aria-label="전자책 목차">
        {chapters.map((chapter) => (
          <a key={chapter.section} href={`/#${chapter.section}`} onClick={(event) => navigate(event, chapter.section)}>
            <span className="mobile-reader-contents-index">{chapter.number}</span>
            <span><strong>{chapter.title}</strong><small>{chapter.subtitle}</small></span>
            <em>{chapter.page}</em>
          </a>
        ))}
      </nav>
    </div>
  )
}

function AuthorProfile() {
  return (
    <Sheet chapter="01 · 저자 소개" title="About the Author">
      <p className="mobile-reader-lede">AI 서빙과 시스템 인프라를 설계하며, 서비스의 안정성과 운영 효율을 함께 고민하는 엔지니어입니다.</p>
      <div className="mobile-reader-author-records">
        {credentials.map((credential) => (
          <section key={credential.section}>
            <h3>{credential.section}</h3>
            <ul>
              {credential.items.map(([title, organization, date]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{organization}</span>
                  <time>{date}</time>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Sheet>
  )
}

function TechEntry({ tech }: { tech: Tech }) {
  return (
    <article className="mobile-reader-tech-entry">
      <h3>{tech.category}</h3>
      <p>{tech.description}</p>
      <Keywords items={tech.skills} compact />
    </article>
  )
}

export default function MobileReader() {
  const readerRef = useRef<HTMLElement>(null)

  const pages = useMemo(() => [
    { section: "home", content: <Cover /> },
    { section: "contents", content: <Contents /> },
    { section: "awards", content: <AuthorProfile /> },
    { section: "tech-stack", content: <Sheet chapter="02 · 기술 스택" title="Technical Stack"><p className="mobile-reader-lede">AI 서빙, 고성능 백엔드, 데이터 적재와 컨테이너 운영을 위한 핵심 기술입니다.</p></Sheet> },
    ...[techStack.slice(0, 3), techStack.slice(3)].map((techniques, index) => ({
      section: "tech-stack",
      content: <Sheet chapter="02 · 기술 스택" title={index === 0 ? "Core Systems" : "Infrastructure & Operations"}><div className="mobile-reader-tech-list">{techniques.map((tech) => <TechEntry key={tech.category} tech={tech} />)}</div></Sheet>,
    })),
    { section: "projects", content: <Sheet chapter="03 · 프로젝트" title="Selected Projects"><p className="mobile-reader-lede">운영 환경과 엣지 디바이스에서 구현한 AI 서빙, 데이터 적재, 인프라 모니터링 사례입니다.</p></Sheet> },
    ...projects.map((project, index) => ({ section: "projects", content: <Sheet chapter={`03 · ${project.group}`} title={project.title}><p className="mobile-reader-label">PROJECT {String(index + 1).padStart(2, "0")} · {project.label}</p><p className="mobile-reader-project-copy">{project.description}</p><dl className="mobile-reader-metrics">{project.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl><Keywords items={project.tags} />{project.repoUrl && <a className="mobile-reader-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">코드 저장소 <span aria-hidden="true">→</span></a>}</Sheet> })),
    { section: "experience", content: <Sheet chapter="04 · 경력 사항" title="Experience"><p className="mobile-reader-lede">AI 모델을 서비스로 연결하며 인프라 자원을 효율화하고 시스템 성능을 최적화해 온 경험입니다.</p></Sheet> },
    ...experiences.map((experience) => ({ section: "experience", content: <Sheet chapter="04 · 경력 사항" title={experience.role}><p className="mobile-reader-company">{experience.company}</p><p className="mobile-reader-period">{experience.period}</p><p className="mobile-reader-project-copy">{experience.description}</p><ol className="mobile-reader-points">{experience.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>)}</ol></Sheet> })),
  ], [])

  useEffect(() => {
    const reader = readerRef.current
    if (!reader) return

    const sheets = Array.from(reader.querySelectorAll<HTMLElement>("[data-reader-section]"))
    const update = () => {
      const width = reader.clientWidth
      if (!width) return

      const progress = reader.scrollLeft / width
      sheets.forEach((sheet, index) => {
        const distance = Math.max(-1, Math.min(1, index - progress))
        const distanceAmount = Math.abs(distance)
        sheet.style.setProperty("--mobile-page-turn", `${distance * -13}deg`)
        sheet.style.setProperty("--mobile-page-scale", `${1 - distanceAmount * 0.025}`)
        sheet.style.setProperty("--mobile-page-shade", `${distanceAmount * 0.15}`)
        sheet.style.setProperty("--mobile-page-opacity", `${1 - Math.max(0, (distanceAmount - 0.72) / 0.28)}`)
      })
      reader.dispatchEvent(new Event("readerlayout"))
    }

    const requestUpdate = () => window.requestAnimationFrame(update)
    const resizeObserver = new ResizeObserver(requestUpdate)
    reader.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    resizeObserver.observe(reader)
    update()

    return () => {
      reader.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <main ref={readerRef} className="reader-book mobile-reader-book portfolio-reader" aria-label="김경호 포트폴리오 전자책">
      {Array.from({ length: Math.ceil(pages.length / 2) }, (_, spreadIndex) => (
        <div className="mobile-reader-spread" data-reader-spread key={`spread-${spreadIndex}`}>
          {pages.slice(spreadIndex * 2, spreadIndex * 2 + 2).map((page, pageOffset) => {
            const pageIndex = spreadIndex * 2 + pageOffset
            return (
              <section key={`${page.section}-${pageIndex}`} className="mobile-reader-page" data-reader-section={page.section}>
                {page.content}
                <span className="mobile-reader-folio" aria-hidden="true">{String(pageIndex + 1).padStart(2, "0")}</span>
              </section>
            )
          })}
        </div>
      ))}
    </main>
  )
}
