import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultLocationImg from './Vector.svg';
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/Navbar";



const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const token = sessionStorage.getItem("authToken") || "your-fallback-token";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "https://raasbackend-production.up.railway.app/selected-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API response:", response.data);
        setApplications(response.data.selected_jobs);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate('/user/login');
    // Add logout functionality here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-[1300px] min-h-screen bg-gray-40">
      <Navbar/>
      <br/>

        <main className="flex-1 p-6">
          <p className="mb-4 text-gray-700 font-medium">
            Total {applications.length} Application
          </p><br/>
          <div className="flex flex-wrap gap-19 mb-5"><br/><br/><br/>
          <div className="space-y-6">
            {Array.isArray(applications) &&
              applications.map((app, index) => (
                <div
                  key={index}
                  className="w-[1141px] flex justify-between items-start bg-white border border-gray-200 rounded-xl shadow-sm p-6"
                >
                  {/* Left: Job Info */}
                  
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded font-bold text-lg">
                      {app.company?.slice(0, 3).toUpperCase()}
                    </div><br/>
                    <div>
                      <h3 className="font-bold text-xl text-[#2C6472]">{app.title}</h3><br/>
                      <p className="text-gray-600 text-lg">{app.company}</p><br/>
                      <p className="text-black text-lg mt-1 font-bold">{app.remote ? "Remote" : "On-site"}</p><br/>
                      <div className="flex items-center gap-2">
            <img src={defaultLocationImg} alt="Location" />
            <p className="text-[#00000091] text-base">{app.location}</p>
          </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-l h-full mx-6"></div>

                  {/* Right: Status Section */}
<div className="flex flex-col gap-2 items-start"><br/>
  <h3 className="font-semibold text-gray-800 mb-2">Status</h3>
  <div className="grid grid-cols-2 gap-9 items-center">
    {/* Application */}
    <div className="flex items-center gap-3 px-4 py-2 w-[170px] h-[50px] bg-blue-300 text-white rounded-xl font-medium">
      <span className="w-3 h-3 bg-white rounded-full"></span>
      Application
    </div>
    {/* Selected */}
    <div className="flex items-center gap-3 px-4 py-2 w-[170px] h-[50px] bg-green-300 text-white rounded-xl font-medium">
      <span className="w-3 h-3 bg-white rounded-full"></span>
      Selected
    </div>
    {/* Underreview */}
    <div className="flex items-center gap-3 px-4 py-2 w-[170px] h-[50px] bg-amber-400 text-white rounded-xl font-medium">
      <span className="w-3 h-3 bg-white rounded-full"></span>
      Underreview
    </div>
    {/* Rejected */}
    <div className="flex items-center gap-3 px-4 py-2 w-[170px] h-[50px] bg-red-300 text-white rounded-xl font-medium">
      <span className="w-3 h-3 bg-white rounded-full"></span>
      Rejected
    </div><br/>
  </div>
</div>

                </div>
              ))}
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplicationTracker;
