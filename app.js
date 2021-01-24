// Server setup
const express = require("express");
const app = express();
// Set port (process.env.PORT if deploying)
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, function () {
  console.log(`App listening on: localhost:${PORT}`);
});
