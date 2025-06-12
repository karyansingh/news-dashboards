import { useNews } from "../../contexts/NewsContext"
import AuthorChart from "./AuthorChart"
import SourceChart from "./SourceChart"
import TimelineChart from "./TimelineChart"

const AnalyticsPage = () => {
  const { filteredArticles, loading } = useNews()

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
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AuthorChart articles={filteredArticles} />
          <SourceChart articles={filteredArticles} />
        </div>

        <div className="mt-8">
          <TimelineChart articles={filteredArticles} />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
