import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Notes from "../pages/Notes";
import Layout from "../components/Layout";
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
