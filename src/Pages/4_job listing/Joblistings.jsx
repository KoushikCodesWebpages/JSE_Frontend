import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cards from "./Cards.jsx";
import Loader from "../../base/loader/Loader.jsx";
import arrow_right from '../../assets/arrow-right.svg'
import filter_icon from '../../assets/filter-icon.svg'

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [filters, setFilters] = useState({
    salaryMin: "",
    salaryMax: "",
    location: ""
  });

  useEffect(() => {
    // Dummy job data for UI testing
    const dummyJobs = [
      {
        title: "Frontend Developer",
        company: "Techify Inc",
        location: "Bangalore, India",
        description: "The mission of the Partner Marketing team...",
        skills: "Figma, Adobe XD, Prototyping",
        userSkills: "React, HTML, Tailwind CSS",
        expected_salary: { min: "8 LPA", max: "12 LPA" },
        match_score: 56,
      },
      {
        title: "UI/UX Designer",
        company: "Creative Minds",
        location: "Remote",
        description: "The mission of the Partner Marketing team...",
        skills: "Figma, Adobe XD, Prototyping",
        userSkills: "Figma, Sketch",
        expected_salary: { min: "5 LPA", max: "9 LPA" },
        match_score: 73,
      },
      {
        title: "Full Stack Developer",
        company: "CodeCrafters",
        location: "Hyderabad, India",
        description: "The mission of the Partner Marketing team...",
        skills: "React, Node.js, MongoDB",
        userSkills: "React, Node.js, Express",
        expected_salary: { min: "10 LPA", max: "15 LPA" },
        match_score: 45,
      },
    ];

    setJobs(dummyJobs);
    setLoading(false);
  }, []);

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
                params: { ...filters, title: selectedJobTitle }, // Send filters with the request
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
  }, [filters, selectedJobTitle]); // Fetch data when filters or selectedJobTitle change

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  const handleJobTitleClick = (title) => {
    setSelectedJobTitle(title);
    console.log("Selected title:", title) // Set the selected job title for filtering
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (loading) return <Loader />;

  const jobData = (jobs || []).map((job) => ({
    ...job,
    title: job.title,
    company: job.company,
    postedDate: "3 Days ago",
    location: job.location || "Location not specified",
    description: job.description,
    skillData: [
      { label: "Required Skills", value: `${job.skills}` },
      { label: "Your Skills", value: `${job.user_skills}` },
      {
        label: "Expected Salary",
        value: `${job.expected_salary?.min} - ${job.expected_salary?.max}`,
      },
    ],
    matchValue: Math.floor(Math.random() * 30) + 70,
  }));

  return (
    <div className="flex flex-col bg-gray-40 ms-2">
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="flex flex-wrap gap-3 p-5">
          {/* Job title buttons with dynamic active state */}
          {/* {["Software Engineer", "DevOps Engineer", "Backend Developer"].map((title) => (
            <button
              key={title}
              className={`px-2 py-1.5 font-medium text-[13px] rounded ${selectedJobTitle === title ? 'bg-[#2C6472] text-white' : 'bg-[#e4e2e2] text-black'} hover:scale-105`}
              onClick={() => handleJobTitleClick(title)}
            >
              {title}
            </button>
          ))} */}
          
          {/* Filter Button */}
          {/* <button
            onClick={toggleDropdown}
            className="flex items-center gap-x-2 px-2 py-1.5 bg-white font-medium text-[13px] rounded text-black hover:scale-105 shadow-md"
          >
            <img src={filter_icon} alt="" />
            Filter
          </button> */}
          
          <Link to={'/user/selected-applications'} className="ml-auto">
            <button className="flex items-center gap-x-2 px-2 py-1.5 bg-transparent font-medium text-[13px] rounded text-[#2C6472] border border-[#2C6472] hover:scale-105">
              Go to Selected Application
              <img src={arrow_right} alt="" />
            </button>
          </Link>
        </div>

        {/* {dropdownVisible && (
          <div className="absolute bg-white p-4 rounded shadow-md z-30">
            <h3 className="font-semibold text-lg">Filter Options</h3>
            <div className="mt-2">
              <label className="block text-sm">Salary Range</label>
              <input
                type="number"
                name="salaryMin"
                placeholder="Min Salary"
                value={filters.salaryMin}
                onChange={handleFilterChange}
                className="border p-2 rounded mt-1 w-full"
              />
              <input
                type="number"
                name="salaryMax"
                placeholder="Max Salary"
                value={filters.salaryMax}
                onChange={handleFilterChange}
                className="border p-2 rounded mt-1 w-full"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleFilterChange}
                className="border p-2 rounded mt-1 w-full"
              />
            </div>
          </div>
        )} */}

        {jobs.length === 0 ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(264px + 40%)",
              transform: "translate(-50%, -50%)",
            }}
            className="text-center"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              No jobs available.
            </h2>
            <p className="text-gray-500">
              Please check back later or adjust your filters.
            </p>
          </div>
        ) : (
          <>
            <hr />
            <div className="p-5 pt-4">
              <h2 className="text-sm font-semibold">Showing {jobs.length} Jobs</h2>
              <p className="text-sm text-gray-400 mt-1">Based on your preferences</p>
              <div className="flex flex-col justify-around gap-2 pt-5">
                {jobData.map((job, index) => (
                  <Cards key={index} {...job} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
