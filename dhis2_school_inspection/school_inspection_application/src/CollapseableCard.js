import React, { useState } from "react";
import { Card } from '@dhis2/ui'
import "./css/common.css";
import { useNavigate, Link } from "react-router-dom";


export const CollapseableCard = ({  children, stepname, step_number, props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // changes the svg icon to blue checkmark
  const navigate = useNavigate();


  const handleCardClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleConfirmButtonClick = () => {
    setIsOpen((prev) => !prev);
    //Må også endre på iconet til en blå skjekmark
    setIsConfirmed(true); // må endre på hva den var

   
  };




  const handleEditButtonClick = () => {
    console.log("Edit button is pressed: goto: ", stepname)
    switch (stepname) {
      case "School Management":
        navigate("/SchoolManagement",
          { state: { SchoolRegistration: "Completed", 
          SchoolManagement:  "Currently",// nå 1737 fredag
          HumanResource: "Completed",
          ResourceCount: "Completed",
          Summary: "Completed",
          flag: "Completed",
         } });
        break;
      case "Human Resource":
        navigate("/HumanResource",
          { state: { SchoolRegistration: "Completed", 
          SchoolManagement: "Completed",
          HumanResource:  "Currently",// nå 1737 fredag
          ResourceCount: "Completed",
          Summary: "Completed",
          flag: "Completed",
         } });
        break;
      case "Resource Count":
        navigate("/ResourceCount",
          { state: { SchoolRegistration: "Completed", 
          SchoolManagement: "Completed",
          HumanResource: "Completed",
          ResourceCount: "Currently",// nå 1737 fredag
          Summary: "Completed",
          flag: "Completed",
         } });
      break;
      default:
      console.error("Unknown step name:", stepname);
    }
  };

    // if confired= false 
    //isOpen Tall
    //!isOpen Tall
  // if confirmed =true
  // isOpen: Tall
  // !isOpen: check 

  // Function to determine the SVG icon based on isOpen and isConfirmed states
  const renderIcon = () => {
    switch (true) {
      case !isConfirmed:
        return (  /*If not confirmed: show grey circle number icon*/
          <svg className="step-icon" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16.5" cy="16" r="16" fill="#F1F1F1" />
            <text x="16.5" y="21.5" textAnchor="middle" fill="#000" fontSize="16" fontFamily="Arial">{step_number}</text>
          </svg>
        );
      case isConfirmed && isOpen:  /*If confirmed and opened to look: show grey circle number icon*/
        return (
          <svg className="step-icon" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16.5" cy="16" r="16" fill="#F1F1F1" />
            <text x="16.5" y="21.5" textAnchor="middle" fill="#000" fontSize="16" fontFamily="Arial">{step_number}</text>
          </svg>
        );
      case isConfirmed && !isOpen: /*If confirmed and closed:show blue checkmark*/
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="step-icon"  viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#1E6194"/>
          <path fill="#fff" d="m13.136 18.91-3.102-3.134L9 16.821 13.136 21 22 12.045 20.966 11l-7.83 7.91Z"/>
        </svg>    
        );
      default:
        return null;
    }
  };

const  inspectionFormValueRationChecker= (props) => {
// General recommendations from Edutopia case
// 5 Ratio dimensions + Gender Parity Index ratio

// student to classroom ratio is: <53:1.
const studentToClassroomRatio = (parseInt(props.totalStudent)) / (parseInt(props.numberOfClassrooms));  // eks 450/3 = 150 students per clasrom

// student to teacher ratio:      <45:1.
const studentToTeacherRatio = parseInt(props.totalStudent) / parseInt(props.totalTeacher);


// student to toilet ratio:        <25:1.
const studentToToiletRatio = parseInt(props.totalStudent) / parseInt(props.amountToiletsStudent);

// the seat to student ratio      1:1.
const seatToStudentRatio = parseInt(props.numberChairs) / parseInt(props.totalStudent);

// the textbook to student ratio: 1:1.
const textbookToStudentRatio = parseInt(props.amountTextbooks) / parseInt(props.totalStudent);


// Gender Parity Index (GPI): Baed on Casetext: only these two indicators are monitored (straight from case description) (there is no monitoring across female/male teacher to female/male student ratio)
// Student GPI: is female students divided by males students.
const studentGPI = (parseInt(props.femaleStudent)) / (parseInt(props.maleStudent));  

// Teacher GPI: is female teachers divided by males teachers.
const teacherGPI = (parseInt(props.femaleTeacher)) / (parseInt(props.maleTeacher));  



console.log("studentToClassroomRatio:", studentToClassroomRatio );
console.log("studentToTeacherRatio:", studentToTeacherRatio );
console.log("studentToToiletRatio:", studentToToiletRatio );
console.log("parseInt:", parseInt(props.totalStudent)  );
console.log("Json.stringify:",  JSON.stringify(props.totalStudent) );
console.log("stepname", stepname);


return (
  <div className="ratio-checker-field">
    {(studentToClassroomRatio > 53 && stepname==="School Management"   ) && (
      <div>
        <h6>Ratio Recommendations:</h6>
        <span> This school has above recommended amount of students to classroms!  </span>
        <p>Student to classroom ratio is too high!: Currently at: {props.totalStudent}:{props.numberOfClassrooms} (Recommended is: 53:1)</p>
        <br/>
      </div>
    )}

    {(studentToTeacherRatio > 45  && stepname==="Human Resource")  && (
      <div>
        <h6>Ratio Recommendations:</h6>
        <span> This school has below recommended amount of students to teachers!  </span>
        <p>Student to teacher ratio is too high: {props.totalStudent}:{props.totalTeacher} (Recommended is: 45:1)</p>
        <br/>
      </div>
    )} 

    {/*When there is a surplus of female students */} 
    {(studentGPI > 1  && stepname==="Human Resource")  && (
      <div>
        <h6>Ratio Recommendations: Gender Parity Index (GPI)</h6>
        <span>General guidelines recommend an increase of males students to this school</span>
        <p>Gender Parity Index (GPI) for students at this school is: {studentGPI.toFixed(2)} (Recommended is: 1)</p>
        <br/>
      </div>
    )}   
    {/*When there is a surplus of female students */} 

    {(studentGPI < 1  && stepname==="Human Resource")  && (
      <div>
        <h6>Ratio Recommendations: Gender Parity Index (GPI)</h6>
        <span>General guidelines recommend an increase of females students to this school</span>
        <p>Gender Parity Index (GPI) for students at this school is: {studentGPI.toFixed(2)} (Recommended is: 1)</p>
        <br/>
      </div>
    )}   
    {/*When there is a surplus of female teachers */} 
    {(teacherGPI > 1  && stepname==="Human Resource")  && (
      <div>
        <h6>Ratio Recommendations: Gender Parity Index (GPI)</h6>
        <span>General guidelines recommend an increase of males teachers to this school</span>
        <p>Gender Parity Index (GPI) for teachers at this school is: {teacherGPI.toFixed(2)} (Recommended is: 1)</p>
        <br/>
      </div>
    )}   
    {/*When there is a surplus of female teachers */} 
    {(teacherGPI < 1  && stepname==="Human Resource")  && (
      <div>
        <h6>Ratio Recommendations: Gender Parity Index (GPI)</h6>
        <span>General guidelines recommend an increase of females teachers to this school</span>
        <p>Gender Parity Index (GPI) for teachers at this school is: {teacherGPI.toFixed(2)}  (Recommended is: 1)</p>
        <br/>
      </div>
    )}

    {(studentToToiletRatio > 25  && stepname==="Resource Count")   && (
      <div>
         <h6>Ratio Recommendations:</h6>
        <span> This school has below recommended amount of toilet to students!  </span>
        <p>Student to toilet ratio is too high: {Math.round(studentToToiletRatio)}:1 (Recommended is: 25:1)</p>
        <br/>
      </div>
    )}    
    {(seatToStudentRatio != 1  && stepname==="Resource Count")   && (
      <div>
         <h6>Ratio Recommendations:</h6>
        <span> This school does not have equal number of chairs to its students!  </span>
        <p>Current number of chairs to students: {`${props.numberChairs} : ${props.totalStudent}`} (Recommended is: 1:1)</p>     
        <br/>
      </div> 
    )}    
    {(textbookToStudentRatio != 1  && stepname==="Resource Count")   && (
      <div>
         <h6>Ratio Recommendations:</h6>
       <span> This school as below recommended amount of textbooks to students!  </span>
       <p>Current number of teextbooks to students: {`${props.amountTextbooks} : ${props.totalStudent}`} (Recommended is: 1:1)</p> 
       <br/>
      </div>
    )}
  </div>
);
};


  return (
      <div className="card">
        <div>
          <div className="p-3 border-bottom d-flex justify-content-between">
            <Card  className="summary-step-card" > 
              <div className="step-name-row"  onClick={handleCardClick} > 

              {renderIcon()}
              <h1> {stepname} </h1>
           {/*   <span> Status isOpen: {isOpen ? "true" : "false"} </span>
              <span>00000 Status isConfirmed: {isConfirmed ? "true" : "false"} </span>*/}
            </div>

              {isOpen && (  

                <div  className="inside-card"  > 
                  <div className="Question-value-area" >
                   <h3> Question  </h3> 
                   <h3 id="Question-value-areaH3"> Value  </h3> 
                  </div>

                  <span> {children}  </span> 
                  {/*  <span> {props.totalTeacher}  </span> vi tester noe kl00.45 18.11 */}


                  {/*inspectionFormValueRationChecker(props)*/}
                  {inspectionFormValueRationChecker(props)}                  
                  <br/>  <br/>  <br/>  <br/>

                <div  className="inside-card-button-row"   > 

                  <button  className="edit-button"onClick= {handleEditButtonClick} > Edit</button>
                  <button  className="confirm-button" onClick= {handleConfirmButtonClick}> Confirm</button>
                </div>

                </div>

              )}
            </Card>

          </div>
        </div>

      </div>
  );
};

export default CollapseableCard;

export const SectionRow = ({ children }) => {
  return (
  
  <div className="section-row">{children}</div>

  );
};
