import React from 'react';
import { useState } from 'react';
import Navbar from '../Ui/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import USER_API_ENDPOINT from '../Endpoints/constant.js'
import { setLoading } from '../../redux/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';

function Signup() {
    const [conformPassword, setConformPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const loading = useSelector(state => state.auth.loading); // Corrected this line
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.password !== conformPassword) {
            toast.error('Password does not match.');
            return;
        }
        console.log(input)

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData);

            if (res.data.success) {
                navigate("/Login");
                toast.success(res.data.message);
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An unexpected error occurred.');
        } finally {
            dispatch(setLoading(false))
        }
    };


    return (
        <div className='h-100vh' style={{height:"100vh"}}>
            <Navbar />
            <div className='form-container row m-4'>
                <form onSubmit={handleSubmit} className='form col-lg-5 col-md-7 col-sm-12 d-flex flex-column gap-3 mx-auto p-3 rounded-3'>
                    <h3 style={{color:"#1E2A5E"}}>Signup</h3>
                    <p style={{color:"#1E2A5E"}}>Signup now and get full access to our app.</p>
                    <div className="input-field">
                        <input
                            required
                            autoComplete="off"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            id='fullname'
                            onChange={changeEventHandler}
                        />
                        <label htmlFor="fullname">Full Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            required
                            autoComplete="off"
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            id="phoneNumber"
                            onChange={changeEventHandler}
                        />
                        <label htmlFor="phoneNumber">Phone Number</label>
                    </div>
                    <div className="input-field">
                        <input
                            required
                            autoComplete="off"
                            type="email"
                            name="email"
                            value={input.email}
                            id="email"
                            onChange={changeEventHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            required
                            autoComplete="off"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={input.password}
                            id="password"
                            onChange={changeEventHandler}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input
                            required
                            autoComplete="off"
                            type={showPassword ? "text" : "password"}
                            name="conformPassword"
                            value={conformPassword}
                            id="conformPassword"
                            onChange={(e) => { setConformPassword(e.target.value); }}
                        />
                        <label htmlFor="conformPassword">Confirm Password</label>
                        <span class="showPasswordSignup" aria-hidden="true" onClick={() => setShowPassword(!showPassword)}>{!showPassword?"Show":"Hide"}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <input
                            type="radio"
                            id="recruiter"
                            name="role"
                            value="recruiter"
                            checked={input.role === 'recruiter'}
                            onChange={changeEventHandler}
                        />
                        <label htmlFor="recruiter">Recruiter</label>

                        <input
                            type="radio"
                            id="student"
                            name="role"
                            value="student"
                            checked={input.role === 'student'}
                            onChange={changeEventHandler}
                        />
                        <label htmlFor="student">Student</label>

                    </div>
                    <div className="">
                        <label htmlFor="file" className='me-3'>Profile</label>
                        <input
                            type='file'
                            id="file"
                            accept='image/*'
                            className='cursor-pointer'
                            onChange={changeFileHandler}
                        />
                    </div>
                    <div className="btn-container">
                        { 
                            loading
                                ? <button className="btn BlueButton w-50 " type="submit"><i className="bi bi-arrow-repeat spin me-2 text-info"></i>Signup</button>
                                : <button className="btn BlueButton w-50" type="submit">Signup</button>
                        }
                        <div className="acc-text">
                        Already have an account?
                        <Link to="/Login"><span style={{ color: "#0000ff", cursor: "pointer" }}>Login</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
