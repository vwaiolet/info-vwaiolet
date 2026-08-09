import Navbar from "@/components/portfolio/Navbar"
import MobileReader from "@/components/portfolio/MobileReader"
import { useTheme } from "@/lib/useTheme"

function App() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div className="reader-app bg-background text-foreground selection:bg-primary/30 min-h-screen bg-grid-pattern relative flex flex-col transition-colors duration-300">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none reader-desktop-atmosphere">
        <div className="absolute top-[15%] left-[10%] w-[35rem] h-[35rem] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[120px] animate-float-glow" />
        <div className="absolute top-[45%] right-[5%] w-[40rem] h-[40rem] bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[130px] animate-float-glow" style={{ animationDelay: "-5s" }} />
        <div className="absolute top-[75%] left-[20%] w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[110px] animate-float-glow" style={{ animationDelay: "-10s" }} />
      </div>

      <Navbar theme={theme} setTheme={setTheme} resolvedTheme={resolvedTheme} />

      <div className="relative z-10 flex-1">
        <MobileReader />
      </div>
      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="reader-footer border-t border-border/40 py-10 bg-card/60 backdrop-blur-md relative z-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gyeongho Kim. All Rights Reserved.</p>
          <p className="text-xs text-muted-foreground/80 mt-1">SYSTEM & SERVING INFRA ENGINEER Portfolio</p>
        </div>
        <div className="text-xs text-muted-foreground flex flex-wrap justify-center gap-6 md:justify-start">
          <a href="/#home" className="hover:text-primary transition-colors">Home</a>
          <a href="/#tech-stack" className="hover:text-primary transition-colors">Tech</a>
          <a href="/#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="/#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="/#awards" className="hover:text-primary transition-colors">Edu & Awards</a>
        </div>
      </div>
    </footer>
  )
}

export default App
