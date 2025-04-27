import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import Location_Icon from "../../assets/location-icon.svg";
import defaultJobImg from "../../assets/default-job.svg";

const Savedjob = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("authToken");

  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [expandedJobs, setExpandedJobs] = useState({});


  const toggleMenu = (index) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!token) {
      console.warn("No auth token in sessionStorage");
      return;
    }
    fetchSelectedJobs();
  }, []);

  // const fetchSelectedJobs = async () => {
  //   try {
  //     const dummyData = {
  //       selected_jobs: [
  //         {
  //           title: "Sponsorship Manager",
  //           company: "Netflix",
  //           posted_date: "2025-04-13",
  //           location: "Berlin, Berlin, Germany",
  //           description:
  //             "The mission of the Partner Marketing team is to drive awareness of the Netflix brand and capture subscriber acquisition through high quality partnerships and promotions. The role involves managing the creative development and delivery of multiple concurrent campaigns for Distribution partners across the DACH region, including creative ideation, approval across stakeholders, delivery & reformatting of assets. The ideal candidate will have a wealth of experience in delivering brilliant creative against a range of full funnel marketing objectives for established brands, with 8+ years campaign experience in a Brand Marketing role, a Creative role, or from Account Management at a creative agency. Strong operational excellence, communication, and adaptability skills are required, with fluency in English and German.",
  //           skills: "React.js, Tailwind CSS, JavaScript",
  //           user_skills: "campaign management, creative.",
  //           min_salary: 600000,
  //           max_salary: 800000,
  //           match_score: 73,
  //         },
  //         {
  //           title: "Backend Engineer",
  //           company: "CodeWiz",
  //           posted_date: "2025-04-18",
  //           location: "Remote",
  //           description:
  //             "The mission of the Partner Marketing team is to drive awareness of the Netflix brand and capture subscriber acquisition through high quality partnerships and promotions. The role involves managing the creative development and delivery of multiple concurrent campaigns for Distribution partners across the DACH region, including creative ideation, approval across stakeholders, delivery & reformatting of assets. The ideal candidate will have a wealth of experience in delivering brilliant creative against a range of full funnel marketing objectives for established brands, with 8+ years campaign experience in a Brand Marketing role, a Creative role, or from Account Management at a creative agency. Strong operational excellence, communication, and adaptability skills are required, with fluency in English and German.",
  //           skills: "Node.js, MongoDB, Express",
  //           user_skills: "Node.js, Express, MySQL",
  //           min_salary: 600000,
  //           max_salary: 900000,
  //           match_score: 85,
  //         },
  //         {
  //           title: "Full Stack Developer",
  //           company: "DevHouse",
  //           posted_date: "2025-04-15",
  //           location: "Pune, India",
  //           description:
  //             "The mission of the Partner Marketing team is to drive awareness of the Netflix brand and capture subscriber acquisition through high quality partnerships and promotions. The role involves managing the creative development and delivery of multiple concurrent campaigns for Distribution partners across the DACH region, including creative ideation, approval across stakeholders, delivery & reformatting of assets. The ideal candidate will have a wealth of experience in delivering brilliant creative against a range of full funnel marketing objectives for established brands, with 8+ years campaign experience in a Brand Marketing role, a Creative role, or from Account Management at a creative agency. Strong operational excellence, communication, and adaptability skills are required, with fluency in English and German.",
  //           skills: "MongoDB, Express, React, Node",
  //           user_skills: "MongoDB, Express, React",
  //           min_salary: 700000,
  //           max_salary: 1000000,
  //           match_score: 92,
  //         },
  //       ],
  //     };

  //     setSelectedJobs(dummyData.selected_jobs);
  //   } catch (error) {
  //     console.error("Error setting dummy data:", error);
  //     setSelectedJobs([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchSelectedJobs = async () => {
    try {
      const response = await fetch('https://raasbackend-production.up.railway.app/api/selected-jobs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch selected jobs');
      const data = await response.json();
      setSelectedJobs(Array.isArray(data.selected_jobs) ? data.selected_jobs : []);
    } catch (error) {
      console.error('Error fetching selected jobs:', error);
      setSelectedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="p-6 text-red-500 text-center">
        Unauthorized: Please log in to view saved jobs.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading saved jobs...</div>
    );
  }

  return (

    <div className="flex flex-col w-full min-h-screen bg-gray-40 p-5">

      <h2 className="text-base font-semibold">
        Saved {selectedJobs.length} Jobs
      </h2>

      <div className="flex pt-5">

        {selectedJobs.length === 0 ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(264px + 40%)",
              transform: "translate(-50%, -50%)",
            }}
            className="text-center"
          >
            <h2 className="text-lg font-semibold text-gray-700">No Jobs Saved</h2>
            <p className="text-gray-500">Please check back later.</p>
          </div>
        ) : (
          <div>
            
          </div>
        )}


        <div className="w-full space-y-3 overflow-y-auto">

          {selectedJobs.map((job, index) => (
            <div
              key={index}
              className="relative rounded-xl w-full border border-gray-300 bg-white shadow-sm"
            >
              {/* Top-right 3-dots menu */}
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => toggleMenu(index)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="More options"
                >
                  <MoreVertical size={20} />
                </button>

                {activeMenuIndex === index && (
                  <div className="absolute top-8 right-0 bg-white border rounded-md shadow-lg p-2 z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="flex p-6 gap-6">
                {/* Left Part: Image + Job Details */}
                <div className="flex w-[50%] gap-4">
                  <div className="w-20 h-20">
                    <img src={defaultJobImg} alt="Job" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <h2 className="text-[#2C6472] font-bold text-[19px]">
                      {job.title}
                    </h2>
                    <div>
                      <p className="font-semibold">
                        {job.company} &nbsp; • &nbsp;
                        <span className="text-[#2C6472] text-sm">
                          {job.posted_date}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={Location_Icon}
                        alt="Location"
                        className="w-4 h-4"
                      />
                      <p className="text-[#00000091] text-sm font-medium">
                        {job.location}
                      </p>
                    </div>
                    <p className="text-[#00000077] text-sm mt-3">
                      {expandedJobs[index] ? (
                        <>
                          {job.description}
                          &nbsp;
                          <button
                            onClick={() => setExpandedJobs({ ...expandedJobs, [index]: false })}
                            className="text-[#2C6472] font-semibold text-sm underline"
                          >
                            show less
                          </button>
                        </>
                      ) : (
                        job.description.split(' ').length > 40 ? (
                          <>
                            {job.description.split(' ').slice(0, 40).join(' ')}
                             ... &nbsp;
                            <button
                              onClick={() => setExpandedJobs({ ...expandedJobs, [index]: true })}
                              className="text-[#2C6472] font-semibold text-sm underline"
                            >
                              more
                            </button>
                          </>
                        ) : (
                          job.description
                        )
                      )}
                    </p>

                  </div>
                </div>

                {/* Middle Divider */}
                <div className="w-px bg-gray-300"></div>

                {/* Right Part: Skills + Salary + Profile Match */}

                <div className="flex justify-between w-1/2">
                  {/* Skills and Salary Section */}
                  <div className="flex flex-col gap-5 w-3/4">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-base">Required Skills</p>
                      <p className="text-[#a09f9f] font-medium text-[14px]">
                        {Array.isArray(job.skills)
                          ? job.skills.join(", ")
                          : job.skills}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-base">Your Skills</p>
                      <p className="text-[#a09f9f] font-medium text-[14px]">
                        {Array.isArray(job.user_skills)
                          ? job.user_skills.join(", ")
                          : job.user_skills}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-bas">Expected Salary</p>
                      <p className="text-[#a09f9f] font-medium text-[14px]">
                        ₹{job.min_salary} - ₹{job.max_salary}
                      </p>
                    </div>
                  </div>

                  {/* Match Score and Select Button */}
                  <div className="flex flex-col items-center gap-5 w-2/3">
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
                          strokeDashoffset={282 - (282 * job.match_score) / 100}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                        {job.match_score}%
                      </div>
                    </div>

                    <p className="text-xs font-bold">Profile Match</p>
                    <button
                      // onClick={onSelect}
                      className="px-7 py-1 text-sm border border-[#2C6472] bg-[#2C6472] text-white rounded-2xl transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Savedjob;