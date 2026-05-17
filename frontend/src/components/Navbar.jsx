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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-2">
      <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
        <button 
          className="lg:hidden text-slate-800 hover:text-indigo-600 transition-colors p-2"
          onClick={toggleSidebar}
        >
          <FaBars className="text-2xl" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1 sm:mb-2">
            {profile?.name ? `Hello, ${profile.name.split(' ')[0]} 👋` : 'Welcome Back 👋'}
          </h1>
          <p className="text-slate-500 font-medium text-sm sm:text-lg">
            Here's what's happening with your money today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Total Spending</span>
          <span className="text-2xl font-black text-indigo-600">₹{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>

        <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl bg-white border border-slate-200 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <FaUserCircle className="text-xl" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 leading-none">Account</p>
              <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-none">
                {profile?.role || 'User'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
