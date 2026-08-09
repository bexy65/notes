import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [showNote, setShowNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  function handleEdit(note) {
    setEditingNote(note);
    setShowNote(true);
  }

  async function handleDelete(note) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setDeletingId(note.id);

    try {
      const response = await fetch(
        `http://localhost:3000/notes/${note.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (response.status === 404) {
        console.log("Note not found");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((currentNotes) =>
        currentNotes.filter((currentNote) => currentNote.id !== note.id)
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  function closeNoteForm() {
    setShowNote(!showNote);
    setEditingNote(null);
  }

  async function handleCreate(noteFormData) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteFormData),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const newNote = await response.json();

      setNotes((currentNotes) => [
        ...currentNotes,
        newNote,
      ]);

      // Close form
      setShowNote(false);
    } catch (error) {
      console.error("Create error:", error);
    }
  }

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
    <div className="my-4 p-0">
      <div className="row align-items-center mb-2 p-0 m-0">
        <div className="col-12 text-center col-md-8 col-lg-10 mb-2">
          <h1>{showNote ? "Create Note" : 'Notes'}</h1>
        </div>
        <div className="col-12 col-md-4 col-lg-2 text-end">
          <button onClick={closeNoteForm} className="btn btn-primary w-100">
            {showNote ? (
              "Back"
            ) : (
              <>
                Create Note <i className="bi bi-clipboard2-plus"></i>
              </>
            )}
          </button>
        </div>
      </div>
      <div className={"container m-0 " + (showNote ? "d-none" : "")}>
        <div className="row m-0 justify-content-center col-12">
          <Note notes={notes} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId}/>
        </div>
      </div>
      <div>
        {showNote ? <NoteForm  showModal={showNote} onCreate={handleCreate} setShowModal={closeNoteForm} note={editingNote}/> : null}
      </div>
    </div>
  );
}

export default NoteList;
