import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./login.css"
import pictures from "../images/lib_book.jpeg"
import logo from "../images/library.png";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };



  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
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
    });
  };

  return (
    <>
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
            <h5 class="fw-normal mb-3 pb-3">Sign into your account</h5>
            {/* <br></br> */}
            <div>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
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
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                style={{
                  border: "1px solid",
                  "border-radius": "5px",
                  padding: "5px",
                  width: "250px"
                }}
              />
            </div>
            <span class="anchor">
              Dont have an account? <Link to={"/register"}>Signup</Link>
            </span>
            <button type="submit" class="logIn">Log In</button>

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
    </>


  );
};

export default Login;
