import React, { useEffect, useState } from 'react'
import Navbar from '../Ui/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import GetAllCompanies from '../Hooks/GetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/CompanySlice';
function Companies() {
  const navigate = useNavigate();
  const dispach = useDispatch();
  GetAllCompanies();
  const [searchCompany, setSearchCompany] = useState("");

  useEffect(()=>{
    dispach(setSearchCompanyByText(searchCompany));
  })
  return (
    <div className='py-4' style={{height:"100vh"}}>
      <Navbar />
      <div>
        <div className='bg-secondary my-3 py-3 px-5 mx-auto container d-flex justify-content-between'>
          <input placeholder='Filter by company name' value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} className='w-25 px-3' />
          <button className='btn btn-sm text-dark bg-info' onClick={()=>  navigate("/admin/createcompany")}>New Company</button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies