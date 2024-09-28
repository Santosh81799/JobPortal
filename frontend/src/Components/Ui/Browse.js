import React, { useEffect } from 'react'
import Navbar from './Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobQuery } from '../../redux/JobSlice';
import useGetAllJobs from '../Hooks/GetAllJobs';
function Browse() {
    useGetAllJobs();
    const{allJobs} = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchJobQuery(""))
        }
    },[dispatch])
  return (
    <div className='pt-3' style={{height:"100vh"}}>
        <Navbar />
        <div className='my-5 mx-4'>
            <div>
                <h4 className='fw-bold text-start ps-2 my-3'>Search Results ({allJobs?.length})</h4>
                <div className='jobcards'>
                {
                    allJobs.map((job)=>{
                        return (
                            <Job key={job._id} job={job}/>
                        )
                    })
                }
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Browse