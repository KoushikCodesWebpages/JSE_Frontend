import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";

const JobTitle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    primary_title: '',
    secondary_title: '',
    tertiary_title: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.primary_title) {
      newErrors.primary_title = 'Primary title is required';
    }
    // if (!formData.secondary_title) {
    //   newErrors.secondary_title = 'Secondary title is required';
    // }
    // if (!formData.tertiary_title) {
    //   newErrors.tertiary_title = 'Tertiary title is required';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error('❌ No token found in sessionStorage');
      return;
    }

    try {
      const response = await fetch('https://arshan.digital/jobtitles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Failed to upload job titles:', errorData);
      } else {
        alert(`✅ Job Titles uploaded successfully`);
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('❌ Error while posting job titles:', error);
    }
  };

  const fields = [
    {
      label: 'Primary Title',
      name: 'primary_title',
      options: [
        "Software Engineer",
        "Backend Developer",
        "DevOps Engineer",
        "Logistics Coordinator",
        "Supply Chain Specialist",
        "Procurement Specialist",
        "Financial Analyst",
        "Accounts Specialist",
        "Management Accountant",
        "Operations Manager",
        "Project Coordinator",
        "Supply Chain Analyst",
        "Mechanical Design Engineer",
        "Automation Engineer",
        "Production Engineer",
        "Logistics Chain Analyst",
        "Supply Chain Consultant",
        "Procurement Analyst",
        "Sports Marketing Manager",
        "Business Development Manager",
        "Sponsorship Manager",
        "Business Analyst",
        "Mechanical Engineer", "Design Engineer", "Manufacturing Engineer", "Automation Engineer",
        "Electrical Engineer", "Power Engineer", "Control Systems Engineer", "Electronics Engineer",
        "Civil Engineer", "Structural Engineer", "Construction Manager", "Transportation Engineer",
        "Software Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "Data Scientist", "Data Engineer", "Machine Learning Engineer", "Data Analyst",
        "Cybersecurity Specialist", "Network Security Engineer", "Penetration Tester", "Incident Response Analyst",
        "AI/ML Engineer", "Machine Learning Engineer", "AI Research Scientist", "Natural Language Processing Engineer",
        "Automotive Engineer", "Automotive Systems Engineer", "Vehicle Integration Engineer", "Testing Engineer",
        "Robotics Engineer", "Robot Programmer", "Automation Engineer",
        "Environmental Engineer", "Water Resources Engineer", "Waste Management Engineer", "Sustainability Engineer",
        "Chemical Engineer", "Process Engineer", "Materials Engineer", "Biochemical Engineer",
        "Industrial Engineer", "Operations Research Analyst", "Manufacturing Engineer", "Supply Chain Engineer",
        "Construction Engineer", "Site Engineer", "Cost Engineer", "Health & Safety Engineer",
        "HVAC Engineer", "Heating Engineer", "Ventilation Engineer", "Air Conditioning Engineer",
        "Mechatronics Engineer", "Automation Engineer", "Control Systems Engineer", "Embedded Systems Engineer",
        "Telecommunications Engineer", "Network Engineer", "Radio Frequency (RF) Engineer", "Telecom Systems Engineer",
        "Aerospace Engineer", "Aircraft Systems Engineer", "Spacecraft Engineer", "Flight Test Engineer",
        "Marine Engineer", "Ship Design Engineer", "Marine Systems Engineer",
        "Geotechnical Engineer", "Rock Mechanics Engineer", "Foundation Engineer",
        "Nuclear Engineer", "Radiation Protection Engineer", "Reactor Engineer", "Nuclear Safety Engineer",
        "Project Manager", "IT Project Manager", "Construction Project Manager", "Agile Project Manager",
        "Product Manager", "Digital Product Manager", "Mobile Product Manager", "E-commerce Product Manager",
        "Operations Manager", "Supply Chain Operations Manager", "Manufacturing Operations Manager", "Facility Operations Manager",
        "Supply Chain Manager", "Logistics Manager", "Inventory Manager", "Procurement Manager",
        "HR Manager", "Talent Acquisition Manager", "Employee Relations Manager", "Compensation and Benefits Manager",
        "Financial Manager", "Risk Manager", "Treasury Manager", "Compliance Manager",
        "Marketing Manager", "Brand Manager", "Content Marketing Manager", "Social Media Manager",
        "Sales Manager", "Regional Sales Manager", "Inside Sales Manager", "Key Account Manager",
        "IT Manager", "Systems Manager", "Network Manager", "Security Manager",
        "Business Development Manager", "Partnerships Manager", "Sales Development Manager", "Market Development Manager",
        "Risk Manager", "Insurance Risk Manager", "Operational Risk Manager", "Credit Risk Manager",
        "Legal Manager", "Contract Manager", "Compliance Manager", "Corporate Counsel",
        "Quality Assurance Manager", "Test Manager", "Process Improvement Manager", "Auditing Manager",
        "Customer Service Manager", "Call Center Manager", "Client Relations Manager", "Technical Support Manager",
        "Procurement Manager", "Sourcing Manager", "Vendor Manager", "Purchasing Manager",
        "Compliance Manager", "Regulatory Affairs Manager", "Internal Auditor", "Environmental Compliance Manager",
        "Change Manager", "Organizational Development Manager", "Transition Manager", "Change Communication Manager",
        "Corporate Strategy Manager", "Strategic Planning Manager", "Business Analyst", "Mergers and Acquisitions Manager",
        "Training and Development Manager", "Learning and Development Specialist", "Employee Engagement Manager", "Leadership Development Manager",
        "Facility Manager", "Building Operations Manager", "Maintenance Manager", "Space Planner",
      ]
    },
    {
      label: 'Secondary Title',
      name: 'secondary_title',
      options: [
        "Software Engineer",
        "Backend Developer",
        "DevOps Engineer",
        "Logistics Coordinator",
        "Supply Chain Specialist",
        "Procurement Specialist",
        "Financial Analyst",
        "Accounts Specialist",
        "Management Accountant",
        "Operations Manager",
        "Project Coordinator",
        "Supply Chain Analyst",
        "Mechanical Design Engineer",
        "Automation Engineer",
        "Production Engineer",
        "Logistics Chain Analyst",
        "Supply Chain Consultant",
        "Procurement Analyst",
        "Sports Marketing Manager",
        "Business Development Manager",
        "Sponsorship Manager",
        "Business Analyst",
        "Mechanical Engineer", "Design Engineer", "Manufacturing Engineer", "Automation Engineer",
        "Electrical Engineer", "Power Engineer", "Control Systems Engineer", "Electronics Engineer",
        "Civil Engineer", "Structural Engineer", "Construction Manager", "Transportation Engineer",
        "Software Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "Data Scientist", "Data Engineer", "Machine Learning Engineer", "Data Analyst",
        "Cybersecurity Specialist", "Network Security Engineer", "Penetration Tester", "Incident Response Analyst",
        "AI/ML Engineer", "Machine Learning Engineer", "AI Research Scientist", "Natural Language Processing Engineer",
        "Automotive Engineer", "Automotive Systems Engineer", "Vehicle Integration Engineer", "Testing Engineer",
        "Robotics Engineer", "Robotic Systems Designer", "Robot Programmer", "Automation Engineer",
        "Environmental Engineer", "Water Resources Engineer", "Waste Management Engineer", "Sustainability Engineer",
        "Chemical Engineer", "Process Engineer", "Materials Engineer", "Biochemical Engineer",
        "Industrial Engineer", "Operations Research Analyst", "Manufacturing Engineer", "Supply Chain Engineer",
        "Construction Engineer", "Site Engineer", "Cost Engineer", "Health & Safety Engineer",
        "HVAC Engineer", "Heating Engineer", "Ventilation Engineer", "Air Conditioning Engineer",
        "Mechatronics Engineer", "Automation Engineer", "Control Systems Engineer", "Embedded Systems Engineer",
        "Telecommunications Engineer", "Network Engineer", "Radio Frequency (RF) Engineer", "Telecom Systems Engineer",
        "Aerospace Engineer", "Aircraft Systems Engineer", "Spacecraft Engineer", "Flight Test Engineer",
        "Marine Engineer", "Ship Design Engineer", "Marine Systems Engineer", "Naval Architect",
        "Geotechnical Engineer", "Soil Engineer", "Rock Mechanics Engineer", "Foundation Engineer",
        "Nuclear Engineer", "Radiation Protection Engineer", "Reactor Engineer", "Nuclear Safety Engineer",
        "Project Manager", "IT Project Manager", "Construction Project Manager", "Agile Project Manager",
        "Product Manager", "Digital Product Manager", "Mobile Product Manager", "E-commerce Product Manager",
        "Operations Manager", "Supply Chain Operations Manager", "Manufacturing Operations Manager", "Facility Operations Manager",
        "Supply Chain Manager", "Logistics Manager", "Inventory Manager", "Procurement Manager",
        "HR Manager", "Talent Acquisition Manager", "Employee Relations Manager", "Compensation and Benefits Manager",
        "Financial Manager", "Risk Manager", "Treasury Manager", "Compliance Manager",
        "Marketing Manager", "Brand Manager", "Content Marketing Manager", "Social Media Manager",
        "Sales Manager", "Regional Sales Manager", "Inside Sales Manager", "Key Account Manager",
        "IT Manager", "Systems Manager", "Network Manager", "Security Manager",
        "Business Development Manager", "Partnerships Manager", "Sales Development Manager", "Market Development Manager",
        "Risk Manager", "Insurance Risk Manager", "Operational Risk Manager", "Credit Risk Manager",
        "Legal Manager", "Contract Manager", "Compliance Manager", "Corporate Counsel",
        "Quality Assurance Manager", "Test Manager", "Process Improvement Manager", "Auditing Manager",
        "Customer Service Manager", "Call Center Manager", "Client Relations Manager", "Technical Support Manager",
        "Procurement Manager", "Sourcing Manager", "Vendor Manager", "Purchasing Manager",
        "Compliance Manager", "Regulatory Affairs Manager", "Internal Auditor", "Environmental Compliance Manager",
        "Change Manager", "Organizational Development Manager", "Transition Manager", "Change Communication Manager",
        "Corporate Strategy Manager", "Strategic Planning Manager", "Business Analyst", "Mergers and Acquisitions Manager",
        "Training and Development Manager", "Learning and Development Specialist", "Employee Engagement Manager", "Leadership Development Manager",
        "Facility Manager", "Building Operations Manager", "Maintenance Manager", "Space Planner",
      ]
    },
    {
      label: 'Tertiary Title',
      name: 'tertiary_title',
      options: [
        "Software Engineer",
        "Backend Developer",
        "DevOps Engineer",
        "Logistics Coordinator",
        "Supply Chain Specialist",
        "Procurement Specialist",
        "Financial Analyst",
        "Accounts Specialist",
        "Management Accountant",
        "Operations Manager",
        "Project Coordinator",
        "Supply Chain Analyst",
        "Mechanical Design Engineer",
        "Automation Engineer",
        "Production Engineer",
        "Logistics Chain Analyst",
        "Supply Chain Consultant",
        "Procurement Analyst",
        "Sports Marketing Manager",
        "Business Development Manager",
        "Sponsorship Manager",
        "Business Analyst",
        "Mechanical Engineer", "Design Engineer", "Manufacturing Engineer", "Automation Engineer",
        "Electrical Engineer", "Power Engineer", "Control Systems Engineer", "Electronics Engineer",
        "Civil Engineer", "Structural Engineer", "Construction Manager", "Transportation Engineer",
        "Software Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "Data Scientist", "Data Engineer", "Machine Learning Engineer", "Data Analyst",
        "Cybersecurity Specialist", "Network Security Engineer", "Penetration Tester", "Incident Response Analyst",
        "AI/ML Engineer", "Machine Learning Engineer", "AI Research Scientist", "Natural Language Processing Engineer",
        "Automotive Engineer", "Automotive Systems Engineer", "Vehicle Integration Engineer", "Testing Engineer",
        "Robotics Engineer", "Robotic Systems Designer", "Robot Programmer", "Automation Engineer",
        "Environmental Engineer", "Water Resources Engineer", "Waste Management Engineer", "Sustainability Engineer",
        "Chemical Engineer", "Process Engineer", "Materials Engineer", "Biochemical Engineer",
        "Industrial Engineer", "Operations Research Analyst", "Manufacturing Engineer", "Supply Chain Engineer",
        "Construction Engineer", "Site Engineer", "Cost Engineer", "Health & Safety Engineer",
        "HVAC Engineer", "Heating Engineer", "Ventilation Engineer", "Air Conditioning Engineer",
        "Mechatronics Engineer", "Automation Engineer", "Control Systems Engineer", "Embedded Systems Engineer",
        "Telecommunications Engineer", "Network Engineer", "Radio Frequency (RF) Engineer", "Telecom Systems Engineer",
        "Aerospace Engineer", "Aircraft Systems Engineer", "Spacecraft Engineer", "Flight Test Engineer",
        "Marine Engineer", "Ship Design Engineer", "Marine Systems Engineer", "Naval Architect",
        "Geotechnical Engineer", "Soil Engineer", "Rock Mechanics Engineer", "Foundation Engineer",
        "Nuclear Engineer", "Radiation Protection Engineer", "Reactor Engineer", "Nuclear Safety Engineer",
        "Project Manager", "IT Project Manager", "Construction Project Manager", "Agile Project Manager",
        "Product Manager", "Digital Product Manager", "Mobile Product Manager", "E-commerce Product Manager",
        "Operations Manager", "Supply Chain Operations Manager", "Manufacturing Operations Manager", "Facility Operations Manager",
        "Supply Chain Manager", "Logistics Manager", "Inventory Manager", "Procurement Manager",
        "HR Manager", "Talent Acquisition Manager", "Employee Relations Manager", "Compensation and Benefits Manager",
        "Financial Manager", "Risk Manager", "Treasury Manager", "Compliance Manager",
        "Marketing Manager", "Brand Manager", "Content Marketing Manager", "Social Media Manager",
        "Sales Manager", "Regional Sales Manager", "Inside Sales Manager", "Key Account Manager",
        "IT Manager", "Systems Manager", "Network Manager", "Security Manager",
        "Business Development Manager", "Partnerships Manager", "Sales Development Manager", "Market Development Manager",
        "Risk Manager", "Insurance Risk Manager", "Operational Risk Manager", "Credit Risk Manager",
        "Legal Manager", "Contract Manager", "Compliance Manager", "Corporate Counsel",
        "Quality Assurance Manager", "Test Manager", "Process Improvement Manager", "Auditing Manager",
        "Customer Service Manager", "Call Center Manager", "Client Relations Manager", "Technical Support Manager",
        "Procurement Manager", "Sourcing Manager", "Vendor Manager", "Purchasing Manager",
        "Compliance Manager", "Regulatory Affairs Manager", "Internal Auditor", "Environmental Compliance Manager",
        "Change Manager", "Organizational Development Manager", "Transition Manager", "Change Communication Manager",
        "Corporate Strategy Manager", "Strategic Planning Manager", "Business Analyst", "Mergers and Acquisitions Manager",
        "Training and Development Manager", "Learning and Development Specialist", "Employee Engagement Manager", "Leadership Development Manager",
        "Facility Manager", "Building Operations Manager", "Maintenance Manager", "Space Planner",
      ]
    }
  ];


  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 rounded-xl shadow-lg shadow-gray-300/60">
      <div className="flex flex-1 rounded-xl shadow-md shadow-slate-300">
        {/* Left Panel */}
        <div className="flex flex-1 justify-center items-center p-8 bg-white rounded-s-xl">
          <div className="max-w-lg w-full">
            <form className="grid gap-y-4" onSubmit={handleNext}>
              {fields.map((field) => (
                <div key={field.name} className="flex relative h-15 mb-5">
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full h-full px-4 py-3  border text-gray-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'
                      } rounded-md text-base focus:outline-none focus:ring-1 focus:ring-[#2c6472]`}
                  >
                    <label className="block text-gray-700 font-medium mb-1 ms-1">

                    </label>
                    <option value="" disabled>Select {field.label}
                      {field.name === 'primary_title' && (
                        <span className="text-red-500">*</span>
                      )}  </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>


                  {errors[field.name] && (
                    <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
                  )}
                </div>
              ))}

              {/* Button Section */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full  focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px]  rounded-full focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-4 text-white rounded-e-xl">
          <div className="flex justify-center items-center gap-2">
            <img src={joblogo} className="h-6 w-6" />
            <h3 className="text-[#ff9a67] text-xl m-0">JSE AI</h3>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-white text-lg font-medium ms-4 mb-4">Job Preferences</h3>
          </div>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
            <img src={frame} alt="" className='relative object-cover ' />
            <DotLottieReact
              src={
                'https://lottie.host/a5116b74-e6e0-4fef-abfb-d99d2b580033/msf2IWJRuh.lottie'
              }
              loop
              autoplay
              style={{ width: '250px', height: '250px' }}
              className='absolute object-cover me-2 p-2'
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobTitle;
