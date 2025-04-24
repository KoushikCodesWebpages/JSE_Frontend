import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import google from "./../../assets/Google.png";
import joblogo from "./../../assets/joblogo.png";
import frame from "./../../assets/Frame.png";




const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const signupData = {
      email: formData.email,
      number: formData.phoneNumber, // <-- Ensure it matches the backend field
      password: formData.password
    };

    try {
      const response = await axios.post(
        'https://raasbackend-production.up.railway.app/signup',
        signupData, // Request body as the second argument
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log('Signup response:', response);

        console.log('Signup successful:', response.data);
        navigate('/user/login', {
          state: {
            email: formData.email,
            phoneNumber: formData.phoneNumber
          }
        });
      } else {
        console.error('Signup failed');
        alert('Signup failed, please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Signup failed, please try again.');
    }
  };
  return (
    <div className="flex min-h-screen ">
      {/* Left Panel */}
      <div className="flex flex-1 justify-center items-center p-8 bg-white">
        <div className="max-w-lg w-full">
          <h2 className="text-3xl font-semibold text-center ">Create account</h2><br /><br />

          {/* Google Auth Button */}
          <button className="w-full h-[52px] flex items-center justify-center border border-gray-300 -mb-2 rounded-md  hover:shadow transition">
            <img src={google} className="mr-4 text-xl text-green-600" />
            <span className="text-base text-gray-700">Continue with Google</span>
          </button><br />

          <div className="flex items-center my-4 ">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div><br />

          {/* Signup Form */}
          <form onSubmit={handleSignUp}>
            {/* email Field */}
            <div className="relative ">
              <input
                type="email"
                name="email"
                placeholder=" "
                className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className={`absolute left-4 transition-all text-gray-500 text-base
                ${formData.email
                  ? '-top-2 text-sm bg-white px-1'
                  : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                }`}>
                email
              </label>
            </div><br />

            {/* Phone Number Field */}
            <div className="relative ">
              <input
                type="tel"
                name="phoneNumber"
                placeholder=" "
                className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <label className={`absolute left-4 transition-all text-gray-500 text-base
                ${formData.phoneNumber
                  ? '-top-2 text-sm bg-white px-1'
                  : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                }`}>
                Phone Number
              </label>
            </div><br />

            {/* Password Fields */}
            <div className="flex space-x-2 ">
              {/* Create Password */}
              <div className="relative w-1/2">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className={`absolute left-4 transition-all text-gray-500 text-base
                ${formData.password
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}>
                  Create Password
                </label>
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => toggleShowPassword('password')}
                >
                  {/* {showPassword.password ? <FaEyeSlash size={18} /> : <FaEye size={18} />} */}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative w-1/2">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=" "
                  className="w-full h-[52px] px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c6472] peer"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label className={`absolute left-4 transition-all text-gray-500 text-base
                ${formData.confirmPassword
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                  }`}>
                  Confirm Password
                </label>
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => toggleShowPassword('confirmPassword')}
                >
                  {/* {showPassword.confirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />} */}
                </span>
              </div><br />
            </div><br />

            {/* Submit Button */}
            <button
              type="submit"
              className="teal-button w-full h-[50px] bg-[#2c6472] text-white py-3 mt-3 rounded-md"
            >
              Sign Up
            </button>
          </form><br />

          {/* Switch to Login */}
          <div className=" text-center text-sm me-2 text-gray-600">
            Already have an account?{' '}
            <Link to="/user/login" className="text-[#2c6472] font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#2c6472] text-white px-8">
        <h1 className="text-3xl font-semibold mb-2 ms-4 text-center">Welcome to</h1>
        <div className="flex items-center gap-2 mb-4">
          <img
            src={joblogo}
            className="h-6 w-6"
          />
          <h3 className="text-orange-300 text-xl font-bold">JSE AI</h3>
        </div>
        <div className='relative mb-5 flex justify-center items-center ms-4'>
          <img src={frame} alt="" className='relative object-cover ' />
          <DotLottieReact
            src="https://lottie.host/47dbe349-fbbc-4772-9026-56f4ed8832c8/G4VcaYQkF2.lottie"
            loop
            autoplay
            style={{ width: '100px', height: '100px' }}
            className='absolute object-cover me-2 p-2'
          />
        </div><br />
        <p className=" text-center text-sm max-w-xs italic">
          "Unlock your next opportunity — your dream job is just a click away."
        </p>
      </div>
    </div>
  );
};

export default Signup;


