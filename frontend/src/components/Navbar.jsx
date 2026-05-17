import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaBars } from 'react-icons/fa'
import { ExpenseContext } from '../context/ExpenseContext'

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const { expenses, profile } = useContext(ExpenseContext)

  const totalExpenses = expenses.reduce((sum, exp) => {
    const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0
    return sum + amount
  }, 0)

  return (
    <div className="w-full flex flex-col gap-5 px-1">
      {/* Top Utility Header Row */}
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Hamburger & Mobile Logo */}
        <div className="flex items-center gap-2">
          <button 
            className="lg:hidden text-slate-800 hover:text-indigo-600 transition-colors p-2 -ml-2 rounded-xl active:bg-slate-100"
            onClick={toggleSidebar}
          >
            <FaBars className="text-xl" />
          </button>
          
          <div className="lg:hidden flex items-center">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
              Expense<span className="text-indigo-600">AI</span>
            </span>
          </div>
        </div>

        {/* Right Side: Total Spend & Profile Avatar */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-0.5">Total Spending</span>
            <span className="text-lg font-black text-indigo-600">₹{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 p-1 pr-3 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-100 hover:bg-indigo-50/20 active:scale-95 transition-all duration-300 shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <FaUserCircle className="text-base" />
            </div>
            <span className="text-xs font-black text-slate-700 group-hover:text-indigo-600 transition-colors">
              {profile?.role || 'Member'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Welcome Headline */}
      <div className="w-full border-t border-slate-100/50 pt-3 lg:border-none lg:pt-0">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1 sm:mb-2">
          {profile?.name ? `Hello, ${profile.name.split(' ')[0]} 👋` : 'Hello 👋'}
        </h1>
        <p className="text-slate-500 font-medium text-xs sm:text-base leading-none">
          Here's what's happening with your money today.
        </p>
      </div>
    </div>
  )
}

export default Navbar
