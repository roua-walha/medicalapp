import React, { useState } from 'react';
import { Nav } from "react-bootstrap";
import "./SideBar.css";
import logo from "../../assets/logo.png";
import Patient_Home from '../../Pages/Patient_Home/Patient_Home';
import Home from "../../Pages/Home/Home";
import Appointment_req from '../../Pages/Appointment_Patient/Appointment_req';
import Patient from "../../Pages/Patient/Patient";
import Appointment_view from "../../Pages/Appointment_Patient/Appointment_view"
import Doctor from "../../Pages/Doctor/Doctor";
import Pharmacy from "../../Pages/Pharmacy/Pharmacy";
import { NavDropdown } from "react-bootstrap";
import Patient_Pres from '../../Pages/Patient_Home/Patient_Pres';
const SideBar = () => {
const [currentPage, setCurrentPage] = useState("Home");
const handleNavItemClick = (page) => {
    setCurrentPage(page);
  };
  const renderContent = () => {
    switch (currentPage) {
      case "Home":
        return <Patient_Home />;
      case "Request an Appointment":
        return <Appointment_req />;
      case "View Appointments":
        return <Appointment_view />;
      case "View Prescription":
        return <Patient_Pres/>
      case "Pay Prescription":
        return <Pharmacy />;
      case "View Analayse":
        return 
      case "Pay Analayse":
        return
      default:
        return <Home />;
    }
  };
  return (
    <header id='bodyph'>
    <div className="sidebar">
    <div className="sidebar-logo">
      <img src={logo} alt="logo" title="logo" id="logo" />
    </div>
    <Nav className="flex-column">
      <a
        style={{marginLeft:"20px"}}
        href="#"
        onClick={() => handleNavItemClick("Home")}
        className={currentPage === "Home" ? "activehome" : "noactivehome"}
      >
        Home
      </a>
      <NavDropdown title="Appointment">
  <NavDropdown.Item onClick={() => handleNavItemClick("Request an Appointment")}>
    Request an Appointment
  </NavDropdown.Item>
  <NavDropdown.Item onClick={() => handleNavItemClick("View Appointments")}>
    View Appointments
  </NavDropdown.Item>
</NavDropdown>
<NavDropdown title="Prescriptions">
  <NavDropdown.Item onClick={() => handleNavItemClick("View Prescription")}>
    View Prescription
  </NavDropdown.Item>
  <NavDropdown.Item onClick={() => handleNavItemClick("Pay Prescription")}>
  Pay Prescription
  </NavDropdown.Item>
</NavDropdown>
<NavDropdown title="Analayses">
  <NavDropdown.Item onClick={() => handleNavItemClick("View Analayse")}>
    View Analayse
  </NavDropdown.Item>
  <NavDropdown.Item onClick={() => handleNavItemClick("Pay Analayse")}>
  Pay Analayse
  </NavDropdown.Item>
</NavDropdown>
        </Nav>
        </div>
        <div className='contentS'> {renderContent()} </div>
        </header>
  );
};

export default SideBar;