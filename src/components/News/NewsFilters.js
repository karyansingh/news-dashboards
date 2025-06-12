"use client"
import { useNews } from "../../contexts/NewsContext"

const NewsFilters = () => {
  const { filters, setFilters, refreshNews } = useNews()

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      author: "",
      dateFrom: "",
      dateTo: "",
      source: "",
    })
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search articles..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Filter by author..."
            value={filters.author}
            onChange={(e) => handleFilterChange("author", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Filter by source..."
            value={filters.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">From Date</label>
          <input
            type="date"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To Date</label>
          <input
            type="date"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
          />
        </div>

        <div className="flex items-end space-x-2">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear Filters
          </button>
          <button
            onClick={refreshNews}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsFilters
