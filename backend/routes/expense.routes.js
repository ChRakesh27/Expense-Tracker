const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

router
  .get("/", authMiddleware, expenseController.getExpenses)
  .post("/", authMiddleware, expenseController.createExpense)
  .patch("/:id", authMiddleware, expenseController.updateExpenseById)
  .delete("/:id", authMiddleware, expenseController.deleteExpenseById);

module.exports = router;
