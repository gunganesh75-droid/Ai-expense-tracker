const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, ".env"), quiet: true })
const express = require("express")
const mongoose = require("mongoose")
const dns = require("dns")
const cors = require("cors")
const Expense = require("./models/Expense")
const Profile = require("./models/Profile")
const { getAIInsights } = require("./services/aiService")

// Workaround removed because it breaks Render's internal DNS

const app = express()


app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI
if (!mongoUri) {
  console.error('Missing MongoDB connection string. Set MONGO_URI in your environment.')
  process.exit(1)
}

mongoose.connect(mongoUri)
.then(() => {
  console.log("MongoDB Connected 🚀")
})
.catch((error) => {
  console.error("MongoDB connection error:", error)
  process.exit(1)
})

app.get("/", (req, res) => {
  res.send("om namah shivaya 🚀")
})

app.get("/api/expenses", async (req, res) => {

  try {

    const expenses = await Expense.find()

    res.json(expenses)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})
app.post("/api/expenses", async (req, res) => {

  try {

    const newExpense = new Expense({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
    })

    const savedExpense = await newExpense.save()

    res.status(201).json(savedExpense)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

app.get("/api/profile", async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = await Profile.create({
        name: "Shiva Sharma",
        role: "Admin",
        monthlyBudget: 40000,
      })
    }
    res.json(profile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put("/api/profile", async (req, res) => {
  try {
    const { name, role, monthlyBudget } = req.body
    
    // Validate required fields
    if (!name || !role || monthlyBudget === undefined) {
      return res.status(400).json({ message: 'Name, role, and monthly budget are required.' })
    }
    
    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      {
        name: name.trim(),
        role: role.trim(),
        monthlyBudget: Number(monthlyBudget),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    )
    res.json(updatedProfile)
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ message: 'Failed to update profile. ' + error.message })
  }
})

app.delete("/api/expenses/:id", async (req, res) => {

  try {

    await Expense.findByIdAndDelete(req.params.id)

    res.json({
      message: "Expense deleted successfully",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

app.post("/api/ai-insights", async (req, res) => {
  try {
    const expenses = await Expense.find()
    const profile = await Profile.findOne()
    const budget = profile?.monthlyBudget || 40000

    console.log('AI Insight Request received. API Key Present:', !!process.env.GEMINI_API_KEY)
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ 
        message: "Gemini API Key is missing. Please add it to your .env file." 
      })
    }

    const insights = await getAIInsights(expenses, budget)
    res.json(insights)
  } catch (error) {
    console.error("AI Insights Endpoint Error:", error)
    res.status(500).json({ message: "Failed to get AI insights. " + error.message })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})