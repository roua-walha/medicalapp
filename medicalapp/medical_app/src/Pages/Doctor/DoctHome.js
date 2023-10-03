import React, { useState, useEffect, Fragment } from 'react';
import './DoctHome.css';
import AddPatientDoct from "../Doctor/AddPatientDoct";
import AppointmentDoct from "../Doctor/AppointmentDoct";
import Patientrecordview from "../Doctor/Patientrecordview"
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { web3, consultationOnlineContract,diagnosticContract } from '../web3Provider';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
  import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
import AddPatient from '../Authorized_doc/AddPatient';
const DoctHome = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const[Doctor, setDoctor]=useState(null);
    useEffect(() => {
          const getDoctorInfo = async () => {
          const accounts = await web3.eth.getAccounts();
          const doct= await getDoct(accounts[0]);
          console.log(doct.name);
          setDoctor(doct.name)
        }
        getDoctorInfo();
    },[]
    )
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
        const [fillActive, setFillActive] = useState('tab1');

        const handleFillClick = (value) => {
            if (value === fillActive) {
              return;
            }
            setFillActive(value);
          };
    return (
        <>
          <MDBNavbar light bgColor='light' className='dr'>
            <MDBContainer fluid  >
              <MDBNavbarBrand ><span >Dr {Doctor}</span> </MDBNavbarBrand>
            </MDBContainer>
          </MDBNavbar>
          <div className='tab-contentdiv'>
          <div className='dr'><FontAwesomeIcon icon={faHome} id="iconhome"/>
          <p style={{marginBottom: "0px"}}>Welcome to MedTrust</p></div>
        <MDBTabs pills fill className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab1') } active={fillActive === 'tab1'}>
              Appointments
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
              Patient records
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
              Add patient
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
  
        <MDBTabsContent>
          <MDBTabsPane show={fillActive === 'tab1'}> <AppointmentDoct/></MDBTabsPane>
          <MDBTabsPane show={fillActive === 'tab2'}> <Patientrecordview/>  </MDBTabsPane>
          <MDBTabsPane show={fillActive === 'tab3'}><AddPatientDoct/></MDBTabsPane>
        </MDBTabsContent>
        </div>
      </>
        
      );


}
export default DoctHome;