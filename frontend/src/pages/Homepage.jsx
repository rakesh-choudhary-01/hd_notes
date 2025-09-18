import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="container py-5">

      {/* Hero Section */}
      <section className="text-center mb-5 mt-5">
        <h1 className="display-3 fw-bold">Welcome to NoteApp</h1>
        <p className="lead">Your personal space to capture ideas, to-dos, and goals with ease.</p>
        <Link to="/signup" className="btn btn-primary btn-lg mt-3">Get Started</Link>
      </section>

      {/* Feature Section */}
      <section className="row text-center mb-5">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Quick Notes</h5>
              <p className="card-text">Easily jot down anything important without hassle.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">User-Friendly</h5>
              <p className="card-text">Simple and responsive UI with no learning curve.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Secure Access</h5>
              <p className="card-text">Your data is safe with login and OTP authentication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Section (SignUp / Login / Dashboard) */}
      <section className="row justify-content-center mb-5">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title">New User?</h5>
              <p className="card-text">Create a new account to get started with NoteApp.</p>
              <Link to="/signup" className="btn btn-primary w-100">Sign Up</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Already Registered?</h5>
              <p className="card-text">Log in to access your dashboard and notes.</p>
              <Link to="/login" className="btn btn-success w-100">Log In</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Dashboard</h5>
              <p className="card-text">Jump right into your personal dashboard.</p>
              <Link to="/dashboard" className="btn btn-secondary w-100">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-style Call to Action */}
      <section className="text-center mb-3">
        <h4 className="fw-semibold">Start Organizing Your Ideas Today!</h4>
        <p>Boost your productivity and never forget a thing again.</p>
        <Link to="/signup" className="btn btn-outline-primary mt-2">Join Now for Free</Link>
      </section>
    </div>
  );
}

export default Homepage;
