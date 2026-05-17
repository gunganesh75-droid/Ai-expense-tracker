import { FaMoneyBillWave, FaPiggyBank, FaCalendarAlt, FaWallet } from 'react-icons/fa'

const StatCard = ({ title, amount, trend }) => {
  const getIcon = (title) => {
    switch (title) {
      case 'Total Expenses': return <FaMoneyBillWave className="text-rose-500" />
      case 'Total Savings': return <FaPiggyBank className="text-emerald-500" />
      case 'Monthly Budget': return <FaCalendarAlt className="text-indigo-500" />
      case 'Remaining Balance': return <FaWallet className="text-amber-500" />
      default: return <FaMoneyBillWave className="text-slate-500" />
    }
  }

  const getBg = (title) => {
    switch (title) {
      case 'Total Expenses': return 'bg-rose-50'
      case 'Total Savings': return 'bg-emerald-50'
      case 'Monthly Budget': return 'bg-indigo-50'
      case 'Remaining Balance': return 'bg-amber-50'
      default: return 'bg-slate-50'
    }
  }

  return (
    <div className="premium-card p-6 sm:p-8 group overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl ${getBg(title)} flex items-center justify-center text-2xl shadow-inner transition-transform duration-500 group-hover:rotate-12`}>
          {getIcon(title)}
        </div>
      </div>
      
      <div>
        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-widest mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="text-4xl font-black text-slate-900 tracking-tight">
          {amount}
        </p>
      </div>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
    </div>
  )
}

export default StatCard