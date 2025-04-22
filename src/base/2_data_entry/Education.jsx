import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Education = () => {
  const navigate = useNavigate();
  const sessionKey = 'education-token'; // Key to fetch the token
  const apiUrl = 'https://raasbackend-production.up.railway.app/education';

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    achievements: ''
  });

  const handleNext = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error('Error: No token found in session storage.');
      return;
    }
  
    // Transforming the date inputs to ISO 8601 format
    const formatDateToISO = (date) => {
      const localDate = new Date(date);
      return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
    };
  
    const updatedFormData = {
      degree: e.target.degree.value,
      institution: e.target.institution.value,
      fieldOfStudy: e.target.fieldOfStudy.value,
      startDate: formatDateToISO(e.target.startDate.value), // Transforming to ISO 8601
      endDate: formatDateToISO(e.target.endDate.value),     // Transforming to ISO 8601
      achievements: e.target.achievements.value
    };
  
  
    try {
      const response = await axios.post(apiUrl, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      alert(`✅ Education data uploaded successfully`);
      navigate('/user/certificates');
    } catch (error) {
      console.error('Error uploading data:', error);
      if (error.response) {
        console.error('API Response:', error.response.data);
      }
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md">
            <form className="flex flex-col" onSubmit={handleNext}>
              {/* Degree Title */}
              <div className="relative mb-5">
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree Title"
                  defaultValue={formData.degree}
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                />
                <label className={`absolute left-4 transition-all text-gray-500 text-base
                  ${formData.degree
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}>
                </label>
              </div><br />

              {/* Institution Name */}
              <div className="relative mb-5">
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  defaultValue={formData.institution}
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                />
                <label className={`absolute left-4 transition-all text-gray-500 text-base
                  ${formData.institution
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}>

                </label>
              </div><br />

              {/* Field of Study */}
              <div className="relative mb-5">
                <input
                  type="text"
                  name="fieldOfStudy"
                  placeholder="Field of Study"
                  defaultValue={formData.fieldOfStudy}
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                />
                <label className={`absolute left-4 transition-all text-gray-500 text-base
                  ${formData.fieldOfStudy
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}>
                </label>
              </div><br />

              {/* Start and End Dates */}
              <div className="flex gap-5 mb-5">
                <div className="relative flex-1">
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    defaultValue={formData.startDate}
                    className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                  />
                  <label className={`absolute left-4 transition-all text-gray-500 text-base
                    ${formData.startDate
                      ? '-top-2 text-sm bg-white px-1'
                      : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}>
                  </label>
                </div>
                <div className="relative flex-1">
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    defaultValue={formData.endDate}
                    className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                  />
                  <label className={`absolute left-4 transition-all text-gray-500 text-base
                    ${formData.endDate
                      ? '-top-2 text-sm bg-white px-1'
                      : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}>
                    
                  </label>
                </div>
              </div><br />

              {/* Achievements */}
              <div className="relative mb-5">
                <textarea
                  name="achievements"
                  placeholder="Achievements"
                  defaultValue={formData.achievements}
                  className="w-full p-4 border border-gray-300 rounded text-base min-h-[100px] peer"
                />
                <label className={`absolute left-4 transition-all text-gray-500 text-base
                  ${formData.achievements
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}>
                </label>
              </div><br />

              {/* Buttons */}
              <div className="flex justify-center items-center gap-4">
                <button type="button"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full hover:bg-gray-700 focus:outline-none"
                  onClick={() => navigate(-1)}>
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-8 text-white">
        <div className="flex justify-center items-center gap-2">
            <img src="src/assets/joblogo.png" className="h-6 w-6" />
            <h3 className="text-[#ff9a67] m-0">JSE AI</h3>
          </div>
          <div className="text-center mt-8">
            <h3 className="text-white font-medium mb-0">Education</h3>
          </div>
          <DotLottieReact
            src="https://lottie.host/a5116b74-e6e0-4fef-abfb-d99d2b580033/msf2IWJRuh.lottie"
            loop
            autoplay
            style={{ width: "350px", height: "350px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Education;
