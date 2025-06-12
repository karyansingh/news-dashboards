import jsPDF from "jspdf"
import "jspdf-autotable"

export const exportToPDF = (data, type) => {
  const doc = new jsPDF()

  if (type === "news") {
    doc.setFontSize(20)
    doc.text("News Articles Report", 20, 20)

    const tableData = data.map((article) => [
      article.title.substring(0, 50) + "...",
      article.author || "Unknown",
      article.source.name,
      new Date(article.publishedAt).toLocaleDateString(),
    ])

    doc.autoTable({
      head: [["Title", "Author", "Source", "Date"]],
      body: tableData,
      startY: 30,
      styles: { fontSize: 8 },
      columnStyles: { 0: { cellWidth: 80 } },
    })
  } else if (type === "payouts") {
    doc.setFontSize(20)
    doc.text("Payout Report", 20, 20)

    const tableData = data.map((item) => [
      item.author,
      item.articleCount.toString(),
      `$${item.rate.toFixed(2)}`,
      `$${item.total.toFixed(2)}`,
    ])

    doc.autoTable({
      head: [["Author", "Articles", "Rate", "Total"]],
      body: tableData,
      startY: 30,
    })

    const total = data.reduce((sum, item) => sum + item.total, 0)
    doc.text(`Total Payouts: $${total.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 20)
  }

  doc.save(`${type}-report-${new Date().toISOString().split("T")[0]}.pdf`)
}

export const exportToCSV = (data, type) => {
  let csvContent = ""

  if (type === "news") {
    csvContent = "Title,Author,Source,Date,Description\n"
    data.forEach((article) => {
      const row = [
        `"${article.title.replace(/"/g, '""')}"`,
        `"${article.author || "Unknown"}"`,
        `"${article.source.name}"`,
        new Date(article.publishedAt).toLocaleDateString(),
        `"${(article.description || "").replace(/"/g, '""')}"`,
      ].join(",")
      csvContent += row + "\n"
    })
  } else if (type === "payouts") {
    csvContent = "Author,Articles,Rate,Total\n"
    data.forEach((item) => {
      const row = [`"${item.author}"`, item.articleCount, item.rate.toFixed(2), item.total.toFixed(2)].join(",")
      csvContent += row + "\n"
    })
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${type}-report-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
