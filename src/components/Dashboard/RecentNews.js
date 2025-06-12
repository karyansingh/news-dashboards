import { Link } from "react-router-dom"

const RecentNews = ({ articles }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent News</h3>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{article.title}</h4>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <span>{article.author || "Unknown Author"}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{article.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/news" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all news →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecentNews
