import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";


const PersonalInfo = ({ logoSrc, lottieSrc, footerLinks = [] }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    dob: '',
    address: '',
    linkedinProfile: '',
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.secondName.trim()) {
      newErrors.secondName = 'Last name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.secondName)) {
      newErrors.secondName = 'Last name is invalid';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = sessionStorage.getItem('authToken'); // Assuming token is stored as 'token'

    try {
      const response = await fetch('https://raasbackend-production.up.railway.app/personal-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error uploading data:', errorData);
      } else {
        console.log('✅ Form data uploaded successfully:', formData);
        navigate('/user/professional-summary');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
    }
  };

  const fields = [
    { label: 'Full Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'secondName', type: 'text' },
    { label: ' ', name: 'dob', type: 'date' },
    { label: 'Current address', name: 'address', type: 'text' },
    { label: 'Linkedin Profile', name: 'linkedinProfile', type: 'text' },
  ];

  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 rounded-xl shadow-lg shadow-gray-300/60">
      <div className="flex flex-1 rounded-xl shadow-md shadow-slate-300">
      {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white rounded-s-xl">
          <div className="max-w-lg w-full">
            <form className="grid gap-y-6" onSubmit={handleNext}>
              {fields.map((field) => (
                <div key={field.name} className="relative h-15">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full h-full px-4 py-4 border text-gray-500 ${
                      errors[field.name] ? 'border-red-500' : 'border-gray-300'
                    } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6472]`}
                    onFocus={(e) => {
                      const label = e.target.nextSibling;
                      label.classList.add('-top-2.5', 'text-sm', 'bg-white', 'px-1');
                      label.classList.remove('top-3', 'text-base');
                    }}
                    onBlur={(e) => {
                      const label = e.target.nextSibling;
                      if (!e.target.value) {
                        label.classList.remove('-top-2.5', 'text-sm', 'bg-white', 'px-1');
                        label.classList.add('top-3', 'text-base');
                      }
                    }}
                  />
                  <label className="absolute pointer-events-none left-4 top-3 text-gray-500 transition-all">
                    {field.label}
                  </label>
                  {errors[field.name] && (
                    <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
                  )}
                </div>
              ))}

              {/* Button Section */}
              <div className="flex justify-center gap-5 mt-4">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
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
            <h3 className="text-white ms-4 text-lg font-medium mb-4">Personal Info</h3>
          </div>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
                      <img src={frame} alt="" className='relative object-cover ' />
          <DotLottieReact
            src="https://lottie.host/72d38dc2-d827-4840-aa4b-e45bd40fcc7a/bpxhRARUmj.lottie"
            loop
            autoplay
            style={{ width: '250px', height: '250px' }}
            className='absolute object-cover me-2 p-2'
          />
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="bg-white text-center py-4 text-sm">
        {footerLinks.map((link, index) => (
          <React.Fragment key={index}>
            <Link to={link.path} className="text-[#2c6472] hover:underline font-semibold mx-2">
              {link.label}
            </Link>
            {index < footerLinks.length - 1 && <span>|</span>}
          </React.Fragment>
        ))}
      </div> */}
    </div>
  );
};

export default PersonalInfo;
