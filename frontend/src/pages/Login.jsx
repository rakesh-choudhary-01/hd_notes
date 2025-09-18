import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const form = document.querySelector(".needs-validation");
    if (!form) return;
  
    const submitHandler = (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    };
  
    form.addEventListener("submit", submitHandler);
    return () => form.removeEventListener("submit", submitHandler);
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
   if (!email) return toast.error("Email is required");

    try {
      const res = await fetch("http://localhost:3000/api/auth/getotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, type: "login" }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to send OTP");
      }
      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setLoading(true);
    } catch (err) {
      toast.error(err.message || "Error sending OTP");
      setOtpSent(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !otp) return;

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp, check }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Login failed");
      }
      toast.success("Logged in successfully!");
      setLoading(true);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <>
      <div className="container py-5 mt-3">
        <ToastContainer position="top-right" autoClose={3000} />
        <div
          className="container-fluid pb-1 mt-5"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="row"
            style={{
              borderRadius: "10px",
              border: "1px solid #ccc",
              minHeight: "100vh",
              overflow: "hidden",
              margin: "2%",
            }}
          >
            {/* Left side */}
            <div
              className="col-md-5 d-flex flex-column"
              style={{ padding: "20px" }}
            >
              <div className="row">
                <div
                  className="col-12 logo-container"
                  style={{ height: "50px" }}
                >
                  <img
                    src="/assets/logo.svg"
                    alt="Logo"
                    style={{ height: "1.2rem" }}
                  />
                </div>
                <div className="wrapper-div">
                  <div
                    className="col-12 align-items-center justify-content-start"
                    style={{ height: "100%" }}
                  >
                    <h4 className="mb-2 col-12 d-flex align-items-center headding-container">
                      LogIn
                    </h4>
                    <p
                      className="text-muted headding-container"
                      style={{ fontSize: "0.87rem" }}
                    >
                      Please Login to continue to your account
                    </p>

                    <form
                      className="form-horizontal w-80 form-container needs-validation"
                      onSubmit={otpSent ? handleSignIn : handleSendOtp}
                      noValidate 
                    >
                      <div className="form-group mb-3 text-center">
                        <label
                          className="control-label w-100 text-start"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          required
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="invalid-feedback text-start">
                          Email is required
                        </div>
                      </div>

                      <div className="form-group mb-3 text-center">
                        <label
                          className="control-label w-100 text-start"
                          htmlFor="otp"
                        >
                          OTP:
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="otp"
                          name="otp"
                          placeholder="Enter otp"
                          disabled={!otpSent}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className="invalid-feedback text-start">
                          Otp is required
                        </div>
                      </div>
                      {!loading ? (
                        <p
                          className="text-muted justify-content-start mt-2"
                          style={{ fontSize: "0.87rem" }}
                        >
                          <a
                            href="#"
                            type="button"
                            onClick={handleSendOtp}
                            className="btn btn-link p-0"
                            disabled={!email}
                          >
                            Send OTP
                          </a>
                        </p>
                      ) : (
                        <p
                          className="text-muted justify-content-start mt-2"
                          style={{ fontSize: "0.87rem" }}
                        >
                          <a
                            href="#"
                            type="button"
                            onClick={handleSendOtp}
                            className="btn btn-link p-0"
                            disabled={!email}
                          >
                            Resend OTP
                          </a>
                        </p>
                      )}

                      <p
                        className="text-black justify-content-start mt-2"
                        style={{ fontSize: "0.87rem" }}
                      >
                        <span className="checkbox-container">
                          <input
                            type="checkbox"
                            id="check"
                            name="check"
                            checked={check}
                            onChange={(e) => setCheck(e.target.checked)}
                          />
                          <label htmlFor="check" style={{ margin: 0 }}>
                            Keep me logged in
                          </label>
                        </span>
                      </p>

                      <button type="submit" className="btn btn-primary w-100">
                        Log In
                      </button>

                      <p
                        className="text-muted justify-content-start mt-3"
                        style={{ fontSize: "0.87rem", textAlign: "center" }}
                      >
                        Need an account??{" "}
                        <a href="/signup">
                          <b>Create one</b>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div
              className="col-md-7 d-none d-md-block"
              style={{
                padding: "6px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                overflow: "hidden",
              }}
            >
              <img
                src="/assets/hero.png"
                alt="signup"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
