import React, { useState,useRef, useEffect, Fragment } from 'react';
import './Patient_Home.css';
import { web3, diagnosticContract,consultationOnlineContract } from '../web3Provider';

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
const Patient_Home = () => {
    const [appointmentRequests, setAppointmentRequests] = useState([]);
    const [appointmentConss,setAppointmentConss]= useState([]);
    const [accounts, setAccounts] = useState([]);
    const [Viewpres, setViewpres]=useState(false);
    const [AnalView,setAnalView]=useState(false);
    const[Pres, setPres]=useState(null);
    const[FormSend,setFormSend]=useState(false);
    const[Record, setRecord]=useState(null);
    const[patientDoctor, setpatientDoctor]=useState(null);
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
    const [Analyses, setAnalyses] = useState([]);
    const labAddInputRef = useRef(null);
    useEffect(() => {
    async function getPatientInfo() {
    const accounts = await  web3.eth.getAccounts();
    setAccounts(accounts);
    const patientInfo= await diagnosticContract.methods.patient_information(accounts[0]).call();
    const patient_contact= await diagnosticContract.methods.patient_contact(accounts[0]).call();
    const name = patientInfo.name; //web3.utils.hexToAscii(patientInfo.name)
    //console.log(web3.eth.abi.decodeParameter('string', patientInfo.name));
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
    const getAppointment = async () => {
        const accounts = await web3.eth.getAccounts();
        let requests = [];
        let docs =[];
        let i = 0;
        while (true) {
          let request;
          try {
            request = await consultationOnlineContract.methods.Patient_appointmentRequests(accounts[0], i).call();
            const doct =await getDoct(request.medecin);
            docs.push(doct.name);
            setpatientDoctor(docs);
  
          } catch (err) {
            return;
          }
          if (!request.date) {
            break;
          }
          requests.push(request);
          setAppointmentRequests(requests);
          i++;
        }
      };
      const getCons = async()=>{
        const accounts = await web3.eth.getAccounts();
        let Conss = [];
        let j = 0;
        while(true){
          let Cons;
          try {
            Cons = await consultationOnlineContract.methods.Patient_consultations(accounts[0], j).call();
            console.log(Cons.cout);
          } catch (err) {
            return;
          }
          Conss.push(Cons);
          setAppointmentConss(Conss);
          j++;
        }
        };
        const getAnalyses = async () => {
                
          const accounts = await web3.eth.getAccounts();
          let analyses = [];
          let docs =[];
          let patients =[];
          let n = 0;
          while (true) {
            let analyse; 
            
            try {
              
              analyse = await diagnosticContract.methods.laboratory_analyses('0x2ccB301c8f77DB4D3834A17500839f6c0A860686', n).call();
              console.log(analyse);
              
              
              
              
    
            } catch (err) {
              return;
            }
            if (analyse.patient!=accounts[0]) {
              break;
            }
            analyses.push(analyse);
            setAnalyses(analyses);
            n++;
          }
        };
        
      
      getAnalyses();
    getPatientInfo();
    getAppointment();
    getCons();
    
  }, []);
  const getDoct = async(address)=>{
    let add;
    let doctor;
    let j=0;
    let test=true;
    while(test){
      doctor = await consultationOnlineContract.methods.doctor_information(j).call();
      
      add =doctor.doct_add;
      console.log(add===address)
      if(add===address){
        
        return(doctor)
      }
      else{j++;}
    }
    };
    const handleClickPres =async()=>{
      const accounts = await web3.eth.getAccounts();
        
        console.log('here');
          let Pres;
          try {
            Pres = await diagnosticContract.methods.patient_medecines(accounts[0], 0, 0).call();
          } catch (err) {
            return;
          }
          setPres(Pres);
          setViewpres(true);
    }
/*approve_pharmacy(address pharmacie,uint id_rec)*/

    const handleClickSendPres =async()=>{
      const accounts = await web3.eth.getAccounts();
      const pharmacie=labAddInputRef.current.value;
        
          
          
            consultationOnlineContract.methods
                                      .approve_pharmacy(pharmacie, 0)
                                      .send({from: accounts[0]})
                                      .then(() => alert('Prescription sent'))
              .catch((error) => console.error('Error sending Prescription:', error));
          
    }
    const handleClickFormSend =()=>{
      setFormSend(true);
    }
    /*const handleClickFormAnal =()=>{
      setFormAnal(true);
    }*/
    const handleClickAnalView =async()=>{
      
          setAnalView(true);
    }
    const handleClickPay =async(id,price)=>{
      const valueInWei = web3.utils.toWei(price, 'wei');
      //pay_analyse (uint id,address payable lab )
      consultationOnlineContract.methods
                                      .pay_analyse(id, '0x2ccB301c8f77DB4D3834A17500839f6c0A860686')
                                      
                                      .send({from: accounts[0], value: valueInWei})
                                .then(() => alert('Successful payment'))
          .catch((error) => console.error('Error adding payment:', error));
              
    }
    return (
      <div id="homep">
        <h2 id="h2hp">About</h2>
        <div id="trait_dessus">
          <table>
            <tbody>
              <tr>
                <td className="td">
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Full Name</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientName}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Date Of Birth</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientBod}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Age</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientAge}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Gender</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientGender}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">BloodType</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientBloodType}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Weight</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientWeight}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Height</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientHeight}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Email</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientEmail}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: "flex" }}>
                    <h3 id="h3ph">Phone</h3>
                  </div>
                </td>
                <td>
                  <h3 id="h3phi">{patientPhone}</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 id="h2hp">Emergency Contact</h2>
        <div id="trait_dessus"></div>
        <table>
          <tbody>
            <tr>
              <td className="td">
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Name</h3>
                </div>
              </td>
              <td>
                <h3 id="h3phi">{patientName_Emergency}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Phone</h3>
                </div>
              </td>
              <td>
                <h3 id="h3phi">{patientPhone_Emergency}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Relationship</h3>
                </div>
              </td>
              <td>
                <h3 id="h3phi">{patientRelationship}</h3>
              </td>
            </tr>
          </tbody>
        </table>
    
        <h2 id="h2hp">Medical History</h2>
        <div id="trait_dessus"></div>
        <MDBTable>
          <MDBTableBody>
            <tr>
              <th scope="row">Diagnostic date</th>
              <th scope="row">Doctor name</th>
              <th scope="row">Analyses</th>
              <th scope="row">Prescription</th>
              <th scope="row">Status</th>
            </tr>
            {appointmentRequests.length > 0 ? (
              appointmentRequests.map((request, index) => {
                if (Number(request.accepted) === 3) {
                  return (
                    <tr key={index}>
                      <td scope="row">{request.date}</td>
                      <td scope="row">{patientDoctor}</td>
                      <td scope="row">
                        {" "}
                        <button
                          id="butanal"
                          onClick={() => handleClickAnalView()}
                        >
                          View
                        </button>{" "}
                      </td>
                      <td scope="row">
                        <button id="butanal" onClick={() => handleClickPres()}>
                          View
                        </button>
                      </td>
                      <td scope="row"> </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <tr>
                <td colSpan="5">No medical history found</td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
    
        {Viewpres && (
          <MDBTable>
            <h2 id="h2hp">Prescription</h2>
            <MDBTableBody>
              <tr>
                <th scope="row">Medicine name</th>
                <th scope="row">Dose</th>
                <th scope="row">Duration</th>
                <th scope="row">Instruction</th>
              </tr>
              <tr>
                <td scope="row">{Pres.name}</td>
                <td scope="row">{Pres.dosage}</td>
                <td scope="row">{Pres.duration} days</td>
                <td scope="row">{Pres.instructions}</td>
              </tr>
              <tr>
                <button id="butanal" onClick={handleClickFormSend}>
                  Send
                </button>
              </tr>
            </MDBTableBody>
          </MDBTable>
        )}
    
        {FormSend && (
          <div id="bodyapr">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Pharmacy address</span>
                <input
                  type="text"
                  placeholder="Enter Pharmacy's address"
                  required
                  ref={labAddInputRef}
                ></input>
              </div>
              <div className="input-box">
                <button id="butPr" onClick={handleClickSendPres}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
    
    {AnalView && (
  <MDBTable>
    <MDBTableBody>
      <tr>
        <th scope='row'>Patient</th>
        <th scope='row'>Doctor</th>
        <th scope='row'>Analyse name</th>
        <th scope='row'>Result</th>
        <th scope='row'>Price</th>
        <th scope='row'>Paid</th>
      </tr>
      {Analyses.length > 0 ? (
        Analyses.map((analyse, index) => (
          <tr key={index}>
            
            
            <td scope='row'>{patientName}</td>
            <td scope='row'>{patientDoctor}</td>
            <td scope='row'>{analyse.name}</td>
            <td scope='row'>{analyse.paid ? <p>{analyse.resultat}</p> : <p>You have to pay to see the result</p> }</td>
            <td scope='row'>{analyse.price}</td>
            <td scope='row'>{analyse.paid ? <p>True</p> : <button id="butanal"  onClick={() => handleClickPay(analyse.id,analyse.price)} >   
                  pay
                </button> }</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan='5'>No analyses found</td>
        </tr>
      )}
    </MDBTableBody>
  </MDBTable>
)}
      </div>
    );
              }
    export default Patient_Home;