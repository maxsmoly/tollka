// 📁 src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useArticlesStore } from '@/store/articlesStore'
import { fetchRandomArticles } from '@/lib/fetchRandomArticles'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/types/article'

const CARDS_PER_LOAD = 20

export default function Home() {
  const { articles, addArticles } = useArticlesStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const saved = sessionStorage.getItem('scrollY')
    if (saved) window.scrollTo(0, parseInt(saved, 10))
    return () => sessionStorage.setItem('scrollY', String(window.scrollY))
  }, [])

  useEffect(() => {
    if (articles.length === 0) loadMoreArticles()
  }, [])

  async function loadMoreArticles() {
    setLoading(true)
    try {
      const newBatch = await fetchRandomArticles(CARDS_PER_LOAD)
      addArticles(newBatch)
    } catch (error) {
      console.error('Ошибка загрузки статей:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div
        className="mx-auto max-w-[1280px] grid gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={loadMoreArticles}
          disabled={loading}
          className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-full transition-all duration-300"
        >
          {loading ? 'Загрузка...' : 'Больше статей'}
        </button>
      </div>
    </main>
  )
}
