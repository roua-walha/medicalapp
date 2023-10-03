import React, {useRef, useState, useEffect } from 'react';

import { web3, diagnosticContract, consultationOnlineContract } from '../web3Provider';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const Allanalyses= () => {
    /*string name;
        address patient;
        address doctor;
        string resultat;
        uint price;
        bool paid;*/ 
        const [patientName, setPatientName] = useState("");
        const [patientDoctor, setpatientDoctor] = useState("");
        const [Analyses, setAnalyses] = useState([]);
        useEffect(() => {
            
            const getAnalyses = async () => {
                
                const accounts = await web3.eth.getAccounts();
                let analyses = [];
                let docs =[];
                let patients =[];
                let i = 0;
                while (true) {
                  let analyse; 
                  
                  try {
                    
                    analyse = await diagnosticContract.methods.laboratory_analyses(accounts[0], i).call();
                    
                    const doct =await getDoct(analyse.doctor);
                    
                    const patient=await getPatientInfo(analyse.patient)
                    
                    setPatientName(patient.name);
                    docs.push(doct.name);
                    setpatientDoctor(docs);
                    
          
                  } catch (err) {
                    return;
                  }
                  if (!analyse.patient) {
                    break;
                  }
                  analyses.push(analyse);
                  setAnalyses(analyses);
                  i++;
                }
              };
              
            
            getAnalyses();
            
          }, []);
          async function getPatientInfo(address) {
            const accounts = await  web3.eth.getAccounts();
            const patientInfo= await diagnosticContract.methods.patient_information(address).call();
            
            
            return(patientInfo);
            }
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
    return(
        <header>
                <MDBTable>
                <h2 id='h2hp'>Analyses</h2>
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
          Analyses.map((analyse, index) => {
            
              
            return(
                  <tr>
                    <td scope='row'>{patientName}</td>
                    <td scope='row'>{patientDoctor}</td>
                    <td scope='row'>{analyse.name}</td>
                    <td scope='row'>{analyse.resultat}</td>
                    <td scope='row'>{analyse.price}</td>
                    <td scope='row'>{analyse.paid ? (<p>True</p>) : (<p>False</p>)}</td>
                  </tr>
                  
                  )})
          ) : null}
                </MDBTableBody>
                
                  
              </MDBTable>
        
        </header>

    );

};


export default Allanalyses;