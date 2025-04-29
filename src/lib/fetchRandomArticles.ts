export interface WikiArticle {
  id: number
  title: string
  thumbnail?: string
}
// types/article.ts
export type Article = {
  pageid: number
  title: string
  thumbnail?: string
}

export async function fetchRandomArticles(count: number): Promise<WikiArticle[]> {
  const endpoint =
    'https://ru.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=random&grnnamespace=0&grnlimit=100&prop=pageimages&piprop=thumbnail&pithumbsize=600'

  const response = await fetch(endpoint)
  const data = await response.json()

  if (!data.query?.pages) {
    return []
  }

  const articles = Object.values(data.query.pages).map((page: any) => ({
    id: page.pageid,
    title: page.title,
    thumbnail: page.thumbnail?.source,
  }))

  return articles
}
