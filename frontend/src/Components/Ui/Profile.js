import React from 'react'
import Navbar from './Navbar'
// import ProfilePhoto from '../../Assets/santosh.jpg'
import AppliedJobs from './AppliedJobs';
import { useState } from 'react'
import ProfileUpdateModal from './Updates/ProfileUpdateModal';
import { useSelector } from 'react-redux';
import GetAppliedJobs from '../Hooks/GetAppliedJobs';
function Profile() {
    // To get all applied jobs and sore in redux
    GetAppliedJobs();
    const isResume = true;
    const { user } = useSelector(store => store.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => { setIsModalOpen(true) };
    const handleCloseModal = () => { setIsModalOpen(false) };

    return (
        <div className='pt-3'>
            <Navbar />
            <div className='m-4 p-2 d-flex flex-column gap-2'>
                <div className='p-2 d-flex justify-content-between' style={{ backgroundColor: "#fff" }}>
                    <div className='d-flex gap-3'>
                        <img src={user?.profile?.profilePhoto} alt='Profile' style={{ width: "60px", height: "60px", borderRadius: "50px" }} />
                        <div className='p-1'>
                            <div className='fw-bold fs-5' style={{letterSpacing:"1px"}}>{user?.fullname}</div>
                            <div className='text-secondary' >{user?.profile?.bio}</div>
                        </div>
                    </div>
                    <i className="fa-solid fa-pen-to-square fs-5 p-2" onClick={handleOpenModal}></i>
                    <ProfileUpdateModal isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
                <div className='p-2' style={{ backgroundColor: "#fff" }}>
                    <h6 style={{ letterSpacing: "1px" }}>Basic details</h6>
                    <div className='ms-3'>
                        <div className=''><i className="fa fa-envelope" aria-hidden="true"></i><span className='ms-2'>{user?.email}</span></div>
                        <div className=''><i className="fa fa-phone" aria-hidden="true"></i><span className='ms-2'>{user?.phoneNumber}</span></div>
                        <div className=''><i className="fa fa-location" aria-hidden="true"></i><span className='ms-2'>203, 2nd floor, Ganesh aprtment, Thumkunta, Hyderabad</span></div>
                    </div>
                </div>
                <div className='p-2' style={{ backgroundColor: "#fff" }}>
                    <h6 style={{ letterSpacing: "1px" }}>Skills</h6>
                    <div>
                        {
                            user?.profile?.skills.length !== 0 ? (
                                user?.profile?.skills.map((skill, index) =>
                                    <div className='badge bg-dark ms-2' key={index}>{skill}</div>
                                )
                            ) : <div>No Skills</div>
                        }
                    </div>
                </div>
                <div className='p-2' style={{ backgroundColor: "#fff" }}>
                    <h6 style={{ letterSpacing: "1px" }}>Resume</h6>
                    <div>
                        {
                            isResume ? <a href={user?.profile?.resume} target='blank' >{user?.profile?.resumeOriginalName}</a> : <span>No Resume</span>
                        }
                    </div>
                </div>
                <div className='p-2' style={{ backgroundColor: "#fff" }}>
                    <h6 style={{ letterSpacing: "1px" }}>Applied Jobs</h6>
                    <AppliedJobs />
                </div>
            </div>
        </div>
    )
}

export default Profile