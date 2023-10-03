import Web3 from 'web3';
import Diagnosticconfiguration from '../Diagnostic.json'; 
import Consultationconfiguration from '../ConsultationOnline.json'; 
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const Diagnostic_ADDRESS = Diagnosticconfiguration.networks['5777'].address;
const Diagnostic_ABI = Diagnosticconfiguration.abi;


const diagnosticContract = new web3.eth.Contract(Diagnostic_ABI, Diagnostic_ADDRESS);

const consultationOnlineAddress = Consultationconfiguration.networks['5777'].address;
const consultationOnlineContract = new web3.eth.Contract(Consultationconfiguration.abi, consultationOnlineAddress, {
  from: web3.eth.defaultAccount,
  gasPrice: '20000000000', // 20 Gwei
  gas: '4000000',
  data: Diagnostic_ADDRESS, // pass the address of the Diagnostic contract to the constructor of ConsultationOnline
});

export { web3, diagnosticContract,consultationOnlineContract };