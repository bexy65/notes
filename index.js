require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/notes", (req, res) => {
  res.send("MY Note1");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
