import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import logo from "../images/library.png";
import Axios from "axios";
import './home.css';

const Home = () => {
  const [fdata, setFData] = useState([]);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);
      if (status) {
        const hasShownLoginToast = localStorage.getItem("hasShownLoginToast");  // show the toast notification only once
        if (!hasShownLoginToast) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
          localStorage.setItem("hasShownLoginToast", "true");
        }
      } else {
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    localStorage.removeItem("hasShownLoginToast"); // Clear the flag+
    removeCookie("token");
    navigate("/login");
  };
  Axios.get("http://localhost:4000/book")
    .then((res) => {
      setFData(res.data);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
  return (
    <>
      <body>
        <nav class="navbar sticky-top navbar-expand-lg ">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img
                src={logo}
                class="me-2 ps-0"
                height="40"
                alt="Logo"
              />
              <small>Fusion Library</small>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0 ">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Service">Edit</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/about">About</a>
                </li>
              </ul>
              <form class="d-flex" >
                <button class="btn btn-outline-danger logoutButton" onClick={Logout}>Logout</button>
              </form>
            </div>
          </div>
        </nav>
        <br></br>
        <center><h1 style={{ position: "center", fontFamily: "sans-serif" }}>Books Sections</h1></center>
        <br></br>
        <br></br>
        <div className="container row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-4">
          {fdata.slice(-4).map((book) => (
            <div className="col-md-3 col-lg-3 col-sm-6 mb-4" key={book._id}>
              <div className="card shadow-sm">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt="Book Cover"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    <strong>Year:</strong> {book.year}
                  </p>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    {/* <a href={`/view`} className="viewButton">
                      View
                    </a> */}
                    <form action="/view" >
                      <button class="btn btn-danger viewButton" type="submit">View</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </body>
      <br />
      <hr></hr>
      <footer class="bg-light pb-5">
        <div class="container text-center">
          <div>
            <div>Contact US</div>
            <div>Phone:+91 7986525131</div>
            <div>E-Mail:codecommanders@gmail.com</div>
          </div>
          <p class="font-italic text-muted mb-0">
            &copy; Copyrights CodeCommanders All rights reserved.
          </p>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default Home;
