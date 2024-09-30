import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobQuery } from '../../redux/JobSlice';
import { useNavigate } from 'react-router-dom';

function HilightingSection() {
    const {user} = useSelector(store=> store.auth);
    const [query, setQuery] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleJobSearch = () =>{
        dispatch(setSearchJobQuery(query));
        navigate("/browse");
    }
    return (
        <div className='highlight-section'>
            <div className='text-content'>
                <div className='welcome-text'>
                    <span className='greeting'>Welcome,</span>
                    <span className='username'>{user?.fullname}</span>!
                </div>
                <div className='job-info'>
                    <span className='highlighted-info'>Your ideal job is waiting for you.</span>
                </div>
                <div className='action-text'>
                    <span className='action-item'>Search, Apply &</span>
                    <br />
                    <span className='action-highlight'>Get Your Dream Job</span>
                </div>
            </div>
            <div className='searchbar-container mt-3'>
                <div className='searchbar'>
                    <input
                        className='search-input'
                        type='text'
                        placeholder='Find your dream jobs'
                        onChange={(e)=> setQuery(e.target.value)}
                        
                    />
                    <span onClick={handleJobSearch} className='search-icon' style={{cursor:"pointer"}}>
                        <i className='fa fa-search' aria-hidden='true'></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HilightingSection;
