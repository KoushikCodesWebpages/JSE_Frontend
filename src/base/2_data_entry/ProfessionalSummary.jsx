import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const ProfessionalSummary = ({ logoSrc, lottieSrc, footerLinks }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    about: '',
    skills: [],
    newSkill: '',
    annualIncome: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: '',
      }));
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('authToken'); // Assuming token is stored as 'token'
    if (!token) {
      console.error("❌ No token found in sessionStorage");
      return;
    }

    const payload = {
      about: formData.about,
      skills: formData.skills,
      annualIncome: parseFloat(formData.annualIncome),
    };

    try {
      const response = await fetch('https://raasbackend-production.up.railway.app/professional-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Error uploading data:", data);
      } else {
        alert(`✅ Professional data uploaded successfully`);
        navigate('/user/work-experience');
      }
    } catch (error) {
      console.error("❌ Network or server error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="flex-1 flex justify-center items-center p-8 bg-white">
          <div className="max-w-md w-full">
            <form className="grid gap-y-6" onSubmit={handleNext}>
              {/* About */}
              <div className="relative mb-5">
                <textarea
                  name="about"
                  placeholder="About"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-md text-base min-h-[100px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                
              </div>

              {/* Skills */}
              <div className="mb-5">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Add skill"
                    value={formData.newSkill}
                    onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                    className="flex-1 p-3 border border-gray-300 h-[41px] w-[41px] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 border-2 border-[#2c6472] text-[#2c6472] h-[41px] rounded-md text-sm font-medium bg-white hover:bg-indigo-50 ml-2"
                  >
                    +Add Skill
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="mr-2">{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-gray-500 hover:text-red-500 focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annual Income */}
              <div className="relative mb-5">
                <input
                  type="text"
                  name="annualIncome"
                  placeholder="Annual Income"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 h-[41px] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full hover:bg-gray-700 focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] rounded-full focus:outline-none"
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
            <h3 className="text-white font-medium mb-0">Professional summary</h3>
          </div>
          <DotLottieReact
            src="https://lottie.host/5968740b-6c7a-4ce0-8e43-808c202722ae/P3fww1TqS8.lottie"
            loop
            autoplay
            style={{ width: "350px", height: "350px" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white text-center py-4 text-sm">
        {footerLinks && footerLinks.length > 0 ? (
          footerLinks.map((link, index) => (
            <React.Fragment key={index}>
              <a href={link.path} className="text-[#2c6472] hover:underline font-semibold mx-2">
                {link.label}
              </a>
              {index < footerLinks.length - 1 && <span>|</span>}
            </React.Fragment>
          ))
        ) : (
          <p className="text-gray-500">No links available</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalSummary;
