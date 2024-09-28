import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import USER_API_ENDPOINT from '../../Endpoints/constant.js';
import { setLoading, setAuthUser } from '../../../redux/authSlice.js';
import { toast } from 'sonner';


const ProfileUpdateModal = ({ isOpen, onClose }) => {

    const { user } = useSelector(store => store.auth);
    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch()
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) { formData.append("file", input.file) }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
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
        onClose();
    }
    const handleFile = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    // Custom styles for the modal
    const customStyles = {
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '480px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Update Profile Modal"
            appElement={document.getElementById('root')}
        >
            <div className='modal-header d-flex align-items-center justify-content-between border-bottom border-1 border-secondary pb-1'>
                <h3>Update Profile</h3>
                <button
                    className='btn btn-close  '
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    onClick={onClose}
                    aria-label="Close"
                >
                    <i className="fa fa-close fs-4" style={{ color: "#333" }} aria-hidden="true"></i>
                </button>
            </div>
            <form onSubmit={handleSubmit} className='modal-body py-3 d-flex flex-column gap-2 text-dark fw-bold'>
                <div className='d-flex justify-content-between'>
                    <label htmlFor='fullname'>Full Name :</label>
                    <input type='text' id='fullname' name='fullname' onChange={changeEventHandler} value={input.fullname} />
                </div>
                <div className='d-flex justify-content-between'>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' id='email' name='email' onChange={changeEventHandler} value={input.email} />
                </div>
                <div className='d-flex justify-content-between'>
                    <label htmlFor='phoneNumber'>Phone Number :</label>
                    <input type='text' id='phoneNumber' name='phoneNumber' onChange={changeEventHandler} value={input.phoneNumber} />
                </div>
                <div className='d-flex justify-content-between'>
                    <label htmlFor='bio'>Bio :</label>
                    <input type='text' id='bio' name='bio' onChange={changeEventHandler} value={input.bio} />
                </div>
                <div className='d-flex justify-content-between'>
                    <label htmlFor='skills'>Skills :</label>
                    <input type="text" id='skills' name='skills' onChange={changeEventHandler} value={input.skills} />
                </div>
                <div className='d-flex justify-content-between'>
                    <label htmlFor='file'>Resume :</label>
                    <input type='file' id='file' name='file' onChange={handleFile} accept='application/pdf' />
                </div>
                <div className='modal-footer'>
                    {
                        loading
                            ? <button className="btn w-100 BlueButton text-light" type="submit"><i className="bi bi-arrow-repeat spin me-2"></i> Please Wait</button>
                            : <button className="btn w-100 text-light BlueButton" type="submit">Update</button>
                    }
                </div>
            </form>
        </Modal>
    );
};

export default ProfileUpdateModal;
