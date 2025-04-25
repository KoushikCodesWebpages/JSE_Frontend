import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import PersonalInfo from '../../base/2_data_entry/PersonalInfo';
import ProfessionalSummary from '../../base/2_data_entry/ProfessionalSummary';
import WorkExp from '../../base/2_data_entry/WorkExp';
import Education from '../../base/2_data_entry/Education';
import Certification from '../../base/2_data_entry/Certificates';
import Language from '../../base/2_data_entry/Languages';
import SubmitAllData from '../../base/2_data_entry/SubmitAllData';
import JobTitle from '../../base/2_data_entry/JobTitle';

const DataEntryPages = () => {
  return (
    <div className='p-7 min-h-screen bg-white text-white'>
      <Routes>
        <Route path="personal-info" element={<PersonalInfo />} />
        <Route path="professional-summary" element={<ProfessionalSummary />} />
        <Route path="work-experience" element={<WorkExp />} />
        <Route path="education" element={<Education />} />
        <Route path="certificates" element={<Certification />} />
        <Route path="languages" element={<Language />} />
        <Route path="jobtitles" element={<JobTitle />} />
        <Route path="submit-data" element={<SubmitAllData />} />
      </Routes>

      <div className="bg-white text-center mt-5 -mb-4 text-sm">
        <Link to="#" className="text-[#2c6472] hover:underline font-semibold mx-2">Instructions</Link>|
        <Link to="#" className="text-[#2c6472] hover:underline font-semibold mx-2">License</Link>|
        <Link to="#" className="text-[#2c6472] hover:underline font-semibold mx-2">Terms of Use</Link>|
        <Link to="#" className="text-[#2c6472] hover:underline font-semibold mx-2">Privacy</Link>
      </div>
    </div>
  );
};

export default DataEntryPages;
