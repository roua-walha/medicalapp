import React, {useRef, useState, useEffect } from 'react';
import './Patientrecordview.css';
import { web3, diagnosticContract, consultationOnlineContract } from '../web3Provider';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
const Patientrecordview= () => {
    const [PatientFound,setPatientFound]=useState(false);
    const [Completed,setCompleted]=useState(false);
    const [AddRec,setAddRec]=useState(false);
    const [PatientAddress, setPatientAddress] = useState('');
    const patientNameInputRef = useRef(null);
    const patientBODInputRef = useRef(null);
    const analyseNameInputRef = useRef(null);
    const labInputRef = useRef(null);
    const MedecineNameInputRef = useRef(null);
    const DoseInputRef = useRef(null);
    const DurationInputRef = useRef(null);
    const instructionInputRef = useRef(null);
    const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientBloodType, setPatientBloodType] = useState("");
  const [patientWeight, setPatientWeight] = useState("");
  const [patientHeight, setPatientHeight] = useState("");
    const [patientBod, setPatientBod] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientPhone, setPatientPhone] = useState("");
    const [patientName_Emergency, setPatientName_Emergency] = useState("");
    const [patientPhone_Emergency, setPatientPhone_Emergency] = useState("");
    const [patientRelationship, setPatientRelationship] = useState("");

    
      const handleClick1 = async (event) => {
        event.preventDefault();
        
        const accounts = await web3.eth.getAccounts();
        const inputNValue = patientNameInputRef.current.value;
        const inputBValue = patientBODInputRef.current.value;
        
        
        //const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(inputSValue);
        try{const PatientAdd= await consultationOnlineContract.methods.getpatient_add(inputNValue,inputBValue).call();
          console.log(PatientAdd);
          setPatientAddress(PatientAdd);
          const test= await diagnosticContract.methods.patients(PatientAdd).call();
          console.log(test);
          setPatientFound(test);
          const patientInfo= await diagnosticContract.methods.patient_information(PatientAdd).call();
    const patient_contact= await diagnosticContract.methods.patient_contact(PatientAdd).call();
    const name = patientInfo.name; 
    const age = patientInfo.age;
    const BloodType = patientInfo.bloodtype;
    const Weight =patientInfo.weight;
    const Height =patientInfo.height;
    const bod= patientInfo.Birth_date;
    const gender= patientInfo.Gender;
    const email=patient_contact.email;                                       
    const phone=patient_contact.phone;
    const Name_Emergency=patient_contact.Name_Emergency;
    const Phone_Emergency=patient_contact.Phone_Emergency;
    const Relationship=patient_contact.Relationship;
    setPatientName(name);
    setPatientAge(age);
    setPatientBloodType(BloodType);
    setPatientWeight(Weight);
    setPatientHeight(Height)
    setPatientBod(bod);
    setPatientGender(gender);
    setPatientEmail(email);
    setPatientPhone(phone);
    setPatientName_Emergency(Name_Emergency);
    setPatientPhone_Emergency(Phone_Emergency);
    setPatientRelationship(Relationship);
        }
        catch (err) {
          return;
        }
      };
    
    const handleClick2 = async()=>{
      const accounts = await web3.eth.getAccounts();
      consultationOnlineContract.methods
                                .addPatientRecord(PatientAddress)
                                .send({from: accounts[0]})
                                .then(() => alert('New record'))
          .catch((error) => console.error('Error adding record:', error));
        setAddRec(true);
    }
    const handleClickAna =async (patient)=>{
      const accounts = await web3.eth.getAccounts();
      const inputanalyseName = analyseNameInputRef.current.value;
      const inputlabValue = labInputRef.current.value;
      console.log(inputanalyseName,inputlabValue,patient,accounts[0])
      consultationOnlineContract.methods
                                  .ask_for_analyse(inputanalyseName,0,patient,inputlabValue)
                                  .send({from: accounts[0]})
                                  .then(() => alert('Analyse sent'))
          .catch((error) => console.error('Error sending Analyse:', error));

    }
    const handleClickmedecine =async (patient)=>{
      /*id_rec ,address patient, string memory name, string memory dosage, uint duration, string memory inst
      */ 
      const accounts = await web3.eth.getAccounts();
      const inputMedecineName = MedecineNameInputRef.current.value;
      const inputDoseValue = DoseInputRef.current.value;
      const inputDurationValue = DurationInputRef.current.value;
      const inputinstructionValue = instructionInputRef.current.value;
      
      consultationOnlineContract.methods
                                  .add_medecine(0,patient,inputMedecineName,inputDoseValue,inputDurationValue,inputinstructionValue)
                                  .send({from: accounts[0]})
                                  .then(() => alert('Analyse sent'))
          .catch((error) => console.error('Error sending Analyse:', error));


    }
    const [fillActive, setFillActive] = useState('tab1');

        const handleFillClick = (value) => {
            if (value === fillActive) {
              return;
            }
            setFillActive(value);
          };
          const handleClick40=()=>{
            setCompleted(true);
          }

    return(
        <header>
            {PatientFound ? (
                
                <MDBTable>
                <h2 id='h2hp'>About</h2>
                <MDBTableBody>
                  <tr>
                 
                    <th scope='row'>Full Name</th>
                    <td colSpan={2}>{patientName}</td>
                  
                    <th scope='row'>Date Of Birth</th>
                    <td colSpan={2}>{patientBod}</td>
                    
                  </tr>
                  <tr>
                    <th scope='row'>Age</th>
                    <td colSpan={2}>{patientAge}</td>
                  
                    <th scope='row'>Gender</th>
                    <td colSpan={2}>{patientGender}</td>
                  </tr>
                  <tr>
                    <th scope='row'>BloodType</th>
                    <td colSpan={2}>{patientBloodType}</td>
                  
                    <th scope='row'>Weight</th>
                    <td colSpan={2}>{patientWeight}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Height </th>
                    <td colSpan={2}>{patientHeight}</td>
                  
                    <th scope='row'>Email</th>
                    <td colSpan={2}>{patientEmail}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Phone </th>
                    <td colSpan={2}>{patientPhone}</td>
                  </tr>
                </MDBTableBody>
                <h2 id='h2hp'>Emergency Contact</h2>
                <MDBTableBody>
                  <tr>
                 
                    <th scope='row'>Name</th>
                    <td colSpan={2}>{patientName_Emergency}</td>
                  
                    <th scope='row'>Phone</th>
                    <td colSpan={2}>{patientPhone_Emergency}</td>
                    
                  </tr>
                  <tr>
                    <th scope='row'>Relationship</th>
                    <td colSpan={2}>{patientRelationship}</td>
                  </tr>
                  </MDBTableBody>
                  <h2 id='h2hp'>Medical History</h2>
                  <div className="input-box"><button id='butPr' onClick={handleClick2}>Add new record</button></div>

              </MDBTable>

              

            ):(
                <div id='bodyapr'>

                <div className="title">Search patient</div>
                <div className="user-details">
                          
                          <div className="input-box">
                            <span className="details">Patient's Name</span>
                            <input type='text' placeholder="Enter patient's name" required ref={patientNameInputRef}></input>
                          
                        </div>
                        <div className="input-box">
                        <span className="details">Birth date</span>
                        <input type="date" ref={patientBODInputRef}  required />
                      </div>
                      <div className="input-box"><button id='butPr' onClick={handleClick1}>confirm</button></div>
                </div>
                </div>
            )}
            {AddRec ? (
                <>
        <MDBTabs pills fill className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab1') } active={fillActive === 'tab1'}>
              Ask for analyse
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
          <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
              Describe prescription
            </MDBTabsLink>
            </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
            View analyses result 
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            
          </MDBTabsItem>
        </MDBTabs>
        
        <MDBTabsContent>
          <MDBTabsPane show={fillActive === 'tab1'}> <div id='bodyapr'>
<div className="user-details">
          
          <div className="input-box">
            <span className="details">Analyse Name</span>
            <input type='text' placeholder="Enter analyse's name" required ref={analyseNameInputRef}></input>
          
        </div>
        <div className="input-box">
        <span className="details">Laboratory</span>
        <input type="text" placeholder="Laboratory address" ref={labInputRef}  required />
      </div>
      <div className="input-box"><button id='butPr' onClick={() => handleClickAna(PatientAddress)}>confirm</button></div>
</div>
</div> </MDBTabsPane>
          <MDBTabsPane show={fillActive === 'tab2'}> <div id='bodyapr'> <div className="user-details">
          
          <div className="input-box">
            <span className="details">Medecine Name</span>
            <input type='text' placeholder="Enter medecine name" required ref={MedecineNameInputRef}></input>
          
        </div>
        <div className="input-box">
        <span className="details">Dose</span>
        <input type="text" placeholder="Medecine dose" ref={DoseInputRef} required />
      </div>
      <div className="input-box">
            <span className="details">Duration</span>
            <input type='text' placeholder="Enter medecine duration per day" required ref={DurationInputRef}></input>
          
        </div>
        <div className="input-box">
            <span className="details">Instruction</span>
            <input type='text' placeholder="Enter instruction" required ref={instructionInputRef}></input>
          
        </div>
      <div className="input-box"><button id='butPr' onClick={() => handleClickmedecine(PatientAddress) }>Add medecine</button></div>
</div>
</div> </MDBTabsPane>
          <MDBTabsPane show={fillActive === 'tab3'}></MDBTabsPane>
          
        </MDBTabsContent>
        <div className="input-box"><button id='butPr' onClick={handleClick40}>Consultation completed</button></div>

      </>
              ) : null }
              {Completed? (
                <div className="input-box">
                <span className="details">Diagnosis</span>
                <input type='text' placeholder="Enter patient Statue" required ref={instructionInputRef}></input>
              
            </div>
              ) : null}

              
            
            
            
        
        </header>

    );

};


export default Patientrecordview;