import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";

const JobTitle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    primary_title: '',
    secondary_title: '',
    tertiary_title: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.primary_title) {
      newErrors.primary_title = 'Primary title is required';
    }
    if (!formData.secondary_title) {
      newErrors.secondary_title = 'Secondary title is required';
    }
    if (!formData.tertiary_title) {
      newErrors.tertiary_title = 'Tertiary title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error('❌ No token found in sessionStorage');
      return;
    }

    try {
      const response = await fetch('https://raasbackend-production.up.railway.app/jobtitles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Failed to upload job titles:', errorData);
      } else {
        alert(`✅ Job Titles uploaded successfully`);
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('❌ Error while posting job titles:', error);
    }
  };

  const fields = [
    { label: 'Primary Title', name: 'primary_title', options: ["Software Engineer", "Backend Developer", "DevOps Engineer"] },
    { label: 'Secondary Title', name: 'secondary_title', options: ["Software Engineer", "Backend Developer", "DevOps Engineer"] },
    { label: 'Tertiary Title', name: 'tertiary_title', options: ["Software Engineer", "Backend Developer", "DevOps Engineer"] },
  ];

  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 rounded-xl shadow-lg shadow-gray-300/60">
      <div className="flex flex-1 rounded-xl shadow-md shadow-slate-300">
        {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white rounded-s-xl">
          <div className="max-w-lg w-full">
            <form className="grid gap-y-4" onSubmit={handleNext}>
              {fields.map((field) => (
                <div key={field.name} className="relative h-15 mb-5">
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full h-full px-4 py-3  border text-gray-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'
                      } rounded-md text-base focus:outline-none focus:ring-1 focus:ring-[#2c6472]`}
                  >
                    <option value="" disabled>Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
                  )}
                </div>
              ))}

              {/* Button Section */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full  focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px]  rounded-full focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-4 text-white rounded-e-xl">
          <div className="flex justify-center items-center gap-2">
            <img src={joblogo} className="h-6 w-6" />
            <h3 className="text-[#ff9a67] text-xl m-0">JSE AI</h3>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-white text-lg font-medium ms-4 mb-4">Job Preferences</h3>
          </div>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
            <img src={frame} alt="" className='relative object-cover ' />
            <DotLottieReact
              src={
                'https://lottie.host/a5116b74-e6e0-4fef-abfb-d99d2b580033/msf2IWJRuh.lottie'
              }
              loop
              autoplay
              style={{ width: '250px', height: '250px' }}
              className='absolute object-cover me-2 p-2'
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobTitle;
