import { useNews } from "../../contexts/NewsContext"
import NewsFilters from "./NewsFilters"
import NewsList from "./NewsList"
import ExportButtons from "../Export/ExportButtons"

const NewsPage = () => {
  const { filteredArticles, loading } = useNews()

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">News Articles</h1>
          <ExportButtons data={filteredArticles} type="news" />
        </div>

        <div className="mt-6">
          <NewsFilters />
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <NewsList articles={filteredArticles} />
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsPage
