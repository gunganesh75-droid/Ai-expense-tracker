import { FaTrash, FaCalendar, FaRupeeSign, FaHistory } from 'react-icons/fa'
import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

const ExpenseTable = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext)

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food': return 'bg-orange-100 text-orange-700'
      case 'Travel': return 'bg-blue-100 text-blue-700'
      case 'Shopping': return 'bg-purple-100 text-purple-700'
      case 'Bills': return 'bg-rose-100 text-rose-700'
      case 'Entertainment': return 'bg-indigo-100 text-indigo-700'
      case 'Health': return 'bg-emerald-100 text-emerald-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="premium-card overflow-hidden">
      <div className="p-4 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FaHistory />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Transaction History
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {expenses.length} Records Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-4 sm:px-8 py-3 sm:py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Transaction</th>
              <th className="px-4 sm:px-8 py-3 sm:py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
              <th className="px-4 sm:px-8 py-3 sm:py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
              <th className="px-4 sm:px-8 py-3 sm:py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
              <th className="px-4 sm:px-8 py-3 sm:py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {expenses.length > 0 ? (
              expenses.slice().reverse().map((expense) => {
                const amountValue = typeof expense.amount === "number"
                  ? expense.amount
                  : Number(String(expense.amount).replace(/[^0-9.-]+/g, ""))

                const createdAt = expense.createdAt || expense.date
                const displayDate = createdAt
                  ? new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                  : "-"

                return (
                  <tr
                    key={expense._id || expense.id}
                    className="group hover:bg-slate-50/50 transition-colors duration-200"
                  >
                    <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                      <span className="text-slate-900 font-bold group-hover:text-indigo-600 transition-colors">
                        {expense.title}
                      </span>
                    </td>

                    <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-900 font-black">
                        <FaRupeeSign className="text-[10px] text-slate-400" />
                        {amountValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </td>

                    <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </td>

                    <td className="px-4 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                        <FaCalendar className="text-slate-300" />
                        {displayDate}
                      </div>
                    </td>

                    <td className="px-4 sm:px-8 py-4 sm:py-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => deleteExpense(expense._id || expense.id)}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 flex items-center justify-center ml-auto group/btn"
                      >
                        <FaTrash className="text-sm group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <div className="max-w-xs mx-auto">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 text-slate-400">
                      📂
                    </div>
                    <p className="text-slate-900 font-bold mb-1">No records found</p>
                    <p className="text-slate-400 text-sm font-medium">Start by adding your first expense above to track your spending.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseTable