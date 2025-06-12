"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const TimelineChart = ({ articles }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Group articles by date
    const dateCounts = {}
    articles.forEach((article) => {
      const date = new Date(article.publishedAt).toDateString()
      dateCounts[date] = (dateCounts[date] || 0) + 1
    })

    // Sort dates and get last 30 days
    const sortedDates = Object.entries(dateCounts)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-30)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: sortedDates.map(([date]) => new Date(date).toLocaleDateString()),
        datasets: [
          {
            label: "Articles Published",
            data: sortedDates.map(([, count]) => count),
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Articles Timeline (Last 30 Days)",
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

export default TimelineChart
