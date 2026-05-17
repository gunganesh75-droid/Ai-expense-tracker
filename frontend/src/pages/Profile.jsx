import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaUser, FaBriefcase, FaEdit, FaSave, FaWallet } from 'react-icons/fa'
import DashboardLayout from '../layouts/DashboardLayout'
import { ExpenseContext } from '../context/ExpenseContext'

const Profile = () => {
  const navigate = useNavigate()
  const { profile, saveProfile, loading } = useContext(ExpenseContext)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    monthlyBudget: '',
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: profile.name || '',
        role: profile.role || '',
        monthlyBudget: profile.monthlyBudget ? String(profile.monthlyBudget) : '',
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.monthlyBudget) {
      setStatus('Please fill in all fields.')
      return
    }

    try {
      await saveProfile({
        name: formData.name.trim(),
        role: formData.role.trim(),
        monthlyBudget: Number(formData.monthlyBudget) || 0,
      })
      setStatus('Profile updated successfully.')
      setIsEditMode(false)
      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      setStatus(error.message || 'Error updating profile.')
    }
  }

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Profile</h1>
            <p className="text-slate-500 font-medium">Manage your personal settings and budget.</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all duration-300 shadow-sm"
          >
            <FaArrowLeft />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
          {/* Avatar Card */}
          <div className="space-y-6">
            <div className="premium-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-600 to-purple-600" />
              <div className="relative mt-4 mb-6">
                <div className="w-24 h-24 rounded-[2rem] bg-white p-1.5 mx-auto shadow-xl">
                  <div className="w-full h-full rounded-[1.7rem] bg-indigo-50 flex items-center justify-center text-3xl text-indigo-600">
                    {formData.name.charAt(0) || 'U'}
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-black text-slate-900 mb-1">{formData.name || 'Your Name'}</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{formData.role || 'Member'}</p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-emerald-600 font-black text-sm uppercase tracking-tight">Active</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Joined</p>
                  <p className="text-slate-900 font-black text-sm uppercase tracking-tight">May 2026</p>
                </div>
              </div>
            </div>

            <div className="premium-card p-6 bg-indigo-900 text-white border-none shadow-indigo-200">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
                    <FaWallet />
                  </div>
                  <h3 className="font-bold text-lg">Financial Health</h3>
               </div>
               <p className="text-indigo-100/70 text-sm leading-relaxed mb-6">
                 Your budget is currently at <span className="text-white font-bold">₹{Number(formData.monthlyBudget).toLocaleString()}</span>. You are tracking 12 categories this month.
               </p>
               <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-indigo-400 rounded-full" />
               </div>
            </div>
          </div>

          {/* Details Form */}
          <div className="premium-card p-6 md:p-10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900">Account Details</h2>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isEditMode ? 'bg-slate-100 text-slate-600' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {isEditMode ? 'Cancel' : <><FaEdit /> Edit Profile</>}
              </button>
            </div>

            {status && (
              <div className={`p-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3 animate-slide-up ${
                status.includes('successfully') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
              }`}>
                <div className={`w-2 h-2 rounded-full ${status.includes('successfully') ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {status}
              </div>
            )}

            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="input-field pl-12 disabled:opacity-70 disabled:bg-slate-50/50"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Professional Role</label>
                  <div className="relative">
                    <FaBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="input-field pl-12 disabled:opacity-70 disabled:bg-slate-50/50"
                      placeholder="e.g. Senior Manager"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Monthly Budget Limit (₹)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-bold">₹</span>
                  <input
                    type="number"
                    name="monthlyBudget"
                    value={formData.monthlyBudget}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="input-field pl-10 disabled:opacity-70 disabled:bg-slate-50/50"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {isEditMode && (
                <div className="pt-6">
                  <button
                    onClick={handleSave}
                    className="btn-primary w-full"
                  >
                    <FaSave /> Save Profile Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile
