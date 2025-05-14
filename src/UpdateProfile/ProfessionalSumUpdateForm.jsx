import React, { useState, useEffect, useRef } from 'react'
import trash from "../assets/trash2.png"

const skillOptions = [
    "API Development",
    "Accounting Software (Tally, QuickBooks)",
    "Activation Strategy",
    "Advanced Excel",
    "Agile/Scrum Knowledge",
    "Authentication & Authorization",
    "Bookkeeping",
    "Brand Management",
    "Budget Planning",
    "Business Intelligence Tools",
    "Business Process Reengineering",
    "CAD Software (SolidWorks, AutoCAD)",
    "CI/CD Pipelines",
    "CRM Tools (HubSpot, Salesforce)",
    "Cloud Platforms (AWS/Azure/GCP)",
    "Communication Skills",
    "Contract Negotiation",
    "Cost Accounting",
    "Cost Reduction Techniques",
    "Database Management (SQL/MongoDB)",
    "Data Analysis (Excel, Power BI)",
    "Demand Forecasting",
    "Distribution Strategy",
    "Docker & Kubernetes",
    "Documentation & Reporting",
    "Engineering Simulation (FEA/CFD)",
    "ERP Systems",
    "ERP Tools (SAP, Oracle)",
    "Event Planning",
    "Excel & Google Sheets",
    "Fan Engagement Strategies",
    "Financial Controls",
    "Financial Modeling",
    "Financial Reporting",
    "Forecasting & Budgeting",
    "Forecasting Techniques",
    "GD&T (Geometric Dimensioning & Tolerancing)",
    "Infrastructure as Code (Terraform)",
    "Invoicing & Billing",
    "Inventory Management",
    "Inventory Optimization",
    "Inventory Replenishment",
    "KPI Development",
    "KPI Monitoring",
    "Lean Manufacturing",
    "Logistics Management",
    "Logistics Planning",
    "Market Research",
    "Material Science",
    "Mechanical Drafting",
    "Monitoring & Logging Tools",
    "Networking & Relationship Building",
    "Negotiation Skills",
    "Node.js / Express.js",
    "Object-Oriented Programming (OOP)",
    "Operations Planning",
    "PLC Programming",
    "Power BI / Tableau",
    "Process Mapping",
    "Process Optimization",
    "Procurement Strategy",
    "Project Scheduling (Gantt/Timeline Tools)",
    "Purchase Order Management",
    "RESTful APIs",
    "ROI Analysis",
    "Ratio Analysis",
    "Requirement Gathering",
    "Risk Management",
    "Robotics & Motion Control",
    "Route Optimization",
    "SAP/Supply Chain Software",
    "SCADA Systems",
    "Scripting (Python, Shell)",
    "Server-side Architecture",
    "Shipment Tracking",
    "Six Sigma",
    "Social Media Marketing",
    "Sourcing Strategies",
    "Stakeholder Coordination",
    "Strategic Planning",
    "Supply Chain Modeling",
    "Supply Chain Planning",
    "Supply Chain Strategy",
    "Supply Network Design",
    "SWOT Analysis",
    "Sales Strategy",
    "Sponsorship Activation",
    "Strategic Thinking",
    "Task Management Tools (Jira/Trello)",
    "Team Leadership",
    "Testing & Debugging",
    "Version Control (Git/GitHub)",
    "Vendor Coordination",
    "Vendor Negotiation",
    "Workflow Optimization",
    "CAD software", "SolidWorks", "Thermodynamics", "Material Science",
    "Circuit Design", "Power Systems", "Signal Processing", "Electromagnetic Fields",
    "Structural Analysis", "Construction Management", "Material Science", "AutoCAD",
    "Programming", "Debugging", "Version Control", "Software Design Patterns",
    "Machine Learning", "Data Analysis", "Python", "Statistics",
    "Network Security", "Encryption", "Penetration Testing", "Firewall Management",
    "Machine Learning", "Neural Networks", "Python", "Data Science",
    "Vehicle Dynamics", "Automotive Systems", "CAD Software", "Powertrain Design",
    "Robotics", "Control Systems", "Mechanical Design", "C++/Python Programming",
    "Water Treatment", "Waste Management", "Environmental Impact Assessment", "Sustainability Practices",
    "Process Engineering", "Chemical Reactions", "Fluid Mechanics", "Heat Transfer",
    "Supply Chain Optimization", "Lean Manufacturing", "Systems Engineering", "Process Improvement",
    "Construction Materials", "Project Management", "Structural Analysis", "Cost Estimation",
    "HVAC Design", "Refrigeration Systems", "Building Energy Efficiency", "Energy Codes",
    "Automation", "Robotics", "Control Systems", "Embedded Systems",
    "Telecom Systems", "Network Design", "RF Engineering", "Data Transmission",
    "Flight Dynamics", "Aerodynamics", "CAD Software", "Propulsion Systems",
    "Marine Systems", "Ship Design", "Hydrodynamics", "Marine Safety",
    "Soil Mechanics", "Geotechnical Analysis", "Foundation Design", "Site Investigation",
    "Radiation Protection", "Nuclear Reactors", "Nuclear Safety", "Power Generation",
    "Project Scheduling", "Risk Management", "Cost Estimation", "Team Leadership",
    "Product Development", "Market Research", "Agile Methodologies", "Cross-functional Team Management",
    "Process Optimization", "Team Leadership", "Supply Chain Management", "Resource Allocation",
    "Logistics Management", "Inventory Control", "Demand Planning", "Supplier Relations",
    "Talent Acquisition", "Employee Relations", "Performance Management", "HR Analytics",
    "Budgeting", "Financial Analysis", "Risk Management", "Investment Strategy",
    "Brand Management", "Digital Marketing", "Market Research", "Content Strategy",
    "Sales Strategy", "Lead Generation", "Negotiation Skills", "Customer Relationship Management (CRM)",
    "Network Management", "Cybersecurity", "System Administration", "Cloud Computing",
    "Market Analysis", "Strategic Partnerships", "Sales Strategy", "Negotiation Skills",
    "Risk Assessment", "Risk Mitigation Strategies", "Insurance", "Regulatory Compliance",
    "Contract Negotiation", "Corporate Governance", "Regulatory Compliance", "Intellectual Property Law",
    "Test Automation", "Quality Control", "Process Improvement", "Compliance Standards",
    "Customer Support", "Team Leadership", "Issue Resolution", "Service Excellence",
    "Supplier Negotiation", "Inventory Management", "Contract Management", "Vendor Relations",
    "Regulatory Affairs", "Internal Audits", "Risk Management", "Compliance Reporting",
    "Organizational Development", "Change Management", "Employee Engagement", "Project Management",
    "Strategic Planning", "Market Analysis", "Business Development", "Financial Modeling",
    "Employee Training", "Leadership Development", "Performance Management", "Learning Programs",
    "Facility Maintenance", "Space Planning", "Budget Management", "Vendor Management",
];


