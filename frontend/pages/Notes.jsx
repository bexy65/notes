import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      setNotes(data);
    }
    getNotes();
  }, []);

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
