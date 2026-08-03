require("dotenv").config();
const express = require("express");
const app = express();

const notesData = require("./notes");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/notes", (req, res) => {
  res.json(notesData.flat());
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
