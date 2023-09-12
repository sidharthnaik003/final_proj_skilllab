import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './login.css';
import pictures from "../images/lib_book.jpeg"
import logo from "../images/library.png";

const Register = () => {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  // to get the inputs it will bw stored as a object
  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setInputValue({
      ...inputValue,
      [id]: value,
    });
  };


  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  // to send data to the serever
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {

        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <body class="body" style={{ backgroundColor: "#f3e0e2" }}>
      <div class="form-container log-in-container">
        <form class="loginForm" onSubmit={handleSubmit}>
          <img
            src={logo}
            class="me-2"
            height="50"
            alt="Logo"
          />
          <center><h1 class="h2 fw-bold mb-0">Fusion Library</h1></center>
          <br />
          <h5 class="fw-normal mb-3 pb-3">Sign Up into your account</h5>
          <div>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleOnChange}
              required
              style={{
                border: "1px solid",
                "border-radius": "5px",
                padding: "5px",
                width: "250px"
              }}
            />
          </div>
          <br></br>
          <div>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleOnChange}
              required
              style={{
                border: "1px solid",
                "border-radius": "5px",
                padding: "5px",
                width: "250px"
              }}
            />
          </div>
          <br></br>
          <div>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleOnChange}
              required
              style={{
                border: "1px solid",
                "border-radius": "5px",
                padding: "5px",
                width: "250px"
              }}
            />
          </div>
          <span class="anchor">
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
          <button type="submit" class="logIn">Sign Up</button>

        </form>
        <ToastContainer />
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <img src={pictures} alt=" not available"></img>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Register;