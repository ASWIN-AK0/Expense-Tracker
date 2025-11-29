const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const FILE = "./expenses.json";

// Read all expenses
app.get("/api/expenses", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// Add expense
app.post("/api/expenses", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    const newExpense = {
        id: Date.now(),
        title: req.body.title,
        amount: req.body.amount,
    };
    data.push(newExpense);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ message: "Expense added", expense: newExpense });
});

// Delete expense
app.delete("/api/expenses/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    const filtered = data.filter(item => item.id != req.params.id);
    fs.writeFileSync(FILE, JSON.stringify(filtered));
    res.json({ message: "Expense deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
