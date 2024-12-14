import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "./state";

export const SuccessNewSchool = () => {
  const [state, setState] = useAppState();
  const {
    reset,
    formState: { errors },
  } = useForm({  mode: "onSubmit" }); //  defaultValues: state, pleide å stå der 


  const navigate = useNavigate();


  const CreateNewForm = ( ) => {
    navigate("/"); 
    
    reset({}); //Denne funket ikke, selv om vi 
    reset({}); //Denne funket ikke, selv om vi 
    //setState(" ")
    //Må ha en reset funksjon av state sånn at skjemaet blir tomt
    console.log('On CreateNewForm: Form data filled inn:', state);
  };

  return (
    <div  className="submittedForm-page"> 
        <h2>New school created successfully! </h2>
        
{        /*<div  className="submittedForm-page-checkmark"> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="none" viewBox="0 0 234 234">
            <path fill="#00A940" fill-opacity=".1" d="M233.5 117c0 64.341-52.159 116.5-116.5 116.5C52.659 233.5.5 181.341.5 117 .5 52.659 52.659.5 117 .5 181.341.5 233.5 52.659 233.5 117Z"/>
            <path fill="#00A940" d="m107.666 128.376-12.25-12.25-4.083 4.083 16.333 16.333 35-35-4.083-4.083-30.917 30.917Z"/>
        </svg>

{ /*       </div> */}
        <br/>
        <br/>
        <button  className="create-new-form-button" onClick= {CreateNewForm}> Create a new School</button>
    </div>

    
  );
};