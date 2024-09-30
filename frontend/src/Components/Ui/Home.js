import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HilightingSection from './HilightingSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../Hooks/GetAllJobs.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchJobQuery } from '../../redux/JobSlice.js'
function Home() {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const {searchJObQuery} = useSelector(store =>store.job);
  const navigate = useNavigate();
  useEffect (()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies");
    }
  },[])
  return (
    <div className='pt-3' style={{height:'100vh',backgroundColor:"#F5F5F5"}}>
        <Navbar />
        <HilightingSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />

    </div>
  )
}

export default Home