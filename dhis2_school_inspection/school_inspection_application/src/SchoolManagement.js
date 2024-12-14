import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/common.css";
import "./css/InputFields.css";
import { Button } from "./Forms/Button";
import { Field } from "./Forms/Field";
import { Form } from "./Forms/Form";
import classroom from "./icons/Classroom.svg";
import cleanHand from "./icons/Clean Hands.svg";
import Dining from "./icons/Dining Room.svg";
import Laptop from "./icons/Laptop with cursor.svg";
import Library from "./icons/Library Building.svg";
import Soccer from "./icons/Soccer.svg";
import TestTube from "./icons/Test Tube.svg";
import toilet from "./icons/Toilet.svg";
import { useAppState } from "./state";


export const SchoolManagement = () => {
  const [state, setState] = useAppState();

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({  defaultValues: state, mode: "onSubmit" }); //  defaultValues: state,

  const navigate = useNavigate();
  const location = useLocation(); // sets the state for the progress bare to base off of: to either show bluecheck mark or number with grey/blue circle


  const saveData = (data) => {
    console.log("navigate.state:" , navigate.state)

    setState({ ...state, ...data });

    if (location.state.flag == "Completed") {
      navigate("/HumanResource", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Completed",
          HumanResource: "Currently",// nå 1737 fredag
          ResourceCount: "Completed",
          Summary: "Completed",
          flag: "Completed",
        },
      });
    } else {
      navigate("/HumanResource", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Completed",
          HumanResource: "Currently",
          ResourceCount: "Not_completed",
          Summary: "Not_completed",
          flag: "Not_completed",
        },
      });
    }
  };

  const handleBlur = (e) => {
    const formData = getValues();
    console.log('OnBlur: Form data filled inn:', formData);
    console.log("history:", history);

    console.log("Hva er: state[path] fra school Management", location.state)

  };


  const handlePreviousClick = () => {
    if (location.state && location.state.flag == "Completed") {
      navigate("/", {
      state: {
        SchoolRegistration:  "Currently",// nå 1737 fredag
        SchoolManagement: "Completed",
        HumanResource: "Completed",
        ResourceCount: "Completed",
        Summary: "Completed",
        flag: "Completed"
      }
    });
  } else {
    navigate("/", {
      state: {
        SchoolRegistration: "Completed",
        SchoolManagement: "Not_completed",
        HumanResource: "Not_completed",
        ResourceCount: "Not_completed",
        Summary: "Not_completed",
        flag: "Not_completed"
      }
    })
  }
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
        <h2>School facilities</h2>


        <Field error={errors?.electricSupply}>
          <div className="form-row-radio">
            <label>
            <img src={Laptop} alt="electricity question" className='icons'/>
              Does the school have consistent electricity supply?
            </label>
            <div className="form-row-radio-row">
              <div>
                <input
                  type="radio"
                  {...register("electricSupply")}
                  id="electricSupplyYes"
                  value="true"
                  onBlur={handleBlur}
                />
                <label htmlFor="electricSupplyYes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  {...register("electricSupply")}
                  id="electricSupplyNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="electricSupplyNo">No</label>
              </div>
            </div>
          </div>
        </Field>  



        <Field error={errors?.computerLab}>
          <div className="form-row-radio">
            <label>
            <img src={Laptop} alt="clock" className='icons'/>
              Does the school have computer lab for learners?
            </label>
            <div className="form-row-radio-row">
            <div>
            <input
              type="radio"
              {...register("computerLab")}
              id="computerLabYes"
              value="true"
              onBlur={handleBlur}
            />
            <label htmlFor="computerLabYes">Yes</label>
          </div>
          <div>
                <input
                  type="radio"
                  {...register("computerLab")}
                  id="computerLabNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="computerLabNo">No</label>
              </div>
            </div>
            </div>
        </Field>     

        <Field error={errors?.laboratory}>
          <div className="form-row-radio">
            <label>
            <img src={TestTube} alt="laboratory question field, yes or no" className='icons'/>
              Does the school have a laboratory?
            </label>
            <div className="form-row-radio-row">
            <div>
            <input
              type="radio"
              {...register("laboratory")}
              id="laboratoryYes"
              value="true"
              onBlur={handleBlur}
            />
            <label htmlFor="laboratoryYes">Yes</label>
          </div>
          <div>
                <input
                  type="radio"
                  {...register("laboratory")}
                  id="laboratoryNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="laboratoryNo">No</label>
              </div>
            </div>
            </div>
        </Field>     

        <Field error={errors?.handWashingFacilitiesYes}>
          <div className="form-row-radio">
            <label>
            <img src={cleanHand} alt="hand.washing facilities question field, yes or no" className='icons'/>
            Does the school have hand-washing facilities?
            </label>
            <div className="form-row-radio-row">
            <div>
            <input
              type="radio"
              {...register("handWashingFacilities")}
              id="handWashingFacilitiesYes"
              value="true"
              onBlur={handleBlur}
            />
            <label htmlFor="handWashingFacilitiesYes">Yes</label>
          </div>
          <div>
                <input
                  type="radio"
                  {...register("handWashingFacilities")}
                  id="handWashingFacilitiesNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="handWashingFacilitiesNo">No</label>
              </div>
            </div>
            </div>
        </Field> 

        <Field error={errors?.library}>
          <div className="form-row-radio">
            <label>
            <img src={Library} alt="libraryg facilities question field, yes or no" className='icons'/>
            Does the school have a library?
            </label>
            <div className="form-row-radio-row">
            <div>
            <input
              type="radio"
              {...register("library")}
              id="libraryYes"
              value="true"
              onBlur={handleBlur}
            />
            <label htmlFor="libraryYes">Yes</label>
          </div>
          <div>
                <input
                  type="radio"
                  {...register("library")}
                  id="libraryNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="libraryNo">No</label>
              </div>
            </div>
            </div>
        </Field> 
        

        <Field error={errors?.numberOfClassrooms}>
          <div className="form-row">
            <label>
              <img src={classroom} alt="clock" className="icons" />
              What is the total number of classrooms? <span className="mendatory"> *</span>
            </label>
            <input
              id="numberOfClassrooms"
              {...register("numberOfClassrooms", {
                required: "Number of classrooms is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number",
              })}
              type="text"
              className={errors?.numberOfClassrooms ? 'error' : ''}
            />
          </div>
        </Field>

        <Field error={errors?.amountToiletsTeachers}>
          <div className="form-row">
            <label>
            <img src={toilet} alt="clock" className='icons'/>
              What is the total number of toilets for teachers <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("amountToiletsTeachers", { 
                required: "Amount of toilets for teachers is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
              })}
              type="amountToiletsTeachers"
              id="amountToiletsTeachers"
              className={errors?.amountToiletsTeachers ? 'error' : ''}
            />
          </div>
        </Field>

        <Field error={errors?.amountToiletsStudent}>
          <div className="form-row">
            <label>
            <img src={toilet} alt="clock" className='icons'/>
              What is the total number of toilets for students <span className="mendatory"> *</span>
            </label>
           
            <input
              onBlur={handleBlur}
              {...register("amountToiletsStudent", { 
                required: "Amount of toilets for student is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
               })}
              type="amountToiletsStudent"
              id="amountToiletsStudent"
              className={errors?.amountToiletsStudent ? 'error' : ''}
            />
          </div>
          
          
        </Field>     

        <Field error={errors?.playground}>
          <div className="form-row-radio">
            <label>
            <img src={Soccer} alt="playground question field, yes or no" className='icons'/>
            Does the school have a yard/playground? 
            </label>
            <div className="form-row-radio-row">
            <div>
            <input
              type="radio"
              {...register("playground")}
              id="playgroundYes"
              value="true"
              onBlur={handleBlur}
            />
            <label htmlFor="playgroundYes">Yes</label>
          </div>
          <div>
                <input
                  type="radio"
                  {...register("playground")}
                  id="playgroundNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="playgroundNo">No</label>
              </div>
            </div>
            </div>
        </Field> 

        <Field error={errors?.diningArea}>
          <div className="form-row-radio">
            <label>
            <img src={Dining} alt="Dining question field, yes or no" className='icons'/>
            Does the school have a dining area?
            </label>
            <div className="form-row-radio-row">
            <div>
            <input
              type="radio"
              {...register("diningArea")}
              id="diningAreaYes"
              value="true"
              onBlur={handleBlur}
            />
            <label htmlFor="diningAreaYes">Yes</label>
          </div>
          <div>
                <input
                  type="radio"
                  {...register("diningArea")}
                  id="diningAreaNo"
                  value="false"
                  onBlur={handleBlur}
                />
                <label htmlFor="diningAreaNo">No</label>
              </div>
            </div>
            </div>
        </Field> 


        <div className="button-row">

          <Button className="previous-button" onClick={handlePreviousClick}  > Previous </Button>
          <Button className="next-button"  >Next</Button>

        </div>
    </Form>
  );
};
