import React, { useState } from 'react';
import { Popover, Typography } from '@mui/material';
// import santosh from '../../Assets/santosh.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import USER_API_ENDPOINT from '../Endpoints/constant';
import { setAuthUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isPopup, setIsPopup] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopup(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsPopup(false);
    };

    const id = isPopup ? 'simple-popover' : undefined;

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }

    }

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg bg-light navbar-light position-sticky top-0 rounded-5 px-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">JobQuest</a>
                    <div className="navbar-toggler" style={{ border: 'none' }} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <input id="checkbox2" type="checkbox" />
                        <label className="toggle toggle2" htmlFor="checkbox2">
                            <div id="bar4" className="bars"></div>
                            <div id="bar5" className="bars"></div>
                            <div id="bar6" className="bars"></div>
                        </label>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto d-flex gap-2 pe-5">
                            {
                                user && user.role === "recruiter" ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/">Companies</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/Admin/Jobs">Jobs</Link>
                                        </li>
                                    </>

                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/Jobs">Jobs</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/Browse">Browse</Link>
                                        </li>
                                    </>
                                )
                            }

                        </ul>
                        {!user ? (
                            <div className='d-flex gap-4'>
                                <Link to="/Login"><button className='btn btn-sm text-light  BlueButton' style={{height:"35px"}}>Log In</button></Link>
                                <Link to="/Signup"><button className='btn btn-sm text-light BlueButton' style={{height:"35px"}}>Sign Up</button></Link>
                            </div>
                        ) : (
                            <div>
                                <img
                                    src={user?.profile?.profilePhoto}
                                    alt="User"
                                    className='rounded-circle'
                                    style={{ width: "40px", height: "40px" }}
                                    aria-describedby={id}
                                    onClick={handleClick}
                                />
                                <Popover
                                    id={id}
                                    open={isPopup}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ p: 2 }} className=''>
                                        <div className=''>
                                            <div className='d-flex gap-4'>
                                                <img
                                                    src={user?.profile?.profilePhoto}
                                                    alt="User"
                                                    className='rounded-circle'
                                                    style={{ width: "45px", height: "45px" }}
                                                />
                                                <div>
                                                    <h5 className='fw-bold' style={{ letterSpacing: "1px" }}>{user?.fullname}</h5>
                                                    <div className='text-secondary' style={{ fontSize: "15px" }} >{user?.profile?.bio}</div>
                                                </div>
                                            </div>
                                            {
                                                user && user.role === "student" && (
                                                    <div className='my-3'>
                                                        <i className="fa fa-user me-4" aria-hidden="true"></i>
                                                        <Link to="/Profile">View Profile</Link>
                                                    </div>
                                                )
                                            }

                                            <div className='mt-4'>
                                                <i className="fa fa-sign-out me-4" aria-hidden="true"></i>
                                                <button className='btn btn-sm text-light BlueButton' onClick={handleLogout}>Log Out</button>
                                            </div>
                                        </div>
                                    </Typography>
                                </Popover>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
