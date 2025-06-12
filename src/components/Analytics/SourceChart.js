"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const SourceChart = ({ articles }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Count articles by source
    const sourceCounts = {}
    articles.forEach((article) => {
      const source = article.source.name
      sourceCounts[source] = (sourceCounts[source] || 0) + 1
    })

    // Get top 8 sources
    const sortedSources = Object.entries(sourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FF6384", "#C9CBCF"]

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: sortedSources.map(([source]) => source),
        datasets: [
          {
            data: sortedSources.map(([, count]) => count),
            backgroundColor: colors,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Articles by Source",
          },
          legend: {
            position: "bottom",
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

export default SourceChart
