import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlus, FaTag, FaRupeeSign, FaList, FaBolt, FaLock, FaUserEdit } from 'react-icons/fa'
import { ExpenseContext } from "../context/ExpenseContext"

const ExpenseForm = () => {
  const { addExpense, profile } = useContext(ExpenseContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if profile setup is complete
  const isProfileComplete = profile?.name?.trim() && profile?.role?.trim()
  const isBudgetSet = profile?.monthlyBudget && profile.monthlyBudget > 0
  const isSetupComplete = isProfileComplete && isBudgetSet

  // Determine which specific thing is missing for the message
  const getMissingMsg = () => {
    if (!isProfileComplete && !isBudgetSet) return "your profile details and monthly budget"
    if (!isProfileComplete) return "your name and role in Profile"
    if (!isBudgetSet) return "your monthly budget in Profile"
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSetupComplete) return
    setIsSubmitting(true)

    const newExpense = {
      title,
      amount: amount ? parseFloat(amount) : 0,
      category,
    }

    await addExpense(newExpense)

    setTitle("")
    setAmount("")
    setCategory("")
    setIsSubmitting(false)
  }

  return (
    <div className="premium-card p-6 md:p-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
          <FaBolt />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">
            Quick Add
          </h2>
          <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Track new expense</p>
        </div>
      </div>

      {/* Restriction Banner */}
      {!isSetupComplete && (
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 animate-slide-up">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg shrink-0">
            <FaLock />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-amber-900 font-black text-sm mb-1">Setup Required</p>
            <p className="text-amber-700 text-sm font-medium leading-relaxed">
              Please set up {getMissingMsg()} before adding expenses.
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <FaUserEdit />
            Go to Profile
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Expense Title</label>
          <div className="relative group">
            <FaTag className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="e.g. Starbucks Coffee"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`input-field pl-12 ${!isSetupComplete ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              required
              disabled={!isSetupComplete}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Amount</label>
          <div className="relative group">
            <FaRupeeSign className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`input-field pl-12 ${!isSetupComplete ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              required
              disabled={!isSetupComplete}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
          <div className="relative group">
            <FaList className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`input-field pl-12 appearance-none ${!isSetupComplete ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              required
              disabled={!isSetupComplete}
            >
              <option value="">Select Category</option>
              <option value="Food">🍕 Food</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Bills">💡 Bills</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Health">🏥 Health</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isSubmitting || !isSetupComplete}
            className={`btn-primary w-full h-[60px] ${isSubmitting || !isSetupComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            ) : (
              <>
                {isSetupComplete ? <FaPlus /> : <FaLock />}
                <span>{isSetupComplete ? 'Add Record' : 'Setup Required'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm