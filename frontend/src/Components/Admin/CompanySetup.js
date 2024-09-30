import React, { useEffect, useState } from 'react'
import Navbar from '../Ui/Navbar'
import { COMPANY_API_ENDPOINT } from '../Endpoints/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GetCompanyById from '../Hooks/GetCompanyById'
function CompanySetup() {
    const params = useParams();
    GetCompanyById(params.id);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: "",
        location: "",
        website: "",
        file: null,
        description: ""
    });
    const navigate = useNavigate();
    const { singleCompany } = useSelector(store => store.company)


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleFile = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("location", input.location);
        formData.append("website", input.website);
        formData.append("description", input.description);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
            toast.error(error.response?.data?.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            location: singleCompany.location || "",
            website: singleCompany.website || "",
            file: singleCompany.file || null,
            description: singleCompany.description || ""
        })
    }, [singleCompany])
    return (
        <div style={{ height: "100vw" }}>
            <Navbar />
            <div>
                <form onSubmit={handleSubmit} className='form mx-auto my-5 p-3' style={{ width: "90%", maxWidth: "600px" }}>
                    <div>
                        <h5 className='text-center'>Update Compnay data</h5>
                    </div>
                    <div className='d-flex gap-3 my-2'>
                        <div className='w-50'>
                            <label className='label w-100' htmlFor='name'>Company Name</label>
                            <input className='w-100' type="text" name='name' id='name' value={input.name} onChange={handleChange} />
                        </div>
                        <div className='w-50'>
                            <label className='w-100' htmlFor='location'>Location</label>
                            <input className='w-100' type="text" name='location' id='location' value={input.location} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='d-flex gap-3'>
                        <div className='w-50'>
                            <label className='w-100' htmlFor='website'>Website</label>
                            <input className='w-100' type="text" name='website' id='website' value={input.website} onChange={handleChange} />
                        </div>
                        <div className='w-50'>
                            <label className='w-100' htmlFor='file'>file</label>
                            <input className='w-100' type="file" accept='image/*' name='file' id='file' onChange={handleFile} />
                        </div>
                    </div>
                    <div className='w-100 my-2'>
                        <div>
                            <label className='w-100' htmlFor='description'>Description</label>
                            {/* <input className='w-100' type="text-aria" name='description' id='description' value={input.description} onChange={handleChange}/> */}
                            <textarea className='w-100' name='description' id='description' value={input.description} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='d-flex gap-3 mt-3'>
                        <button onClick={() => navigate("/admin/companies")} className='w-50 BlueButton' style={{ height: "40px" }}>Back</button>
                        {
                            !loading ? (
                                <button className='w-50 BlueButton' type='submit' style={{ height: "40px" }}>Update</button>
                            ) : (
                                <button className='w-50 BlueButton' type='submit' style={{ height: "40px" }}><i className="bi bi-arrow-repeat text-dark spin me-2"></i>Updating...</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup