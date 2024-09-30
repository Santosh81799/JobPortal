import React, { useState } from 'react'
import Navbar from '../Ui/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/CompanySlice';
import { COMPANY_API_ENDPOINT } from '../Endpoints/constant';
import { toast } from 'sonner';
function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch  = useDispatch();
  const registerNewCompany = async()=>{
    try {
      const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`,{companyName},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res?.data?.success){
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className='py-4' style={{height:'100vw'}}>
        <Navbar />
        <div className='container'>
            <h6>Your Company Name</h6>
            <p className='text-secondary'>What would you like to give your company name? You can change this later</p>
            <label>Company Name</label>
            <input 
            placeholder='Accenture, Google, Cognizant etc.'
            type='text'
            className=''
            onChange={(e)=> setCompanyName(e.target.value)}
            />
            <div>
                <button onClick={()=>navigate("/admin/companies")} className='btn btn-sm bg-primary'>Cancel</button>
                <button className='btn btn-sm BlueButton' onClick={registerNewCompany}>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default CreateCompany