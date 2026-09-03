const express = require("express");
const noteModel = require("./models/noteModel");
const userModel = require("./models/userModel");

const router = express.Router();

router.get("/api/totals", async (req, res) => {
    const notes = await noteModel.getStatistics();
    const users = await userModel.getStatistics();

    res.json({ users: users, notes:notes });
});

module.exports = router;
