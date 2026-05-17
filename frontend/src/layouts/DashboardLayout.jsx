import { useState } from 'react'
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      <div className="bg-glow" />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 w-full lg:ml-80 p-4 sm:p-8 lg:p-12 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto space-y-6 sm:space-y-10">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="animate-slide-up">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout