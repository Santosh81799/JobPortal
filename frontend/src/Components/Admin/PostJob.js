import React from 'react'
import Navbar from '../Ui/Navbar'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../Endpoints/constant';
import { toast } from 'sonner';

const companyArray = [];
function PostJob() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company)
    const [input, setInput] = useState({
        title: "",
        location: "",
        jobType: "",
        salary: "",
        experience: "",
        position: 0,
        requirements: "",
        description: "",
        companyId: ""
    })
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const selectHandleChange = (event) => {
        const selectedName = event.target.value;
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === selectedName);
        setInput({ ...input, companyId:selectedCompany._id });
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Unexpected Error is occured!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='py-4' style={{ height: "100vh" }}>
            <Navbar />
            <div>
                <form onSubmit={handleSubmit} className='form mx-auto my-5 p-3' style={{ width: "90%", maxWidth: "550px" }}>
                    <div className='d-flex gap-3 my-2'>
                        <div className='w-50'>
                            <label className='w-100'>Title</label>
                            <input className='w-100' type='text' name='title' value={input.title} id='title' onChange={handleChange} />
                        </div>
                        <div className='w-50'>
                            <label className='w-100'>Location</label>
                            <input className='w-100' type='text' name='location' value={input.location} id='location' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='d-flex gap-3 my-2'>
                        <div className='w-50'>
                            <label className='w-100'>Job Type</label>
                            <input className='w-100' type='text' name='jobType' value={input.jobType} id='jobType' onChange={handleChange} />
                        </div>
                        <div className='w-50'>
                            <label className='w-100'>Salary</label>
                            <input className='w-100' type='text' name='salary' value={input.salary} id='salary' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='d-flex gap-3 my-2'>
                        <div className='w-50'>
                            <label className='w-100'>Exprerience Level</label>
                            <input className='w-100' type='text' name='experience' value={input.experience} id='experience' onChange={handleChange} />
                        </div>
                        <div className='w-50'>
                            <label className='w-100'>No of positions</label>
                            <input className='w-100' type='number' name='position' value={input.position} id='positions' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='my-2'>
                        <div className='w-100'>
                            <label className='w-100'>Requirements</label>
                            <input className='w-100' type='text' name='requirements' value={input.requirements} id='requirements' onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <div className='w-100'>
                            <label className='w-100'>Description</label>
                            <input className='w-100' type='text' name='description' value={input.description} id='description' onChange={handleChange} />
                        </div>
                    </div>
                    {
                        companies.length > 0 && (
                            <div className='w-100'>
                                <label className='w-100' for="company">Select company</label>
                                <select className='w-100' style={{ padding: "3px" }} id="company" name="company" onChange={selectHandleChange}>
                                    {
                                        companies.map((company) => {
                                            return (
                                                <option key={company._id} value={company?.name?.toLowerCase()}>{company?.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        )
                    }
                    <div className='d-flex gap-3 mt-3'>
                        <button onClick={() => navigate("/admin/jobs")} className='w-50 BlueButton' style={{ height: "40px" }}>Back</button>
                        {
                            !loading ? (
                                <button className='w-50 BlueButton' type='submit' style={{ height: "40px" }}>Post Job</button>
                            ) : (
                                <button className='w-50 BlueButton' type='submit' style={{ height: "40px" }}><i className="bi bi-arrow-repeat text-dark spin me-2"></i>Post Job</button>
                            )
                        }
                    </div>
                    {
                        companyArray.length === 0 && <p className='text-center text-danger mt-2' >* Please register company first, Before post a job.</p>
                    }
                </form>
            </div>

        </div>
    )
}

export default PostJob