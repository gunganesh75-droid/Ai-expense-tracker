import { useContext, useState, useEffect } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import { ExpenseContext } from "../context/ExpenseContext"
import { FaRobot, FaLightbulb, FaExclamationTriangle, FaMagic, FaChartLine } from 'react-icons/fa'
import axios from 'axios'

const AIInsights = () => {
  const { expenses, loading: contextLoading } = useContext(ExpenseContext)
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchInsights = async () => {
    setLoading(true)
    setError(null)
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ai-expense-tracker-x49e.onrender.com"
      const response = await axios.post(`${API_BASE_URL}/api/ai-insights`)
      setInsights(response.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to connect to Gemini AI. Make sure your API key is set.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (expenses.length > 0 && !insights) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchInsights()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses])

  if (contextLoading) return null

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 animate-pulse">
              <FaRobot className="text-xl" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Financial Brain</h1>
          </div>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Powered by Google Gemini. Our advanced AI analyzes your spending patterns to give you professional financial advice and saving strategies.
          </p>
        </div>
        
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="btn-primary flex items-center gap-3 whitespace-nowrap"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
          ) : (
            <><FaMagic /> Refresh Insights</>
          )}
        </button>
      </div>

      {error && (
        <div className="premium-card p-8 bg-rose-50 border-rose-100 mb-12 animate-slide-up">
          <div className="flex items-center gap-4 text-rose-600 mb-4">
            <FaExclamationTriangle className="text-2xl" />
            <h3 className="text-xl font-black">AI Connection Error</h3>
          </div>
          <p className="text-rose-700/70 font-medium mb-6">{error}</p>
          <div className="bg-white/50 p-6 rounded-2xl border border-rose-100">
            <p className="text-sm text-rose-900 font-bold mb-2">How to fix this:</p>
            <ul className="text-sm text-rose-700 space-y-2 list-disc ml-5">
              <li>Get a free Gemini API key from <a href="https://aistudio.google.com/" target="_blank" className="underline font-black">Google AI Studio</a></li>
              <li>Ensure your API key has "Gemini 2.0 Flash" enabled (Free tier)</li>
              <li>If you see "Quota Exceeded", you may need to wait or check your AI Studio project limits</li>
              <li>Add <code className="bg-rose-100 px-2 py-0.5 rounded">GEMINI_API_KEY=your_key</code> to your <code className="bg-rose-100 px-2 py-0.5 rounded">backend/.env</code> file and restart</li>
            </ul>
          </div>
        </div>
      )}

      {loading && !insights && (
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="premium-card p-10 animate-pulse">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl mb-6"></div>
              <div className="h-4 bg-slate-100 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {insights && (
        <div className="space-y-10 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="premium-card p-10 group hover:border-indigo-200 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Financial Health</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{insights.summary}</p>
            </div>

            <div className="premium-card p-10 group hover:border-amber-200 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Smart Alert</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{insights.alert}</p>
            </div>

            <div className="premium-card p-10 group hover:border-emerald-200 transition-all duration-500 bg-emerald-50/10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">AI Strategies</h3>
              <ul className="space-y-4">
                {insights.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm">
                    <span className="text-emerald-500 font-black">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {!loading && !insights && !error && (
        <div className="premium-card p-8 md:p-20 text-center">
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-8">
            <FaMagic />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Ready to see the future?</h2>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto mb-10">
            Click the button above to let Gemini AI analyze your transactions and give you professional financial advice.
          </p>
          <button onClick={fetchInsights} className="btn-primary px-10">Get Real Insights</button>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AIInsights