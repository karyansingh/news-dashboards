"use client"

import { useState } from "react"
import { usePayout } from "../../contexts/PayoutContext"

const PayoutTable = ({ payoutData }) => {
  const { updatePayoutRate, getPayoutRate } = usePayout()
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [editRate, setEditRate] = useState("")

  const handleEditStart = (author) => {
    setEditingAuthor(author)
    setEditRate(getPayoutRate(author).toString())
  }

  const handleEditSave = () => {
    if (editingAuthor && editRate) {
      updatePayoutRate(editingAuthor, editRate)
      setEditingAuthor(null)
      setEditRate("")
    }
  }

  const handleEditCancel = () => {
    setEditingAuthor(null)
    setEditRate("")
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Author Payouts</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">${payoutData.total.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Total Payouts</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Articles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate ($)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total ($)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payoutData.breakdown.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.articleCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingAuthor === item.author ? (
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        value={editRate}
                        onChange={(e) => setEditRate(e.target.value)}
                      />
                    ) : (
                      `$${item.rate.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${item.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingAuthor === item.author ? (
                      <div className="flex space-x-2">
                        <button onClick={handleEditSave} className="text-green-600 hover:text-green-900">
                          Save
                        </button>
                        <button onClick={handleEditCancel} className="text-red-600 hover:text-red-900">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditStart(item.author)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PayoutTable
