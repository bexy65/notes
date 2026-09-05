function Note(props) {
  return (
    <div className="row g-3">
    {props.notes.map(note => (
        <div
        key={note.id}
        className="col-md-6 col-lg-4"
        >
			<div className="row border rounded m-0 p-2 h-100 items-center">
                <div className="border col-8 h-100">
                    <h4>{note.title}</h4>
                    <p className="text-truncate m-0">{note.content}</p>
                </div>
                <div className="col-4 my-2">
                    <div className="col-12 mb-2">
                        <button
                        onClick={() => props.onEdit(note)}
                        className="btn btn-warning btn-sm w-100"
                        disabled={props.deletingId === note.id}
                        >
                        <i className="bi bi-pen"></i>
                        </button>
                    </div>

                    <div className="col-12">
                        <button
                        onClick={() => props.onDelete(note)}
                        className="btn btn-danger btn-sm w-100"
                        disabled={props.deletingId === note.id}
                        >
                        <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
			</div>
           
        </div>
    ))}
    </div>
  );
}

export default Note;