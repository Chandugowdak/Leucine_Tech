const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


const PORT = process.env.PORT || 5000;

// Route imports
const authRoutes = require("./routes/authRoutes");
const softwareRoutes = require("./routes/softwareRoutes");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3001", 
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes); // User auth routes (login/register)
app.use("/api/software", softwareRoutes); // Software-related routes

app.use("/api", requestRoutes); // Requests: /api/requests



app.listen(PORT, () =>
  console.log(` Server started on port ${PORT}`)
);
