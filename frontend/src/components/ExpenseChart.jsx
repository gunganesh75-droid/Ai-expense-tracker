import { useContext, useState, useEffect } from "react"
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { FaChartPie } from 'react-icons/fa'
import { ExpenseContext } from "../context/ExpenseContext"

const ExpenseChart = () => {
  const { expenses } = useContext(ExpenseContext)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#9B5DE5', '#00BFA6']

  const categoryTotals = expenses.reduce((totals, expense) => {
    const value = typeof expense.amount === "number"
      ? expense.amount
      : Number(String(expense.amount).replace(/[^0-9.-]+/g, ""))

    if (!Number.isFinite(value) || value <= 0) {
      return totals
    }

    const category = expense.category || "Other"
    totals[category] = (totals[category] || 0) + value
    return totals
  }, {})

  const displayData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  const fallbackData = [
    { name: "Food", value: 1 },
    { name: "Travel", value: 1 },
    { name: "Shopping", value: 1 },
    { name: "Bills", value: 1 },
  ]

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg mt-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <FaChartPie className="text-purple-500 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-900">
          Expense Analytics
        </h2>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart margin={{ top: 10, right: isMobile ? 30 : 60, bottom: 10, left: isMobile ? 30 : 60 }}>
            <Pie
              data={displayData.length > 0 ? displayData : fallbackData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 45 : 70}
              outerRadius={isMobile ? 70 : 110}
              paddingAngle={2}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {(displayData.length > 0 ? displayData : fallbackData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₹${value}`, 'Amount']}
              contentStyle={{
                backgroundColor: '#f8f9fa',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
        {(displayData.length > 0 ? displayData : fallbackData).map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-xs sm:text-sm text-gray-600 font-bold">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseChart