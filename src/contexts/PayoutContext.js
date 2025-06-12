"use client"

import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

const PayoutContext = createContext()

export const usePayout = () => {
  const context = useContext(PayoutContext)
  if (!context) {
    throw new Error("usePayout must be used within a PayoutProvider")
  }
  return context
}

export const PayoutProvider = ({ children }) => {
  const [payoutRates, setPayoutRates] = useState({})
  const [defaultRate, setDefaultRate] = useState(10) // Default $10 per article

  useEffect(() => {
    const savedRates = localStorage.getItem("payoutRates")
    const savedDefaultRate = localStorage.getItem("defaultPayoutRate")

    if (savedRates) {
      setPayoutRates(JSON.parse(savedRates))
    }

    if (savedDefaultRate) {
      setDefaultRate(Number.parseFloat(savedDefaultRate))
    }
  }, [])

  const updatePayoutRate = (author, rate) => {
    const newRates = { ...payoutRates, [author]: Number.parseFloat(rate) }
    setPayoutRates(newRates)
    localStorage.setItem("payoutRates", JSON.stringify(newRates))
    toast.success(`Payout rate updated for ${author}`)
  }

  const updateDefaultRate = (rate) => {
    setDefaultRate(Number.parseFloat(rate))
    localStorage.setItem("defaultPayoutRate", rate.toString())
    toast.success("Default payout rate updated")
  }

  const getPayoutRate = (author) => {
    return payoutRates[author] || defaultRate
  }

  const calculateTotalPayout = (articles) => {
    const authorCounts = {}

    articles.forEach((article) => {
      const author = article.author || "Unknown"
      authorCounts[author] = (authorCounts[author] || 0) + 1
    })

    let total = 0
    const breakdown = Object.entries(authorCounts).map(([author, count]) => {
      const rate = getPayoutRate(author)
      const authorTotal = count * rate
      total += authorTotal

      return {
        author,
        articleCount: count,
        rate,
        total: authorTotal,
      }
    })

    return { total, breakdown }
  }

  const value = {
    payoutRates,
    defaultRate,
    updatePayoutRate,
    updateDefaultRate,
    getPayoutRate,
    calculateTotalPayout,
  }

  return <PayoutContext.Provider value={value}>{children}</PayoutContext.Provider>
}
