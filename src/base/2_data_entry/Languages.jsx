import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";


const Language = () => {
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const [formData, setFormData] = useState({
    LanguageName: '',
    ProficiencyLevel: ''
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Remove old session handling — not needed
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCertificateFile(file); // ✅ Raw file only
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.LanguageName.trim()) {
      newErrors.LanguageName = 'Language name is required';
    }
    if (!formData.ProficiencyLevel) {
      newErrors.ProficiencyLevel = 'Proficiency level is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (hasFetched.current) return;
    hasFetched.current = true;
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('LanguageName', formData.LanguageName);
      formDataToSend.append('ProficiencyLevel', formData.ProficiencyLevel);
      if (certificateFile) {
        formDataToSend.append('file', certificateFile); // ✅ Only if selected
      }

      const response = await fetch('https://raasbackend-production.up.railway.app/languages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Upload failed');
      }

      alert(`✅ Languages uploaded successfully`);
      navigate('/user/dashboard');
    } catch (err) {
      console.error('Error uploading language:', err);
      alert('Failed to upload language data.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 rounded-xl shadow-lg shadow-gray-300/60">
      <div className="flex flex-1 rounded-xl shadow-md shadow-slate-300">
        {/* Left Panel */}
        <div className="flex-1 flex justify-center items-center p-8 bg-white rounded-s-xl">
          <div className="max-w-md w-full">
            <form className="flex flex-col" onSubmit={handleNext}>
              {/* Language Input */}
              <div className="relative mb-1">
                <input
                  type="text"
                  name="LanguageName" // Fixed name attribute
                  placeholder=" "
                  value={formData.LanguageName}
                  onChange={handleChange}
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 text-gray-500 text-base focus:outline-none focus:ring-1 focus:ring-[#2c6472] peer"
                />
                <label
                  className={`absolute left-4 transition-all text-gray-500 text-sm ${formData.LanguageName
                      ? '-top-2 text-sm bg-white px-1'
                      : 'top-4 text-sm peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}
                >
                  Language
                </label>
              </div><br />

              {/* Certificate Upload */}
              <div className="">
                <p className="mb-2 text-sm text-gray-600">Completion Certificate</p>
                <div className="border-2 border-gray-300  p-6 text-center bg-gray-100">
                  <input
                    type="file"
                    id="certificateUpload"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="certificateUpload" className="cursor-pointer mt-6 flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#2c6472"
                      viewBox="0 0 24 24"
                      width="30"
                      height="30"
                      className="mb-2"
                    >
                      <path d="M16 16h-2v-4h-4v4H8l4 4 4-4z" />
                      <path d="M18.944 10.112a6.5 6.5 0 00-12.671-1.098A5.502 5.502 0 007 20h11a5 5 0 00.944-9.888zM18 18H7a3.5 3.5 0 010-7h.5l.1-.4a4.5 4.5 0 018.7 1.2l.2.9H18a3 3 0 010 6z" />
                    </svg>
                    <p className="text-gray-600">Upload Certificate</p>
                    <p className="text-xs text-gray-500 h-[20px] mt-1 text-center">
                      {certificateFile ? certificateFile.name : ''}
                    </p>
                  </label>
                </div>
              </div><br />

              {/* Proficiency */}
              <div className="mb-2">
                <p className="mb-2 text-sm text-gray-600">Proficiency</p>
                <div className="flex flex-col gap-2">
                  {['Native', 'Fluent', 'Intermediate', 'Beginner'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer text-gray-500 text-xs">
                      <input
                        type="radio"
                        name="ProficiencyLevel" // Fixed name attribute
                        value={level}
                        checked={formData.ProficiencyLevel === level} // Fix checked condition
                        onChange={handleChange}
                        className="mr-2 mb-1 text-gray-500"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div><br />

              {/* Buttons */}
              <div className="flex justify-center items-center gap-4 -mt-4">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full  focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>

                <button
                  type="button"
                  // onClick={handleAddCertificate}
                  className="px-6 py-2 w-[180px] bg-white text-[#2c6472] border-2 border-[#2c6472] h-[43px] rounded-full text-sm font-semibold cursor-pointer mt-1 hover:scale-95 transition-transform duration-200 ease-in-out"
                >
                  +Add Certificates
                </button>

                <button
                  type="submit"
                  className=" teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px]  rounded-full focus:outline-none"
                >
                  {loading ? 'Saving...' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-4 text-white rounded-e-xl">
          <div className="flex items-center gap-2">
            <img src={joblogo} className="h-6 w-6" />
            <h3 className="text-[#ff9a67] text-xl m-0">JSE AI</h3>
          </div>
          <h3 className="text-center mt-4 ms-4 mb-4 text-lg font-medium">Language</h3>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
            <img src={frame} alt="" className='relative object-cover ' />
            <DotLottieReact
              src="https://lottie.host/cdc14b06-4b17-4d74-b646-3d50a86bbc47/KdXX0nPLeL.lottie"
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

export default Language;
