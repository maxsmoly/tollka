// ✅ src/components/ArticleClient.tsx
'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function ArticleClient({
  title,
  thumbnail,
  html,
}: {
  title: string
  thumbnail?: string
  html: string
}) {
  const router = useRouter()

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {thumbnail && (
        <div className="mb-6">
          <Image
            src={thumbnail}
            alt={title}
            width={600}
            height={400}
            style={{ height: 'auto' }}
            className="rounded-xl mx-auto"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>

      <article
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-10 text-center">
        <button
          onClick={() => {
            if (window.history.length > 2) router.back()
            else router.push('/')
          }}
          className="inline-block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-full transition-all duration-300"
        >
          Назад на главную
        </button>
      </div>
    </main>
  )
}
