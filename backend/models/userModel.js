const bcrypt = require("bcrypt");
const db = require("../db");

async function getUser(id) {
  const [rows] = await db.query(
    "SELECT id, first_name, last_name, email, phone FROM users WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

async function updateUserById(id, firstName, lastName, phone) {
  const [result] = await db.query(
    "UPDATE users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?",
    [firstName, lastName, phone, id],
  );
  if(result.affectedRows > 0) {
    return getUser(id);
  } else {
    return null;
  }
}

async function changeUserPassword(id, oldPassword, newPassword) {
  const user = await getUser(id);

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatches) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const [result] = await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, user.id],
  );
  return result.affectedRows;
}

module.exports = {
  getUser,
  changeUserPassword,
  updateUserById
};