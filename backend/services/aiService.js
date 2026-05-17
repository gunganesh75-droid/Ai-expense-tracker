const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIInsights = async (expenses, budget) => {
  try {
    // Using gemini-flash-latest for best compatibility with new API keys
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const prompt = `
      You are a professional financial advisor AI. 
      Here is the user's spending data for the current month:
      - Total Budget: INR ${budget}
      - Total Spent: INR ${totalExpenses}
      - Category Breakdown: ${JSON.stringify(categoryTotals)}
      - Transactions: ${JSON.stringify(expenses.map(e => ({ title: e.title, amount: e.amount, category: e.category })))}

      Please provide:
      1. A brief summary of their financial health.
      2. Three specific, actionable tips to save money based on their transactions.
      3. A "Smart Alert" if they are overspending in any category.

      IMPORTANT: Return ONLY a valid JSON object. Do not include markdown formatting or backticks.
      JSON structure: { "summary": "...", "tips": ["...", "...", "..."], "alert": "..." }
    `;

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Raw Gemini Response received");
    
    // Improved JSON cleaning: find the first { and last }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      console.error("Invalid AI response format:", text);
      throw new Error("AI returned invalid data format");
    }
    
    const cleanJson = text.substring(firstBrace, lastBrace + 1);
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini AI Error Details:", error);
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      throw new Error("Gemini API Quota Exceeded. Please check your Google AI Studio billing or free tier limits.");
    }
    throw new Error("Gemini API Error: " + (error.message || "Unknown error"));
  }
};

module.exports = { getAIInsights };
