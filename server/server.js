const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://optech-kappa.vercel.app",
    methods: "GET,POST,OPTIONS", // Allow OPTIONS
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

  
app.use(express.json());

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL; // Store in .env

// Route to send data to Google Sheets
app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to send data to Google Sheets" });
  }
});

// Route to fetch birthdays from Google Sheets
app.get("/birthdays", async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch birthdays" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
