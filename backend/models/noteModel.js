const db = require("../db");

async function getAllNotesByUser(userId) {
  const [rows] = await db.query("SELECT * FROM notes WHERE user_id = ?", [
    userId,
  ]);
  return rows;
}

async function getNoteById(id, userId) {
  const [rows] = await db.query(
    "SELECT * FROM notes WHERE id = ? AND user_id = ?",
    [id, userId],
  );
  return rows[0]; // undefined if not found
}

async function createNote(title, content, userId) {
  const [result] = await db.query(
    "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, userId],
  );
  return result.insertId;
}

async function updateNote(id, title, content, userId) {
  const [result] = await db.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
    [title, content, id, userId],
  );
  return result.affectedRows;
}

async function deleteNote(id, userId) {
  const [result] = await db.query(
    "DELETE FROM notes WHERE id = ? AND user_id = ?",
    [id, userId],
  );
  return result.affectedRows;
}

async function getStatistics() {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS total FROM notes"
  );

  return rows[0].total;
}

module.exports = {
  getAllNotesByUser,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getStatistics
};
