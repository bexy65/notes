import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";


function SortableNote({ note, props }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: note.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const isDeleting = props.deletingId === note.id;

    return (
        <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="row border rounded p-3 mb-3 position-relative"
        >

        {isDeleting && (
            <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-secondary bg-opacity-25"
            style={{ zIndex: 10 }}
            >
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-secondary">
                    <span className="visually-hidden">
                        Deleting...
                    </span>
                </div>
            </div>
            </div>
        )}

            <div className="col-1 text-center">
                <button
                {...listeners}
                className="btn btn-light"
                disabled={isDeleting}
                >
                <i className="bi bi-grip-vertical"></i>
                </button>
            </div>

            <div className="col-11 col-md-7 col-lg-9">
                <h4>{note.title}</h4>
                <p>{note.content}</p>
            </div>

            <div className="col-12 col-md-4 col-lg-2 mt-3 mt-lg-0">
                <div className="row">

                    <div className="col-6 py-1">
                        <button
                        onClick={() => props.onEdit(note)}
                        className="btn btn-warning btn-sm w-100"
                        disabled={isDeleting}
                        >
                        <i className="bi bi-pen"></i>
                        </button>
                    </div>

                    <div className="col-6 py-1">
                        <button
                        onClick={() => props.onDelete(note)}
                        className="btn btn-danger btn-sm w-100"
                        disabled={isDeleting}
                        >
                        <i className="bi bi-trash"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}


function Note(props) {
    function handleDragEnd(event) {

        const { active, over } = event;

        if (!over || active.id === over.id) {
        return;
        }

        const oldIndex = props.notes.findIndex(
            (note) => note.id === active.id
        );

        const newIndex = props.notes.findIndex(
            (note) => note.id === over.id
        );

        const newNotes = arrayMove(
            props.notes,
            oldIndex,
            newIndex
        );

        props.onReorder(newNotes);
    }


    return (
        <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={props.notes.map((note) => note.id)}
                strategy={verticalListSortingStrategy}
            >
                {props.notes.map((note) => (
                <SortableNote
                    key={note.id}
                    note={note}
                    props={props}
                />
                ))}
            </SortableContext>
        </DndContext>
    );
}

export default Note;