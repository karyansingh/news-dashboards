"use client"
import { exportToPDF, exportToCSV } from "../../utils/exportUtils"
import toast from "react-hot-toast"

const ExportButtons = ({ data, type }) => {
  const handlePDFExport = () => {
    try {
      exportToPDF(data, type)
      toast.success("PDF exported successfully!")
    } catch (error) {
      toast.error("Failed to export PDF")
    }
  }

  const handleCSVExport = () => {
    try {
      exportToCSV(data, type)
      toast.success("CSV exported successfully!")
    } catch (error) {
      toast.error("Failed to export CSV")
    }
  }

  const handleGoogleSheetsExport = () => {
    // This would integrate with Google Sheets API
    toast.info("Google Sheets integration would be implemented here")
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={handlePDFExport}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Export PDF
      </button>
      <button
        onClick={handleCSVExport}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Export CSV
      </button>
      <button
        onClick={handleGoogleSheetsExport}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Google Sheets
      </button>
    </div>
  )
}

export default ExportButtons
