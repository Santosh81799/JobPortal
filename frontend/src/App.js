import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Styles.css';
import Home from './Components/Ui/Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Jobs from './Components/Ui/Jobs';
import Browse from './Components/Ui/Browse';
import Profile from './Components/Ui/Profile';
import JobDescription from './Components/Ui/JobDescription';
import Companies from './Components/Admin/Companies';
import CreateCompany from './Components/Admin/CreateCompany';
import CompanySetup from './Components/Admin/CompanySetup';
import AdminJobs from './Components/Admin/AdminJobs';
import PostJob from './Components/Admin/PostJob';
import Applicants from './Components/Admin/Applicants';
function App() {
  return (
    <div style={{ backgroundColor: "#F5F5F5"}}>
      <div className='w-100'>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/Login"} element={<Login />} />
            <Route path={"/Signup"} element={<Signup />} />
            <Route path={"/Jobs"} element={<Jobs />} />
            <Route path={"/Browse"} element={<Browse />} />
            <Route path={"/Profile"} element={<Profile />} />
            <Route path={"/JobDescription/:id"} element={<JobDescription />} />
            <Route path={"/Admin/Companies"} element={<Companies />} /> 
            <Route path={"/Admin/CreateCompany"} element={<CreateCompany />} /> 
            <Route path={"/Admin/Companies/:id"} element={<CompanySetup />} /> 
            <Route path={"/Admin/Jobs"} element={<AdminJobs />} /> 
            <Route path={"/Admin/Jobs/Post"} element={<PostJob />} /> 
            <Route path={"/Admin/Jobs/:id/Applicants"} element={<Applicants />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App