import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./Forms/Button";
import { Field } from "./Forms/Field";
import { Form } from "./Forms/Form";
import chair from "./icons/chair.svg";
import desk from "./icons/desk.svg";
import eraser from "./icons/Eraser.svg";
import notebook from "./icons/Notebook.svg";
import pencil from "./icons/Pencil.svg";
import textbook from "./icons/Textbook.svg";
import { useAppState } from "./state";




export const ResourceCount = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" }); //  defaultValues: state,

  const watchPassword = watch("password");
  const navigate = useNavigate();
  const location = useLocation();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/Summary",
      { state: { SchoolRegistration: "Completed", 
        SchoolManagement: "Completed",
        HumanResource: "Completed",
        ResourceCount: "Completed",
        Summary: "Not_completed",
        flag: "Not_completed"
       } });
  };



  const handleBlur = (e) => {
    const formData = getValues();
    console.log("OnBlur: Form data filled inn:", formData);
    console.log("Inni ResourceCount", location.state);
    
  };

  // Show the correct icons on the Progressbar to have when we have pressed Previous
  const setPrevousNavigationState = () => {
  
    if (location.state && location.state.flag == "Completed") {
      // If flag is set, then the user has been to the summary page and all steps are "Completed"
      navigate("/HumanResource", {

        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Completed",
          HumanResource:  "Currently",// nå 1737 fredag
          ResourceCount: "Completed",
          Summary: "Completed",
          flag: "Completed"
        }
        
      });
    } else {
      // Default state when flag is not completed
      navigate("/HumanResource", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Completed",
          HumanResource: "Currently",
          ResourceCount: "Not_completed",
          Summary: "Not_completed",
          flag: "Not_completed"
        }
      });
    }
  };

  return (
    <Form onBlur={handleBlur} onSubmit={handleSubmit(saveData)}>
        <h3> ResourceCount</h3>
         <Field error={errors?.amountPencil}>
          <div className="form-row">
            <label>
            <img src={pencil} alt="pencil" className='icons'/>
              Total Number of Pencil <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("amountPencil", { 
                required: "Amount of Pencils is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
              })}
              type="amountPencil"
              id="amountPencil"
              className={errors?.amountPencil ? 'error' : ''}
            />
          </div>
        </Field>

        <Field error={errors?.amountNotebooks}>
          <div className="form-row">
            <label>
            <img src={notebook} alt="pencil" className='icons'/>
              Total Number of Notebooks <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("amountNotebooks", { 
                required: "Amount of Notebooks is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
              })}
              type="amountNotebooks"
              id="amountNotebooks"
              className={errors?.amountNotebooks ? 'error' : ''}
            />
          </div>
        </Field>

        <Field error={errors?.amountErasers}>
          <div className="form-row">
            <label>
            <img src={eraser} alt="erasers" className='icons'/>
              Total Number of Erasers <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("amountErasers", { 
                required: "Amount of Erasers is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
              })}
              type="amountErasers"
              id="amountErasers"
              className={errors?.amountErasers ? 'error' : ''}
            />
          </div>
        </Field>

        <Field error={errors?.amountTextbooks}>
          <div className="form-row">
            <label>
            <img src={textbook} alt="textbooks" className='icons'/>
              Total Number of Textbooks <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("amountTextbooks", { 
                required: "Amount of Textbooks is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
              })}
              type="amountTextbooks"
              id="amountTextbooks"
              className={errors?.amountTextbooks ? 'error' : ''}
            />
          </div>
        </Field>


        <Field error={errors?.numberDesk}>
          <div className="form-row">
            <label>
            <img src={desk} alt="clock" className='icons'/>
            What is the total number of desks <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("numberDesk", { 
                required: "number desks is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
               })}
              type="numberDesk"
              id="numberDesk"
              className={errors?.numberDesk ? 'error' : ''}
            />
          </div>
        </Field>      
        
          <Field error={errors?.numberChairs}>
          <div className="form-row">
            <label>
            <img src={chair} alt="clock" className='icons'/>
            What is the total number of chairs <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("numberChairs", { 
                required: "Number of chairs is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
               })}
              type="numberChairs"
              id="numberChairs"
              className={errors?.numberChairs ? 'error' : ''}
            />
          </div>
        </Field>

        <div className="button-row">
         <Button className="previous-button" onClick={setPrevousNavigationState}  > Previous </Button>


          <Button className="next-button"> Next</Button>
        </div>

        
    </Form>
  );
};
