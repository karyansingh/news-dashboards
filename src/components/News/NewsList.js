const NewsList = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No articles found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {articles.map((article, index) => (
          <li key={index}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{article.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>{article.author || "Unknown Author"}</span>
                    <span className="mx-2">•</span>
                    <span>{article.source.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{article.description}</p>
                </div>
                {article.urlToImage && (
                  <div className="ml-4 flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-lg object-cover"
                      src={article.urlToImage || "/placeholder.svg"}
                      alt=""
                      onError={(e) => {
                        e.target.style.display = "none"
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Read full article →
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewsList
