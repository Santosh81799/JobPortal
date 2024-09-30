import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import getSignleJob from '../Hooks/GetSingleJob';
import { setSingleJob } from '../../redux/JobSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '../Endpoints/constant';

function JobDescription() {
    // const isIntiallyApplied = true;
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id);
    const [isJobApplied, setIsJobApplied] = useState(isIntiallyApplied);
    const dispatch = useDispatch();

    const handleApplayJob = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsJobApplied(true); // update the local state
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user._id }] };
                dispatch(setSingleJob(updateSingleJob)); // we can get real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsJobApplied(res.data.job.applications.some(application => application.applicant === user?._id)) //Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='p-4' style={{ backgroundColor: "#F5F5F5", height: '100VH' }}>
            <div className='m-4 p-3' style={{ backgroundColor: "#fff" }}>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h5 className='my-2'>{singleJob?.title}</h5>
                        <div className='d-flex gap-2'>
                            <div className='badge border' style={{ color: "#482121", backgroundColor: "#FFF5E4" }}>{singleJob?.position}positions</div>
                            <div className='badge border' style={{ color: "#D1512D", backgroundColor: "#FFF5E4" }}>{singleJob?.jobType}</div>
                            <div className='badge border' style={{ color: "#213363", backgroundColor: "#FFF5E4" }}>{singleJob?.salary} TPM</div>
                        </div>
                    </div>
                    <dvi>
                        <Button
                            onClick={isJobApplied ? null : handleApplayJob}
                            className='btn text-light'
                            style={{ backgroundColor: isJobApplied ? '#7A1CAC' : '#CD5C08' }}
                        >{isJobApplied ? "Allready Applied" : "Applay Now"}
                        </Button>
                    </dvi>
                </div>
                <div>
                    <h6 className='botder-2 border-bottom border-secondary my-3 pb-2'>Job description</h6>
                    <div>
                        {/* <h6 className=''>Role :<span>Frontend Developer</span></h6> */}
                        <h6 className='' >Role : <span className='fw-normal text-secondary'>{singleJob?.title}</span></h6>
                        <h6 >Location : <span className='fw-normal text-secondary'>{singleJob?.location}</span></h6>
                        <h6>Description : <span className='fw-normal text-secondary'>{singleJob?.description}</span></h6>
                        <h6>Experience : <span className='fw-normal text-secondary'>{singleJob?.experience} years</span></h6>
                        <h6>Salary : <span className='fw-normal text-secondary'>{singleJob?.salary} LPA</span></h6>
                        <h6>Total Applicants : <span className='fw-normal text-secondary'>{singleJob?.applications?.length}</span></h6>
                        <h6>Posted Date : <span className='fw-normal text-secondary'>{singleJob?.createdAt.split("T")[0]}</span></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription