import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../../redux/JobSlice';
import { JOB_API_ENDPOINT } from '../Endpoints/constant'
import { toast } from 'sonner';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchJobQuery } = useSelector(store => store.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchJobQuery}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                console.log(error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                }

            }
        }
        fetchAllJobs();
    }, [dispatch, searchJobQuery]);
}

export default useGetAllJobs;