import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section id="home" className="container flex flex-col items-start gap-4 py-24 md:py-32 max-w-5xl px-4 md:px-8">
      <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
        Full Stack Developer
      </Badge>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        안녕하세요, <span className="text-primary">올라운더 개발자</span>입니다.
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        프론트엔드부터 백엔드까지, 사용자 경험을 최우선으로 생각하며 탄탄한 비즈니스 로직을 설계합니다.
        문제를 해결하는 과정 자체를 즐기며, 기술로 더 나은 세상을 만드는 데 기여하고 싶습니다.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg" className="px-8">내 프로젝트 보기</Button>
        <Button size="lg" variant="outline" className="px-8">Resume 다운로드</Button>
      </div>
    </section>
  )
}
