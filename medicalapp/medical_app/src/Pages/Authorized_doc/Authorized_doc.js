import React, { useState } from 'react';

import { Nav } from "react-bootstrap";
import "./Authorized_doc.css";
import logo from "../../assets/logo.png";
import Home from "../../Pages/Home/Home";
import Appointment_req from '../../Pages/Appointment_Patient/Appointment_req';
import Patient from "../../Pages/Patient/Patient";
import Appointment_view from "../../Pages/Appointment_Patient/Appointment_view"
import Doctor from "../../Pages/Doctor/Doctor";
import Pharmacy from "../../Pages/Pharmacy/Pharmacy";
import { NavDropdown } from "react-bootstrap";
import DoctHome from "../Doctor/DoctHome";
const Authorized_doc = () => {
const [currentPage, setCurrentPage] = useState("Home");
const handleNavItemClick = (page) => {
    setCurrentPage(page);
  };
  const renderContent = () => {
    switch (currentPage) {
      case "Home":
        return <DoctHome />;
      case "Request an Appointment":
        return <Appointment_req />;
      case "View Appointments":
        return <Appointment_view />;
      case "View Prescription":
        return <Doctor />;
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
        <div className='contentSD'> {renderContent()} </div>
        </header>
  );
};

export default Authorized_doc;