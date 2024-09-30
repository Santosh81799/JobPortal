import React from 'react'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({job}) {
    const navigate = useNavigate();
    return (
        <div className='jobcard-container p-3 text-start' onClick={()=> navigate(`/JobDescription/${job?._id}`)}>
            <div className=''>
                <div className=''>
                    <h6>{job?.company?.name}</h6>
                    <p className=''>India</p>
                </div>
                <div>
                    <h6 className='fw-bold'>{job?.title}</h6>
                    <p className=''>{job?.description}</p>
                </div>
                <div className='d-flex gap-2'>
                    <div className='badge border' style={{ color: "#482121", backgroundColor: "#FFF5E4" }}>{job?.position} Positions</div>
                    <div className='badge border' style={{ color: "#D1512D", backgroundColor: "#FFF5E4" }}>{job?.jobType}</div>
                    <div className='badge border' style={{ color: "#213363", backgroundColor: "#FFF5E4" }}>{job?.salary} TPM</div>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards