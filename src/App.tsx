import Navbar from "@/components/portfolio/Navbar"
import Hero from "@/components/portfolio/Hero"
import TechStack from "@/components/portfolio/TechStack"
import Projects from "@/components/portfolio/Projects"
import Experience from "@/components/portfolio/Experience"
import CertificatesAndAwards from "@/components/portfolio/CertificatesAndAwards"

function App() {
  return (
    <div className="dark bg-background text-foreground selection:bg-primary/30 min-h-screen bg-grid-pattern relative flex flex-col">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] right-[5%] w-[40rem] h-[40rem] bg-fuchsia-500/5 rounded-full blur-[130px]" />
        <div className="absolute top-[80%] left-[20%] w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[110px]" />
      </div>

      <Navbar />

      <div className="relative z-10 flex-1">
        <PortfolioHome />
      </div>
      <SiteFooter />
    </div>
  )
}

function PortfolioHome() {
  return (
    <main>
      <section className="section-container">
        <Hero />
      </section>

      <section className="section-container border-t border-primary/5">
        <TechStack />
      </section>

      <section className="section-container border-t border-primary/5">
        <Projects />
      </section>

      <section className="section-container border-t border-primary/5">
        <Experience />
      </section>

      <section className="section-container border-t border-primary/5">
        <CertificatesAndAwards />
      </section>

    </main>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 py-10 bg-black/40 backdrop-blur-md relative z-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Gyeongho Kim. All Rights Reserved.</p>
          <p className="text-xs text-muted-foreground mt-1">AI Backend & Serving Engineer Portfolio</p>
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
