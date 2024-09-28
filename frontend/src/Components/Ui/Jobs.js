import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux';

function Jobs() {
  const { allJobs, searchJobQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchJobQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchJobQuery.toLowerCase())
      })
      console.log('Filtered Jobs:............', filteredJobs);
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs);
    }
  },[searchJobQuery])
  return (
    <div className='pt-3'>
      <Navbar />
      <div className='m-3'>
        <div className='d-flex gap-3'>
          <div className='my-3'>
            <FilterCard />
          </div>
          <div className='w-100'>
            {
              filterJobs.length <= 0 ? <p className='text-center text-secondary' style={{letterSpacing:"1px"}}>Job jot found</p> : (
                <div className='jobcards my-5'>
                  {
                    filterJobs.map((job) =>
                      <div className='' key={job?._id}>
                        <Job job={job} />
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs