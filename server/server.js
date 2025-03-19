const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow all origins

// ✅ Manually set headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://optech-kappa.vercel.app"); // Replace with your frontend URL
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// ✅ Handle preflight OPTIONS requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

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
