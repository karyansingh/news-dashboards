"use client"

import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

const NewsContext = createContext()

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    author: "",
    dateFrom: "",
    dateTo: "",
    source: "",
  })

  const API_KEY = "your-news-api-key" // Replace with your News API key
  const BASE_URL = "https://newsapi.org/v2"

  const fetchNews = async (query = "technology", pageSize = 50) => {
    setLoading(true)
    try {
      // Using a mock API since News API requires a key and has CORS issues in development
      const mockArticles = generateMockArticles()
      setArticles(mockArticles)

      // Uncomment below for real API usage:
      /*
      const response = await fetch(
        `${BASE_URL}/everything?q=${query}&pageSize=${pageSize}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setArticles(data.articles || []);
      */
    } catch (error) {
      console.error("Error fetching news:", error)
      toast.error("Failed to fetch news. Using mock data.")
      // Fallback to mock data
      const mockArticles = generateMockArticles()
      setArticles(mockArticles)
    } finally {
      setLoading(false)
    }
  }

  const generateMockArticles = () => {
    const authors = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"]
    const sources = ["TechCrunch", "BBC News", "CNN", "Reuters", "The Guardian"]
    const categories = ["Technology", "Business", "Science", "Health", "Sports"]

    return Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      title: `Breaking News Article ${index + 1}: Important Update on Current Events`,
      description: `This is a detailed description of article ${index + 1} covering important topics and current events that matter to our readers.`,
      content: `Full content of article ${index + 1}. This would contain the complete article text in a real application.`,
      author: authors[Math.floor(Math.random() * authors.length)],
      source: { name: sources[Math.floor(Math.random() * sources.length)] },
      publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      url: `https://example.com/article-${index + 1}`,
      urlToImage: `https://picsum.photos/400/200?random=${index + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
    }))
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !filters.search ||
      article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      article.description?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesAuthor = !filters.author || article.author?.toLowerCase().includes(filters.author.toLowerCase())

    const matchesSource = !filters.source || article.source.name.toLowerCase().includes(filters.source.toLowerCase())

    const articleDate = new Date(article.publishedAt)
    const matchesDateFrom = !filters.dateFrom || articleDate >= new Date(filters.dateFrom)

    const matchesDateTo = !filters.dateTo || articleDate <= new Date(filters.dateTo)

    return matchesSearch && matchesAuthor && matchesSource && matchesDateFrom && matchesDateTo
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const value = {
    articles,
    filteredArticles,
    loading,
    filters,
    setFilters,
    fetchNews,
    refreshNews: () => fetchNews(),
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}
