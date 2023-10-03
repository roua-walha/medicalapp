import React, { useState, useEffect, Fragment } from 'react';

import PharmacyHome from '../Pharmacy/PharmacyHome'
import NotAuthorized from '../NotAuthorized/NotAthorized';

import { web3, diagnosticContract } from '../web3Provider';
import Footers from "../../Components/Footer/Footer";
import Navbars from "../../Components/Nav/Navbar";
const Pharmacy = () => {
  const [authorized, setAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const isPharmacy = await diagnosticContract.methods.pharmacy(accounts[0]).call();
    setAuthorized(isPharmacy);
    setIsLoading(false);
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
                <PharmacyHome />
              ) : (
                <NotAuthorized />
              )}
            </div>
          )}
       
    </header> 
  );
}

export default Pharmacy;