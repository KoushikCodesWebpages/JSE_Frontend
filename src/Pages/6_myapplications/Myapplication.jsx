
import React, { useState, useEffect, useRef } from "react";
import defaultJobImg from '../../assets/image.svg';
import axios from "axios";
import Loader from "../../base/loader/Loader.jsx";


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
          "https://raasbackend-production.up.railway.app/api/selected-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedJobs = response.data.selected_jobs || [];

        const mappedJobs = fetchedJobs.map((job) => ({
          title: job.title,
          jobTitle: job.title,
          company: job.company,
          companyName: job.company,
          postedDate: job.posted_date || "Not specified",
          minSalary: job.min_salary || "?",
          maxSalary: job.max_salary || "?",
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
              value: `${job.expected_salary?.min || "?"} - ${job.expected_salary?.max || "?"}`,
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
          error.response?.data?.message || "⚠ Failed to load applications.";
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
  };

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen bg-gray-50 px-6 ms-2">

      <div className="flex flex-col w-full min-h-screen bg-gray-40">
        <br />
        <div className="flex flex-1 gap-5">
          <div className="w-[700px]  mb-5 -space-y-6 rounded-xl bg-white border border-gray-400/20 "><br />
            <div className="h-[720px] overflow-x-hidden  overflow-y-auto scrollbar-custom">
              {selectedJobs.map((job, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedJob(job)}
                  className={`flex items-start h-40 bg-white justify-between border-y rounded-s-xl border-gray-400/20 px-4  py-5 hover:scale-[1.01] transition-transform ease-in-out duration-200 cursor-pointer ${selectedJob === job ? " border-l-8 border-teal-700 transition-transform ease-in-out duration-200" : ""
                    }`}
                >
                  <div className="flex items-start space-x-10 justify-center ms-5 ">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#2C6472]">{job.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{job.companyName}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-sm text-gray-500">{job.salaryRange}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        {job.skillData[2]?.value}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-500 me-5 font-medium text-xl">⋮</div>
                </div>
              ))}
            </div>

            <br />
            <div className="flex justify-center items-center space-x-2 pt-14">
              <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold">1</button>
              <button className="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100">2</button>
              <button className="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100">3</button>
            </div>
          </div>

          <div className="flex mb-5 py-3 h-[870px] bg-white border border-gray-400/20 rounded-xl"><br />
            <div className="w-[500px] p-6 space-y-4 overflow-y-auto  rounded-xl bg-white">
              {selectedJob && (
                <>
                  <div className="flex justify-between  items-start"><br />
                    <div className="flex gap-4 me-3 ">
                      <div>
                        <p className="text-gray-600 font-semibold text-xl">{selectedJob.companyName}</p>
                        <h2 className="text-2xl font-semibold text-[#2C6472]">{selectedJob.jobTitle}</h2>
                        <p className="text-sm text-gray-500">{selectedJob.location}</p>
                      </div>
                    </div>
                    <div className="flex  flex-col justify-start -mt-6 items-center"><br />
                      <div className="relative w-16 h-16">
                        <svg
                          viewBox="0 0 100 100"
                          className="absolute top-0 left-0 w-full h-full"
                        >
                          {/* Background circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#E5E7EB"  // Light Gray Background
                            strokeWidth="7"
                            fill="none"
                          />
                          {/* Foreground circle (Progress) */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#2C6472"  // Your nice teal color
                            strokeWidth="7"
                            fill="none"
                            strokeDasharray="282"  // Circumference of the circle (2πr)
                            strokeDashoffset={282 - (282 * selectedJob.matchValue) / 100}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"  // Rotate to start from top
                          />
                        </svg>

                        {/* Center text */}
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                          {selectedJob.matchValue}%
                        </div>
                      </div>

                      <span className="text-sm text-black mt-3 ">Profile Match</span>
                    </div><br />
                  </div><br />

                  <div className="flex mx-auto pb-5 gap-5"><br />
                    <button className="px-5 py-2 border text-sm font-medium border-[#2C6472] bg-[#2C6472] w-[200px] h-[47px] text-white items-center justify-center rounded transition-transform duration-200 ease-linear hover:bg-white hover:text-[#2C6472] hover:scale-105">
                      Generate CV
                    </button>
                    <button className="px-5 py-2 border text-sm font-medium border-[#2C6472] bg-[#2C6472] h-[47px] text-white rounded transition-transform duration-200 ease-linear hover:bg-white hover:text-[#2C6472] hover:scale-105">
                      Generate Cover Letter
                    </button>
                  </div><br />

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">About</h4><br />
                      <p className="text-sm text-justify text-gray-700">{selectedJob.description}</p>
                    </div><br />

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Role Description</h4><br />
                      <p className="text-sm text-gray-700">{selectedJob.roleDescription}</p>
                    </div>

                    <div><br />
                      <div className="flex flex-col gap-2 mt-2">
                        {selectedJob?.skillData && (
                          <div className="space-y-6">
                            {/* Loop through skillData */}
                            {selectedJob.skillData.map((item, index) => (
                              <div key={index}>
                                <h4 className="text-lg font-semibold text-gray-800">{item.label}</h4>
                                <div className="flex flex-col gap-2 mt-2">
                                  {/* Check if it's an array (for skills) or just a string (for salary) */}
                                  {Array.isArray(item.value) ? (
                                    <ul className="list-disc pl-5">
                                      {item.value.map((val, i) => (
                                        <li key={i} className="text-gray-700">{val}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-gray-700">{item.value}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    </div><br />

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