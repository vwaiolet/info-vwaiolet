import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 z-50 w-full border-b border-border/40 bg-transparent">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">{"<VWAIOLET />"}</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#home" className="transition-colors hover:text-primary">Home</a>
          <a href="#tech-stack" className="transition-colors hover:text-primary">Tech</a>
          <a href="#projects" className="transition-colors hover:text-primary">Projects</a>
          <a href="#experience" className="transition-colors hover:text-primary">Experience</a>
        </div>
        <div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Contact Me
          </Button>
        </div>
      </div>
    </nav>
  )
}
