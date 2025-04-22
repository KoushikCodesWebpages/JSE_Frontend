import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

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
      const response = await fetch('https://raasbackend-production.up.railway.app/personal-info', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json(); 

      // Adjust depending on whether API returns array or object
      const name = Array.isArray(data) ? data[0]?.firstName : data.firstName;
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
    <header className="sticky top-0 z-10 flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
      <h1 className="text-xl font-bold text-gray-800"><br/>{getPageTitle()}</h1>
      <div className="flex items-center space-x-9 relative">
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/6dk1eHyuy1/3rmomsul_expires_30_days.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-800 font-bold">{firstName}</span>
        <Menu
          className="w-6 h-6 text-gray-600 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="absolute top-12 right-0 bg-white border rounded shadow-md p-2 z-20">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium px-4 py-2"
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
