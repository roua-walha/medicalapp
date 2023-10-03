import React, { useState, useRef  } from 'react';
import './DoctSignUp.css';
import styled from 'styled-components';
import { web3, diagnosticContract,consultationOnlineContract } from '../web3Provider';
const DoctSignUp = () => {
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
  const nameInputRef = useRef(null);
  const doctorSpecialityInputRef= useRef(null);
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const name= nameInputRef.current.value;
    console.log(name);
    const speciality= doctorSpecialityInputRef.current.value;
    console.log(speciality);
    const isValidAddress= await diagnosticContract.methods.doctors(accounts[0]).call();
    console.log(isValidAddress);
    if (isValidAddress) {
        consultationOnlineContract.methods.addDoctorInfo(name, speciality)
                                          .send({ from: accounts[0] })
                                          .then(() => alert('Doctor added'))
          .catch((error) => console.error('Error adding doctor info:', error));
                                          ;}
    else
      {
        alert("Patient is already added");
      }
    setIsLoading(false);
  };
  return (
    <header id='body'>
      <div className="containerAdd">
        <div className="title">Registration</div>
        <div className="content">
          <form action="#" id='form'>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" ref={nameInputRef}  placeholder="Enter your name" required />
              </div>
              <div className="input-box">
                  <span className="details">specialty</span>
                  <select name="Blood Type" id="Blood-select" ref={doctorSpecialityInputRef}>
                    <option value="">--Please choose an option--</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Family medicine">Family medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="General surgery">General surgery</option>
                    <option value="Anesthesiology">Anesthesiology</option>
                  </select>
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

export default DoctSignUp;