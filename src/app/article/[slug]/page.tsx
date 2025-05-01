import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticleClient from '@/components/ArticleClient'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  return {
    title: decodeURIComponent(slug),
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  if (!slug) notFound()

  const decodedSlug = decodeURIComponent(slug)

  const summaryRes = await fetch(`https://ru.wikipedia.org/api/rest_v1/page/summary/${decodedSlug}`)
  if (!summaryRes.ok) notFound()
  const summaryData = await summaryRes.json()

  const htmlRes = await fetch(`https://ru.wikipedia.org/api/rest_v1/page/html/${decodedSlug}`)
  if (!htmlRes.ok) notFound()
  let articleHtml = await htmlRes.text()

  articleHtml = articleHtml
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<link[\s\S]*?>/gi, '')
    .replace(/<meta[\s\S]*?>/gi, '')
    .replace(/<base[\s\S]*?>/gi, '')
    .replace(/<\/?(html|head|body)[^>]*>/gi, '')
    .replace(
      /href="\/wiki\/(.*?)"/g,
      (_, slug) => `href="/article/${encodeURIComponent(decodeURIComponent(slug))}"`
    )

  return (
    <ArticleClient
      title={summaryData.title}
      thumbnail={summaryData.thumbnail?.source || null}
      html={articleHtml}
    />
  )
}