const ProfessionalSumUpdateForm = ({ onclose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        about: '',
        skills: [],
        newSkill: '',
        annual_income: ''
    });

    const filteredSkills = skillOptions.filter(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (skill) => {
        setFormData({ ...formData, newSkill: skill });
        setSearchTerm(skill);
        setShowDropdown(false);
    };

    const addSkill = () => {
        if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, prev.newSkill.trim()],
                newSkill: '',
            }));
            setSearchTerm('');
        }
    };

    const removeSkill = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div className='fixed inset-0 bg-white overflow-y-auto hide-scrollbar bg-opacity-70 z-50 flex items-center justify-center trasnfrom ease-in-out duration-200'>
            <div className='w-[700px]   bg-white flex flex-col shadow rounded-xl px-10 py-5 ' >

                <div className="flex justify-between w-full mt-3">
                    <h3 className='text-lg font-semibold'>Profressional Summary</h3>
                    <p onClick={onclose} className='text-lg font-semibold cursor-pointer transform ease-in-out duration-200 hover:scale-95'>X</p>
                </div>



                <div className="form-fields flex flex-col gap-4 mt-5">
                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>About</label>
                        <textarea className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Skills</label>
                        <div className="relative flex items-center mb-2" ref={dropdownRef}>
                            <input
                                type="text"
                                className="peer w-full custom-scrollbar px-4 py-2 border border-gray-300 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                                placeholder="Search or select a skill..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowDropdown(true);
                                }}
                                onFocus={() => setShowDropdown(true)}
                            />
                            {showDropdown && (
                                <ul className="absolute top-10 z-10 w-[78%] max-h-48 overflow-y-auto text-gray-600 bg-white border border-gray-300 shadow-md">
                                    {filteredSkills.length > 0 ? (
                                        filteredSkills.map((skill, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-[#2c6472] hover:text-white"
                                                onClick={() => handleSelect(skill)}
                                            >
                                                {skill}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-gray-400">No matching skills</li>
                                    )}
                                </ul>
                            )}
                            <button
                                type="button"
                                onClick={addSkill}
                                className=" w-28 px-2 py-2 border-2 border-[#2c6472] text-[#2c6472] h-[41px] text-sm font-medium bg-white hover:scale-95 transition-transform ease-linear  duration-200 ml-2"
                            >
                                +Add Skill
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 h-[80px]  overflow-y-auto p-2 rounded ">
                            {formData.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 h-8 px-3 py-1 text-gray-500 rounded-full flex items-center"
                                >
                                    <span className="mr-2">{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(index)}
                                        className="text-gray-500 hover:text-red-500 focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Desired Income</label>
                        <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>


                    <div className="flex justify-end w-full mt-2">
                        <button className='text-sm flex text-red-500 font-medium hover:scale-95 transform ease-in-out duration-200 '> <img src={trash} alt="trash icon" className="w-4 h-3.5 mt-0.5 text-red-500 me-1 object-contain " />
                            Remove</button>
                    </div>

                    <div className='flex justify-center items-center gap-4 mt-1 mb-2'>
                        <button className='bg-[#2c6472] w-32 text-sm text-white px-2 py-2 rounded-xl'>Save Changes</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProfessionalSumUpdateForm
