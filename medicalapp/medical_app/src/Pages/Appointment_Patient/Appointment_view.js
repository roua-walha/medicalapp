import React, { useState, useEffect } from 'react';
import './Appointment_view.css';
import { web3, consultationOnlineContract,diagnosticContract } from '../web3Provider';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
const Appointment_view = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [appointmentConss,setAppointmentConss]= useState([]);
  const [accounts, setAccounts] = useState([]);
  const[patientNames, setpatientNames]=useState([]);
  const[patientDoctor, setpatientDoctor]=useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const patientinfo = await diagnosticContract.methods.patient_information(accounts[0]).call();
      const name =patientinfo.name;
      console.log(name);
      setpatientNames(prevNames => [...prevNames, name]);
    };

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
    getAccounts();
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
    const handleClick1 = async( indexcon, indexr,price)=>{
      const accounts = await web3.eth.getAccounts();
      const valueInWei = web3.utils.toWei(price, 'wei');
      consultationOnlineContract.methods
                                .effectuerPaiement(indexcon,indexr)
                                .send({from: accounts[0], value: valueInWei})
                                .then(() => alert('Successful payment'))
          .catch((error) => console.error('Error adding payment:', error));
    }
  return (
    <MDBAccordion borderless initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle='Appointment requests sent'>
      {appointmentRequests.length > 0 ? (
          appointmentRequests.map((request, index) => {

            if(Number(request.accepted) === 0){
              const patientName = patientNames[index];

            return(
              <div id="trait_dessus">
              <div key={index}>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">From: </h3>
                  <h3 id="h3phi">{patientName}</h3>
                </div>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">To : </h3>
                  <h3 id="h3phi">{patientDoctor[index]}</h3>
                </div>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Date : </h3>
                  <h3 id="h3phi">{request.date}</h3>
                </div>
                <div style={{ display: "flex" }}><button id="butDra" >Cancel</button></div>
                
              </div>
              </div>
            )}})
          ) : (
            <p>No appointment requests found.</p>
          )}
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle='Appointment requests accepted'>
      {appointmentRequests.length > 0 ? (
          appointmentRequests.map((request, index) => {
            if(Number(request.accepted) === 1 ){
              const patientName = patientNames[index];
            return(
              <div id="trait_dessus">
              <div key={index}>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">From: </h3>
                  <h3 id="h3phi">{patientName}</h3>
                </div>
                
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">To : </h3>
                  <h3 id="h3phi">{patientDoctor[index]}</h3>
                </div>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Date : </h3>
                  <h3 id="h3phi">{request.date}</h3>
                </div>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Consultation price: </h3>
                  {appointmentConss[index] && appointmentConss[index].cout && (
  <h3 id="h3phi">{appointmentConss[index].cout}</h3>
)}
                </div>
                <div style={{ display: "flex" }}>
                      <button id="butDra" onClick={() =>handleClick1(appointmentConss[index].id,request.id,appointmentConss[index].cout)} >Accept</button>
                      <button id="butDra" >Cancel</button>
                    </div>
                
              </div>
              </div>
            )}})
          ) : (
            <p>No appointment requests found.</p>
          )}
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={3} headerTitle='Appointment requests rejected'>
      {appointmentRequests.length > 0 ? (
          appointmentRequests.map((request, index) => {
            if(Number(request.accepted) === 2){
              const patientName = patientNames[index];
            return(
              <div id="trait_dessus">
              <div key={index}>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">From: </h3>
                  <h3 id="h3phi">{patientName}</h3>
                </div>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">To : </h3>
                  <h3 id="h3phi">medecin</h3>
                </div>
                <div style={{ display: "flex" }}>
                  <h3 id="h3ph">Date : </h3>
                  <h3 id="h3phi">{request.date}</h3>
                </div>
                
              </div>
              </div>
            )}})
          ) : (
            <p>No appointment requests found.</p>
          )}
      </MDBAccordionItem>
      
    </MDBAccordion>);
};

export default Appointment_view;