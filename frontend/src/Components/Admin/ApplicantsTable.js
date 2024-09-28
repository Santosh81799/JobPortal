import React from 'react';
import { useState } from 'react';
import { Popover, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '../Endpoints/constant';
import { toast } from 'sonner';


const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
    const { applicants } = useSelector(store => store.application);
    const [selectedId, setSelectedId] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e,item) => {
        setSelectedId(item);
        setAnchorEl(e.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const statusHandler = async(status,id) =>{
        console.log('called');
        
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <table className='table bg-success table-bordered table-hover text-center'>
                <caption className='text-center my-2'>{applicants?.applications.length <=0 ? "No one applied to this job":"A list of all Applicants."}</caption>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicants && applicants?.applications.map((item) => (
                            <tr className=''>
                                <td className='pt-3'>{item?.applicant?.fullname}</td>
                                <td className='pt-3'>{item?.applicant?.email}</td>
                                <td className='pt-3'>{item?.applicant?.phoneNumber}</td>
                                <td className='pt-3'>
                                    {
                                        item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target='_black' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </td>
                                <td className='pt-3'>{item?.applicant?.createdAt.split("T")[0]}</td>
                                <td className='pt-3'>
                                    <i className="fa fa-ellipsis-h fs-4 p-2" style={{ cursor: "pointer" }} onClick={(e)=>handleClick(e,item)} aria-hidden="true"></i>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClosePopover}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography sx={{ padding: '10px' }}>
                                            <div className='px-2 py-2' style={{ cursor: "pointer" }}>
                                                {shortlistingStatus.map((status, index) => (
                                                    <div className='pt-2' onClick={()=>statusHandler(status,selectedId?._id)} key={index} >
                                                      <span>{status}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Typography>
                                    </Popover>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
}

export default ApplicantsTable;
