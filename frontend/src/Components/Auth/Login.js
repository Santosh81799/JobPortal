import React, { useState } from 'react';
import Navbar from '../Ui/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import USER_API_ENDPOINT from '../Endpoints/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import {setLoading,setAuthUser } from '../../redux/authSlice.js';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const loading = useSelector(state => state.auth.loading); // Corrected this line
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className=''>
      <Navbar />
      <div className='form-container row my-5 mx-5'>
        <form onSubmit={handleSubmit} className='form col-lg-5 col-md-6 col-sm-10 d-flex flex-column gap-3 mx-auto p-3 rounded-3 bg-light'>
          <div>
            {/* style={{textAlign:'left', margin:0,p:'10px',fontWeight:600}} */}
            <h3 className='' style={{ color: "#1E2A5E" }}>Login</h3>
            <p className='' style={{ color: '#1E2A5E' }}>Welcome back</p>
          </div>
          <div className="input-field">
            <input
              required
              autoComplete="off"
              type="email"
              name="email"
              value={input.email}
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
              onChange={changeEventHandler}
            />
            <label htmlFor="password">Password</label>
            <span className="showPasswordLogin" aria-hidden="true" onClick={() => setShowPassword(!showPassword)}>{!showPassword?"Show":"Hide"}</span>
          </div>
          <div className="d-flex gap-2">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked={input.role === 'student'}
              onChange={changeEventHandler}
            />
            <label htmlFor="student">Student</label>

            <input
              type="radio"
              id="recruiter"
              name="role"
              value="recruiter"
              checked={input.role === 'recruiter'}
              onChange={changeEventHandler}
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>
          <div className="btn-container">
            {
              loading
                ? <button className="btn w-100 text-light BlueButton" type="submit"><i className="bi bi-arrow-repeat spin me-2"></i>Please wait</button>
                : <button className="btn w-100 text-light BlueButton " type="submit">Login</button>
            }
            <div className="acc-text">
              Don't have an account?
              <Link to="/Signup"><span style={{ color: "#0000ff", cursor: "pointer" }}>Signup</span></Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
