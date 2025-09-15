import "./Navbar.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-mia">
      <div className="nav-left d-flex">
        <a className="active" href={`/`}>
          {" "}
          Home{" "}
        </a>{" "}
        <a href={`/chisiamo`}> Chi siamo </a>
      </div>

      <img src={logo} alt="LOGO" className="logo" />
      <div className="nav-right d-flex">
        <a href={`/login`}> Login </a>
        <a href={`/singup`}> Registrazione </a>
      </div>
    </nav>
  );
}
export default Navbar;
