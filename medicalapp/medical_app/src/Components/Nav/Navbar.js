import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Nav.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Navbars = () => {
  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" title="logo" id="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/home"
              className={location.pathname === "/home" ? "active" : ""}
            >
              Home
            </Link>
            <Link
              to="/Manager"
              className={location.pathname === "/Manager" ? "active" : ""}
            >
              Manager
            </Link>
            <Link
              to="/Patient"
              className={location.pathname === "/Patient" ? "active" : ""}
            >
              Patient
            </Link>
            <Link
              to="/Doctor"
              className={location.pathname === "/Doctor" ? "active" : ""}
            >
              Doctor
            </Link>
            <Link
              to="/Pharmacy"
              className={location.pathname === "/Pharmacy" ? "active" : ""}
            >
              Pharmacy
            </Link>
            <Link
              to="/Laboratory"
              className={location.pathname === "/Laboratory" ? "active" : ""}
            >
              Laboratory
            </Link>
            <Link>
              <FontAwesomeIcon icon={faSearch} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faPhone} className="phone" />
              +(216) 74 111 555{" "}
            </Link>
            <Link>
              <button>
                Contact us <span> {">"} </span>
              </button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;