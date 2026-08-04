import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Mail, Sun, Moon, Monitor, Home, Cpu, FolderGit2, Briefcase, GraduationCap } from "lucide-react"
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

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const cycleTheme = () => {
    if (theme === "system") setTheme("light")
    else if (theme === "light") setTheme("dark")
    else setTheme("system")
  }

  return (
    <>
      {/* Top Header Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
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
                className={`transition-all duration-200 ${
                  activeSection === item.id
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
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === "system"
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
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === "light"
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
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === "dark"
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

          {/* Mobile Top Header Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="https://github.com/vwaiolet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <Button asChild variant="outline" size="sm" className="border-primary/20 hover:border-primary/50 text-[11px] font-semibold cursor-pointer glassmorphism py-1 px-3 h-8">
              <a href={contactHref} className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-primary" />
                Contact
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Glass Floating Navigation Dock */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm glassmorphism rounded-full p-1.5 border border-primary/25 shadow-2xl shadow-black/20 backdrop-blur-2xl flex items-center justify-between">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground font-bold shadow-md scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] tracking-tight mt-0.5 font-medium">{item.label}</span>
            </a>
          )
        })}

        {/* Quick Theme Cycle Button on Bottom Bar */}
        <button
          onClick={cycleTheme}
          className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all cursor-pointer border-l border-border/30 ml-0.5"
          title="Change Theme"
          aria-label="Cycle theme"
        >
          {theme === "system" ? (
            <Monitor className="w-4 h-4 text-primary" />
          ) : theme === "light" ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-violet-400" />
          )}
          <span className="text-[9px] tracking-tight mt-0.5 font-medium opacity-80">Theme</span>
        </button>
      </div>
    </>
  )
}


