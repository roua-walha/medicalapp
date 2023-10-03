import React, { useRef, useState, useEffect } from 'react';
import { web3, diagnosticContract, consultationOnlineContract } from '../web3Provider';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const SendAnalyse = () => {
  const [result, setresult] = useState(false);
  const [price, setprice] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientInfo, setPatientInfo] = useState("");
  const [patientDoctor, setPatientDoctor] = useState("");
  const [analyses, setAnalyses] = useState([]);
  const resultInputRef = useRef(null);
  const PriceInputRef = useRef(null);
  useEffect(() => {
    const getAppointment = async () => {
      const accounts = await web3.eth.getAccounts();
      let analysesArray = [];
      let docs = [];
      let i = 0;
      
      while (true) {
        let analyse;

        try {
          analyse = await diagnosticContract.methods.laboratory_analyses(accounts[0], i).call();

          const doct = await getDoct(analyse.doctor);
          const patient = await getPatientInfo(analyse.patient);
          setPatientInfo(patient)
          setPatientName(patient.name);
          docs.push(doct.name);
          setPatientDoctor(docs);
        } catch (err) {
          return;
        }
        
        if (!analyse.patient) {
          break;
        }
        
        analysesArray.push(analyse);
        setAnalyses(analysesArray);
        i++;
      }
    };

    getAppointment();
  }, []);

  async function getPatientInfo(address) {
    const accounts = await web3.eth.getAccounts();
    const patientInfo = await diagnosticContract.methods.patient_information(address).call();
    return patientInfo;
  }

  const getDoct = async (address) => {
    let add;
    let doctor;
    let j = 0;
    let test = true;

    while (test) {
      doctor = await consultationOnlineContract.methods.doctor_information(j).call();
      add = doctor.doct_add;

      console.log(add === address);

      if (add === address) {
        return doctor;
      } else {
        j++;
      }
    }
  };

  const handleClickRes = () => {
    setresult(true);
    setprice(true);
  };

  /*const handleClickPice = () => {
    setprice(true);
  };*/
  const handleClickResFunc = async (p,id_analyse) => {
    console.log(p);
    const accounts = await web3.eth.getAccounts();
    consultationOnlineContract.methods
                              .send_analyse_to_patinet(id_analyse,p)
                              .send({from: accounts[0]})
                            .then(() => alert('Analyse result sent'))
          .catch((error) => console.error('Error sendining result', error));

  };

  

  return (
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
          {analyses.length > 0 ? (
            analyses.map((analyse, index) => {
              if (analyse.resultat != '' && !analyse.paid ) {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td scope='row'>{patientName}</td>
                      <td scope='row'>{patientDoctor}</td>
                      <td scope='row'>{analyse.name}</td>
                      <td scope='row'>
                       {analyse.resultat}
                      </td>
                      <td scope='row'>
                        {analyse.price}
                      </td>
                      <td scope='row'><button id='butanal' onClick={() => handleClickResFunc(patientInfo.patient_add, analyse.id)}>Send</button></td>
                    </tr>
                    
                   
                  </React.Fragment>
                );
              } else {
                return null;
              }
            })
          ) : null}
        </MDBTableBody>
      </MDBTable>
    </header>
  );
};

export default SendAnalyse;