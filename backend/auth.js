const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("./users");
const db = require("./db");
const router = express.Router();
const SALT_ROUNDS = 10;

// REGISTER
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const [existingUsers] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  if (existingUsers.length > 0) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const [result] = await db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [first_name, last_name, email, hashedPassword],
  );

  res.status(201).json({
    message: "User registered successfully",
    userId: result.insertId,
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const [existingUsers] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  if (existingUsers.length == 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const user = existingUsers[0];

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });
});

module.exports = router;
