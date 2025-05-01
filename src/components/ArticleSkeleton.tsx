// src/components/ArticleSkeleton.tsx
export default function ArticleSkeleton() {
  return (
    <div className="animate-pulse max-w-3xl mx-auto px-4 py-8">
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-6" />
      <div className="h-64 bg-gray-200 rounded mb-6" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-4/5" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  )
}
