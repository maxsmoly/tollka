'use client'

import { useEffect, useState, useCallback } from 'react'
import { useArticlesStore } from '@/store/articlesStore'
import { fetchRandomArticles } from '@lib/fetchRandomArticles'
import ArticleCard from '@components/ArticleCard'

const CARDS_PER_LOAD = 20

export default function HomePage() {
  const { articles, addArticles } = useArticlesStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMoreArticles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const newArticles = await fetchRandomArticles(CARDS_PER_LOAD)
      addArticles(newArticles)
    } catch (err) {
      console.error(err)
      setError('Не удалось загрузить статьи. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }, [addArticles])

  useEffect(() => {
    if (articles.length === 0) loadMoreArticles()
  }, [articles.length, loadMoreArticles])

  return (
    <main className="min-h-screen bg-gray-100 py-4 px-2 sm:px-4">
      {error && <div className="text-red-600 text-center font-medium mb-4">{error}</div>}

      <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
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
