const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello from my node server");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

