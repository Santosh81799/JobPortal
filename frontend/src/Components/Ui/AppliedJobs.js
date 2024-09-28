import React from 'react';
import { useSelector } from 'react-redux';

function AppliedJobs() {
    const { allAppliedJobs } = useSelector(store => store.job);

    // Function to determine styles based on status
    const getStatusStyles = (status) => {
        
        switch (status) {
            case 'pending':
                return { backgroundColor: '#ffc107', color: '#000', letterSpacing:'1px' }; // Yellow
            case 'accepted':
                return { backgroundColor: '#28a745', color: '#fff', letterSpacing:'1px'  }; // Green
            case 'rejected':
                return { backgroundColor: '#dc3545', color: '#fff', letterSpacing:'1px'  }; // Red
            default:
                return {};
        }
    };

    return (
        <div className=''>
            {
                allAppliedJobs?.length > 0 ? (
                    <table className="table table-bordered table-hover text-center">
                        <caption className='text-center my-2' style={{ letterSpacing: "1px" }}>
                            A list of your applied jobs
                        </caption>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Job Role</th>
                                <th>Company</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allAppliedJobs.map((appliedJob) => (
                                    <tr key={appliedJob._id}>
                                        <td>{appliedJob?.createdAt.split("T")[0]}</td>
                                        <td>{appliedJob?.job?.title}</td>
                                        <td>{appliedJob?.job?.company?.name}</td>
                                        <td>
                                            <span
                                                className='badge'
                                                style={getStatusStyles(appliedJob?.status)}
                                            >
                                                {appliedJob?.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p className='text-center text-secondary' style={{ letterSpacing: "1px" }}>
                        No jobs applied
                    </p>
                )
            }
        </div>
    );
}

export default AppliedJobs;
