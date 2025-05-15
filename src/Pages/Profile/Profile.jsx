import React, { useEffect, useState } from 'react'
import axios from 'axios';
import profile from '../../assets/profile1.png'
import edit from '../../assets/edit-icon.svg'
import Loader from '../../base/loader/Loader';
import WorkExpUpdateForm from '../../UpdateProfile/WorkExpUpdateForm';
import EducationUpdateForm from '../../UpdateProfile/EducationUpdateForm';
import CertificatesUpdateForm from '../../UpdateProfile/CertificatesUpdateForm';
import LanguageUpdateForm from '../../UpdateProfile/LanguageUpdateForm';
import PersonalnfoUpdateForm from '../../UpdateProfile/PersonalnfoUpdateForm';
import ProfessionalSumUpdateForm from '../../UpdateProfile/ProfessionalSumUpdateForm';

const Profile = () => {

  const token = sessionStorage.getItem("authToken");

  const [animatedScore, setAnimatedScore] = useState(0);
  const [workpopup, setWorkPopup] = useState(false);
  const [educationpopup, setEducationPopup] = useState(false);
  const [certificatesPopup, setCertificatesPopup] = useState(false);
  const [languagesPopup, setLanguagesPopup] = useState(false);
  const [personalinfoPopup, setPersonalInfoPopup] = useState(false);
  const [professionalSummaryPopup, setProfessionalSummaryPopup] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const storedProfile = sessionStorage.getItem("profileData");

  if (storedProfile && storedProfile !== "undefined") {
    setProfileData(JSON.parse(storedProfile));
    setLoading(false);
  } else {
    const fetchProfile = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get("https://arshan.digital/seeker", { headers });

        setProfileData(res.data);
        sessionStorage.setItem("profileData", JSON.stringify(res.data));
        setLoading(false);
      } catch (err) {
        const errorMessage = err.response?.data?.message || "⚠ Failed to load profile data.";
        alert(errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchProfile();
  }
}, [token]);


  useEffect(() => {
    if (!profileData?.profile_completion) return;

    let start = 0;
    const end = profileData.profile_completion;
    const duration = 500;
    const frameRate = 10;
    const increment = (end / duration) * frameRate;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedScore(Math.floor(start));
    }, frameRate);

    return () => clearInterval(timer);
  }, [profileData]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

// Full Name
const fullName = `${profileData?.personal_info?.first_name || ""} ${profileData?.personal_info?.second_name || ""}`.trim();

// Address
const address = profileData?.personal_info?.address || "";

// Date of Birth
const dateOfBirth = profileData?.personal_info?.date_of_birth || "";

// LinkedIn
const linkedin = profileData?.personal_info?.linkedin_profile || "";

// Professional Summary
const about = profileData?.professional_summary?.about || "";
const annualIncome = profileData?.professional_summary?.annual_income || 0;
const skills = profileData?.professional_summary?.skills || [];

// Work Experiences
const workExperiences = profileData?.work_experiences || [];

// Education
const education = profileData?.education || [];

// Certificates
const certificates = profileData?.certificates || [];

// Languages
const languages = profileData?.languages || [];

