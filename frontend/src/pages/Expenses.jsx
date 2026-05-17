import DashboardLayout from "../layouts/DashboardLayout"

import ExpenseForm from "../components/ExpenseForm"
import ExpenseTable from "../components/ExpenseTable"

const Expenses = () => {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Expenses
      </h1>

      <ExpenseForm />

      <ExpenseTable />

    </DashboardLayout>
  )
}

export default Expenses