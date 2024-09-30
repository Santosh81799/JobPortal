import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {COMPANY_API_ENDPOINT} from '../Endpoints/constant'
import { setCompanies } from '../../redux/CompanySlice'
const GetAllCompanies = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [companyId, dispatch])
}

export default GetAllCompanies;