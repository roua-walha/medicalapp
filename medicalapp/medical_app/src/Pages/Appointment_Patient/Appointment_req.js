import React, { useState, useEffect, useRef } from 'react';
import './Appointment_re.css';
import { web3, diagnosticContract, consultationOnlineContract } from '../web3Provider';
import Calandar from '../Calandar/Calandar';

const Appointment_req = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidaddress, setIsValidaddress] = useState(false);
  const [doctorInputValue, setDoctorInputValue] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const doctorSpecialityInputRef = useRef(null);
  const CityInputRef = useRef(null);
  const doctorNameInputRef = useRef(null);

  const handleClick1 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accounts = await web3.eth.getAccounts();
    const inputSValue = doctorSpecialityInputRef.current.value;
    const inputNValue = doctorNameInputRef.current.value;
    const inputCValue = CityInputRef.current.value;
    setSelectedCity(inputCValue);
    //const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputSValue);
    try{const DoctorAddress= await consultationOnlineContract.methods.getdoct_add(inputNValue,inputSValue).call();
      setDoctorInputValue(DoctorAddress);
      const test= await diagnosticContract.methods.doctors(doctorInputValue).call();
      setIsValidaddress(test);
    }
    catch (err) {
      return;
    }
  };
  const handleClick2 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if(isValidaddress){const accounts = await web3.eth.getAccounts();
      console.log(doctorInputValue);
      consultationOnlineContract.methods.prendreRendezVous(doctorInputValue, selectedDateTime,selectedCity)
                                        .send({ from: accounts[0] })
                                        .then(() => alert('Request sent'))
          .catch((error) => console.error('Error sending request', error));
                                          }
  };

  return (
    <div id='bodyapr'>
      <form>
      <div className="containerAddapr"> 
      <div className="title">Choose a doctor</div>
                <div className="user-details">
                  
                  <div className="input-box">
                    <span className="details">Doctor's Name</span>
                    <input type='text' placeholder="Enter doctor's name" required ref={doctorNameInputRef}></input>
                  
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
                <div className="input-box">
                  <span className="details">City</span>
                  <select name="Blood Type" id="Blood-select" ref={CityInputRef}>
                    <option value="">--Please choose an option--</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Gafsa">Gafsa</option>
                    <option value="Nabeul">Nabeul</option>
                    <option value="Kef">Kef</option>
                  </select>
                </div>
                </div>
             <div className="input-box"><button id='butPr' onClick={handleClick1}>confirm</button></div>
           
          <div className="title">Choose a date and time for your appointment:</div>
          <Calandar setSelectedDateTime={setSelectedDateTime} />
          
          <button id='butPr' onClick={handleClick2}>Confirm  Apoointment Request</button>
          </div>
      </form>
    </div>
  )
}
export default Appointment_req;