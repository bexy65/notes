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
    <div className="my-4">
      <div className="row border align-items-center">
        <div className="col-6">
          <h1>Notes</h1>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-primary">Create Note +</button>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center col-12">
          {notes.map((note) => (
            <div className="col-12 border p-3 mb-3" key={note.id}>
              <Link className="h3 text-black" to={`/notes/${note.id}`}>
                {note.title}
              </Link>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