// Titles
const primaryTitle = profileData?.primary_title || "";
const secondaryTitle = profileData?.secondary_title || "";
const tertiaryTitle = profileData?.tertiary_title || "";

  const handleClose = () => {
    setWorkPopup(false);
    setEducationPopup(false);
    setCertificatesPopup(false);
    setLanguagesPopup(false);
    setPersonalInfoPopup(false);
    setProfessionalSummaryPopup(false);
  };

  const handleWorkPopup = () => setWorkPopup(true);
  const handleEducationPopup = () => setEducationPopup(true);
  const handleCertificatesPopup = () => setCertificatesPopup(true);
  const handleLanguagesPopup = () => setLanguagesPopup(true);
  const handlePersonalInfoPopup = () => setPersonalInfoPopup(true);
  const handleProfessionalSummaryPopup = () => setProfessionalSummaryPopup(true);

  return (
    <div className='flex flex-col gap-3 bg-gray-100 px-6 py-4'>
      <div className="flex justify-between py-3 px-5 mb-3 w-full bg-white rounded-md">
        <div className="flex items-center gap-6">
          <img src={profile} className="w-14 h-14 rounded-full object-cover" alt="Profile" />
          <div>
            <h2 className='font-bold'>{fullName}</h2>
            <p className='font-semibold text-xs mt-2'>{primaryTitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-14 h-14">
            <svg className="absolute top-0 left-0 w-full h-full">
              <circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#2c6472"
                strokeWidth="4"
                fill="none"
                strokeDasharray="150"
                strokeDashoffset={150 - (150 * profileData.profile_completion) / 100}
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
          <p className='text-sm font-medium text-gray-500'>Name: {fullName}</p>
          <p className='text-sm font-medium text-gray-500'>Date of Birth: {dateOfBirth}</p>
          <p className='text-sm font-medium text-gray-500'>Address: {address}</p>
          <p className='text-sm font-medium text-gray-500'>LinkedIn: <span className='underline cursor-pointer'>{linkedin}</span></p>
        </div>
        <div onClick={handlePersonalInfoPopup} className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
          <img src={edit} alt="" />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
        <div className='flex flex-col gap-3 w-11/12'>
          <h2 className="text-sm font-bold">Professional Summary</h2>
          <p className='text-sm font-medium text-gray-500'>{about}</p>
        </div>
        <div onClick={handleProfessionalSummaryPopup} className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
          <img src={edit} alt="" />
        </div>
      </div>

      {/* Education */}
      <div className=" flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
        {education.map((edu, index) => (
        <div key={index} className='flex flex-col gap-1'>
          <h2 className="text-sm font-bold">Education</h2>
          <div className='w-full flex gap-2 mt-2'>
            <p className='text-sm font-medium text-gray-500'>Degree Title :</p>
            <p className='text-sm font-medium text-gray-500'>{edu.degree}</p>
          </div>
          <div className='flex gap-2 mt-1'>
            <p className='text-sm font-medium text-gray-500'>Instution Name :</p>
            <p className='text-sm font-medium text-gray-500'>{edu.institution}</p>
          </div>
          <div className='flex gap-2 mt-1'>
            <p className='text-sm font-medium text-gray-500'>Field of Study :</p>
            <p className='text-sm font-medium text-gray-500'>{field_of_study}</p>
          </div>
          <div className='flex gap-2 mt-1'>
            <p className='text-sm font-medium text-gray-500'>{new Date(edu.start_date.time).toLocaleDateString()}</p>
            <span className='-mt-1 text-gray-500'>-</span>
            <p className='text-sm font-medium text-gray-500'> {new Date(edu.end_date.time).toLocaleDateString()}</p>
          </div>
        </div>
        ))}
        <div onClick={handleEducationPopup} className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
          <img src={edit} alt="Edit" />
        </div>
      </div>


      {/* Work Experience */}
      <div className="flex justify-between items-center py-5 px-6 w-full bg-white rounded-md">
        <div className='flex flex-col gap-3'>
          <h2 className="text-sm font-bold">Work Experience</h2>
          {workExperiences.map((work, index) => (
            <div key={index}>
              <p className='text-sm font-semibold text-gray-500'>{work.job_title}</p>
              <div className='flex gap-16 mt-1'>
                <p className='text-sm font-medium w-20 text-gray-500'>{work.company_name}</p>
                <p className='text-sm font-medium text-gray-500'>{new Date(work.start_date.time).toLocaleDateString()} - {new Date(work.end_date.time).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div onClick={handleWorkPopup} className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
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
        <div onClick={handleCertificatesPopup} className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
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
        <div onClick={handleLanguagesPopup} className="flex justify-center items-center h-fit p-3 rounded-full hover:bg-slate-300 cursor-pointer">
          <img src={edit} alt="Edit" />
        </div>
      </div>      {/* Your other section components go here with appropriate edit handlers */}

      {/* Modals */}
      {workpopup && <WorkExpUpdateForm onclose={handleClose} />}
      {educationpopup && <EducationUpdateForm onclose={handleClose} />}
      {certificatesPopup && <CertificatesUpdateForm onclose={handleClose} />}
      {languagesPopup && <LanguageUpdateForm onclose={handleClose} />}
      {personalinfoPopup && <PersonalnfoUpdateForm onclose={handleClose} />}
      {professionalSummaryPopup && <ProfessionalSumUpdateForm onclose={handleClose} />}
    </div>
  );
};

export default Profile;
