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
          "https://raasbackend-production.up.railway.app/selected-jobs",
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
              value: `${job.min_salary || "?"} - ${job.max_salary || "?"}`,
            },
          ],
          matchValue: job.match_score || Math.floor(Math.random() * 30) + 70,
          selected: job.selected,
          cvGenerated: job.cv_generated,
          coverLetterGenerated: job.cover_letter_generated,
          viewLink: job.view_link,
        }));

        if (mappedJobs.length === 0) {
          const dummyJobs = [
            {
              jobTitle: "Sponsorship Manager",
              companyName: "Netflix",
              postedDate: "2025-04-13",
              location: "Berlin, Berlin, Germany",
              description: "The mission of the Partner Marketing team is to drive awareness of the Netflix brand and capture subscriber acquisition through high quality partnerships and promotions. The role involves managing the creative development and delivery of multiple concurrent campaigns for Distribution partners across the DACH region, including creative ideation, approval across stakeholders, delivery & reformatting of assets. The ideal candidate will have a wealth of experience in delivering brilliant creative against a range of full funnel marketing objectives for established brands, with 8+ years campaign experience in a Brand Marketing role, a Creative role, or from Account Management at a creative agency. Strong operational excellence, communication, and adaptability skills are required, with fluency in English and German.",
              roleDescription: "You'll be building sleek UIs and collaborating with backend devs.",
              skillData: [
                { label: "Required Skills", value: ["campaign management", "creative strategy", "agency management", "production budgeting", "contract negotiation", "cross-functional team coordination", "communication", "feedback", "adaptability", "entertainment industry knowledge", "German and English fluency"] },
                {
                  label: "Your Skills", value: ["Supply Chain Management",
                    "Logistics Coordination",
                    "Project Management",
                    "Negotiation",
                    "Vendor Relations"]
                },
                {
                  label: "Expected Salary",
                  value: "42000 - 43000"
                }
              ],
              matchValue: 82,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            },
            {
              jobTitle: "Backend Engineer",
              companyName: "CodeVerse",
              postedDate: "5 days ago",
              location: "Bangalore",
              description: "We need a Node.js expert to develop scalable backend services.",
              roleDescription: "Build APIs, manage DBs, and ensure performance.",
              skillData: [
                { label: "Required Skills", value: ["Node.js", "Express", "MongoDB", "Docker"] },
                { label: "Your Skills", value: ["Node.js", "MongoDB", "JWT"] },
                { label: "Expected Salary", value: "6 LPA - 10 LPA" },
              ],
              matchValue: 77,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            },
            {
              jobTitle: "Full Stack Intern",
              companyName: "StartUp Spark",
              postedDate: "1 day ago",
              location: "Chennai",
              description: "Looking for a full stack intern to support product development.",
              roleDescription: "Work across frontend and backend to deliver features.",
              skillData: [
                { label: "Required Skills", value: ["React", "Node", "MongoDB"] },
                { label: "Your Skills", value: ["React", "Express"] },
                { label: "Expected Salary", value: "10K - 15K/month" },
              ],
              matchValue: 89,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            },
            {
              jobTitle: "Data Analyst",
              companyName: "Insights AI",
              postedDate: "3 days ago",
              location: "Remote",
              description: "Analyze data and provide actionable insights.",
              roleDescription: "Use Python and SQL to extract patterns from data.",
              skillData: [
                { label: "Required Skills", value: ["Python", "Pandas", "SQL", "Excel"] },
                { label: "Your Skills", value: ["Python", "Excel"] },
                { label: "Expected Salary", value: "5 LPA - 8 LPA" },
              ],
              matchValue: 75,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            },
            {
              jobTitle: "UI/UX Designer",
              companyName: "PixelForge",
              postedDate: "4 days ago",
              location: "Mumbai",
              description: "We're seeking a creative UI/UX designer with a passion for detail.",
              roleDescription: "Design user flows, wireframes, and interactive prototypes.",
              skillData: [
                { label: "Required Skills", value: ["Figma", "Adobe XD", "UX Research"] },
                { label: "Your Skills", value: ["Figma", "HTML", "CSS"] },
                { label: "Expected Salary", value: "4 LPA - 6 LPA" },
              ],
              matchValue: 84,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            },
            {
              jobTitle: "UI/UX Designer",
              companyName: "PixelPerks",
              postedDate: "5 days ago",
              location: "Remote",
              description: "Design experiences that delight users.",
              roleDescription: "From wireframes to hi-fi prototypes, you'll do it all.",
              skillData: [
                { label: "Required Skills", value: ["Figma", "Adobe XD", "User Research"] },
                { label: "Your Skills", value: ["Figma", "Canva"] },
                { label: "Expected Salary", value: "3 LPA - 6 LPA" },
              ],
              matchValue: 79,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            },
            {
              jobTitle: "DevOps Engineer",
              companyName: "ScaleOps Pvt Ltd",
              postedDate: "Today",
              location: "Hyderabad",
              description: "Automation and scalability is your game? We need you!",
              roleDescription: "You'll manage CI/CD pipelines and cloud infra.",
              skillData: [
                { label: "Required Skills", value: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
                { label: "Your Skills", value: ["AWS", "Docker"] },
                { label: "Expected Salary", value: "7 LPA - 11 LPA" },
              ],
              matchValue: 85,
              selected: false,
              cvGenerated: false,
              coverLetterGenerated: false,
              viewLink: "#",
            }
          ];

          setSelectedJobs(dummyJobs);
          setSelectedJob(dummyJobs[0]);
        }
        else {
          setSelectedJobs(mappedJobs);
          setSelectedJob(mappedJobs[0]);
        }

        setLoading(false);
      } catch (error) {
        const errMsg =
          error.response?.data?.message || "⚠️ Failed to load applications.";
        alert(errMsg);

        // Fallback dummy job
        const dummyJobs = [
          {
            jobTitle: "Frontend Developer",
            companyName: "TechNova Inc.",
            postedDate: "2 days ago",
            location: "Remote",
            description: "We are looking for a creative frontend dev to join our team.",
            roleDescription: "You'll be building sleek UIs and collaborating with backend devs.",
            skillData: [
              { label: "Required Skills", value: ["React", "Tailwind", "Git", "REST APIs"] },
              { label: "Your Skills", value: ["React", "HTML", "CSS"] },
              { label: "Expected Salary", value: "4 LPA - 7 LPA" },
            ],
            matchValue: 82,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },
          {
            jobTitle: "Backend Engineer",
            companyName: "CloudEdge Ltd.",
            postedDate: "1 week ago",
            location: "Bangalore",
            description: "Seeking a backend ninja to craft solid APIs.",
            roleDescription: "You'll be designing and maintaining server-side logic.",
            skillData: [
              { label: "Required Skills", value: ["Node.js", "MongoDB", "Express", "Docker"] },
              { label: "Your Skills", value: ["Node.js", "MySQL"] },
              { label: "Expected Salary", value: "6 LPA - 10 LPA" },
            ],
            matchValue: 75,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },
          {
            jobTitle: "Full Stack Developer",
            companyName: "InnoTech Solutions",
            postedDate: "3 days ago",
            location: "Chennai",
            description: "Join our team to work on end-to-end product development.",
            roleDescription: "You'll be juggling frontend and backend with a smile.",
            skillData: [
              { label: "Required Skills", value: ["React", "Node.js", "GraphQL", "AWS"] },
              { label: "Your Skills", value: ["React", "Node.js"] },
              { label: "Expected Salary", value: "5.5 LPA - 9 LPA" },
            ],
            matchValue: 88,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },
          {
            jobTitle: "UI/UX Designer",
            companyName: "PixelPerks",
            postedDate: "5 days ago",
            location: "Remote",
            description: "Design experiences that delight users.",
            roleDescription: "From wireframes to hi-fi prototypes, you'll do it all.",
            skillData: [
              { label: "Required Skills", value: ["Figma", "Adobe XD", "User Research"] },
              { label: "Your Skills", value: ["Figma", "Canva"] },
              { label: "Expected Salary", value: "3 LPA - 6 LPA" },
            ],
            matchValue: 79,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },
          {
            jobTitle: "DevOps Engineer",
            companyName: "ScaleOps Pvt Ltd",
            postedDate: "Today",
            location: "Hyderabad",
            description: "Automation and scalability is your game? We need you!",
            roleDescription: "You'll manage CI/CD pipelines and cloud infra.",
            skillData: [
              { label: "Required Skills", value: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
              { label: "Your Skills", value: ["AWS", "Docker"] },
              { label: "Expected Salary", value: "7 LPA - 11 LPA" },
            ],
            matchValue: 85,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },
          {
            jobTitle: "UI/UX Designer",
            companyName: "PixelPerks",
            postedDate: "5 days ago",
            location: "Remote",
            description: "Design experiences that delight users.",
            roleDescription: "From wireframes to hi-fi prototypes, you'll do it all.",
            skillData: [
              { label: "Required Skills", value: ["Figma", "Adobe XD", "User Research"] },
              { label: "Your Skills", value: ["Figma", "Canva"] },
              { label: "Expected Salary", value: "3 LPA - 6 LPA" },
            ],
            matchValue: 79,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },
          {
            jobTitle: "DevOps Engineer",
            companyName: "ScaleOps Pvt Ltd",
            postedDate: "Today",
            location: "Hyderabad",
            description: "Automation and scalability is your game? We need you!",
            roleDescription: "You'll manage CI/CD pipelines and cloud infra.",
            skillData: [
              { label: "Required Skills", value: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
              { label: "Your Skills", value: ["AWS", "Docker"] },
              { label: "Expected Salary", value: "7 LPA - 11 LPA" },
            ],
            matchValue: 85,
            selected: false,
            cvGenerated: false,
            coverLetterGenerated: false,
            viewLink: "#",
          },

        ];

        setSelectedJobs(dummyJobs);
        setSelectedJob(dummyJobs[0]);
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
                className={`flex items-start h-40 bg-white justify-between border-y rounded-s-xl border-gray-400/20 px-4  py-5 hover:scale-[1.01] transition-transform ease-in-out duration-200 cursor-pointer ${
                  selectedJob === job ? " border-l-8 border-teal-700 transition-transform ease-in-out duration-200" : ""
                }`}
              >              
                  <div className="flex items-start space-x-10 justify-center ">
                    <img src={defaultJobImg} alt="Job" className="w-20 h-20 my-auto ms-5  object-contain" />
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
                    <div className="flex gap-2 me-3 ">
                      <img src={defaultJobImg} alt="Job" className="w-16 h-16 -ms-5   object-contain" />
                      <div>
                        <p className="text-gray-600 font-semibold text-xl">{selectedJob.companyName}</p>
                        <h2 className="text-2xl font-semibold text-[#2C6472]">{selectedJob.jobTitle}</h2>
                        <p className="text-sm text-gray-500">{selectedJob.location}</p>
                      </div>
                    </div>
                    <div className="flex  flex-col justify-start -mt-6 items-center"><br />
                      <div className="w-16 h-16 rounded-full bg-[#2C6472]  flex items-center justify-center text-xl font-bold text-white">
                        {selectedJob.matchValue}%
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
