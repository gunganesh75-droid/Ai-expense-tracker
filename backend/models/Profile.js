const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  monthlyBudget: {
    type: Number,
    required: true,
    default: 40000,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model("Profile", profileSchema)
