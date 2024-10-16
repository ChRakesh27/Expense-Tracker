const expense = require("../model/expense.model");

const getExpenses = async (req, res, next) => {
  try {
    const userId = req.userId;
    const data = await expense.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const obj = req.body;
    const userId = req.userId;
    obj.userId = userId;
    const item = await expense.create(obj);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateExpenseById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    const obj = req.body;
    console.log("🚀 ~ updateExpenseById ~ obj:", obj, id, userId);
    await expense.updateOne({ _id: id, userId }, obj);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const deleteExpenseById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    await expense.deleteOne({ _id: id, userId });
    res.status(204).end();
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
