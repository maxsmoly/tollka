// src/store/articlesStore.ts
'use client'

import { create } from 'zustand'
import { Article } from '@/types/article'

interface ArticlesStore {
  articles: Article[]
  loadedTitles: Set<string>
  addArticles: (newArticles: Article[]) => void
  clearArticles: () => void
}

export const useArticlesStore = create<ArticlesStore>((set) => ({
  articles: [],
  loadedTitles: new Set(),

  addArticles: (newArticles) => {
    set((state) => {
      const updatedTitles = new Set(state.loadedTitles)
      const trulyNewArticles = newArticles.filter(
        (article) => article.thumbnail?.startsWith('http') && !updatedTitles.has(article.title)
      )
      trulyNewArticles.forEach((article) => updatedTitles.add(article.title))

      return {
        articles: [...state.articles, ...trulyNewArticles],
        loadedTitles: updatedTitles,
      }
    })
  },

  clearArticles: () => set({ articles: [], loadedTitles: new Set() }),
}))
