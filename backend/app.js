const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");

const app = express();

app.use(express.json());
app.use(cors());

// add routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/expenses", expenseRoutes);

// catch 404 and forward to error handler
app.all("*", function (req, res, next) {
  res.status(404).json({
    error: "API not found",
  });
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
