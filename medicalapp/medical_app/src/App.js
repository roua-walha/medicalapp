import { Fragment } from 'react';
import './App.css';
import{createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Layout from './Components/Layout/Layout';
import Patient from './Pages/Patient/Patient';
import Manager from './Pages/Manager/Manager';
import Doctor from './Pages/Doctor/Doctor';
import Laboratory from './Pages/Laboratory/Laboratory';
import Pharmacy from './Pages/Pharmacy/Pharmacy';
import Calendar from './Pages/Authorized_doc/Calendar';
import AddPatient from './Pages/Authorized_doc/AddPatient';
import ViewPatientRecord from './Pages/Authorized_doc/ViewPatientRecord';
import SideBar from './Components/SideBar/SideBar'
const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
  <Route  path='/' element={<Home/>} />
  <Route index path='/Home' element={<Home/>} />
  <Route index path='/Patient' element={<Patient/>} />
  <Route index path='/Manager' element={<Manager/>} />
  <Route index path='/Doctor' element={<Doctor/>} />
  <Route index path='/Laboratory' element={<Laboratory/>} />
  <Route index path='/Pharmacy' element={<Pharmacy/>} />
  <Route index path="/Calendar" element={<Calendar/>} />
  <Route index path="/AddPatient" element={<AddPatient/>} />
  <Route index path="/ViewPatientRecord" element={<ViewPatientRecord/>} />
  <Route index path="/SideBar" element={<SideBar/>} />

  </Route>
))

function App() {
  return ( 
    <Fragment>
      <RouterProvider router={routes} />
    </Fragment>
  );
}
export default App;
