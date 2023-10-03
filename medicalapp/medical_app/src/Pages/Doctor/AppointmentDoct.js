import React, { useState, useEffect, useRef } from 'react';
import { web3, consultationOnlineContract,diagnosticContract } from '../web3Provider';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
  

  const AppointmentDoct = () => {
    const [appointmentRequests, setAppointmentRequests] = useState([]);
    
    const [patientName, setPatientName] = useState({});
    const [patientBD, setPatientBD] = useState({});
    const[Doctor, setDoctor]=useState(null);
    const[Accepted, setAccepted]=useState(false);
    const priceInputRef = useRef(null);
    useEffect(() => {
        const getAppointment = async () => {
            
            const accounts = await web3.eth.getAccounts();
            const doct= await getDoct(accounts[0]);
            setDoctor(doct.name)
            
            let requests = [];
            
            let i = 0;
            while (true) {
              let request;
              try {
                request = await consultationOnlineContract.methods.Doctor_appointmentRequests(accounts[0], i).call();
                console.log(request.client);
                await getPatientInfo(request.client, i);
                /*
                console.log("request.client");
                */
                
              } catch (err) {
                return;
              }
              if (!request.date) {
                break;
              }
              requests.push(request);
              console.log(i);
              setAppointmentRequests(requests);
              i++;
            }
            setAppointmentRequests(requests);
          };
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
            // const getPatient =async(address)=>{
            // let patients =[];
            // let client;
            // client =await diagnosticContract.patient_information(0x9159bEE4B2a899d913d194F0B9700d5893BCd954).call();
            // console.log(diagnosticContract);
            // patients.push(client.name);
            
            // setpatientName(patients);
            // }
            async function getPatientInfo(address) {
            const patientInfo= await diagnosticContract.methods.patient_information(address).call();
            const name = patientInfo.name;
            const bd =patientInfo.Birth_date;
            console.log(name);
            setPatientName((prevState) => ({
              ...prevState,
              [address]: name,
            }));
            setPatientBD((prevState) => ({
              ...prevState,
              [address]: bd,
            }));
          }
            getAppointment();
          }, [] )
          const handleClick2 = async (id, patient) => {
                const accounts = await web3.eth.getAccounts();
                consultationOnlineContract.methods.refuserRendezVous( id, patient)
                                        .send({ from: accounts[0] })
                                        .then(() => alert('Request rejected'))
          .catch((error) => console.error('Error sending request', error));
                                                }
          const handleClick1 = async (id, patient) => {
                const accounts = await web3.eth.getAccounts();
                consultationOnlineContract.methods.accepterRendezVous( id, patient)
                                          .send({ from: accounts[0] })
                                          .then( ()=>{alert('Request accepted'); setAccepted(true);} )
                                          .catch((error) => console.error('Error sending request', error));
                                                       }
          const handleClickprice = async (addp)=>{
            const price= priceInputRef.current.value;
            const accounts = await web3.eth.getAccounts();
            
            consultationOnlineContract.methods.nouvelleConsultation(addp,'',price)
                                      .send({ from: accounts[0] })
                                      .then(() => alert('Confirmation sent'))
                                      .catch((error) => console.error('Error sending request', error));
          }
                                                                                                        
    return (
      <header>
        <MDBAccordion borderless initialActive={1}>
          <MDBAccordionItem collapseId={1} headerTitle='New Appointment requests'>
          {appointmentRequests.length > 0 ? (
              appointmentRequests.map((request, index) => {
                   console.log(request.accepted);
                if(Number(request.accepted) === 0 ){
                  
                return(
                    
                  <div id="trait_dessus">
                  <div key={index}>
                    <div style={{ display: "flex" }}>
                      <h3 id="h3ph">From: </h3>
                      <h3 id="h3phi">{patientName[request.client]} ({patientBD[request.client]} )</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <h3 id="h3ph">To : </h3>
                      <h3 id="h3phi">{Doctor}</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <h3 id="h3ph">Date : </h3>
                      <h3 id="h3phi">{request.date}</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <button id="butPr" onClick={() => handleClick1(request.id, request.client)}>Accept</button>
                      
                      <button  id="butDra" onClick={() => handleClick2(request.id, request.client)}>Reject</button>
                    </div>
                    {Accepted ? (
                    <div className="user-details">
                  <div className="input-box">
                  <span className="details">Consultation Price</span>
                  <input type="text" placeholder="Consultation Price" ref={priceInputRef}  required />
                </div>
                  
                <div className="input-box"><button id='butPr' onClick={() => handleClickprice(request.client)}>Send</button></div>
          </div>
      
                  ) : null}
                    
                  </div>
                  </div>
                  
                  
                )}
            })
              ) : (
                <p>No appointment requests found.</p>
              )}
            

          </MDBAccordionItem>
          <MDBAccordionItem collapseId={2} headerTitle='Appointment requests accepted'>
          {appointmentRequests.length > 0 ? (
              appointmentRequests.map((request, index) => {
                if(Number(request.accepted) === 1){
                return(
                  <div id="trait_dessus">
                  <div key={index}>
                    
                    <div style={{ display: "flex" }}>
                      <h3 id="h3ph">From: </h3>
                      <h3 id="h3phi">{patientName[request.client]} ({patientBD[request.client]} )</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <h3 id="h3ph">To : </h3>
                      <h3 id="h3phi">{Doctor}</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <h3 id="h3ph">Date : </h3>
                      <h3 id="h3phi">{request.date}</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                    </div>
                    
                  </div>
                  </div>
                )}})
              ) : (
                <p>No appointment requests found.</p>
              )}
          </MDBAccordionItem>
        </MDBAccordion>
        </header>
        );
}
export default AppointmentDoct;