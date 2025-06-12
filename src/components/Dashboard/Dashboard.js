"use client"
import { useNews } from "../../contexts/NewsContext"
import { usePayout } from "../../contexts/PayoutContext"
import { useAuth } from "../../contexts/AuthContext"
import StatsCard from "./StatsCard"
import RecentNews from "./RecentNews"
import PayoutSummary from "./PayoutSummary"

const Dashboard = () => {
  const { filteredArticles, loading } = useNews()
  const { calculateTotalPayout } = usePayout()
  const { isAdmin } = useAuth()

  const stats = {
    totalArticles: filteredArticles.length,
    uniqueAuthors: [...new Set(filteredArticles.map((a) => a.author).filter(Boolean))].length,
    uniqueSources: [...new Set(filteredArticles.map((a) => a.source.name))].length,
    todayArticles: filteredArticles.filter((a) => {
      const today = new Date()
      const articleDate = new Date(a.publishedAt)
      return articleDate.toDateString() === today.toDateString()
    }).length,
  }

  const payoutData = calculateTotalPayout(filteredArticles)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Articles" value={stats.totalArticles} icon="📰" color="bg-blue-500" />
            <StatsCard title="Unique Authors" value={stats.uniqueAuthors} icon="✍️" color="bg-green-500" />
            <StatsCard title="News Sources" value={stats.uniqueSources} icon="🏢" color="bg-yellow-500" />
            <StatsCard title="Today's Articles" value={stats.todayArticles} icon="📅" color="bg-purple-500" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RecentNews articles={filteredArticles.slice(0, 5)} />
          {isAdmin && <PayoutSummary payoutData={payoutData} />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
