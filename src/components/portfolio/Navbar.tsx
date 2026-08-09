import { Button } from "@/components/ui/button"
import { useEffect, useState, type MouseEvent } from "react"
import { Mail, Sun, Moon, Monitor, Home, Cpu, FolderGit2, Briefcase, GraduationCap, BookOpen, ChevronLeft, ChevronRight, List, X } from "lucide-react"
import { Theme, useTheme } from "@/lib/useTheme"

const contactHref = "mailto:kkh990828@gmail.com?subject=Portfolio%20Contact"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

interface NavbarProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
  resolvedTheme?: "light" | "dark"
}

const navItems = [
  { id: "home", label: "Home", href: "/#home", icon: Home },
  { id: "tech-stack", label: "Tech", href: "/#tech-stack", icon: Cpu },
  { id: "projects", label: "Projects", href: "/#projects", icon: FolderGit2 },
  { id: "experience", label: "Exp", href: "/#experience", icon: Briefcase },
  { id: "awards", label: "Edu", href: "/#awards", icon: GraduationCap },
]

export default function Navbar(props: NavbarProps) {
  const localTheme = useTheme()
  const theme = props.theme || localTheme.theme
  const setTheme = props.setTheme || localTheme.setTheme

  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [readerPage, setReaderPage] = useState(0)
  const [readerPageCount, setReaderPageCount] = useState(navItems.length)
  const [readerPagesPerSpread, setReaderPagesPerSpread] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      if (document.querySelector(".portfolio-reader")) return

      setScrolled(window.scrollY > 20)

      // Top of page check
      if (window.scrollY < 100) {
        setActiveSection("home")
        return
      }

      // Bottom of page check
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60
      if (isAtBottom) {
        setActiveSection("awards")
        return
      }

      // Viewport coverage detection for short & tall sections (like Projects)
      const targetThresholdTop = window.innerHeight * 0.45
      const targetThresholdBottom = window.innerHeight * 0.2

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i]
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= targetThresholdTop && rect.bottom >= targetThresholdBottom) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    const reader = document.querySelector<HTMLElement>(".reader-book")
    const handleReaderScroll = () => {
      if (!reader) return

      const pageWidth = reader.clientWidth
      if (!pageWidth) return

      const readerPages = Array.from(reader.querySelectorAll<HTMLElement>("[data-reader-section]"))
      const pagesPerSpread = window.matchMedia("(min-width: 1024px)").matches ? 2 : 1
      const currentSpread = Math.max(0, Math.round(reader.scrollLeft / pageWidth))
      const currentPage = Math.min(Math.max(0, readerPages.length - 1), currentSpread * pagesPerSpread)
      const activeReaderSection = readerPages[currentPage]

      setReaderPage(currentPage)
      setReaderPageCount(Math.max(1, readerPages.length))
      setReaderPagesPerSpread(pagesPerSpread)
      if (activeReaderSection?.dataset.readerSection) {
        setActiveSection(activeReaderSection.dataset.readerSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleReaderScroll)
    reader?.addEventListener("scroll", handleReaderScroll, { passive: true })
    reader?.addEventListener("readerlayout", handleReaderScroll)
    handleScroll()
    handleReaderScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleReaderScroll)
      reader?.removeEventListener("scroll", handleReaderScroll)
      reader?.removeEventListener("readerlayout", handleReaderScroll)
    }
  }, [])

  const cycleTheme = () => {
    if (theme === "system") setTheme("light")
    else if (theme === "light") setTheme("dark")
    else setTheme("system")
  }

  const navigateReader = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const reader = document.querySelector<HTMLElement>(".reader-book")
    const page = reader?.querySelector<HTMLElement>(`[data-reader-section="${id}"]`)
    if (!reader || !page) return

    event.preventDefault()
    const desktopSpread = window.matchMedia("(min-width: 1024px)").matches
      ? page.closest<HTMLElement>(".mobile-reader-spread")
      : page
    const targetPosition = reader.scrollLeft + (desktopSpread?.getBoundingClientRect().left ?? 0) - reader.getBoundingClientRect().left
    const currentSpread = Math.round(reader.scrollLeft / reader.clientWidth)
    const targetSpread = Math.round(targetPosition / reader.clientWidth)
    if (Math.abs(targetSpread - currentSpread) > 2) {
      const previousScrollBehavior = reader.style.scrollBehavior
      reader.style.scrollBehavior = "auto"
      reader.scrollLeft = targetPosition
      window.requestAnimationFrame(() => {
        reader.style.scrollBehavior = previousScrollBehavior
      })
    } else {
      reader.scrollTo({ left: targetPosition, behavior: "smooth" })
    }
    window.history.replaceState(null, "", `#${id}`)
  }

  const turnReaderPage = (direction: -1 | 1) => {
    const reader = document.querySelector<HTMLElement>(".reader-book")
    if (!reader) return

    const pageWidth = reader.clientWidth
    const totalSpreads = Math.max(1, Math.round(reader.scrollWidth / pageWidth))
    const currentSpread = Math.round(reader.scrollLeft / pageWidth)
    const targetSpread = Math.max(0, Math.min(totalSpreads - 1, currentSpread + direction))
    reader.scrollTo({ left: targetSpread * pageWidth, behavior: "smooth" })
  }

  return (
    <>
      {/* Top Header Navigation */}
      <header
        className={`hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "py-3 glassmorphism border-b border-border/40 shadow-lg"
            : "py-5 bg-transparent"
          }`}
      >
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <a href="/#home" className="flex items-center gap-2 group">
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent group-hover:text-glow transition-all">
              {"<VWAIOLET />"}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide">
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => navigateReader(event, item.id)}
                className={`transition-all duration-200 ${activeSection === item.id
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Controls (Theme Switcher + Github + Contact) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Switcher */}
            <div className="flex items-center p-1 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
              <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${theme === "system"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                title="System Theme (Auto)"
                aria-label="System theme"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${theme === "light"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                title="Light Mode"
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${theme === "dark"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                title="Dark Mode"
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href="https://github.com/vwaiolet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <Button asChild variant="outline" size="sm" className="border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all text-xs font-semibold cursor-pointer glassmorphism">
              <a href={contactHref} className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                Contact Me
              </a>
            </Button>
          </div>

        </div>
      </header>

      {/* Reader chrome */}
      <header className="reader-mobile-header">
        <button
          type="button"
          onClick={() => setIsTocOpen((open) => !open)}
          className="reader-icon-button"
          aria-label="목차 열기"
          aria-expanded={isTocOpen}
        >
          {isTocOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
        </button>
        <a href="/#home" onClick={(event) => navigateReader(event, "home")} className="reader-wordmark" aria-label="첫 페이지로 이동">
          <span>VWAIOLET</span>
        </a>
        <button
          type="button"
          onClick={cycleTheme}
          className="reader-icon-button"
          title="테마 변경"
          aria-label="테마 변경"
        >
          {theme === "system" ? <Monitor className="h-4 w-4" /> : theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <span className="reader-progress" aria-hidden="true">
          <span style={{ width: `${(Math.min(readerPage + readerPagesPerSpread, readerPageCount) / readerPageCount) * 100}%` }} />
        </span>
      </header>

      <div className={`reader-toc ${isTocOpen ? "is-open" : ""}`} aria-hidden={!isTocOpen}>
        <div className="reader-toc-heading">
          <BookOpen className="h-4 w-4" />
          <span>CONTENTS</span>
        </div>
        <nav aria-label="목차">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  setIsTocOpen(false)
                  navigateReader(event, item.id)
                }}
                className={isActive ? "is-active" : ""}
              >
                <span className="reader-toc-index">0{index + 1}</span>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
      </div>

      <nav className="reader-pagination" aria-label="페이지 이동">
        {readerPage > 0 ? (
          <button type="button" onClick={() => turnReaderPage(-1)} aria-label="이전 페이지로 이동">
            <ChevronLeft className="h-4 w-4" />
            <span>PREV</span>
          </button>
        ) : (
          <span className="reader-page-edge" aria-hidden="true"><ChevronLeft className="h-4 w-4" /><span>PREV</span></span>
        )}
        <span className="reader-page-count">{String(readerPage + 1).padStart(2, "0")}{readerPagesPerSpread === 2 && readerPage + 1 < readerPageCount && <><b>–</b>{String(readerPage + 2).padStart(2, "0")}</>} <i /> {String(readerPageCount).padStart(2, "0")}</span>
        {readerPage + readerPagesPerSpread < readerPageCount ? (
          <button type="button" onClick={() => turnReaderPage(1)} aria-label="다음 페이지로 이동">
            <span>NEXT</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="reader-page-edge" aria-hidden="true"><span>NEXT</span><ChevronRight className="h-4 w-4" /></span>
        )}
      </nav>
    </>
  )
}
