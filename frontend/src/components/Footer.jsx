import React from "react";

function Footer() {
  return (
    <footer
      className="text-center text-muted py-4 border-top w-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center mb-2">
          <div className="col-auto">
            <a href="/" className="text-muted mx-2 text-decoration-none">
              Home
            </a>
            <a href="/signup" className="text-muted mx-2 text-decoration-none">
              SignUp
            </a>
            <a href="/login" className="text-muted mx-2 text-decoration-none">
              Login
            </a>
            <a href="/dashboard" className="text-muted mx-2 text-decoration-none">
              Dashboard
            </a>
          </div>
        </div>
        <div>
          <small>
            &copy; {new Date().getFullYear()} <strong>NoteApp</strong>. All rights reserved.
            &nbsp; | &nbsp; Built with 💙 using MERN Stack
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
