import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow_down from "../../assets/down-arrow.svg";

const Navbar = () => {
  const [firstName, setFirstName] = useState('User');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.warn('No token found in sessionStorage');
      return;
    }

    try {
      const response = await fetch('https://raasbackend-production.up.railway.app/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json(); 

      // Adjust depending on whether API returns array or object
      const name = Array.isArray(data) ? data[0]?.first_name : data.first_name;
      if (name) {
        setFirstName(name);
      } else {
        console.warn("First name not found in API response. Using default.");
      }
    } catch (error) {
      console.error('Error fetching personal info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/user/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    const title = segments.length ? segments[segments.length - 1] : 'Dashboard';
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <header style={{ width: "calc(100% - 264px)" }} className="fixed top-0 z-10 flex justify-between items-center bg-white h-16 ms-[264px]   border-t border-b px-6 border-gray-200">
      <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
      <div className="flex items-center space-x-3 relative">
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/6dk1eHyuy1/3rmomsul_expires_30_days.png"
          alt="Profile"
          className="w-9 h-9 rounded-full"
        />
        <span className="text-gray-800 font-bold">{firstName}</span>
        <img src={arrow_down} alt="" onClick={() => setMenuOpen(!menuOpen)}/>
        {menuOpen && (
          <div className="absolute top-12 -right-2 bg-white border rounded shadow-md p-1 z-20">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium px-3 py-1"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;