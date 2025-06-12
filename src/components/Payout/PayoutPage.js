import { useNews } from "../../contexts/NewsContext"
import { usePayout } from "../../contexts/PayoutContext"
import PayoutSettings from "./PayoutSettings"
import PayoutTable from "./PayoutTable"
import ExportButtons from "../Export/ExportButtons"

const PayoutPage = () => {
  const { filteredArticles } = useNews()
  const { calculateTotalPayout } = usePayout()

  const payoutData = calculateTotalPayout(filteredArticles)

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Payout Management</h1>
          <ExportButtons data={payoutData.breakdown} type="payouts" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <PayoutSettings />
          </div>
          <div className="lg:col-span-2">
            <PayoutTable payoutData={payoutData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayoutPage
