import React, { useState } from 'react';
import trash from "../assets/trash2.png";

const WorkExpUpdateForm = ({ onclose }) => {

    // Dummy data
    const initialExperiences = [
        {
            id: 1,
            title: "UIUX Designer",
            company: "Figma Studio",
            employeeType: "Full-Time",
            startDate: "2023-01-01",
            endDate: "2024-01-01"
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: "Google",
            employeeType: "Internship",
            startDate: "2022-06-01",
            endDate: "2022-12-01"
        },
        {
            id: 3,
            title: "Backend Engineer",
            company: "Amazon",
            employeeType: "Part-Time",
            startDate: "2021-09-01",
            endDate: "2022-09-01"
        }
    ];

    const [experiences, setExperiences] = useState(initialExperiences);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        employeeType: "",
        startDate: "",
        endDate: ""
    });

    const [activeId, setActiveId] = useState(null); // track which one is active

    // Select experience to edit
    const handleSelectExperience = (exp) => {
        setFormData(exp);
        setActiveId(exp.id);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Save Changes
    const handleSave = () => {
        const updated = experiences.map(exp => exp.id === activeId ? { ...formData, id: activeId } : exp);
        setExperiences(updated);
        setFormData({ title: "", company: "", employeeType: "", startDate: "", endDate: "" });
        setActiveId(null);
    };

    return (
        <div className='fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center'>
            <div className='w-[700px] h-[550px] bg-white flex flex-col shadow rounded-xl px-10 py-5'>

                <div className="flex justify-between w-full mt-3">
                    <h3 className='text-lg font-semibold'>Work Experience</h3>
                    <p onClick={onclose} className='text-lg font-semibold cursor-pointer hover:scale-95'>X</p>
                </div>

                <div className="flex gap-4 mt-7 mb-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            onClick={() => handleSelectExperience(exp)}
                            className={`flex-shrink-0 w-44 h-8 px-3 py-1.5 text-sm rounded snap-start cursor-pointer 
                                ${activeId === exp.id ? 'bg-[#2c6472] text-white' : 'bg-gray-500/20'} 
                                hover:bg-[#2c6472] hover:text-white transition-all duration-200`}
                        >
                            {exp.title}
                        </div>
                    ))}
                </div>

                <div className="form-fields flex flex-col gap-4">
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="title" className='text-[15px] text-gray-500'>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className='border border-gray-500/30 px-4 py-2 rounded outline-none'
                        />
                    </div>

                    <div className='flex gap-4'>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="company" className='text-[15px] text-gray-500'>Company Name</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className='border border-gray-500/30 px-4 py-2 rounded outline-none'
                            />
                        </div>

                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="employeeType" className='text-[15px] text-gray-500'>Employee Type</label>
                            <input
                                type="text"
                                name="employeeType"
                                value={formData.employeeType}
                                onChange={handleChange}
                                className='border border-gray-500/30 px-4 py-2 rounded outline-none'
                            />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="startDate" className='text-[15px] text-gray-500'>Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className='border border-gray-500/30 px-4 py-2 rounded outline-none'
                            />
                        </div>

                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="endDate" className='text-[15px] text-gray-500'>End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className='border border-gray-500/30 px-4 py-2 rounded outline-none'
                            />
                        </div>
                    </div>

                    <div className="flex justify-between w-full mt-2">
                        <button className='text-sm text-[#2c6472] font-medium hover:scale-95'>+ Add More Experience</button>
                        <button className='text-sm flex text-red-500 font-medium hover:scale-95'>
                            <img src={trash} alt="trash icon" className="w-4 h-3.5 mt-0.5 me-1 object-contain" />
                            Remove
                        </button>
                    </div>

                    <div className='flex justify-center items-center gap-4 mt-3'>
                        <button
                            className='bg-[#2c6472] w-32 text-sm text-white px-2 py-2 rounded-xl hover:scale-95 transition'
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkExpUpdateForm;
