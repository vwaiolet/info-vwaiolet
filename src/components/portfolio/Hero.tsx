import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Eye } from "lucide-react"
import { ResumeModal } from "./ResumeModal"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div id="home" className="container mx-auto flex flex-col items-center justify-center gap-6 py-24 md:py-32 max-w-6xl px-4 md:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
          AI BACKEND & SERVING ENGINEER
        </Badge>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-8xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        안녕하세요, <br />
        <span className="text-primary">모델의 가치를 서비스로 연결하는 엔지니어</span>입니다.
      </motion.h1>

      <motion.p
        className="max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        단순히 "돌아가는 기능"을 넘어 "왜 이 아키텍처여야 하는가?"를 끊임없이 고민합니다. 클라우드부터 K3s 기반 엣지 디바이스까지, 비즈니스 효율성을 고려한 최적의 AI 서빙 환경을 구축합니다.
      </motion.p>

      <motion.div
        className="flex flex-col gap-4 sm:flex-row mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button asChild size="lg" className="px-8 text-lg h-14">
          <a href="#projects">
            내 프로젝트 보기
            <ArrowDown className="w-5 h-5" />
          </a>
        </Button>
        <ResumeModal>
          <Button size="lg" variant="outline" className="px-8 text-lg h-14">
            이력서 열람
            <Eye className="w-5 h-5" />
          </Button>
        </ResumeModal>
      </motion.div>
    </div>
  )
}
