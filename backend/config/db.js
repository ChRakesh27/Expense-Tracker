const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

//connect the mongoose
mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("====================================");
  console.log(err);
  console.log("====================================");
});
