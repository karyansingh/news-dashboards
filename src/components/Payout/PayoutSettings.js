"use client"

import { useState } from "react"
import { usePayout } from "../../contexts/PayoutContext"

const PayoutSettings = () => {
  const { defaultRate, updateDefaultRate } = usePayout()
  const [newDefaultRate, setNewDefaultRate] = useState(defaultRate)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateDefaultRate(newDefaultRate)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Payout Settings</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Default Rate per Article ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newDefaultRate}
            onChange={(e) => setNewDefaultRate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Default Rate
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-900">Instructions</h4>
        <ul className="mt-2 text-sm text-gray-600 space-y-1">
          <li>• Set individual rates for authors in the table</li>
          <li>• Default rate applies to new authors</li>
          <li>• Rates are saved automatically</li>
        </ul>
      </div>
    </div>
  )
}

export default PayoutSettings
