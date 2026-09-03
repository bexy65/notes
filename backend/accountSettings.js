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


router.put("/change-password", async (req, res) => {
  const { oldPassword, newPassword, user_id } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "All password fields are required" });
  }
  
  const changePassword = await userModel.changeUserPassword(user_id, oldPassword, newPassword);
  if (!changePassword) {
    return res.status(404).json({ error: "Error on changing password please check your old password!" });
  }

  res.sendStatus(200);
});

module.exports = router;