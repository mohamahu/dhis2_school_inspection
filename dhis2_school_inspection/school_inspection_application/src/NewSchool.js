import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateNewSchool from './CreateNewSchool';
import "./css/InputFields.css";
import { AppProvider } from "./state";
import { SuccessNewSchool } from './SuccessNewSchool';


export const NewSchool = () => {
          
  return (
    <div className='inputFields'>
        

        <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CreateNewSchool />} />
       
          <Route path="/Success" element={<SuccessNewSchool />} />

        </Routes>
      </Router>
    </AppProvider>

       
    </div>
  )
}