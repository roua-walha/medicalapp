import React, { useState, useEffect } from 'react';
import { web3, diagnosticContract } from './web3Provider';
function Appointment() {
    const [appointmentRequests, setAppointmentRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    
    const handleAccept = async (index) => {
      const accounts = await web3.eth.getAccounts();
      await diagnosticContract.methods.accepterRendezVous(index).send({ from: accounts[0] });
      setSelectedRequest(null);
    };
  
    const handleReject = async (index) => {
      const accounts = await web3.eth.getAccounts();
      await diagnosticContract.methods.refuserRendezVous(index).send({ from: accounts[0] });
      setSelectedRequest(null);
    };
  
    useEffect(() => {
      const loadAppointmentRequests = async () => {
        const accounts = await web3.eth.getAccounts();
        const requests = await diagnosticContract.methods.appointmentRequests(accounts[0]).call();
        setAppointmentRequests(requests);
      };
      if (selectedRequest) {
        loadAppointmentRequests();
      }
    }, [selectedRequest]);
  
    return (
      <div>
        {selectedRequest && (
          <div>
            <h3>Demande de rendez-vous</h3>
            <p>
              <strong>Client:</strong> {selectedRequest.client}
            </p>
            <p>
              <strong>Date:</strong> {selectedRequest.date}
            </p>
            <button onClick={() => handleAccept(selectedRequest.index)}>Accepter</button>
            <button onClick={() => handleReject(selectedRequest.index)}>Refuser</button>
          </div>
        )}
        <h3>Liste des demandes de rendez-vous</h3>
        <ul>
          {appointmentRequests.map((request, index) => (
            <li key={index}>
              <p>
                <strong>Client:</strong> {request.client}
              </p>
              <p>
                <strong>Date:</strong> {request.date}
              </p>
              <button onClick={() => setSelectedRequest({ ...request, index })}>Voir plus</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default Appointment;
