const express = require("express");
const requireAuth = require("./middleware/auth");
const noteModel = require("./models/noteModel");

const router = express.Router();

router.get("/notes", async (req, res) => {
  const notes = await noteModel.getAllNotesByUser(req.user.id);
  res.json(notes);
});

router.get("/notes/:id", async (req, res) => {
  const note = await noteModel.getNoteById(req.params.id, req.user.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

router.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const newId = await noteModel.createNote(title, content, req.user.id);
  res.status(201).json({ id: newId, title, content });
});

router.put("/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const affectedRows = await noteModel.updateNote(
    req.params.id,
    title,
    content,
    req.user.id,
  );
  if (affectedRows === 0)
    return res.status(404).json({ error: "Note not found" });
  res.json({ message: "Note updated" });
});

router.delete("/notes/:id", async (req, res) => {
  const affectedRows = await noteModel.deleteNote(req.params.id, req.user.id);
  if (affectedRows === 0)
    return res.status(404).json({ error: "Note not found" });
  res.json({ message: "Note deleted" });
});

module.exports = router;
