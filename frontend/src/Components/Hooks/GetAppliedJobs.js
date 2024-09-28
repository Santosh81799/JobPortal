import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAppliedJobs } from '../../redux/JobSlice';
import { APPLICATION_API_ENDPOINT } from '../Endpoints/constant';

const GetAppliedJobs = () =>{
    const dispatch = useDispatch();

    useEffect (()=>{
        const fetchAppliedJobs = async () =>{
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`,{
                    withCredentials:true
                });
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAppliedJobs();
    },[]) 
}
export default GetAppliedJobs;