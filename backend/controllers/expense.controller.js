const expense = require("../model/expense.model");

const getExpenses = async (req, res, next) => {
  try {
    const userId = req.userId;
    const data = await expense.find({ userId });
    res.status(200).json({ message: "Fetch expense", data });
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const obj = req.body;
    const userId = req.userId;
    obj.userId = userId;
    await expense.create(obj);
    res.status(201).json({ message: "create new expense" });
  } catch (error) {
    next(error);
  }
};

const updateExpenseById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.query;
    const obj = req.body;
    await expense.findByIdAndUpdate(id, obj);
    res.status(201).json({ message: "Update expense" });
  } catch (error) {
    next(error);
  }
};

const deleteExpenseById = async (req, res, next) => {
  try {
    const id = req.query;
    await expense.findByIdAndDelete(id);
    res.status(201).json({ message: "delete expense" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpenseById,
  deleteExpenseById,
};
