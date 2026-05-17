import { useContext } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import StatCard from "../components/StatCard"
import ExpenseChart from "../components/ExpenseChart"
import { ExpenseContext } from "../context/ExpenseContext"

const Dashboard = () => {
  const { expenses, profile, loading, error } = useContext(ExpenseContext)

  const totalExpenses = expenses.reduce((sum, expense) => {
    const value = typeof expense.amount === "number"
      ? expense.amount
      : Number(String(expense.amount).replace(/[^0-9.-]+/g, ""))

    return sum + (Number.isFinite(value) ? value : 0)
  }, 0)

  const budget = profile?.monthlyBudget || 0
  const remainingBalance = Math.max(0, budget - totalExpenses)
  const totalSavings = remainingBalance

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="premium-card p-12 max-w-md bg-rose-50 border-rose-100">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
              ⚠️
            </div>
            <h3 className="text-2xl font-black text-rose-900 mb-2">Sync Error</h3>
            <p className="text-rose-700/70 font-medium mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary bg-rose-600 hover:bg-rose-700 shadow-rose-200"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="animate-slide-up stagger-1">
          <StatCard
            title="Total Expenses"
            amount={`₹${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            trend={-2.5}
          />
        </div>

        <div className="animate-slide-up stagger-2">
          <StatCard
            title="Total Savings"
            amount={`₹${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            trend={12.4}
          />
        </div>

        <div className="animate-slide-up stagger-3">
          <StatCard
            title="Monthly Budget"
            amount={`₹${budget.toLocaleString()}`}
          />
        </div>

        <div className="animate-slide-up stagger-4">
          <StatCard
            title="Remaining Balance"
            amount={`₹${remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            trend={-0.8}
          />
        </div>
      </div>

      <div className="animate-slide-up stagger-4 mt-12">
        <ExpenseChart />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard