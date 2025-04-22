import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader.jsx";


function Dashboard() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/user/login");
      setError("No auth token found.");
      setLoading(false);
      return;
    }

    const storedProfile = sessionStorage.getItem("profileData");

    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
      setLoading(false);
    } else {
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .get("https://raasbackend-production.up.railway.app/profile", { headers })
        .then((res) => {
          setProfileData(res.data.profile);
          sessionStorage.setItem("profileData", JSON.stringify(res.data.profile));
          setLoading(false);
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || "⚠️ Failed to load profile data.";
          alert(errorMessage);
          setError(errorMessage);
          setLoading(false);
        });
    }
  }, [token]);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate('/user/login');
    // Add logout functionality here
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  const fullName = `${profileData?.firstName || "Steve"} ${profileData?.secondName || ""}`.trim();
  const preferredJobTitle = profileData?.preferredJobTitle || "UI/UX Designer";
  const profileCompletion = profileData?.profileCompletion || 85;
  const skills = profileData?.skills || ["Figma", "Adobe XD", "Photoshop"];
  const languages = profileData?.languages || ["English", "Tamil"];
  const certificates = profileData?.certificates?.length > 0
    ? profileData.certificates
    : ["Accenture UX design course", "TCS Basics Python"];
  const totalExperienceInMonths = profileData?.totalExperienceInMonths || 0;
  const experienceFormatted = `${Math.floor(totalExperienceInMonths / 12)} yrs ${totalExperienceInMonths % 12} months`;

  return (
    <div className="flex bg-gray-100">
<Sidebar />
      {/* Main Content */}
      <div className="flex flex-col w-[1300px] min-h-screen bg-gray-40"> {/* Added 'ml-4' for spacing */}
        {/* Navbar */}
        <Navbar/>
        <br />

          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome back, {fullName}!</h2>
            <p className="text-gray-500">Let's find your next opportunity.</p>
          </div><br />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-1">
              
              <div className="border rounded-xl p-6 bg-white space-y-6">
                {/* Profile Header Section */}
                <div className="flex items-center justify-between">
                  {/* Image + Name/Title */}
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/6dk1eHyuy1/3rmomsul_expires_30_days.png"
                      alt={fullName}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{fullName}</h3>
                      <p className="text-sm text-gray-500">{preferredJobTitle}</p>
                    </div>
                  </div>

                  {/* Profile Completion Circle */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-14 h-14">
                      <svg className="absolute top-0 left-0 w-full h-full">
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          stroke="#E5E7EB"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          stroke="#0f172a"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="150"
                          strokeDashoffset={150 - (150 * profileCompletion) / 100}
                          strokeLinecap="round"
                          transform="rotate(-90 28 28)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                        {profileCompletion}%
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 mt-1">Profile Complete</span>
                  </div>
                </div><br />

                {/* Update Button */}
                <div className="flex justify-center">
                  <button className="bg-black text-white h-[50px] w-[190px] px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                    Update Profile
                  </button>
                </div><br />

                {/* Skills Section */}
                <div className="bg-gray-100 p-4 min-h-[100px] max-h-[300px] items-center justify-center rounded-lg">
                  <h4 className="font-bold text-gray-700 mb-2 ">Skills</h4><br />
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-pink-200 min-w-[100px] min-h-[41px] max-h-[300px] text-black justify-center text-bold font-medium px-4 py-1 text-center rounded-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div><br />

                {/* Languages Section */}
                <div className="bg-gray-100 p-4 min-h-[100px] max-h-[300px] rounded-lg">
                  <h4 className="font-bold text-gray-700 mb-2">Languages</h4><br />
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, i) => (
                      <span
                        key={i}
                        className="bg-pink-200 w-[97px] h-[29px] text-black text-center justify-center text-bold font-medium px-4 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div><br />

                {/* Certifications Section */}
                <div className="bg-gray-100 p-4 min-h-[100px] max-h-[300px] rounded-lg">
                  <h4 className="font-bold text-gray-700 mb-2">Certifications</h4><br />
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {certificates.map((cert, i) => (
                      <li key={i}>{cert}</li>
                    ))}
                  </ul>
                </div><br />

                {/* Experience Section */}
                <div className="bg-gray-100 p-4 h-[90px] rounded-lg">
                  <h4 className="font-bold text-gray-700 mb-2">Experience</h4><br />
                  <p className="text-sm text-gray-700 flex items-center">
                    <i className="fa fa-briefcase mr-2"></i> {experienceFormatted}
                  </p>
                </div><br />
              </div>
            </div>


            {/* Right column: stats & jobs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-pink-100 h-[100px] w-[400px] text-stone-700 p-4 rounded-xl text-center"><br/>
                  <h3 className="text-3xl font-bold">{profileData?.dailyGeneratableCoverletter ?? 0}</h3>
                  <p className="text-sm">Daily Generatable Cover Letters</p>
                </div><br/>
                <div className="bg-blue-100 h-[100px] w-[400px] text- Stone-700 p-4 rounded-xl text-center justify-center"><br/>
                  <h3 className="text-3xl font-bold ">{profileData?.totalJobsAvailable ?? 0}</h3>
                  <p className="text-sm">Total Jobs Available</p>
                </div><br/>
                <div className="bg-green-100 h-[100px] w-[400px] text- Stone-70 p-4 rounded-xl text-center"><br/>
                  <h3 className="text-3xl font-bold">{profileData?.dailySelectableJobsCount ?? 0}</h3>
                  <p className="text-sm">Daily Selectable Jobs</p>
                </div><br/>
                <div className="bg-purple-100 h-[100px] w-[400px] text- Stone-70 p-4 rounded-xl text-center"><br/>
                  <h3 className="text-3xl font-bold">{experienceFormatted}</h3>
                  <p className="text-sm">Total Experience</p>
                </div>
              </div><br/>

              {/* Recommended Jobs */}
              <div className="bg-white p-6 rounded-xl shadow"><br/>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recommended Jobs for you</h3>
                  <a href="#" className="text-sm text-indigo-600 hover:underline">Show all</a>
                </div><br/><br/>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-6 w-[900px] rounded-xl text-center text-gray-500 font-medium">NO<br />JOBS</div><br/>
                  <div className="bg-gray-100 p-6 w-[900px] rounded-xl text-center text-gray-500 font-medium">NO<br />JOBS</div>
                </div><br/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
