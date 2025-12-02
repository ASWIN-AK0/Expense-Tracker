const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json({ success: true, expense });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json({ success: true, count: expenses.length, data: expenses });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updated = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ success: true, message: "Expense updated", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Expense.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Expense deleted", data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
