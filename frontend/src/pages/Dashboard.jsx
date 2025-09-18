import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaPen } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const [user, setUser]=useState({});
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/verifyuser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message || "Failed to verify user");
        }
        
        setUser(resData.user);
        getNotes();
        toast.success("Welcome to your Dashboard!");
      } catch (err) {
        toast.error(err.message);
        navigate("/login");
      }
    };

    verifyUser();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes/", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setNotes(response.data.notes.reverse());
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [noteText, setNoteText] = useState("");
  const maxLength = 250;

  const handleAddNote = async() => {
    if (noteText.trim() === "") {
      toast.error("Note cannot be empty!");
      return;
    }

    const newNote = {
      text: noteText,
      createdAt: new Date().toLocaleString(),
    };
    
     try {
        const response = await fetch(
          "http://localhost:3000/api/notes/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({newNote}),
          }
        );

        if (!response.ok) {
          throw new Error(resData.message || "Failed to add notes");
        }
        
        getNotes();
        setNoteText("");
        toast.success("Note added!");

      } catch (err) {
        toast.error(err.message);
        navigate("/login");
      }
  };

  const handleDeleteNote = async (id) => {

    if(!id){

      return toast.error("Id is required to delete");
    }

     try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(resData.message || "Failed to delete notes");
        }
        
        getNotes();
        toast.success("Note deleted!");
        
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
        navigate("/login");
      }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Hero Header */}
      <section className="text-center mb-5 mt-5">
        <h4 className="display-3 fw-bold text-primary">
          Welcome to Your Dashboard
        </h4>
        <p className="lead text-muted">
          Create, manage, and review your notes below.
        </p>
        <h6 className="text-secondary">
          Hi, <span className="text-dark fw-bold">{user.name}</span>{" "}
          <span className="text-dark">({user.email})</span>{" "}
        </h6>
      </section>

      {/* Add Note Section */}
      <section className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div
            className="card shadow border-0"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <div className="card-header text-dark">
              <h5 className="mb-0">
                <FaPen className="me-2" />
                Add New Note
              </h5>
            </div>
            <div className="card-body bg-white">
              <textarea
                className="form-control mb-2"
                rows="4"
                maxLength={maxLength}
                placeholder="Start typing your idea, reminder, or plan here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">
                  {noteText.length}/{maxLength} characters
                </small>
                <button
                  className="btn btn-primary px-4"
                  onClick={handleAddNote}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="text-center mb-4">
        <h4 className="fw-bold text-dark">All Notes</h4>
        <p className="text-muted">Here are your latest notes.</p>
      </section>

      <section className="row mb-2">
        {notes.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">You haven't added any notes yet.</p>
          </div>
        ) : (
          notes.map((note) => (
            <div className="col-md-4 mb-4" key={note._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <p className="mb-2">{note.text}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <small className="text-muted">{note.createdAt}</small>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteNote(note._id)}
                      title="Delete Note"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Dashboard;
