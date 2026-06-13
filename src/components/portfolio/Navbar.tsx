import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Menu, X, Mail } from "lucide-react"

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-primary/10 shadow-lg shadow-black/20"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a href="/#home" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent group-hover:text-glow transition-all">
            {"<VWAIOLET />"}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <a href="/#home" className="text-muted-foreground hover:text-primary hover:text-glow transition-all duration-200">Home</a>
          <a href="/#tech-stack" className="text-muted-foreground hover:text-primary hover:text-glow transition-all duration-200">Tech</a>
          <a href="/#projects" className="text-muted-foreground hover:text-primary hover:text-glow transition-all duration-200">Projects</a>
          <a href="/#experience" className="text-muted-foreground hover:text-primary hover:text-glow transition-all duration-200">Experience</a>
          <a href="/#awards" className="text-muted-foreground hover:text-primary hover:text-glow transition-all duration-200">Edu & Awards</a>
          <a href="/blog" className="text-muted-foreground hover:text-primary hover:text-glow transition-all duration-200">Blog</a>
        </nav>

        {/* Contact CTA & Socials */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="https://github.com/vwaiolet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <Button asChild variant="outline" size="sm" className="border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-semibold cursor-pointer">
            <a href={contactHref} className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary" />
              Contact Me
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-background/95 backdrop-blur-lg border-t border-primary/10 flex flex-col items-center justify-center gap-8 text-lg font-bold z-40 animate-fade-in">
          <a
            href="/#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="/#tech-stack"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Tech
          </a>
          <a
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Projects
          </a>
          <a
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Experience
          </a>
          <a
            href="/#awards"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Edu & Awards
          </a>
          <a
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </a>
          <a
            href="https://github.com/vwaiolet"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
            GitHub
          </a>
          <Button asChild size="lg" className="w-[80%] max-w-sm mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <a href={contactHref} onClick={() => setMobileMenuOpen(false)}>
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </a>
          </Button>
        </div>
      )}
    </header>
  )
}
