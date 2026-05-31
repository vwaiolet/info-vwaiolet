export type BlogPost = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  category: string
  content: string
  readingTime: number
}

const postModules = import.meta.glob<string>("./posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
})

export const blogPosts = Object.entries(postModules)
  .map(([path, rawPost]) => parsePost(path, rawPost))
  .sort((a, b) => b.date.localeCompare(a.date))

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function formatPostDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate)
}

function parsePost(path: string, rawPost: string): BlogPost {
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "post"
  const frontmatterMatch = rawPost.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const frontmatter = frontmatterMatch ? parseFrontmatter(frontmatterMatch[1]) : {}
  const content = frontmatterMatch ? rawPost.slice(frontmatterMatch[0].length).trim() : rawPost.trim()

  return {
    slug,
    title: readString(frontmatter.title, toTitle(slug)),
    date: readString(frontmatter.date, "Undated"),
    summary: readString(frontmatter.summary, "학습 내용을 정리한 기록입니다."),
    tags: readList(frontmatter.tags),
    category: readString(frontmatter.category, "Study"),
    content,
    readingTime: estimateReadingTime(content),
  }
}

function parseFrontmatter(frontmatter: string) {
  return frontmatter.split(/\r?\n/).reduce<Record<string, string>>((data, line) => {
    const separatorIndex = line.indexOf(":")

    if (separatorIndex === -1) {
      return data
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (key) {
      data[key] = trimQuotes(value)
    }

    return data
  }, {})
}

function readString(value: string | undefined, fallback: string) {
  return value && value.length > 0 ? value : fallback
}

function readList(value: string | undefined) {
  if (!value) {
    return []
  }

  const normalizedValue = trimQuotes(value)

  if (normalizedValue.startsWith("[") && normalizedValue.endsWith("]")) {
    return normalizedValue
      .slice(1, -1)
      .split(",")
      .map((item) => trimQuotes(item.trim()))
      .filter(Boolean)
  }

  return normalizedValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function trimQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "")
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
