import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getNotes() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();
      setNotes(data);
    }
    getNotes();
  }, [navigate]);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Notes;
