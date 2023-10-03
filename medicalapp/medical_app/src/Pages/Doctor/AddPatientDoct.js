import React, { useState, useRef  } from 'react';
import './AddPatientDoct.css';
import styled from 'styled-components';
import { web3, diagnosticContract,consultationOnlineContract } from '../web3Provider';
const AddPatientDoct = () => {
  const StyledButton = styled.button`
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);

    &:hover {
      background: #9b59b6;
    }
  `;
  const [isLoading, setIsLoading] = useState(false);
  const [addressInputValue, setAddressInputValue] = useState('');
  const [g, setG] = useState("");
  const addressInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const bloodInputRef= useRef(null);
  const weightInputRef= useRef(null);
  const heightInputRef= useRef(null);
  const ageInputRef= useRef(null);
  const birthInputRef= useRef(null);
  const maleInputRef = useRef();
  const femaleInputRef = useRef();
  const handleGenderChange = () => {
    if (maleInputRef.current.checked) {
      setG("Male");
    } else if (femaleInputRef.current.checked) {
      setG("Female");
    }
  };
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const Name_EmergencyInputRef = useRef();
  const Phone_EmergencyInputRef = useRef();
  const Relation_EmergencyInputRef = useRef();
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const inputValue = addressInputRef.current.value;
    const name= nameInputRef.current.value;
    const bloodtype= bloodInputRef.current.value;
    const weight=weightInputRef.current.value;
    const height= heightInputRef.current.value;
    const age= ageInputRef.current.value;
    const bod= birthInputRef.current.value;
    const email= emailInputRef.current.value;
    const phone= phoneInputRef.current.value;
    const Name_Emergency =Name_EmergencyInputRef.current.value;
    const Phone_Emergency =Phone_EmergencyInputRef.current.value;
    const Relationship =Relation_EmergencyInputRef.current.value;
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputValue); 
    if (isValidAddress) {
        setAddressInputValue(inputValue);
        const isPatientAdded = await diagnosticContract.methods.patients(inputValue).call();
      if(isPatientAdded)
      {
        alert("Patient is already added");
      }
      else {
        consultationOnlineContract.methods
          .addNewPatientInfo(inputValue, name, bloodtype, weight, height, age, bod, g)
          .send({ from: accounts[0] })
          .then(() => alert('Patient added'))
          .catch((error) => console.error('Error adding patient info:', error));
        consultationOnlineContract.methods
          .addPatientContact(inputValue, email, phone,Name_Emergency,Phone_Emergency,Relationship)
          .send({ from: accounts[0] })
          .then(() => alert('Patient added'))
          .catch((error) => console.error('Error adding patient contact:', error));
      }
    } else {
      alert('Invalid address format!');
    }
    setIsLoading(false);
  };

  return (
    <header id='bodyDoct'>
      <div className="containerAdd">
        <div className="title">Registration</div>
        <div className="content">
          <form action="#" id='form'>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" ref={nameInputRef}  placeholder="Enter patient's name" required />
              </div>
              <div className="input-box">
                <span className="details">Birth date</span>
                <input type="date" ref={birthInputRef}  required />
              </div>
              <div className="input-box">
  <span className="details">Age</span>
  <input type="text" ref={ageInputRef} placeholder="Enter patient's age" required />
</div>
              
              
    <div className="input-box">
  <span className="details">Blood Type</span>
  <select name="Blood Type" id="Blood-select" ref={bloodInputRef}>
    <option value="">--Please choose an option--</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
</div>
<div className="input-box">
  <span className="details">Height</span>
  <input type="text" ref={heightInputRef}  placeholder="Enter patient's Height" required />
</div>
<div className="input-box">
  <span className="details">Weight</span>
  <input type="text" ref={weightInputRef} placeholder="Enter patient's Weight" required />
</div>
<div className="input-box">
                <span className="details">Email</span>
                <input type="email" ref={emailInputRef} placeholder="Enter patient's email" required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="tel" ref={phoneInputRef}  placeholder="Enter patient's number" required />
              </div>
              <div className="input-box">
  <span className="details">Account address</span>
  <input type="text" ref={addressInputRef} placeholder="Enter patient's Account address" required />
</div>
<div className="input-box">
  <span className="details">Emergency contact Name</span>
  <input type="text" ref={Name_EmergencyInputRef}  required />
</div>
<div className="input-box">
  <span className="details">Emergency contact Phone </span>
  <input type="text" ref={Phone_EmergencyInputRef}  required />
</div>
<div className="input-box">
  <span className="details">Emergency contact Relationship </span>
  <input type="text" ref={Relation_EmergencyInputRef}  required />
</div>
              
            </div>
            <div className="gender-details">
              <input type="radio" name="gender" id="dot-1" ref={maleInputRef} onChange={handleGenderChange}/>
              <input type="radio" name="gender" id="dot-2" ref={femaleInputRef} onChange={handleGenderChange} />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                
              </div>
            </div>
            <div >
              <StyledButton type="submit" onClick={handleClick}>Register</StyledButton>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default AddPatientDoct;
