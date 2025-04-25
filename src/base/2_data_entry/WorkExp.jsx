import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";


const WorkExp = ({ logoSrc, lottieSrc, footerLinks }) => {
  const navigate = useNavigate();
  const apiUrl = "https://raasbackend-production.up.railway.app/work-experience";
  const sessionKey = "token"; // Assuming this is the key used to store the token

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    employerType: "",
    startDate: "",
    endDate: "",
    keyResponsibilities: "",
  });

  const [loading, setLoading] = useState(false);

  const formatForDateTimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date - offset).toISOString().slice(0, 16);
  };

  const isFormValid = () => {
    return formData.jobTitle && formData.companyName && formData.startDate && formData.endDate;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error("Error: No token found in session storage.");
      return;
    }

    const requestData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    try {
      console.log("Sending request to API with data:", requestData);
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert(`✅ Work Experience uploaded successfully`);
    } catch (error) {
      console.error("Error uploading data:", error);
      if (error.response) {
        console.error("API Response:", error.response.data);
      }
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all required fields!");
      return;
    }
    setLoading(true);
    await sendData();
    setFormData({
      jobTitle: "",
      companyName: "",
      employerType: "",
      startDate: "",
      endDate: "",
      keyResponsibilities: "",
    });
    setLoading(false);
  };
  
  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    navigate("/user/onboarding/education");  // Only navigate, no data posting here
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 rounded-xl shadow-lg shadow-gray-300/60">
      <div style={{ display: "flex", flex: 1 }} className="rounded-xl shadow-md shadow-slate-300 ">
        {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white rounded-xl">
          <div className="max-w-md w-full">
            <form className="grid gap-y-8">
              {/* Job Title */}
              <div className="relative">
                <input
                  type="text"
                  name="jobTitle"
                  placeholder=" "
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="peer w-full p-4 border border-gray-300 h-[41px] text-gray-500 text-sm  focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                />
                <label
                  className={`absolute left-4 px-1 bg-white text-gray-500 transition-all duration-200
                  ${formData.jobTitle ? "-top-2 text-xs" : "top-2.5 text-sm peer-focus:-top-2 peer-focus:text-xs"}
                  `}>
                  Job Title
                </label>
              </div>


              {/* Company Name and Employee Type */}
              <div className="flex gap-5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="companyName"
                    placeholder=" "
                    value={formData.companyName}
                    onChange={handleChange}
                    className="peer w-full p-4 border border-gray-300 h-[41px]  text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                  />
                  <label
                    className={`absolute left-4 px-1 bg-white text-gray-500 transition-all duration-200
                  ${formData.companyName ? "-top-2 text-xs" : "top-2.5 text-sm peer-focus:-top-2 peer-focus:text-xs"}
                  `}>
                    Company Name
                  </label>
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    name="employerType"
                    placeholder=" "
                    value={formData.employerType}
                    onChange={handleChange}
                    className="peer w-full p-4 border border-gray-300 h-[41px] text-gray-500  text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                  />
                  <label
                    className={`absolute left-4 px-1 bg-white text-gray-500 transition-all duration-200
                  ${formData.employerType ? "-top-2 text-xs" : "top-2.5 text-sm peer-focus:-top-2 peer-focus:text-xs"}
                  `}>
                    Employer Type
                  </label>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="flex gap-5">
                <div className="flex-1 relative">
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formatForDateTimeLocal(formData.startDate)}
                    onChange={handleChange}
                    className="peer w-full p-3 px-4 border border-gray-300 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-4 px-1 bg-white text-gray-500 transition-all duration-200
                   *:   ${formData.startDate ? "-top-2 text-xs" : "-top-2 bg-white px-1  text-xs peer-focus:-top-2 peer-focus:text-xs"}
                   *: `}>
                    Start Date & Time
                  </label>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formatForDateTimeLocal(formData.endDate)}
                    onChange={handleChange}
                    className="peer w-full p-3 px-4 border border-gray-300 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-4 px-1 bg-white text-gray-500 transition-all duration-200
                      ${formData.endDate ? "-top-2 text-xs" : "-top-2 bg-white px-1  text-xs  peer-focus:-top-2 peer-focus:text-xs"}
                    `}>
                    End Date & Time
                  </label>
                </div>
              </div>


              {/* Key Responsibilities */}
              <div className="relative">
                <textarea
                  name="keyResponsibilities"
                  placeholder=" "
                  value={formData.keyResponsibilities}
                  onChange={handleChange}
                  className="peer w-full p-4 border border-gray-300 h-44 text-gray-500  text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                />
                <label
                  className={`absolute left-4 px-1 bg-white text-gray-500 transition-all duration-200
                  ${formData.keyResponsibilities ? "-top-2 text-xs" : "top-2.5 text-sm peer-focus:-top-2 peer-focus:text-xs"}
                  `}>
                  Key Responsibilities
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full text-sm "
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className=" px-6 py-2 bg-white text-[#2c6472] border border-[#2c6472] h-[43px] rounded-full text-sm font-semibold cursor-pointer mt-1 hover:scale-95 transition-transform duration-200"
                  onClick={handleAddExperience}
                >
                  +Add Work Experience
                </button>
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] text-sm h-[41px] mt-1 rounded-full focus:outline-none"
                  onClick={handleNext}
                >
                  {loading ? "Saving..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-8 text-white rounded-e-xl">
          <div className="flex justify-center items-center gap-2">
            <img src={joblogo} className="h-7 w-7" />
            <h3 className="text-[#ff9a67] text-xl font-medium ">JSE AI</h3>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-white text-lg font-medium mb-4 ms-2">Work Experience</h3>
          </div>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
            <img src={frame} alt="" className='relative object-cover ' />
            <DotLottieReact
              src="https://lottie.host/72d38dc2-d827-4840-aa4b-e45bd40fcc7a/bpxhRARUmj.lottie"
              loop
              autoplay
              style={{ width: '250px', height: '250px' }}
              className="absolute object-cover me-2 p-2"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="bg-[#2c6472] text-center py-4 text-white">
        {footerLinks &&
          footerLinks.map((link, index) => (
            <a href={link.href} key={index} className="text-white mx-4 hover:underline">
              {link.text}
            </a>
          ))}
      </div> */}
    </div>
  );
};

WorkExp.defaultProps = {
  footerLinks: [],
};

export default WorkExp;
