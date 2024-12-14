import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { CollapseableCard } from "./CollapseableCard";
import { Button } from "./Forms/Button";
import { Form } from "./Forms/Form";
import { SectionRow } from "./Forms/Section.js";
import { useAppState } from "./state";
import { usePostDataToApi } from "./usePostDataToApi";



export const Summary = () => {
  const navigate = useNavigate();
  const { postData, loading } = usePostDataToApi();
  const [state, setState] = useAppState();
  const {
    handleSubmit,
   
  } = useForm({ defaultValues: state,  mode: "onSubmit" }); 



  const saveData = (data, e) => {
    postData(data,e)
    
    navigate("/SubmittedReceipt",  
      { state: { SchoolRegistration: "Completed", 
        SchoolManagement: "Completed",
        HumanResource: "Completed",
        ResourceCount: "Completed",
        Summary: "Completed",
        flag:"Completed"

       } });
    };


      const handlePreviousClick = () => {
        navigate("/ResourceCount", {
          state: {
            SchoolRegistration: "Completed",
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Currently",
            Summary: "Not_completed",
            flag: "Completed"
          }
        });
      };

      const truthyValueToString = (value) => {
        switch(value){
          case "true":
            return "Yes";
          case "false": 
          return "No";
          default: 
          return "";
        }
        };


  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <h1> Summary </h1>
      <div>
        <br />
        <br />

        {/*<Card> <h3> Summary </h3> </Card>*/}


        <CollapseableCard stepname="School Management" step_number="1" props={state} >

          <SectionRow>
            <div>Does the school have consistent electricity supply?</div>
            <div>{truthyValueToString(state.electricSupply)}</div>
          </SectionRow>

          <SectionRow>
            <div>Does the school have a computer lab for learners?</div>
            <div>{truthyValueToString(state.computerLab)}</div>
          </SectionRow>

          <SectionRow>
            <div>Does the school have a laboratory?</div>
            <div>{truthyValueToString(state.laboratory)}</div>
          </SectionRow>

          <SectionRow>
            <div>Does the school have hand-washing facilities?</div>
            <div>{truthyValueToString(state.handWashingFacilities)}</div>
          </SectionRow>

          <SectionRow>
            <div>Does the school have a library?</div>
            <div>{truthyValueToString(state.library)}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of classrooms?</div>
            <div>{state.numberOfClassrooms}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of toilets for teachers?</div>
            <div>{state.amountToiletsTeachers}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of toilets for students?</div>
            <div>{state.amountToiletsStudent}</div>
          </SectionRow>

          <SectionRow>
            <div>Does the school have a yard/playground?</div>
            <div>{truthyValueToString(state.playground)}</div>
          </SectionRow>

          <SectionRow>
            <div>Does the school have a dining area?</div>
            <div>{truthyValueToString(state.diningArea)}</div>
          </SectionRow>

        </CollapseableCard>

        <br />
        <br />
        <CollapseableCard stepname="Human Resource" step_number="2" props={state}>

          <SectionRow>
            <div>How many teachers at the school?</div>
            <div>{state.totalTeacher }</div>
          </SectionRow>

          <SectionRow>
            <div>How many teachers are females?</div>
            <div>{state.femaleTeacher}</div>
          </SectionRow>
          <SectionRow>
            <div>How many teachers are males?</div>
            <div>{state.maleTeacher}</div>
          </SectionRow>
          <SectionRow>
            <div>How many students are at the school?</div>
            <div>{state.totalStudent}</div>
          </SectionRow>
          <SectionRow>
            <div>How many students are females?</div>
            <div>{state.femaleStudent}</div>
          </SectionRow>
          <SectionRow>
            <div>How many students are males?</div>
            <div>{state.maleStudent}</div>
          </SectionRow>
        </CollapseableCard>


        <br/>  
        <br/>  
        <CollapseableCard stepname="Resource Count" step_number="3"   props={state}  >
        <SectionRow>
            <div>What is the total number of pencils?</div>
            <div>{state.amountPencil}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of notebooks?</div>
            <div>{state.amountNotebooks}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of erasers?</div>
            <div>{state.amountErasers}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of textbooks?</div>
            <div>{state.amountTextbooks}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of desks?</div>
            <div>{state.numberDesk}</div>
          </SectionRow>

          <SectionRow>
            <div>What is the total number of chairs?</div>
            <div>{state.numberChairs}</div>
          </SectionRow>
        </CollapseableCard>
      </div>

      <div className="button-row">

      <Button className="previous-button" onClick={handlePreviousClick}  > Previous </Button>

      <Button className="next-button"> Submit</Button>
      </div>


    </Form>

      
  );

  
};
