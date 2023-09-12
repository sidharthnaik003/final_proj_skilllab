import { Outlet } from "react-router-dom";
import logo from "../images/library.png";
const Layout = () => {
  return (
    <>
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
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/Service">Edit</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/about">About</a>
              </li>
            </ul>
          </div>
          <br></br>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;