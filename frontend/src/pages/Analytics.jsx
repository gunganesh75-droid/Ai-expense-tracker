import { useContext } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import ExpenseChart from "../components/ExpenseChart"
import { ExpenseContext } from "../context/ExpenseContext"

const Analytics = () => {
  const { expenses } = useContext(ExpenseContext)

  const categoryTotals = expenses.reduce((totals, expense) => {
    const amount = typeof expense.amount === "number"
      ? expense.amount
      : Number(String(expense.amount).replace(/[^0-9.-]+/g, ""))

    const key = expense.category || "Other"
    totals[key] = (totals[key] || 0) + (Number.isFinite(amount) ? amount : 0)
    return totals
  }, {})

  const totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0)
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-"
  const highestSpending = topCategory === "-" ? "-" : `₹${categoryTotals[topCategory].toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">Spend Analytics</h1>
        <p className="text-slate-500 font-medium text-sm sm:text-base">Deep dive into your spending patterns and category distribution.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
        <div className="premium-card p-6 sm:p-8 group">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-600 transition-colors">Highest Spending</h2>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{highestSpending}</p>
        </div>

        <div className="premium-card p-6 sm:p-8 group">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-600 transition-colors">Monthly Spending</h2>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="premium-card p-6 sm:p-8 group">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-600 transition-colors">Top Category</h2>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{topCategory}</p>
        </div>
      </div>

      <div className="animate-slide-up stagger-2">
        <ExpenseChart />
      </div>
    </DashboardLayout>
  )
}

export default Analytics