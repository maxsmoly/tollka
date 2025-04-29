// src/components/ArticleCard.tsx

'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const router = useRouter()

  const handleClick = () => {
    const encodedTitle = encodeURIComponent(article.title)
    router.push(`/article/${encodedTitle}`)
  }

  return (
    <div
      onClick={handleClick}
      className="aspect-[4/3] rounded-xl shadow-md overflow-hidden bg-gray-100 group cursor-pointer animate-fadeIn"
    >
      <Image
        src={article.thumbnail!}
        alt={article.title}
        width={400}
        height={300}
        className="w-full h-full object-cover group-hover:object-contain group-hover:scale-95 transition-all duration-700 ease-in-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
