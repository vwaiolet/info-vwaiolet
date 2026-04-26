import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Vite + React + Tailwind CSS + shadcn/ui
        </p>
        <h1 className="text-3xl font-semibold tracking-normal">
          Ready to build
        </h1>
        <Button>Get started</Button>
      </div>
    </main>
  )
}

export default App
