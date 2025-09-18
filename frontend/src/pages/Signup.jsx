import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [dob, setDob] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (dob) {
      setShowError(false);
    }
  }, [dob]);

  useEffect(() => {
    const form = document.querySelector(".needs-validation");
    if (!form) return;

    const submitHandler = (event) => {
      const formValid = form.checkValidity();

      if (!dob) {
        setShowError(true);
      }

      if (!formValid || !dob) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    };

    form.addEventListener("submit", submitHandler);
    return () => form.removeEventListener("submit", submitHandler);
  }, [dob]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dob) {
      setShowError(true);
      return;
    }

    const data = {
      name,
      dob: dob ? dob.toISOString().split("T")[0] : "",
      email,
      otp,
      type: "signup",
    };

    if (!loading) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/getotp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to send OTP");
        } else {
          toast.success("OTP sent successfully!");
          setLoading(true);
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to sign up");
        } else {
          toast.success("Signup successfully!");
          setLoading(false);
          navigate("/dashboard");
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  const handleDobChange = (date) => {
    setDob(date);
    if (date) {
      setShowError(false);
    }
    else{
      setShowError(true);
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
                      SignUp
                    </h4>
                    <p
                      className="text-muted headding-container"
                      style={{ fontSize: "0.87rem" }}
                    >
                      Signup to enjoy the feature of HD
                    </p>

                    <form
                      className="form-horizontal w-80 form-container needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="form-group mb-3 text-center">
                        <label
                          className="control-label w-100 text-start"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <div className="invalid-feedback text-start">
                          Name is required
                        </div>
                      </div>

                      <div className="form-group mb-3 text-center">
                        <label
                          className="control-label w-100 text-start"
                          htmlFor="dob"
                        >
                          Date of Birth:
                        </label>
                        <div
                          className="w-100 text-start custom-form-control"
                          style={{
                            border: "2px solid #e1e7efff",
                            borderRadius: "4px",
                            padding: "8px",
                            boxSizing: "border-box",
                          }}
                        >
                          <div className="position-relative d-flex align-items-center w-100">
                            <FaCalendarAlt
                              className="position-absolute"
                              style={{
                                left: "0px",
                                cursor: "pointer",
                                zIndex: 10,
                              }}
                              onClick={() =>
                                document.getElementById("dob").focus()
                              }
                            />
                            <DatePicker
                              selected={dob}
                              onChange={handleDobChange}
                              onBlur={() => {
                                if (!dob) setShowError(true);
                              }}
                              name="dob"
                              id="dob"
                              dateFormat="dd MMMM yyyy"
                              maxDate={new Date()}
                              isClearable
                              showMonthDropdown
                              scrollableMonthDropdown
                              showYearDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={100}
                              className="form-control border-0 shadow-none ps-4"
                              placeholderText="Select dob"
                            />
                          </div>
                        </div>
                        {showError && (
                          <p
                            style={{
                              fontSize: "smaller",
                              textAlign: "left",
                              color: "#dc3545",
                            }}
                          >
                            Dob is required
                          </p>
                        )}
                      </div>

                      <div className="form-group mb-3 text-center">
                        <label
                          className="control-label w-100 text-start"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="invalid-feedback text-start">
                          Email is required
                        </div>
                      </div>

                      {!loading ? (
                        <button type="submit" className="btn btn-primary w-100">
                          Get OTP
                        </button>
                      ) : (
                        <>
                          <div className="form-group mb-3 text-center">
                            <label
                              className="control-label w-100 text-start"
                              htmlFor="otp"
                            >
                              Enter Otp:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="otp"
                              name="otp"
                              placeholder="Enter otp"
                              required
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                            <div className="invalid-feedback text-start w-500">
                              Otp is required
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Sign Up
                          </button>
                        </>
                      )}
                      <p
                        className="text-muted justify-content-start mt-3"
                        style={{ fontSize: "0.87rem", textAlign: "center" }}
                      >
                        Already have an account??{" "}
                        <a href="/login">
                          <b>Login</b>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

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

export default Signup;
