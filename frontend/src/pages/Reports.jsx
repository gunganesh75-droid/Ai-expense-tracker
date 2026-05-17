import { useContext } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import { ExpenseContext } from "../context/ExpenseContext"
import { FaFileAlt } from 'react-icons/fa'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const Reports = () => {
  const { expenses, profile, loading, error } = useContext(ExpenseContext)

  const totalExpenses = expenses.reduce((sum, expense) => {
    const value = typeof expense.amount === "number"
      ? expense.amount
      : Number(String(expense.amount).replace(/[^0-9.-]+/g, ""))

    return sum + (Number.isFinite(value) ? value : 0)
  }, 0)

  const budget = profile?.monthlyBudget || 0
  const savings = Math.max(0, budget - totalExpenses)
  const usage = totalExpenses ? Math.min(100, (totalExpenses / budget) * 100) : 0

  const handleDownload = () => {
    console.log('Download started...')
    try {
      const doc = new jsPDF()
      console.log('jsPDF instance created')
      
      // Add title
      doc.setFontSize(22)
      doc.text('Monthly Financial Report', 14, 20)
      
      // Add profile info
      doc.setFontSize(12)
      doc.text(`User: ${profile?.name || 'User'}`, 14, 30)
      doc.text(`Role: ${profile?.role || 'Member'}`, 14, 36)
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 42)
      
      // Add summary
      doc.text('Summary:', 14, 55)
      doc.text(`Total Monthly Budget: INR ${budget.toLocaleString()}`, 14, 62)
      doc.text(`Total Expenses: INR ${totalExpenses.toLocaleString()}`, 14, 68)
      doc.text(`Total Savings: INR ${savings.toLocaleString()}`, 14, 74)
      doc.text(`Budget Usage: ${usage.toFixed(1)}%`, 14, 80)
      
      // Add transactions table
      const tableData = expenses.map(exp => [
        exp.title,
        `INR ${Number(exp.amount).toFixed(2)}`,
        exp.category,
        exp.createdAt ? new Date(exp.createdAt).toLocaleDateString() : '-'
      ])
      
      console.log('Table data prepared')
      
      autoTable(doc, {
        startY: 90,
        head: [['Description', 'Amount', 'Category', 'Date']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229] }
      })
      
      console.log('AutoTable generated')
      
      doc.save(`Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`)
      console.log('Download complete')
    } catch (err) {
      console.error('PDF Generation Error:', err)
      alert('Failed to generate PDF: ' + err.message)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="premium-card p-12 max-w-md bg-rose-50 border-rose-100">
            <h3 className="text-2xl font-black text-rose-900 mb-2">Sync Error</h3>
            <p className="text-rose-700/70 font-medium">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">Financial Reports</h1>
        <p className="text-slate-500 font-medium text-sm sm:text-base">Download and analyze your detailed monthly financial statements.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
        <div className="premium-card p-6 sm:p-8 group">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-600 transition-colors">Monthly Expenses</h2>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="premium-card p-6 sm:p-8 group">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-600 transition-colors">Savings</h2>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600">₹{savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="premium-card p-6 sm:p-8 group">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-indigo-600 transition-colors">Budget Usage</h2>
          <div className="flex items-center sm:items-end gap-2 flex-wrap sm:flex-nowrap">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{usage.toFixed(0)}%</p>
            <div className="flex-1 h-2 bg-slate-100 rounded-full mb-1 sm:mb-2 overflow-hidden min-w-[50px]">
              <div 
                className={`h-full transition-all duration-1000 ${usage > 90 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                style={{ width: `${usage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="premium-card p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 -z-10" />
        
        <h2 className="text-2xl font-black text-slate-900 mb-4">Monthly Performance Summary</h2>
        <p className="text-slate-600 font-medium leading-relaxed max-w-3xl mb-10">
          {totalExpenses > 0
            ? `Your financial health is looking ${usage > 90 ? 'critical' : 'stable'}. You've utilized ${usage.toFixed(1)}% of your monthly budget of ₹${budget.toLocaleString()}. By maintaining this trend, you could save approximately ₹${(savings * 1.2).toFixed(0)} by next quarter.`
            : "No expenses recorded yet. Start tracking to see your personalized financial performance summary."}
        </p>

        <button 
          onClick={handleDownload}
          className="btn-primary"
        >
          <FaFileAlt />
          Download PDF Report
        </button>
      </div>
    </DashboardLayout>
  )
}

export default Reports