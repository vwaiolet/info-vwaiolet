import Navbar from "@/components/portfolio/Navbar"
import Hero from "@/components/portfolio/Hero"
import TechStack from "@/components/portfolio/TechStack"
import Projects from "@/components/portfolio/Projects"
import Experience from "@/components/portfolio/Experience"

function App() {
  return (
    <div className="dark bg-background text-foreground selection:bg-primary/30 min-h-screen">
      <main>
        <section className="section-container relative">
          <Navbar />
          <Hero />
        </section>

        <section className="section-container bg-secondary/30">
          <TechStack />
        </section>

        <section className="section-container">
          <Projects />
        </section>

        <section className="section-container bg-secondary/30 relative flex flex-col">
          <div className="flex-grow flex flex-col justify-center">
            <Experience />
          </div>
          <footer className="border-t border-border/40 py-8 bg-background/50">
            <div className="container mx-auto max-w-6xl px-4 md:px-8 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Gyeongho Kim. AI Backend & Serving Engineer.</p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
