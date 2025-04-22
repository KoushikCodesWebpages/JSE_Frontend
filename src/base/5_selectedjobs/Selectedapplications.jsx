import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Navbar from "../navbar/Navbar.jsx";


function SelectedApplications() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const token = sessionStorage.getItem("authToken") || "your-fallback-token";

  const axiosInstance = axios.create({
    baseURL: "https://raasbackend-production.up.railway.app",
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
          id: job.ID || job.id,
          title: job.title,
          company: job.company,
          postedDate: job.posted_date || "Not specified",
          location: job.location || "Location not specified",
          skillData: [
            { label: "Required Skills", value: `${job.skills}` },
            { label: "Your Skills", value: `${job.user_skills}` },
            { label: "Expected Salary", value: `${job.min_salary} - ${job.max_salary}` },
          ],
          matchValue: job.match_score,
          selected: job.selected,
          cvGenerated: job.cv_generated,
          coverLetterGenerated: job.cover_letter_generated,
          viewLink: job.view_link,
          job_id : job.job_id
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
    navigate('/user/login');
    // Add logout functionality here
  };
  
  const handleGetJobURL = async (job_id) => {
    try {
      const response = await axiosInstance.post("/provide-link",{
        job_id: job_id
      })
      const jobLink = response.data[0].job_link;

    if (jobLink) {
      window.open(jobLink, "_blank"); // Open in new tab
    } else {
      console.error("No link found in response.");
    }
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />


      <div className="flex flex-col w-[1300px] min-h-screen bg-gray-40">
        {/* Navbar */}
        <Navbar/>
        <br/>

        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Selected {selectedJobs.length} Application(s)
          </h2>
          <div className="flex flex-wrap gap-3 mb-5"><br/>
          <div className="space-y-6"><br/>
            {selectedJobs.map((job) => (
              <div key={job.id} className="bg-white shadow w-[1241px] rounded-lg p-6 flex flex-col md:flex-row justify-between">
                <div className="flex gap-6 items-center justify-center"><br/>
                  <div className="bg-gray-200 items-center justify-center rounded-md text-lg font-bold w-[91px] h-[91px] text-center"><br/>{job.company}</div><br/>
                  <div>
                    <br/><h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.postedDate}</p>
                    <p className="text-gray-600">{job.location}</p><br/>
                    <div className="mt-3 space-y-1">
                      <p><strong>Required Skills:</strong> {job.skillData[0]?.value}</p>
                      <p><strong>Your Skills:</strong> {job.skillData[1]?.value}</p>
                      <p><strong>Expected Salary:</strong> {job.skillData[2]?.value}</p>
                    </div><br/>
                  </div>
                </div>
                  <div className="flex flex-col items-center justify-center px-4">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#2C6472] text-white rounded-full text-lg font-bold">
                      {job.matchValue}%
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Profile Match</p><br/>
                    <button
                      className="text-blue-600 text-sm underline mt-2 hover:text-blue-800 transition"
                      onClick={()=>handleGetJobURL(job.job_id)}
                    >
                      Go to Job Link
                    </button>
                  </div><br/>
                  <div className="space-y-2 w-[191px]"><br/>
                    <button
                      className="px-7 py-2 border border-[#2C6472] bg-[#2C6472] w-[200px] h-[41px] text-white rounded-full transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
                      onClick={() => handleGenerateCV(job.job_id)}
                    >
                      Generate CV
                    </button><br/><br/>
                    <button
                      className="px-7 py-2 border border-[#2C6472] bg-[#2C6472] w-[200px] h-[41px] text-white rounded-full transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
                      onClick={() => handleGenerateCoverLetter(job.job_id)}
                    >
                      Generate Cover Letter
                    </button><br/><br/>
                    {/* Keeping your original download button handler untouched */}
                    <button className="px-7 py-2 border border-[#2C6472] bg-gray-400 w-[200px] h-[37px] text-white rounded transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105">
                      Download All
                    </button>
                  </div><br/>
              </div>
            ))}
          </div></div>
        </main>
      </div>
    </div>
  );
}

export default SelectedApplications;
