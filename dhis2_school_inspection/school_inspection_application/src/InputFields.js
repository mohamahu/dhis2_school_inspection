import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/InputFields.css";
import { HumanResource } from "./HumanResource";
import { ResourceCount } from "./ResourceCount";
import { SchoolManagement } from "./SchoolManagement";
import { SchoolRegistration } from "./SchoolRegistration";
import { AppProvider } from "./state";
import { SubmittedReceipt } from "./SubmittedReceipt";
import { Stepper } from "./Stepper";
import { Summary } from "./Summary"; 

export const InputFields = () => {

  return (
    <div className='inputFields'>
      <div className="inspection-form">
        <AppProvider>
          <Router>
            <Stepper/>
            <Routes>
              <Route path="/" element={<SchoolRegistration />} />
              <Route path="/SchoolManagement" element={<SchoolManagement />} />
              <Route path="/HumanResource" element={<HumanResource />} />
              <Route path="/ResourceCount" element={<ResourceCount />} />
              <Route path="/Summary" element={<Summary />} />
              <Route path="/SubmittedReceipt" element={<SubmittedReceipt />} />
            </Routes>
          </Router>
        </AppProvider>
        </div>
    </div>
  )
}