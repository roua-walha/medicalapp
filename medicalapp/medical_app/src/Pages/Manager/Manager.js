import React, { useState, useEffect, Fragment } from 'react';
import './Manager.css';
import { web3, diagnosticContract } from '../web3Provider';
import ManagerFunction from '../Manager/ManagerFunction';
import NotAuthorized from '../NotAuthorized/NotAthorized';
import Footers from "../../Components/Footer/Footer";
import Navbars from "../../Components/Nav/Navbar";
const Manager = () => {
  const [authorized, setAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsButtonVisible(false);
    const accounts = await web3.eth.getAccounts();
    console.log(diagnosticContract);
    diagnosticContract.methods.manager().call()
  .then((manager) => {
    console.log(`Le manager est : ${manager}`);
    console.log(`le connecté est: ${accounts[0]}`)
  })
  .catch((error) => {
    console.error(`Erreur : ${error}`);
  });
    const Manager = await diagnosticContract.methods.manager().call();
    console.log('here',Manager);
    const isManager= accounts[0] === Manager;
    setAuthorized(isManager);
    setIsLoading(false);
  };
  useEffect(() => {
    console.log('authorized changed', authorized);
  }, [authorized]);
    return (
      <Fragment>
        <Navbars/>
        <header>
          <div className="container" >
            <div className="login">
            {isButtonVisible ? (
            
            <form>
              
              <button id="butM" onClick={handleClick}>
                Login
              </button>
            </form>
          ) : null}
              {isLoading ? (
                <p>Loading...</p>
              ) : authorized === null ? null : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {authorized ? (
                    <ManagerFunction />
                  ) : (
                    <NotAuthorized />
                  )}
                </div>
              )}
            </div>
          </div>
        </header> 
        <Footers/>
        </Fragment>
      );
}
export default Manager;