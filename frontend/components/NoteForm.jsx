import { useState, useEffect } from "react";
import { Editor } from "./Editor";

function NoteForm(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [noteFormData, setNoteFormData] = useState({
    title: "",
    content: "",
    user_email: user.email,
  });

  const [errors, setErrors] = useState({});

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  useEffect(() => {
    if (props.note) {
      setNoteFormData({
        id: props.note.id,
        title: props.note.title,
        content: props.note.content,
        user_email: props.note.user_email,
      });
    } else {
      setNoteFormData({
        title: "",
        content: "",
        user_email: user.email,
      });
    }

    setErrors({});
  }, [props.note]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNoteFormData(prev => ({
      ...prev,
      [name]: value,
    }));

   setErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };

  function validateForm() {
    const newErrors = {};

    if (!noteFormData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (noteFormData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!noteFormData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (noteFormData.content.trim().length < 3) {
      newErrors.content = "Content must be at least 3 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChangeContent(content) {
    setNoteFormData(prev => ({
      ...prev,
      'content': content,
    }));s
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (noteFormData.id) {
      props.onUpdate(noteFormData);
    } else {
      props.onCreate(noteFormData);
    };
  }

  return (
    <div className="p-3 my-4 col-12 col-lg-6 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="row m-0 mb-3">
          <input
            className={`col-6 form-control ${
              errors.title ? "is-invalid" : ""
            }`}
            type="text"
            name="title"
            placeholder="Title"
            value={noteFormData.title}
            onChange={handleChange}
          />

          {errors.title && (
            <div className="invalid-feedback">
              {errors.title}
            </div>
          )}
        </div>

        <div className="row mb-3">
          <div className="my-3">
            <Editor 
              value={noteFormData.content}
              onChange={handleChangeContent}
            />
          </div>

          {errors.content && (
            <div className="invalid-feedback">
              {errors.content}
            </div>
          )}
        </div>
        
        <div className="row col-12 col-md-6 col-lg-4 m-0">
          <button type="submit" className="btn btn-primary">
            {props.note ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;