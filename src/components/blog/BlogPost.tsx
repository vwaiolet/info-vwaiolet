import { Badge } from "@/components/ui/badge"
import { blogPosts, formatPostDate, getBlogPost } from "@/content/blog"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

type BlogPostProps = {
  slug: string
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mt-12 scroll-m-24 text-3xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 scroll-m-24 text-2xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 scroll-m-24 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 leading-8 text-slate-300">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-8 marker:text-primary">
      {children}
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="font-semibold text-primary underline-offset-4 hover:underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-primary/50 pl-5 text-slate-300">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-lg border border-primary/10 bg-black/50 p-4 text-sm leading-7 text-slate-200">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isCodeBlock = className?.startsWith("language-")

    if (isCodeBlock) {
      return <code className={className}>{children}</code>
    }

    return (
      <code className="rounded-md border border-primary/10 bg-primary/10 px-1.5 py-0.5 text-[0.9em] text-primary">
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-primary/10 bg-black/20">
      <table className="w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-primary/20 bg-primary/5">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-primary/10">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-primary/5 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-slate-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-slate-300">
      {children}
    </td>
  ),
}

export default function BlogPost({ slug }: BlogPostProps) {
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <main className="container mx-auto max-w-3xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
        <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Blog
        </a>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">글을 찾을 수 없습니다.</h1>
        <p className="mt-5 leading-relaxed text-slate-300">
          요청한 글이 없거나 주소가 바뀌었습니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {blogPosts.map((blogPost) => (
            <a key={blogPost.slug} href={`/blog/${blogPost.slug}`} className="rounded-md border border-primary/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              {blogPost.title}
            </a>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
      <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Blog
      </a>

      <article>
        <header className="border-b border-primary/10 pb-10">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {post.category}
            </Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="border border-white/5 bg-secondary/80 px-2 py-1 text-[11px] font-medium text-slate-400">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
            {post.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formatPostDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        <div className="pt-10">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  )
}
