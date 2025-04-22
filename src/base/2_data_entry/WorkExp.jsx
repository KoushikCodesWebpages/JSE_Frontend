import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";


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
    navigate("/user/education");  // Only navigate, no data posting here
    setLoading(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white">
          <div className="max-w-md w-full">
            <form className="grid gap-y-6">
              {/* Job Title */}
              <div className="relative">
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 h-[41px] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Company Name and Employee Type */}
              <div className="flex gap-5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 h-[41px] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    name="employerType"
                    placeholder="Employer Type"
                    value={formData.employerType}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 h-[41px] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Date Inputs */}
              <div className="flex gap-5">
                <div className="flex-1">
                  <label className="block mb-1 text-sm text-gray-600">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formatForDateTimeLocal(formData.startDate)}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-1 text-sm text-gray-600">End Date & Time</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formatForDateTimeLocal(formData.endDate)}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Key Responsibilities */}
              <div className="relative">
                <textarea
                  name="keyResponsibilities"
                  placeholder="Key Responsibilities"
                  value={formData.keyResponsibilities}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 h-[41px] rounded-md text-base min-h-[100px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

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
                  className="px-6 py-3 bg-white text-[#2c6472] border-2 border-[#2c6472] h-[43px] rounded-full text-lg font-semibold cursor-pointer mt-4"
                  onClick={handleAddExperience}
                >
                  +Add Work Experience
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
                  onClick={handleNext}
                >
                  {loading ? "Saving..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-8 text-white">
          <div className="flex justify-center items-center gap-2">
            <img src="src/assets/joblogo.png" className="h-6 w-6" />
            <h3 className="text-[#ff9a67] font-medium mb-0">JSE AI</h3>
          </div>
          <div className="text-center mt-8">
            <h3 className="text-white font-medium mb-0">Work Experience</h3>
          </div>
          <DotLottieReact
            src="https://lottie.host/72d38dc2-d827-4840-aa4b-e45bd40fcc7a/bpxhRARUmj.lottie"
            loop
            autoplay
            style={{ width: '350px', height: '350px' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#2c6472] text-center py-4 text-white">
        {footerLinks &&
          footerLinks.map((link, index) => (
            <a href={link.href} key={index} className="text-white mx-4 hover:underline">
              {link.text}
            </a>
          ))}
      </div>
    </div>
  );
};

WorkExp.defaultProps = {
  footerLinks: [],
};

export default WorkExp;
