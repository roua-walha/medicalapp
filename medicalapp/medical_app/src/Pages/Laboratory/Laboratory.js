import React, { useState, useEffect, Fragment } from 'react';
import Authorized from '../Authorized/Authorized';
import LaboratoryHome from '../Laboratory/LaboratoryHome';
import NotAuthorized from '../NotAuthorized/NotAthorized';
import Footers from "../../Components/Footer/Footer";
import Navbars from "../../Components/Nav/Navbar";
import { web3, diagnosticContract } from '../web3Provider';

const Laboratory = () => {
  const [authorized, setAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const isLaboratory = await diagnosticContract.methods.laboratories(accounts[0]).call();
    console.log(accounts[0]);
    setAuthorized(isLaboratory);
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
                <LaboratoryHome />
              ) : (
                <NotAuthorized />
              )}
            </div>
          )}
       
    </header> 
    
        
  );
}

export default Laboratory;