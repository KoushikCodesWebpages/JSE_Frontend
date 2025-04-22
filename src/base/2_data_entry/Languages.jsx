import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



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
      navigate('/user/jobtitles');
    } catch (err) {
      console.error('Error uploading language:', err);
      alert('Failed to upload language data.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="flex-1 flex justify-center items-center p-8 bg-white">
          <div className="max-w-md w-full">
            <form className="flex flex-col" onSubmit={handleNext}>
              {/* Language Input */}
              <div className="relative mb-5">
                <input
                  type="text"
                  name="LanguageName" // Fixed name attribute
                  placeholder=" "
                  value={formData.LanguageName}
                  onChange={handleChange}
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                />
                <label
                  className={`absolute left-4 transition-all text-gray-500 text-base ${
                    formData.LanguageName
                      ? '-top-2 text-sm bg-white px-1'
                      : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}
                >
                  Language
                </label>
              </div><br/>

              {/* Certificate Upload */}
              <div className="mb-5">
                <p className="mb-2 text-sm text-gray-600">Completion Certificate</p>
                <div className="border-2 border-gray-300 rounded-md p-6 text-center bg-gray-100">
                  <input
                    type="file"
                    id="certificateUpload"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="certificateUpload" className="cursor-pointer flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#2c6472"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      className="mb-2"
                    >
                      <path d="M16 16h-2v-4h-4v4H8l4 4 4-4z" />
                      <path d="M18.944 10.112a6.5 6.5 0 00-12.671-1.098A5.502 5.502 0 007 20h11a5 5 0 00.944-9.888zM18 18H7a3.5 3.5 0 010-7h.5l.1-.4a4.5 4.5 0 018.7 1.2l.2.9H18a3 3 0 010 6z" />
                    </svg>
                    <p className="text-gray-600">Upload Certificate</p>
                    <p className="text-xs text-gray-500 h-[40px] mt-1 text-center">
                      {formData.certificateFile ? formData.certificateFile.name : ''}
                    </p>
                  </label>
                </div>
              </div><br/>

              {/* Proficiency */}
              <div className="mb-5">
                <p className="mb-2 text-sm text-gray-600">Proficiency</p>
                <div className="flex flex-col gap-2">
                  {['Native', 'Fluent', 'Intermediate', 'Beginner'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="ProficiencyLevel" // Fixed name attribute
                        value={level}
                        checked={formData.ProficiencyLevel === level} // Fix checked condition
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div><br/>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full hover:bg-gray-700 focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>

                <button
                  type="button"
                  // onClick={handleAddCertificate}
                  className="px-6 py-3 w-[100px] bg-white text-[#2c6472] border-2 border-[#2c6472] h-[43px] rounded-full text-xs font-semibold cursor-pointer mt-4"
                >
                  +Add Certificates
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
                >
                  {loading ? 'Saving...' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-8 text-white">
          <div className="flex items-center gap-2">
            <img src="src/assets/joblogo.png" className="h-6 w-6" />
            <h3 className="text-[#ff9a67] m-0">JSE AI</h3>
          </div>
          <h3 className="text-center mt-8 mb-0 font-medium">Language</h3>
          <DotLottieReact
            src="https://lottie.host/cdc14b06-4b17-4d74-b646-3d50a86bbc47/KdXX0nPLeL.lottie"
            loop
            autoplay
            style={{ width: '350px', height: '350px' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-gray-600 bg-gray-100 w-full">
        <Link to="#" className="text-[#2c6472] font-bold mx-2">Instructions</Link>
        <span>|</span>
        <Link to="#" className="text-[#2c6472] font-bold mx-2">License</Link>
        <span>|</span>
        <Link to="#" className="text-[#2c6472] font-bold mx-2">Terms of use</Link>
        <span>|</span>
        <Link to="#" className="text-[#2c6472] font-bold mx-2">Privacy</Link>
      </div>
    </div>
  );
};

export default Language;
