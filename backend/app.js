const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// add routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/expenses", expenseRoutes);

const APP_DIR = "../frontend/build";

app.get("*.*", express.static(path.join(__dirname, APP_DIR)));
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, APP_DIR, "index.html"));
});

// catch 404 and forward to error handler
// app.all("*", function (req, res, next) {
//   res.status(404).json({
//     error: "API not found",
//   });
// });

// error handler
app.use(globalErrorHandler);

module.exports = app;
