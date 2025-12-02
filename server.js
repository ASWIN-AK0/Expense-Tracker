const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const expenseRoutes = require("./routes/expensesRoutes");

const app = express();

// Connect MongoDB
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static("public")); // frontend

// API routes
app.use("/api/expenses", expenseRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
