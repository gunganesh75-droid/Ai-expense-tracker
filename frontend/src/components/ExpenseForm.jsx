import { useContext, useState } from "react"
import { FaPlus, FaTag, FaRupeeSign, FaList, FaBolt } from 'react-icons/fa'
import { ExpenseContext } from "../context/ExpenseContext"

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext)

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
              className="input-field pl-12"
              required
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
              className="input-field pl-12"
              required
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
              className="input-field pl-12 appearance-none"
              required
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
            disabled={isSubmitting}
            className={`btn-primary w-full h-[60px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            ) : (
              <>
                <FaPlus />
                <span>Add Record</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm