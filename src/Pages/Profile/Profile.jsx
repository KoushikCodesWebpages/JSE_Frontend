import React, {useEffect, useState} from 'react'
import profile from '../../assets/profile1.png'
import edit from '../../assets/edit-icon.svg'

const Profile = () => {

  const languages = ["Tamil", "English", "Germany"]; 
  const certificates = [
  "Product Designer Course - Zoho",
  "Advanced UI Design - Coursera"
  ];  
  const workExperience = [
  {
    role: "UI/UX Designer",
    company: "Accenture",
    duration: "2 June 2024 - 18 September 2025"
  },
  {
    role: "Product Designer",
    company: "Zoho",
    duration: "1 January 2023 - 30 May 2024"
  }
  ];

  
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 70;
    const duration = 500; // 1 second
    const frameRate = 10; // ms per frame
    const increment = (end / duration) * frameRate;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedScore(Math.floor(start));
    }, frameRate);

    return () => clearInterval(timer); // cleanup
  }, []);    

  return (
    <div className='flex flex-col gap-2 bg-gray-100 px-6 py-4'>

        {/* Profile Info */}
        <div className="flex justify-between py-3 px-5 mb-3 w-full bg-white rounded-md">
            <div className="flex items-center gap-6">
                <img src={profile} className="w-14 h-14 rounded-full bg-white object-cover" alt="Profile" />
                 <div>
                     <h2 className='font-bold'>Steve</h2>
                     <p className='font-semibold text-xs mt-2'>UI/UX Designer</p>
                 </div>
            </div>          
            <div className="flex flex-col items-center">
               <div className="relative w-14 h-14">
                <svg className="absolute top-0 left-0 w-full h-full">
                  <circle
                     cx="28"
                     cy="28"
                     r="24"
                     stroke="#E5E7EB"
                     strokeWidth="4"
                     fill="none"
                   />
                   <circle
                     cx="28"
                     cy="28"
                     r="24"
                     stroke="#2c6472"
                     strokeWidth="4"
                     fill="none"
                     strokeDasharray="150"
                     strokeDashoffset={150 - (150 * animatedScore) / 100}
                     strokeLinecap="round"
                     transform="rotate(-90 28 28)"
                   />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                   {animatedScore}%
                 </div>
               </div>
               <span className="text-xs mt-2 font-bold text-gray-600">Profile Complete</span>
            </div>
        </div>

        {/* Personal Information */}
        <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
            <div className='flex flex-col gap-3'>
                <h2 className="text-sm font-bold">Personal Information</h2>
                <p className='text-sm font-medium text-gray-500'>Name: Steve</p>
                <p className='text-sm font-medium text-gray-500'>Date of Birth: 05 May 1998</p>
                <p className='text-sm font-medium text-gray-500'>Email: steve@gmail.com</p>
                <p className='text-sm font-medium text-gray-500'>LinkedIn: <span className='underline cursor-pointer'>linkedin/steve</span></p>
            </div>
            <div className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
                <img src={edit} alt="" />
            </div>
        </div>

        {/* Professional Summary */}
        <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
            <div className='flex flex-col gap-3 w-11/12'>
                <h2 className="text-sm font-bold">Professional Summary</h2>
                <p className='text-sm font-medium text-gray-500'>Creative UI/UX Designer with 5+ years of experience crafting intuitive and user-friendly digital experiences, skilled in Figma,Adobe XD, and responsive design.</p>                
            </div>
            <div className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
                <img src={edit} alt="" />
            </div>
        </div>

        {/* Work Experience */}
        <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
        <div className='flex flex-col gap-3'>
            <h2 className="text-sm font-bold">Work Experience</h2>
            {workExperience.map((work, index) => (
            <div key={index}>
                <p className='text-sm font-semibold text-gray-500'>{work.role}</p>
                <div className='flex gap-16 mt-1'>
                <p className='text-sm font-medium w-20 text-gray-500'>{work.company}</p>
                <p className='text-sm font-medium text-gray-500'>{work.duration}</p>
                </div>
            </div>
            ))}
        </div>
        <div className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
            <img src={edit} alt="Edit" />
        </div>
        </div>

        {/* Certificates and Courses */}
        <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
        <div className='flex flex-col gap-3'>
            <h2 className="text-sm font-bold">Certificates & Courses</h2>
            {certificates.map((cert, index) => (
            <p key={index} className='text-sm font-medium text-gray-500'>• {cert}</p>
            ))}
        </div>
        <div className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
            <img src={edit} alt="Edit" />
        </div>
        </div>

        {/* Languages */}
        <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
        <div className='flex flex-col gap-2'>
            <h2 className="text-sm font-bold">Languages</h2>
            {languages.map((lang, index) => (
            <p key={index} className='text-sm font-medium text-gray-500'>• {lang}</p>
            ))}
        </div>
        <div className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
            <img src={edit} alt="Edit" />
        </div>
        </div>

    </div>
  )
}

export default Profile