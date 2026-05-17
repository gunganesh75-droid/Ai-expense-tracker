import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import Analytics from "./pages/Analytics"
import Reports from "./pages/Reports"
import AIInsights from "./pages/AIInsights"
import Profile from "./pages/Profile"

const App = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/expenses"
        element={<Expenses />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />

      <Route
        path="/reports"
        element={<Reports />}
      />

      <Route
        path="/ai-insights"
        element={<AIInsights />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

    </Routes>
  )
}

export default App