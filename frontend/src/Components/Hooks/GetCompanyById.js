import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {COMPANY_API_ENDPOINT} from '../Endpoints/constant'
import { setSingleCompany } from '../../redux/CompanySlice';

const GetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, { withCredentials: true })
                console.log(res.data.company);
                
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default GetCompanyById;