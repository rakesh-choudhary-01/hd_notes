import React from "react";

function NoteCard({ note }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <p className="card-text">{note.text}</p>
      </div>
    </div>
  );
}

export default NoteCard;