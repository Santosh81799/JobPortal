import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

function LatestJobs() {
    const { allJobs } = useSelector(store => store.job);
    return (
        <div>
            <div className='p-4' style={{ backgroundColor: "#F5F5F5" }}>
                <h1>
                    <span className='' style={{ color: "#d32f2f" }}>Latest & Top</span>
                    <span style={{ color: "#112164" }}> Job Openings</span>
                </h1>
                <div className='jobcards my-5'>
                    {
                        allJobs && allJobs.length > 0 ? (
                            allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                        ) : (
                            <span>No job available</span>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default LatestJobs;
