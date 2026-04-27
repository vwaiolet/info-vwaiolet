import Navbar from "@/components/portfolio/Navbar"
import Hero from "@/components/portfolio/Hero"
import TechStack from "@/components/portfolio/TechStack"
import Projects from "@/components/portfolio/Projects"
import Experience from "@/components/portfolio/Experience"

function App() {
  return (
    <div className="dark min-h-svh bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <div className="bg-secondary/30">
          <TechStack />
        </div>
        <Projects />
        <div className="bg-secondary/30">
          <Experience />
        </div>
      </main>
      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} All-rounder Developer. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
