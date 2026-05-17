import { Link, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaMoneyBill,
  FaChartPie,
  FaRobot,
  FaFileAlt,
  FaWallet,
  FaUser,
  FaTimes
} from "react-icons/fa"

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <FaHome />, color: 'text-blue-400' },
    { path: '/expenses', name: 'Expenses', icon: <FaMoneyBill />, color: 'text-emerald-400' },
    { path: '/analytics', name: 'Analytics', icon: <FaChartPie />, color: 'text-purple-400' },
    { path: '/ai-insights', name: 'AI Insights', icon: <FaRobot />, color: 'text-amber-400' },
    { path: '/profile', name: 'Profile', icon: <FaUser />, color: 'text-cyan-400' },
    { path: '/reports', name: 'Reports', icon: <FaFileAlt />, color: 'text-rose-400' },
  ];

  return (
    <aside className={`w-80 min-h-screen bg-slate-950 text-white p-6 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <button 
        className="lg:hidden absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes className="text-2xl" />
      </button>
      <div className="mb-12 px-4">
        <div className="flex items-center gap-3 mb-6 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
            <FaWallet className="text-xl" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold block mb-1">
              Smart Tracker
            </span>
            <h1 className="text-xl font-extrabold text-white leading-none">
              Expense <span className="text-indigo-400">AI</span>
            </h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'hover:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : item.color}`}>
                    {item.icon}
                  </span>
                  <span className="font-semibold tracking-wide">
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto p-4">
        <div className="text-center text-slate-600 text-[10px] uppercase tracking-[0.2em] font-bold">
          © 2026 Expense AI • v1.0
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
