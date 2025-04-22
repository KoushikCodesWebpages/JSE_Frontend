import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animationData from '../assets/Animation - 1745282599914.json';
import { useNavigate, Link } from 'react-router-dom';

const Landing = ({ footerLinks = [] }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setFade(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white">
          <div className="max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-[#2c6472] mb-6">Welcome to JobFusion</h1><br />
            <p className="text-gray-600 mb-10">
              Your personalized job search assistant. Create your profile, track your applications, and land your dream job.
            </p><br />
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleNavigation('/user/login')}
                className="px-6 py-3 bg-[#2c6472] text-white w-[100px] rounded-full focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
              <button
                onClick={() => handleNavigation('/user/signup')}
                className="px-6 py-3 h-[50px] bg-[#2c6472] text-white w-[100px] rounded-full focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-8 text-white">
          <div className="flex justify-center items-center gap-2">
            <img src="../assets/joblogo.png" className="h-6 w-6" />
            <h3 className="text-[#ff9a67] m-0">JobFusion</h3>
          </div>
          <div className="text-center mt-8">
            <h3 className="text-white font-medium mb-0">Welcome</h3>
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
      <div className="bg-white text-center py-4 text-sm">
        {footerLinks.map((link, index) => (
          <React.Fragment key={index}>
            <Link to={link.path} className="text-[#2c6472] hover:underline font-semibold mx-2">
              {link.label}
            </Link>
            {index < footerLinks.length - 1 && <span>|</span>}
          </React.Fragment>
        ))}
      </div>
      {/* Fullscreen Overlay with Animation */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-1000">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ width: 150, height: 150 }}
          />
        </div>
      )}
    </div>
  );
};

export default Landing;