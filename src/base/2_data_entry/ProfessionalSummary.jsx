import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";


const ProfessionalSummary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    about: '',
    skills: [],
    newSkill: '',
    annual_income: ''
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
      annual_income: parseFloat(formData.annual_income),
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
        navigate('/user/onboarding/work-experience');
      }
    } catch (error) {
      console.error("❌ Network or server error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 shadow-lg shadow-gray-300/60 rounded-xl">
      <div className="flex flex-1 rounded-xl shadow-md shadow-slate-300">
        {/* Left Panel */}
        <div className="flex-1 flex justify-center items-center p-8 bg-white rounded-s-xl">
          <div className="max-w-md w-full">
            <form className="grid gap-y-6" onSubmit={handleNext}>
              {/* About */}
              <div className="relative mb-5">
                <textarea
                  name="about"
                  placeholder=" "
                  value={formData.about}
                  onChange={handleChange}
                  className="peer w-full p-4 border border-gray-300 text-gray-500 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                />
                <label
                  className={`absolute left-4 transition-all text-gray-500 text-sm ${formData.about
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}
                >
                  About
                </label>

              </div>

              {/* Skills */}
              <div className="mb-2">
                <div className="relative flex items-center mb-2">
                  <select
                    value={formData.newSkill}
                    onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                    className="peer flex-1 px-4 pt-2 pb-2 border border-gray-300 h-[41px] text-base text-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                  >
                    <option value="" disabled>Select a skill area</option>
                    <option className='hover:bg-[#2c6472]' value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Project Development">Project Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Data Analysis">Data Analysis</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Database Management">Database Management</option>
                    <option value="Software Testing">Software Testing</option>
                    <option value="System Design">System Design</option>
                    <option value="API Integration">API Integration</option>
                    <option value="Business Analysis">Business Analysis</option>
                    <option value="Agile Methodologies">Agile Methodologies</option>
                  </select>

                  <button
                    type="button"
                    onClick={addSkill}
                    className=" px-4 py-2 border-2 border-[#2c6472] text-[#2c6472] h-[41px] text-sm font-medium bg-white hover:scale-95 transition-transform ease-linear  duration-200 ml-2"
                  >
                    +Add Skill
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 h-[80px]  overflow-y-auto p-2 rounded ">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 h-8 px-3 py-1 text-gray-500 rounded-full flex items-center"
                    >
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
              <div className="relative mb-2">
                <input
                  type="text"
                  name="annual_income"
                  placeholder=" "
                  value={formData.annual_income}
                  onChange={handleChange}
                  className="peer w-full p-4 border border-gray-300 h-[41px] text-gray-500 text-base focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                />
                   <label
                  className={`absolute left-4 transition-all text-gray-500 text-sm ${formData.annual_income
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-2.5 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}
                >
                  Annual Income
                </label>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-5 ">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white  h-[41px] w-[100px] rounded-full focus:outline-none"
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
            <h3 className="text-white text-lg font-medium mb-4">Professional summary</h3>
          </div>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
            <img src={frame} alt="" className='relative object-cover ' />
            <DotLottieReact
              src="https://lottie.host/5968740b-6c7a-4ce0-8e43-808c202722ae/P3fww1TqS8.lottie"
              loop
              autoplay
              style={{ width: "350px", height: "350px" }}
              className='absolute object-cover me-2 p-2'
            />
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ProfessionalSummary;
