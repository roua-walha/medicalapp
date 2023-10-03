import React, { useState, useEffect, Fragment } from 'react';
import './Doctor.css';
import Authorized_doc from '../Authorized_doc/Authorized_doc';
import NotAuthorized from '../NotAuthorized/NotAthorized';
import Footers from "../../Components/Footer/Footer";
import Navbars from "../../Components/Nav/Navbar";
import DoctSignUp from "../Doctor/DoctSignUp"
import { web3, diagnosticContract } from '../web3Provider';

const Doctor = () => {
  const [authorized, setAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [signup, setSignup] = useState(false);
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const isDoctor = await diagnosticContract.methods.doctors(accounts[0]).call();
    setAuthorized(isDoctor);
    setIsLoading(false);
    setIsButtonVisible(false);
  };
  const handleClick2 = async (event) => {
    event.preventDefault();
    setSignup(true);
    setIsButtonVisible(false);
  };

  useEffect(() => {
    console.log('authorized changed', authorized);
  }, [authorized]);

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
          {isLoading ? (
            <p>Loading...</p>
          ) : authorized === null ? null : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {authorized ? (
                <Authorized_doc />
              ) : (
                <NotAuthorized />
              )}
            </div>
          )}
          {signup ? (
            <DoctSignUp/>
          ) : null}
      
    </header> 
    
  );
}

export default Doctor;