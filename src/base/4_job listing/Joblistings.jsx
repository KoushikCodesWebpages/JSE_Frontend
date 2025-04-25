import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cards from "./Cards.jsx";
import Loader from "../loader/Loader.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Navbar from "../navbar/Navbar.jsx";


function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const storedJobs = sessionStorage.getItem("jobsData");

    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
      setLoading(false);
    } else {
      const fetchJobs = async () => {
        setLoading(true);
        try {
          const token = sessionStorage.getItem("authToken");
          if (token) {
            const response = await axios.get(
              "https://raasbackend-production.up.railway.app/api/jobs",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const fetchedJobs = response.data.jobs || []; // Ensure jobs is always an array
            setJobs(fetchedJobs);
            sessionStorage.setItem("jobsData", JSON.stringify(fetchedJobs));
          } else {
            console.error("No token found. Please log in.");
          }
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
        setLoading(false);
      };

      fetchJobs();
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/user/login");
    // Add logout functionality here
  };

  if (loading) return <Loader />;

  const jobData = (jobs || []).map((job) => ({
    ...job,
    title: job.title,
    company: job.company,
    postedDate: "3 Days ago",
    location: job.location || "Location not specified",
    description: `We are seeking a talented ${job.title} to join ${job.company}.`,
    skillData: [
      { label: "Required Skills", value: `${job.skills}` },
      { label: "Your Skills", value: `${job.userSkills}` },
      {
        label: "Expected Salary",
        value: `${job.expected_salary?.min} - ${job.expected_salary?.max}`,
      },
    ],
    matchValue: Math.floor(Math.random() * 30) + 70,
  }));

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="flex flex-col w-[1300px] min-h-screen bg-gray-40">

        <main className="flex-1 p-9 overflow-y-auto bg-gray-100"><br/>
          <div className="flex flex-wrap gap-3 mb-5">
            <button className="px-4 py-2 bg-[#2C6472] text-white rounded hover:bg-white hover:text-[#2C6472] hover:scale-105">
              UI/UX Designer
            </button>
            <button className="px-4 py-2 bg-[#2C6472] text-white rounded hover:bg-white hover:text-[#2C6472] hover:scale-105">
              UI Designer
            </button>
            <button className="px-4 py-2 bg-[#2C6472] text-white rounded hover:bg-white hover:text-[#2C6472] hover:scale-105">
              Frontend Developer
            </button>
            <button className="px-4 py-2 bg-[#2C6472] text-white rounded hover:bg-white hover:text-[#2C6472] hover:scale-105">
              Filter
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center"><br/><br/><br/>
              <h2 className="text-lg font-semibold text-gray-700">
                No jobs available.
              </h2>
              <p className="text-gray-500">
                Please check back later or adjust your filters.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Showing {jobs.length} Jobs</h2>
              <p className="text-sm text-gray-600 mb-4">Based on your preferences</p>
              <div className="flex flex-col gap-3">
                {jobData.map((job, index) => (
                  <Cards key={index} {...job} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

