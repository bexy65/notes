const express = require("express");
const userModel = require("./models/userModel");

const router = express.Router();

router.put("/account-settings", async (req, res) => {
  const { firstName, lastName, phone, user_id } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "First Name and Last Name are required!" });
  }

  const user = await userModel.updateUserById(
    user_id,
    firstName,
    lastName,
    phone,
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user: user });
});

module.exports = router;