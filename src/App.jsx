import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import Login from './base/1_auth/Login.jsx';
import Signup from './base/1_auth/Signup.jsx'

import PersonalInfo from './base/2_data_entry/PersonalInfo.jsx';
import ProfessionalSummary from './base/2_data_entry/ProfessionalSummary.jsx';
import WorkExp from './base/2_data_entry/WorkExp.jsx';
import Education from './base/2_data_entry/Education.jsx';
import Certification from './base/2_data_entry/Certificates.jsx';
import Language from './base/2_data_entry/Languages.jsx';
import SubmitAllData from './base/2_data_entry/SubmitAllData.jsx'


import JobTitle from './base/2_data_entry/JobTitle.jsx';
    
import Dashboard from './base/3_dashboard/Dashboard.jsx';

import Joblisting from "./base/4_job listing/Joblistings.jsx";

import Selectedapplication from "./base/5_selectedjobs/Selectedapplications.jsx";

import Myapplication from "./base/6_myapplications/Myapplication.jsx";

import Applicationtracker from "./base/7_app_tracker/Applicationtracker.jsx";

import Savedjob from "./base/8_savedjobs/Savedjob.jsx";

import Setting from "./base/9_settings/Settings.jsx";



import VerificationPage from './base/1_auth/VerificationPage.jsx';

import Test1 from './Test1';
import Navbar from "./base/navbar/Navbar.jsx";
import Sidebar from './base/sidebar/sidebar.jsx';
import './App.css';
import './index.css';
import Landing from './base/Landing.jsx';



function App() {
    return (
        <Router>
            <Routes>

                //LANDING
                <Route path="/" element={<Landing />}/>



                //AUTH ROUTES
                <Route path="/user/login" element={<Login/>}/>
                <Route path="/user/signup" element={<Signup/>}/>


                //DATA ENTRY
                <Route path="/user/personal-info" element={<PersonalInfo/>}/>
                <Route path="/user/professional-summary" element={<ProfessionalSummary/>}/>
                <Route path="/user/work-experience" element={<WorkExp/>}/>
                <Route path="/user/education" element={<Education/>}/>
                <Route path="/user/certificates" element={<Certification/>}/>
                <Route path="/user/languages" element={<Language/>}/>
                <Route path="/user/jobtitles" element={<JobTitle />}/>
                <Route path="/user/submit-data" element={<SubmitAllData />}/>

                //SERVICE
                <Route path="/user/dashboard" element={<Dashboard/>}/>
                <Route path="/user/job-listings" element={<Joblisting/>}/>
                <Route path="/user/selected-applications" element={<Selectedapplication/>}/>
                <Route path="/user/my-applications" element={<Myapplication/>}/>
                <Route path="/user/application-tracker" element={<Applicationtracker/>}/>
                <Route path="/user/saved-jobs" element={<Savedjob/>}/>
                <Route path="/user/settings" element={<Setting/>}/>
                
                <Route path="/Sidebar" element={<Sidebar/>}/>

                
                //NOT VALID
                <Route path="/test1" element={<Test1/>}/>


                <Route path="/verification" element={<VerificationPage/>}/>
            </Routes>
        </Router>

    );
}

export default App;