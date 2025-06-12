"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const AuthorChart = ({ articles }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Count articles by author
    const authorCounts = {}
    articles.forEach((article) => {
      const author = article.author || "Unknown"
      authorCounts[author] = (authorCounts[author] || 0) + 1
    })

    // Get top 10 authors
    const sortedAuthors = Object.entries(authorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedAuthors.map(([author]) => author),
        datasets: [
          {
            label: "Articles",
            data: sortedAuthors.map(([, count]) => count),
            backgroundColor: "rgba(59, 130, 246, 0.5)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Articles by Author (Top 10)",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [articles])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div style={{ height: "400px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

export default AuthorChart
