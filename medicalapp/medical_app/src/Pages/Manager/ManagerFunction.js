import React, { useState, useRef  } from 'react';
import './ManagerFunction.css';
import { web3, diagnosticContract } from '../web3Provider';


const ManagerFunction = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [doctorInputValue, setDoctorInputValue] = useState('');
  const [labInputValue, setLabInputValue] = useState('');
  const [pharmacyInputValue, setPharmacyInputValue] = useState('');
  const doctorInputRef = useRef(null);
  const labInputRef = useRef(null);
  const pharmacyInputRef = useRef(null);
  const handleClick1 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const inputValue = doctorInputRef.current.value;
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputValue);
    if (isValidAddress) {
        setDoctorInputValue(inputValue);
        const isDoctorAdded = await diagnosticContract.methods.doctors(inputValue).call();
      if(isDoctorAdded)
      {
        alert("Doctor is already added");
      }
      else {
      diagnosticContract.methods.assigningdoctor(inputValue).send({ from: accounts[0] });
      alert("Doctor added");}
    } else {
      alert('Invalid address format!');
    }
  };
  const handleClick2 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const inputValue = labInputRef.current.value;
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputValue);
    if (isValidAddress) {
        setLabInputValue(inputValue);
        const isLabAdded = await diagnosticContract.methods.laboratories(inputValue).call();
      if(isLabAdded)
      {
        alert("Laboratory is already added");
      }
      else {
      diagnosticContract.methods.assigninglaboratory(inputValue).send({ from: accounts[0] });
      alert("Laboratory added");}
    } else {
      alert('Invalid address format!');
    }
  };
  const handleClick3 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const inputValue = pharmacyInputRef.current.value;
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputValue);
    if (isValidAddress) {
        setPharmacyInputValue(inputValue);
        const isParmacyAdded = await diagnosticContract.methods.pharmacy(inputValue).call();
      if(isParmacyAdded)
      {
        alert("Pharmacy is already added");
      }
      else {
      diagnosticContract.methods.assigningpharmacy(inputValue).send({ from: accounts[0] });
      alert("Pharmacy added");}
    } else {
      alert('Invalid address format!');
    }
  };
    return(
        <header>
      <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div ><input id='inM' type ="text" ref={doctorInputRef}></input>
      <button id='butM' onClick={handleClick1}>Add doctor</button></div>
      <div  ><input id='inM' type ="text" ref={labInputRef}></input>
      <button id='butM' onClick={handleClick2}>Add laboratory</button></div>
      <div ><input id='inM' type ="text" ref={pharmacyInputRef}></input>
      <button id='butM' onClick={handleClick3}>Add pharmacy</button></div>
      
    </div>
      </div>
      </header>
        
    );
}
export default ManagerFunction;
