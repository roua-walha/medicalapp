import React, { useState, useEffect, Fragment } from 'react';
import './Patient.css';

import NotAuthorized from '../NotAuthorized/NotAthorized';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/SideBar/SideBar'
import { web3, diagnosticContract } from '../web3Provider';
import Footers from "../../Components/Footer/Footer";
import Navbars from "../../Components/Nav/Navbar";
import AddPatient from '../Authorized_doc/AddPatient';
const Patient = () => {
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [signup, setSignup] = useState(false);
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const isPatient = await diagnosticContract.methods.patients(accounts[0]).call();
    setAuthorized(isPatient);
    setIsLoading(false);
    setIsButtonVisible(false);
  };
  const handleClick2 = async (event) => {
    event.preventDefault();
    setSignup(true);
    setIsButtonVisible(false);
  };

  /*useEffect(() => {
    console.log('authorized changed', authorized);
    if (authorized) {
      navigate('/SideBar'); 
    }
  }, [authorized, navigate]);*/


  return (
    <header>
        {isButtonVisible ? (
          <Fragment>
           <Navbars/>
           <div className="container">
        <div className="login">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
              <button id='butM' onClick={handleClick}>
                Login
              </button> 
              </div>
              <div>
              <button id='butM' onClick={handleClick2}>
                Sign up
              </button>
              </div>
            </div>
            </div>
      </div>
            <Footers/>
        </Fragment>
        
          ) : null}
    

      
          
          {signup ? (
            <AddPatient/>
          ) : null}
          {isLoading ? (
            <p>Loading...</p>
          ) : authorized === null ? null : (
            <div>
              {authorized ? (
                <Sidebar/>
              ) : (
                <NotAuthorized />
              )}
            </div>
          )}
       
      </header> 
    
    
  );
}

export default Patient;