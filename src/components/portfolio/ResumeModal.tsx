import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, ExternalLink } from "lucide-react"

interface ResumeModalProps {
  children: React.ReactNode
}

export function ResumeModal({ children }: ResumeModalProps) {
  const resumeUrl = "/resume.pdf"

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-7xl h-[95vh] p-0 flex flex-col gap-0 overflow-hidden bg-background border-border">
        <DialogHeader className="p-6 pb-4 border-b flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <FileText className="w-6 h-6 text-primary" />
            이력서 열람
          </DialogTitle>
          <a 
            href={resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mr-8"
          >
            <ExternalLink className="w-4 h-4" />
            새 창에서 열기
          </a>
        </DialogHeader>
        <div className="flex-1 w-full bg-muted/30 relative">
          <iframe 
            src={resumeUrl} 
            className="w-full h-full border-none"
            title="Resume PDF Viewer"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
