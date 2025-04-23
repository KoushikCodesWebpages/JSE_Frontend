import React, { useState, useEffect, useRef } from "react";
import defaultJobImg from './image.svg';
import axios from "axios";
import Loader from "../loader/Loader.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Navbar from "../navbar/Navbar.jsx";


const MyApplication = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      setError("No auth token found.");
      setLoading(false);
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchSelectedJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://raasbackend-production.up.railway.app/selected-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedJobs = response.data.selected_jobs || [];

        const handleJobSelect = (job) => {
          setSelectedJob(job);
        };
      
        const mappedJobs = fetchedJobs.map((job) => ({
          title: job.title,
          jobTitle: job.title,
          company: job.company,
          companyName: job.company,
          postedDate: job.posted_date || "Not specified",
          location: job.location || "Location not specified",
          description: `We are looking for a skilled ${job.title} to join ${job.company}.`,
          roleDescription: job.role_description || "No role description provided.",
          skillData: [
            {
              label: "Required Skills",
              value: Array.isArray(job.skills)
                ? job.skills
                : typeof job.skills === "string"
                ? job.skills.split(",").map((s) => s.trim())
                : [],
            },
            {
              label: "Your Skills",
              value: Array.isArray(job.user_skills)
                ? job.user_skills
                : typeof job.user_skills === "string"
                ? job.user_skills.split(",").map((s) => s.trim())
                : [],
            },
            {
              label: "Expected Salary",
              value: `${job.min_salary || "?"} - ${job.max_salary || "?"}`,
            },
          ],
          matchValue: job.match_score || Math.floor(Math.random() * 30) + 70,
          selected: job.selected,
          cvGenerated: job.cv_generated,
          coverLetterGenerated: job.cover_letter_generated,
          viewLink: job.view_link,
        }));

        setSelectedJobs(mappedJobs);
        setSelectedJob(mappedJobs[0]);
        setLoading(false);
      } catch (error) {
        const errMsg =
          error.response?.data?.message || "⚠️ Failed to load applications.";
        alert(errMsg);
        setError(errMsg);
        setLoading(false);
      }
    };

    fetchSelectedJobs();
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col w-[1300px] min-h-screen bg-gray-40">
        <Navbar/>
      <br/>
        <div className="flex flex-1">
        <div className="w-[800px] h-full overflow-y-auto p-6 space-y-4 border-r"><br/>
                {selectedJobs.map((job, index) => (
                  <div
                    key={index}
                    onClick={() => handleJobSelect(job)}
                    className="flex items-start justify-between bg-white rounded-lg p-4 hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                    <img src={defaultJobImg} alt="Job"
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h3 className="text-base font-bold text-[#2C6472]">{job.jobTitle}</h3>
                        <p className="text-sm text-gray-600">{job.companyName}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                        <p className="text-sm text-gray-500">{job.salaryRange}</p>
                        <p className="text- text-gray-700 mt-1">
                        {selectedJobs[0].skillData[2].value}
                      </p>
                      </div>
                    </div>
                    <div className="text-gray-500 text-xl">⋮</div>
                  </div>
                ))}

                {/* Pagination */}<br/>
                <div className="flex justify-center items-center space-x-2 pt-4">
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100">2</button>
                  <button className="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100">3</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mb-5"><br/>
            <div className="w-500px p-6 space-y-4 overflow-y-auto rounded-lg bg-gray-50">
              {selectedJobs.length > 0 && (
                <>
                  <div className="flex justify-between items-start"><br/>
                  <img src={defaultJobImg} alt="Job"
                        className="w-16 h-16 object-contain"
                      /><br/>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#2C6472]">{selectedJobs[0].jobTitle}</h2>
                      <p className="text-gray-600">{selectedJobs[0].companyName}</p>
                      <p className="text-sm text-gray-500">{selectedJobs[0].location}</p>
                    </div>
                    <div className="flex flex-col items-center"><br/>
                      <div className="w-16 h-16 rounded-full bg-[#2C6472] flex items-center justify-center text-xl font-bold text-white">
                        {selectedJobs[0].matchValue}%
                      </div>
                      <span className="text-sm text-black mt-1 font-bold">Profile Match</span>
                    </div><br/>
                  </div><br/>

                  <div className="flex gap-3"><br/>
                    <button className="px-7 py-2 border border-[#2C6472] bg-[#2C6472] w-[200px] h-[47px] text-white items-center justify-center rounded transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105">
                      Generate CV
                    </button>
                    <button className="px-7 py-2 border border-[#2C6472] bg-[#2C6472] h-[47px] text-white rounded transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105">
                      Generate Cover Letter
                    </button>
                  </div><br/>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 items-center">About</h4><br/>
                      <p className="text-sm text-gray-700">{selectedJobs[0].description}</p>
                    </div><br/>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Role Description</h4><br/>
                      <p className="text-sm text-gray-700">{selectedJobs[0].roleDescription}</p>
                    </div>

                    <div>
                      <br/>
                      <h4 className="text-lg font-semibold text-gray-800">Required Skills</h4><br/>
                      <div className="flex flex-col gap-2 mt-2">
                      <ul className="list-disc pl-5">
                           {selectedJobs[0].skillData[0].value.map((skill, i) => (
                             <li key={i} className="text-gray-700">
                         {skill}
                       </li>
                    ))}
                    </ul>
                       </div>
                    </div><br/>
                  </div>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyApplication;