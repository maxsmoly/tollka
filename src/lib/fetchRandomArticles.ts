import { Article } from '@/types/article'

export async function fetchRandomArticles(count: number): Promise<Article[]> {
  const articles: Article[] = []
  const loadedIds = new Set<number>()

  while (articles.length < count) {
    const remaining = count - articles.length
    const batchSize = Math.min(remaining * 2, 50) // подстраховка + лимит API
    const endpoint = `https://ru.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnlimit=${batchSize}&prop=pageimages&piprop=thumbnail&pithumbsize=300&origin=*`

    const res = await fetch(endpoint)
    if (!res.ok) throw new Error('Failed to fetch articles')

    const data = await res.json()
    const pages = data.query?.pages ?? {}

    for (const page of Object.values(pages) as any[]) {
      if (page.pageid && !loadedIds.has(page.pageid) && page.thumbnail?.source) {
        articles.push({
          id: page.pageid,
          title: page.title,
          thumbnail: page.thumbnail.source,
        })
        loadedIds.add(page.pageid)
        if (articles.length === count) break
      }
    }

    // если API отдает слишком мало — выходим из бесконечного цикла
    if (Object.keys(pages).length < batchSize) break
  }

  return articles
}
