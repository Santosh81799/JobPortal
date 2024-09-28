import React from 'react'
import Modal from 'react-modal'
function CompanyUpdateModal({ isOpen, onClose }) {

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
            <div>
                <div className='bg-info text-end'>
                    <button
                        className='btn btn-close  '
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <i className="fa fa-close fs-4" style={{ color: "#333" }} aria-hidden="true"></i>
                    </button>
                </div>
                i am santosh
                <div>
                    here i want to edit company data
                </div>

            </div>
        </Modal>
    )
}
export default CompanyUpdateModal