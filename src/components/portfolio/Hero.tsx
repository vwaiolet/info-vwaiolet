import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div id="home" className="container mx-auto flex flex-col items-center justify-center gap-6 py-24 md:py-32 max-w-6xl px-4 md:px-8 text-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
          Full Stack Developer
        </Badge>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-8xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        안녕하세요, <br />
        <span className="text-primary">올라운더 개발자</span>입니다.
      </motion.h1>

      <motion.p
        className="max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        프론트엔드부터 백엔드까지, 사용자 경험을 최우선으로 생각하며 탄탄한 비즈니스 로직을 설계합니다.
      </motion.p>

      <motion.div
        className="flex flex-col gap-4 sm:flex-row mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button size="lg" className="px-8 text-lg h-14">내 프로젝트 보기</Button>
        <Button size="lg" variant="outline" className="px-8 text-lg h-14">Resume 다운로드</Button>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
