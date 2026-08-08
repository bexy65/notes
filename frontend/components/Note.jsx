import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function Note(props) {
    function handleDelete(note) {
        props.onDelete(note)
    }

    function handleEdit(note) {
        props.onEdit(note);
    }
  return (
    <>
       {props.notes.map((note) => {
        const isDeleting = props.deletingId === note.id;

        return (
            <div
            className="row border rounded p-3 mb-3 position-relative "
            key={note.id}
            >
            {isDeleting && (
                <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-secondary bg-opacity-25"
                style={{ zIndex: 10 }}
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">
                            Deleting...
                        </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="col-12 col-md-8 col-lg-10">
                <h4>{note.title}</h4>
                <p>{note.content}</p>
            </div>

            <div className="col-12 col-md-4 col-lg-2 mt-3 mt-lg-0">
                <div className="row">
                    <div className="col-12 py-1">
                        <button
                        onClick={() => handleEdit(note)}
                        className="btn btn-warning btn-sm w-100"
                        disabled={isDeleting}
                        >
                        Edit
                        </button>
                    </div>

                    <div className="col-12 py-1">
                        <button
                        onClick={() => handleDelete(note)}
                        className="btn btn-danger btn-sm w-100"
                        disabled={isDeleting}
                        >
                        {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
        })}
    </>
  );
}

export default Note;
