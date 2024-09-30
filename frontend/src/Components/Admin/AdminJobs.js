import React, { useEffect, useState } from 'react'
import Navbar from '../Ui/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '../../redux/JobSlice';
import GetAllAdminJobs from '../Hooks/GetAllAdminJobs';
function AdminJobs() {
    GetAllAdminJobs();
    const navigate = useNavigate();
    const dispach = useDispatch();
    const [searchJob, setSearchJob] = useState("");

    useEffect(() => {
        dispach(setSearchJobByText(searchJob));
    },[searchJob,dispach])
    return (
        <div className='py-4' style={{ height: "100vh" }}>
            <Navbar />
            <div>
                <div className='bg-secondary my-3 py-3 px-5 mx-auto container d-flex justify-content-between'>
                    <input placeholder='Filter by company name' value={searchJob} onChange={(e) => setSearchJob(e.target.value)} className='w-25 px-3' />
                    <button className='btn btn-sm text-dark bg-info' onClick={() => navigate("/admin/jobs/post")}>Post New Jobs</button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs