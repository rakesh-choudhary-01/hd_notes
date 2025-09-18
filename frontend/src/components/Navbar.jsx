import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Page checks
  const isDashboard = location.pathname === "/dashboard";
  const isLoginOrSignup =
    location.pathname === "/login" || location.pathname === "/signup";
  const isHome = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 py-3 fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Show logo only on homepage and dashboard */}
        {(isHome || isDashboard) && (
          <img src="/assets/logo.svg" alt="Logo" style={{ height: "1.5rem" }} />
        )}

        <div className="d-flex gap-3">
          {isHome && (
            <>
              <Link
                to="/signup"
                className="text-dark text-decoration-none fw-medium"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-dark text-decoration-none fw-medium"
              >
                Login
              </Link>
            </>
          )}

          {isLoginOrSignup && (
            <Link to="/" className="text-dark text-decoration-none fw-medium">
              Home
            </Link>
          )}

          {isDashboard && (
            <Link
              to="/"
              className="text-dark text-decoration-none fw-medium"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
