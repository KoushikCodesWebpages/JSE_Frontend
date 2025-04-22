import React, { useEffect, useState } from 'react';
import Sidebar from "../sidebar/sidebar";
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { MapPin } from 'lucide-react';
import Navbar from '../navbar/Navbar';



const Savedjob = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      console.warn('No auth token in sessionStorage');
      return;
    }
    fetchSelectedJobs();
  }, []);

  const fetchSelectedJobs = async () => {
    try {
      const response = await fetch('https://raasbackend-production.up.railway.app/selected-jobs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch selected jobs');
      const data = await response.json();
      setSelectedJobs(Array.isArray(data.selected_jobs) ? data.selected_jobs : []);
    } catch (error) {
      console.error('Error fetching selected jobs:', error);
      setSelectedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className="p-6 text-red-500 text-center">Unauthorized: Please log in to view saved jobs.</div>;
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading saved jobs...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col w-[1300px] min-h-screen bg-gray-40">
        <Navbar/>
        {/* Top Header */}
        

        {/* Job Cards Section */}
        <div className="flex flex-wrap gap-27 mb-5"><br/>
<div className="px-6 py-6 space-y-6 overflow-y-auto"><br/>
  {selectedJobs.map((job, index) => (
    <div
      key={index}
      className="w-[1171px] max-w-5xl mx-auto flex justify-between items-start p-6 rounded-2xl border border-blue-400 bg-white shadow-sm"
    >
      {/* Left Section */}
      <div className="flex gap-4 w-2/3">
        {/* Company Logo */}
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-black text-sm">
          {job.company?.slice(0, 3).toUpperCase()}
        </div>

        {/* Job Details */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-blue-900">{job.title}</h2>
          <div className="text-sm text-gray-600">
            {job.company}
            <span className="mx-1">•</span>
            <span className="text-teal-600">{job.posted_date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1 text-blue-500" />
            {job.location}
          </div>
          <p className="text-sm text-gray-500 mt-3 pr-6 leading-snug">
            {job.description}
          </p>
        </div>
      

      {/* Divider */}
      {/* <div className="w-px h-auto bg-gray-200 mx-6"></div> */}

      {/* Right Section */}
      <div className="flex flex-col items-start gap-9 w-[220px]">
        {/* Centered "Required Skills" Section */}
        <div className="w-full"><br/>
          <p className="text-sm text-black font-bold">Required skills</p>
          <p className="text-sm text-gray-700">{job.skills}</p>
        </div>

        {/* "Your Skills" Section */}
        <div className="w-full">
          <p className="text-sm text-black font-bold">Your skills</p>
          <p className="text-sm text-gray-700">{job.user_skills}</p>
        </div>

        {/* "Expected Salary" Section */}
        <div className="w-full">
          <p className="text-sm text-black font-bold">Expected Salary</p>
          <p className="text-sm text-gray-700">
            ₹{job.min_salary} - ₹{job.max_salary}
          </p>
        </div><br/>

        <div className="absolute top-27 right-71 flex flex-col justify-center items-center gap-4">
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="absolute"
              value={job.match_score}
              size={61}
              thickness={3}
              color="blue"
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              borderRadius={19}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" component="div" color="green">
                {`${Math.round(job.match_score)}%`}
              </Typography>
            </Box>
          </Box>
          <p className="text-sm">Profile Match</p>
          <button
            className="px-7 py-2 border border-[#2C6472] bg-[#2C6472] w-[61px] h-[37px] text-white rounded-2xl transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
          >
            Select
          </button>
          </div>
      </div>
      </div>
    </div>
  ))}
</div></div>


      </div>
    </div>
  );
};

export default Savedjob;
