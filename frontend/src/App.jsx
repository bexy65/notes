import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getNotes() {
      const response = await fetch("http://localhost:3000/notes");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        setErrorMessage("Error finding notess");
      }
    }

    getNotes();
  }, []);

  return (
    <>
      <div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {notes.map((note) => (
          <div key={note.id} className="border p-0 mb-1">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
