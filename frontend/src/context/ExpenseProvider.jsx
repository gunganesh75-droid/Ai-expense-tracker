import { useState, useEffect } from "react"
import axios from "axios"
import { ExpenseContext } from "./ExpenseContext"

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ai-expense-tracker-x49e.onrender.com"

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([])
  const [profile, setProfile] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [expenseRes, profileRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/expenses`),
          axios.get(`${API_BASE_URL}/api/profile`),
        ])

        setExpenses(expenseRes.data)
        setProfile(profileRes.data)
        setLoading(false)
      } catch (error) {
        console.error('Initial fetch error:', error)
        setError('Failed to connect to the server. Please ensure the backend is running.')
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/expenses`, expense)
      setExpenses((prev) => [...prev, response.data])
    } catch (error) {
      console.error(error)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/expenses/${id}`)
      setExpenses((prev) => prev.filter((expense) => expense._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const saveProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/profile`, profileData)
      setProfile(response.data)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred'
      console.error('Profile save error:', errorMessage)
      throw new Error(errorMessage, { cause: error })
    }
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, profile, saveProfile, loading, error }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseProvider
