require("dotenv").config();

// database
require("./config/db");

const port = process.env.PORT || 3000;
const app = require("./app");

//running the server
const server = app.listen(port, () => {
  console.log(`Server is running --> http://localhost:${port}`);
});

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("unhandledRejection", gracefulShutdown);

// Shutting down gracefully
function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  server.close((err) => {
    if (err) {
      console.error(err, "Error while closing server:");
      process.exit(1);
    } else {
      console.log("Server closed.");
      process.exit(0);
    }
  });
}
