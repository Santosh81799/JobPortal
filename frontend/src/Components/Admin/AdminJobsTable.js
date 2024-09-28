import React, { useEffect, useState } from 'react';
import { Popover, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminJobsTable() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJob, setSelectedJob] = useState("");
    const { allAdminJobs = [], searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    const handleClick = (event, job) => {
        setSelectedJob(job);
        setAnchorEl(event.currentTarget);

    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const filteredJob = allAdminJobs.length > 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        });
        setFilterJobs(filteredJob);
    }, [allAdminJobs, searchJobByText])
    return (
        <div className='container'>
            <div>
                <table className='table bg-success table-bordered table-hover text-center'>
                    <caption className='text-center my-2'>A list of recent posted jobs.</caption>
                    <thead className=''>
                        <tr>
                            <th className='py-2'>Company Name</th>
                            <th className='py-2'>Role</th>
                            <th className='py-2'>Date</th>
                            <th className='py-2'>Action</th>
                        </tr>
                    </thead>
                    {
                        allAdminJobs.length <= 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan="4">You haven't post any job yet.</td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {
                                    filterJobs.map((job) => (
                                        <tr key={job._id} className='bg-info'>
                                            <td className='pt-4'>{job?.company.name}</td>
                                            <td className='pt-4'>{job.title}</td>
                                            <td className='pt-4'>{job.createdAt.split("T")[0]}</td>
                                            <td className='pt-3'>
                                                <i className="fa fa-ellipsis-h fs-4 p-2" onClick={(e) => handleClick(e, job)} aria-hidden="true"></i>
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
                                                    <Typography sx={{}}>
                                                        <div className='px-2 py-2'>
                                                            <div className=''>
                                                                <button style={{ border: "none", background: "none" }} onClick={() => navigate(`/admin/companies/${selectedJob._id}`)}><i className="fa-solid fa-pen-to-square p-1" style={{ fontSize: "17px" }} ></i>Edit</button>
                                                            </div>
                                                            <div className='ps-1'>
                                                                <button style={{ border: "none", background: "none" }} onClick={()=> navigate(`/admin/jobs/${selectedJob._id}/applicants`)}><i class="fa fa-eye" aria-hidden="true"></i> Applicants</button>
                                                            </div>
                                                        </div>
                                                    </Typography>
                                                </Popover>
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    );
}

export default AdminJobsTable;
