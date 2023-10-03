import React, {useRef, useState, useEffect } from 'react';

import { web3, diagnosticContract, consultationOnlineContract } from '../web3Provider';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
const Patient_Pres= () => {

    return(
        <header>
                <MDBTable>
                <h2 id='h2hp'>Prescription</h2>
                <MDBTableBody>
                  <tr>
                 
                    <th scope='row'>Medecine name</th>
                    <td colSpan={2}></td>
                  
                    <th scope='row'>Dose</th>
                    <td colSpan={2}></td>
                    
                  </tr>
                  <tr>
                    <th scope='row'>Duration</th>
                    <td colSpan={2}></td>
                  
                    <th scope='row'>Instruction</th>
                    <td colSpan={2}></td>
                  </tr>
                  
                  
                </MDBTableBody>
                
                  
              </MDBTable>
        
        </header>

    );

};


export default Patient_Pres;