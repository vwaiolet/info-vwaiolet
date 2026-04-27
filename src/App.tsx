import Navbar from "@/components/portfolio/Navbar"
import Hero from "@/components/portfolio/Hero"
import TechStack from "@/components/portfolio/TechStack"
import Projects from "@/components/portfolio/Projects"
import Experience from "@/components/portfolio/Experience"

function App() {
  return (
    <div className="dark min-h-svh bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <div className="bg-secondary/10">
          <TechStack />
        </div>
        <Projects />
        <div className="bg-secondary/10">
          <Experience />
        </div>
      </main>
      <footer className="border-t border-border/40 py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} All-rounder Developer. All rights reserved.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-primary transition-colors">GitHub</a>
             <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
