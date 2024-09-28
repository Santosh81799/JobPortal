import React from 'react'
// import Avathar2 from '../../Assets/Avathar2.png'
// import Avathar1 from '../../Assets/Avathar1.png'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Job({job}) {
    const navigate = useNavigate();
    
    const daysAgoFunction =(mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime -createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    return (
        <div>
            <div className='jobcard-container ' onClick={()=> navigate(`/JobDescription/${job?._id}`)}>
                <div className='d-flex justify-content-between'>
                    <p className='text-secondary'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                    <Button variant="outline-secondary" className='btn rounded-5 text-dark'><i className="fa fa-bookmark" style={{hover:"color:white"}} aria-hidden="true"></i></Button>
                </div>
                <div className='d-flex gap-3'>
                    <div>
                        <button className='p-0 rounded' style={{ border: "2px solid gray" }}>
                            <img src={job?.company?.logo} alt="Avatar1" className='rounded-circle' style={{ width: '50px', hight: "50px"}} />
                        </button>
                    </div>
                    <div className='text-start'>
                        <h6>{job?.company?.name}</h6>
                        <p>India</p>
                    </div>
                </div>
                <div className='text-start'>
                    <h6 className='fw-bold'>{job?.title}</h6>
                    <p style={{ color: "gray",maxHeight:"75px",overflow:"hidden" }}>{job?.description}</p>
                </div>
                <div className='d-flex gap-2'>
                    <div className='badge border' style={{ color: "#482121", backgroundColor: "#FFF5E4" }}>{job?.position}positions</div>
                    <div className='badge border' style={{ color: "#D1512D", backgroundColor: "#FFF5E4" }}>{job?.jobType}</div>
                    <div className='badge border' style={{ color: "#213363", backgroundColor: "#FFF5E4" }}>{job?.salary} LPA</div>
                </div>
                <div className='d-flex gap-3 mt-2'>
                    <Button variant="outline-primary" className='btn btn-sm text-dark border border-secondary' onClick={()=> navigate(`/JobDescription/${job?._id}`)}>Details</Button>
                    <button className='btn btn-sm text-light' style={{backgroundColor:'#8C3061'}}>Save For Later</button>
                </div>
            </div>
        </div>
    )
}

export default Job