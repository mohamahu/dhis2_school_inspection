import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./css/common.css";
import Blue_Encircled_Step1  from "./icons/Blue_Encircled_Step1.svg";
import Blue_Encircled_Step2  from "./icons/Blue_Encircled_Step2.svg";
import Blue_Encircled_Step3  from "./icons/Blue_Encircled_Step3.svg";
import Blue_Encircled_Step4  from "./icons/Blue_Encircled_Step4.svg";
import Blue_Encircled_Step5  from "./icons/Blue_Encircled_Step5.svg";
import Grey_step2 from "./icons/Grey_step2.svg";
import Grey_step3 from "./icons/Grey_step3.svg";
import Grey_step4 from "./icons/Grey_step4.svg";
import Grey_step5 from "./icons/Grey_step5.svg";


export const Stepper = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const getStepIcon = (path, defaultIcon) => {

     if (!location.state   ) {
      return defaultIcon;
    } else {
      console.log("getStepIcon sin else statement viser bluecheck")

       return (location.state[path] === "Completed") ? (
        ( () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="step-icon" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#1E6194" />
              <path fill="#fff" d="m13.136 18.91-3.102-3.134L9 16.821 13.136 21 22 12.045 20.966 11l-7.83 7.91Z" />
            </svg>
          );
        })()
      ) : defaultIcon; // den blir default icon selc om bluececk mark sin consollog printes Why?
    }
     
    };
    // den tar ResourceCount:Completed fra forrige steg (fra next button fra Resource count i stedet for prevous button) skjønner ikke hvorfor

    
    const isCurrentStep = (path) => location.pathname === path;

    const removeStepperWhenSubmittetInspection = () => {
      return (location.pathname == "/SubmittedReceipt" )? "hidden" : "stepper";
    };

    const handleNavigationWithProgressBar = (stepname) => {
      console.log("Edit button is pressed: goto: ", stepname)
      switch (stepname) {
        case "School Management":
          navigate("/SchoolManagement",
            { state: { SchoolRegistration: "Completed", 
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Completed",
            Summary: "Completed",
           } });
          break;
        case "Human Resource":
          navigate("/HumanResource",
            { state: { SchoolRegistration: "Completed", 
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Completed",
            Summary: "Completed",
           } });
          break;
        case "Resource Count":
          navigate("/ResourceCount",
            { state: { SchoolRegistration: "Completed", 
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Completed",
            Summary: "Completed",
           } });
        break;
        default:
        console.error("Unknown step name:", stepname);
      }
    };
  

    return (
    <nav className={ removeStepperWhenSubmittetInspection()}>
      <div className="stepper_row">
        <ol className="Progressbar-nav">
          <li className="step-item"   >
          {getStepIcon ("SchoolRegistration" ,
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#1260B9" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#1260B9" fontSize="16" fontFamily="sans-serif" dy=".35em">1</text>
              </svg>
            )  }            
            <span /* className={getLinkClass("/")}*/>            
            School selection
            </span>
          </li>
          <li className="step-item"> { /*className="step nav-item"*/}
          {getStepIcon ("SchoolManagement" ,isCurrentStep("/SchoolManagement") ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#1260B9" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#1260B9" fontSize="16" fontFamily="sans-serif" dy=".35em">2</text>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#D0D5DD" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#D0D5DD" fontSize="16" fontFamily="sans-serif" dy=".35em">2</text>
              </svg>)) }
            <span /*className={getLinkClass("/SchoolManagement")}*/>
              School management
            </span>
          </li>
          <li className="step-item"> { /*className="step nav-item"*/}
          {getStepIcon("HumanResource", isCurrentStep("/HumanResource") ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#1260B9" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#1260B9" fontSize="16" fontFamily="sans-serif" dy=".35em">3</text>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#D0D5DD" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#D0D5DD" fontSize="16" fontFamily="sans-serif" dy=".35em">3</text>
              </svg>))}        
            <span /*</li>className={getLinkClass("/HumanResource")}*/>
            School staff and students
            </span>
          </li>

          <li className="step-item"   onClick={() => navigate('/ResourceCount')}>    { /*className="step nav-item"*/}
          {getStepIcon("ResourceCount", isCurrentStep("/ResourceCount") ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#1260B9" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#1260B9" fontSize="16" fontFamily="sans-serif" dy=".35em">4</text>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#D0D5DD" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#D0D5DD" fontSize="16" fontFamily="sans-serif" dy=".35em">4</text>
              </svg>))} 
            <span /* </li>className={getLinkClass("/ResourceCount")}*/  /*{onClick={navigate("/ResourceCount")}}*/ >
              Resource Count
            </span>
          </li>      

          <li className="step-item"> { /*className="step nav-item"*/}
          {
            getStepIcon("Summary", isCurrentStep("/Summary") ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#1260B9" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#1260B9" fontSize="16" fontFamily="sans-serif" dy=".35em">5</text>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="#D0D5DD" strokeWidth="2"/>
                <text x="16" y="16" textAnchor="middle" fill="#D0D5DD" fontSize="16" fontFamily="sans-serif" dy=".35em">5</text>
              </svg>))
          }           
            <span >
              Summary
            </span>
          </li>          
        </ol>
      </div>
    </nav>
  );
};
