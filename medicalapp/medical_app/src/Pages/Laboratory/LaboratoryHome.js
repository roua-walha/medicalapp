import React, { useState, useEffect, Fragment } from 'react';
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
 import Allanalyses from "../Laboratory/Allanalyses";
  import AnalysesResl from "../Laboratory/AnalysesRes";
  import SendAnalyse from "../Laboratory/SendAnalyse";
const LaboratoryHome = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    
    
    
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
              <MDBNavbarBrand ><span >Laboratory page </span> </MDBNavbarBrand>
            </MDBContainer>
          </MDBNavbar>
          <div className='tab-contentdiv'>
          <div className='dr'><FontAwesomeIcon icon={faHome} id="iconhome"/>
          <p style={{marginBottom: "0px"}}>Welcome to MedTrust</p></div>
        <MDBTabs pills fill className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab1') } active={fillActive === 'tab1'}>
              View analyses
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
              Add analyse result
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink id="MDBTabsLink" onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
              Send analyse
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
  
        <MDBTabsContent>
          <MDBTabsPane show={fillActive === 'tab1'}> <Allanalyses/> </MDBTabsPane>
          <MDBTabsPane show={fillActive === 'tab2'}> <AnalysesResl/></MDBTabsPane>
          <MDBTabsPane show={fillActive === 'tab3'}><SendAnalyse/></MDBTabsPane>
        </MDBTabsContent>
        </div>
      </>
        
      );


}
export default LaboratoryHome;