import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react"; // or your icon library
import Loader from "../../base/loader/Loader.jsx";
import defaultJobImg from "../../assets/default-job.svg";
import Location_Icon from "../../assets/location-icon.svg";
import download_icon from '../../assets/download-icon.svg'
import link_icon from '../../assets/link-icon.svg'

function SelectedApplications() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("authToken") || "your-fallback-token";

  const axiosInstance = axios.create({
    baseURL: "https://raasbackend-production.up.railway.app/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  


  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchSelectedJobs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/selected-jobs");
        const fetchedJobs = response.data.selected_jobs || [];
        console.log(fetchedJobs);

        const mappedJobs = fetchedJobs.map((job) => ({
          id: job.job_id, // use job_id directly
          job_id: job.job_id, // keep for later functions
          title: job.title,
          company: job.company,
          postedDate: job.posted_date || "Not specified",
          location: job.location || "Location not specified",
          skillData: [
            { label: "Required Skills", value: job.skills || "Not specified" },
            { label: "Your Skills", value: Array.isArray(job.user_skills) ? job.user_skills.join(", ") : job.user_skills },
            { label: "Expected Salary", value: job.expected_salary ? `₹${job.expected_salary.min} - ₹${job.expected_salary.max}` : "Not specified" },
          ],
          matchValue: job.match_score,
          selected: job.selected,
          cvGenerated: job.cv_generated,
          coverLetterGenerated: job.cover_letter_generated,
          viewLink: job.view_link === true ? null : job.view_link, // if true, treat as null for now
        }));
        

        setSelectedJobs(mappedJobs);
      } catch (error) {
        console.error("Error fetching selected jobs:", error);
      }
      setLoading(false);
    };

    fetchSelectedJobs();
  }, [token]);

  const handleGenerateCV = async (jobId) => {
    try {
      console.log(`Generating CV for Job ID: ${jobId}`);
      const response = await axiosInstance.post(
        "/generate-cv",
        { job_id: jobId }, //this should be changed based on the jobId
        { responseType: "blob" } // Important for downloading binary data
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `CV_${jobId}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      alert("CV generated and downloaded successfully!");
    } catch (error) {
      console.error("Error generating CV:", error);
      alert("Failed to generate CV. Please try again.");
    }
  };

  const handleGenerateCoverLetter = async (jobId) => {
    try {
      console.log(`Generating Cover Letter for Job ID: ${jobId}`);
      const response = await axiosInstance.post(
        "/generate-cover-letter",
        { job_id: jobId }, //this should be changed based on the jobId
        { responseType: "blob" } // <-- Important for downloading files
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Cover_Letter_${jobId}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      alert("Cover Letter generated and downloaded successfully!");
    } catch (error) {
      console.error("Error generating Cover Letter:", error);
      alert("Failed to generate Cover Letter. Please try again.");
    }
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/user/login");
    // Add logout functionality here
  };

  const handleGetJobURL = async (job_id) => {
    try {
      const token = sessionStorage.getItem("authToken") || "your-fallback-token";
      console.log("Token I'm sending 👉", token);
  
      const response = await axios.post(
        "https://raasbackend-production.up.railway.app/provide-link",
        { job_id: job_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("🔥 Full Response:", response.data); // Always good to check bro!
  
      // SAFE checking 🔥
      if (response.data?.job_link) {
        const jobLink = response.data.job_link;
        window.open(jobLink, "_blank"); // Open in new tab
      } else {
        console.error("🚨 No valid job link found in the response:", response.data);
      }
    } catch (error) {
      console.error("❌ AxiosError:", error);
    }
  };
  
  

  const [menuOpenId, setMenuOpenId] = useState(null);

  const toggleMenu = (id) => {
    if (menuOpenId === id) {
      setMenuOpenId(null); // close if already open
    } else {
      setMenuOpenId(id); // open the clicked one
    }
  };
  

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col bg-gray-40">
      <main className="p-5">
          {selectedJobs.length === 0 ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(264px + 40%)", // 250px = sidebar width (adjust if needed)
                transform: "translate(-50%, -50%)",
              }}
              className="text-center"
            >
              <h2 className="text-lg font-semibold text-gray-700">No Selected Applications</h2>
              <p className="text-gray-500">Please check back later.</p>
            </div>
          ) : (
            <div>
              
            </div>
          )}

        <h2 className="text-base font-semibold">
          Selected {selectedJobs.length} Application(s)
        </h2>

        <div className="flex flex-wrap">
          <div className="space-y-3 w-full h-auto pt-5">

            {selectedJobs.map((job) => (
              <div key={job.id} className=" relative bg-white h-fit shadow rounded-lg flex justify-between">
                {/* Top-right 3-dots menu */}
                  <div className="absolute top-4 right-4">
                    <button
                      type="button"
                      onClick={() => toggleMenu(job.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="More options"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {menuOpenId === job.id && (
                      <div className="absolute top-8 right-0 bg-white border rounded-md shadow-lg p-2 z-10">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
                      </div>
                    )}
                  </div>
                <div className="flex p-6 gap-6 w-1/2">
                  {/* <div className="pr-5 bg-gray-200 items-center justify-center rounded-md text-lg font-bold text-center">{job.company}</div> */}
                  <div className="pr-3">
                    <img src={defaultJobImg} className="w-16 h-16 object-cover" alt="Job" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#2C6472] font-bold text-[19px] leading-[100%]">
                      {job.title}
                    </h3>
                    <div>
                      <p className="font-semibold">
                        {job.company} &nbsp; • &nbsp;{" "}
                        <span className="text-[#2C6472] text-sm">
                          {job.postedDate}
                        </span>
                      </p>
                      {/* <p className="text-base">{postedDate}</p> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Location_Icon} alt="Location" />
                      <p className="text-[#00000091] text-sm font-medium">
                        {job.location}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-[13px] pt-3 text-gray-400 font-semibold">
                        <strong className="text-sm text-black font-semibold mr-4">
                          Required Skills:
                        </strong>{" "}
                        {job.skillData[0]?.value}
                      </p>
                      <p className="text-[13px] pt-3 text-gray-400 font-semibold">
                        <strong className="text-sm text-black font-semibold mr-12">
                          Your Skills:{" "}
                        </strong>{" "}
                        {job.skillData[1]?.value}
                      </p>
                      <p className="text-[13px] pt-3 text-gray-400 font-semibold">
                        <strong className="text-sm text-black font-semibold mr-2">
                          Expected Salary:
                        </strong>{" "}
                        {job.skillData[2]?.value}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-1/2 p-6 gap-6">

                  <div className="w-px bg-gray-200"></div>

                  <div className="flex flex-col items-center gap-4 w-1/2">
                    <div className="relative w-28 h-28">
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#E5E7EB"
                          strokeWidth="7"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#2c6472"
                          strokeWidth="7"
                          fill="none"
                          strokeDasharray="282"
                          strokeDashoffset={282 - (282 * job.matchValue) / 100}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                      {job.matchValue}%
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Profile Match</p>
                    <button
                      className="flex gap-2 font-semibold text-[#2C6472] ms-3 text-sm underline hover:text-blue-800 transition"
                      onClick={() => handleGetJobURL(job.job_id)}
                    >
                      Go to Job Link
                      <img src={link_icon} alt="" />
                    </button>

                  </div>

                  <div className="flex flex-col mt-auto gap-6">
                    <button
                      className="px-5 py-2 text-[13px] ml-auto font-medium w-fit border border-[#2C6472] bg-[#2C6472] text-white rounded-full transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
                      onClick={() => handleGenerateCV(job.job_id)}
                    >
                      Generate CV
                    </button>
                    <button
                      className="px-5 py-2 text-[13px] ml-auto font-medium w-fit border border-[#2C6472] bg-[#2C6472] text-white rounded-full transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
                      onClick={() => handleGenerateCoverLetter(job.job_id)}
                    >
                      Generate Cover Letter
                    </button>
                    {/* Keeping your original download button handler untouched */}
                    <button className="flex justify-center gap-2 px-5 py-2 text-[13px] ml-auto font-semibold w-fit border hover:border-[#2C6472] bg-gray-200 text-black rounded transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105">
                      Download All
                      <img src={download_icon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SelectedApplications;