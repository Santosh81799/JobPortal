import React, { useEffect } from 'react'
import Navbar from '../Ui/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_ENDPOINT } from '../Endpoints/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
function Applicants() {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store => store.application);

    useEffect(()=>{
        const fetchAllApplicants = async ()=>{   
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
                    withCredentials:true
                });                
                if(res.data.success){
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllApplicants();
    },[dispatch,params.id])
  return (
    <div className='py-4' style={{height:"100vh"}}>
        <Navbar />
        <div className='container my-5'>
            <h5 className='fw-bold'>Applicants ({applicants?.applications?.length})</h5>
            <ApplicantsTable />
        </div>
    </div>
  )
}

export default Applicants