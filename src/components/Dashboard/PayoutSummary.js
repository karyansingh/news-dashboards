import { Link } from "react-router-dom"

const PayoutSummary = ({ payoutData }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payout Summary</h3>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-green-600">${payoutData.total.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Payouts</div>
        </div>
        <div className="space-y-2">
          {payoutData.breakdown.slice(0, 5).map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{item.author}</span>
              <span className="font-medium">${item.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/payouts" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View detailed payouts →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PayoutSummary
