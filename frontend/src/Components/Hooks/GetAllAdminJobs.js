import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../../redux/JobSlice';
import { JOB_API_ENDPOINT } from '../Endpoints/constant'

const GetAllAdminJobs = () => {
    const dispatch = useDispatch();   
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, { withCredentials: true })                
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [dispatch])
}

export default GetAllAdminJobs;