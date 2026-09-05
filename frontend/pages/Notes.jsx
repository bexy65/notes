import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";
import { useApi } from "../hooks/apiHook";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { authenticatedFetch } = useApi();

  function handleEdit(note) {
    setEditingNote(note);
    setShowNote(true);
  }

  function closeNoteForm() {
    setShowNote((current) => !current);
    setEditingNote(null);
  }

  async function getNotes() {
    try {
      const response = await authenticatedFetch("http://localhost:3000/notes");

      if (!response) return;

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Fetch notes error:", error);
    }
  }

  async function handleCreate(noteFormData) {
    try {
      const response = await authenticatedFetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteFormData),
      });

      if (!response) return;

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      getNotes();

      closeNoteForm();
    } catch (error) {
      console.error("Create error:", error);
    }
  }

  function handleReorder(newNotes) {
    setNotes(newNotes);
  }

  async function handleUpdate(noteFormData) {
    try {
      const response = await authenticatedFetch(
        `http://localhost:3000/notes/${noteFormData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteFormData),
        }
      );

      if (!response) return;

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      getNotes();

      closeNoteForm();
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  async function handleDelete(note) {
    setDeletingId(note.id);

    try {
      const response = await authenticatedFetch(
        `http://localhost:3000/notes/${note.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response) return;

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      getNotes();
      
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  }

  const filteredNotes = notes.filter(note => {
    const search = searchTerm.toLowerCase().trim();

    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search)
    );
  });

  function filterSearch(string) {
    setSearchTerm(string);
    let currentNotes = notes;
    
    const results = notes.filter(note => {
      const search = searchTerm.toLowerCase();

      return (
        note.title.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search)
      );
    });

    if(string != '') {
      setNotes(results);
    } else {
      setNotes(currentNotes);
    }
  }

  // const results = products.filter(product =>
  //   product.title.toLowerCase().includes(search.toLowerCase())
  // );


  useEffect(() => {
    getNotes();
  }, []);

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
      {!showNote &&
        <div className="container col-12 my-3">
          <input name="searchTerm" type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      }
      <div className={"container m-0 " + (showNote ? "d-none" : "")}>
        <div className="row m-0 justify-content-center col-12">
          <Note 
          notes={filteredNotes} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          deletingId={deletingId}
          onReorder={handleReorder}
          />
        </div>
      </div>
      <div>
        {showNote ? 
        <NoteForm  
        showModal={showNote} 
        note={editingNote}
        onUpdate={handleUpdate} 
        onCreate={handleCreate} 
        setShowModal={closeNoteForm} 
        /> : null}
      </div>
    </div>
  );
}

export default NoteList;
