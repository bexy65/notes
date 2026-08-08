require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const notesData = require("./notes");
const authRoutes = require("./auth");
const requireAuth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/", authRoutes);
app.use("/", requireAuth, notesData);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
