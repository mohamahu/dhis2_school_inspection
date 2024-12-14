import { useForm } from "react-hook-form";
import { useNavigate,useLocation } from "react-router-dom";
import { Button } from "./Forms/Button";
import { Field } from "./Forms/Field";
import { Form } from "./Forms/Form";
import teacher from "./icons/Graduation Cap.svg";
import male from "./icons/Standing Man.svg";
import students from "./icons/Teaching.svg";
import female from "./icons/Woman.svg";
import { useAppState } from "./state";

export const HumanResource = () => {
  const [state, setState] = useAppState(); // Form state: all fields
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

       if (location.state.flag == "Completed") {
    
          navigate("/ResourceCount", {
          state: {
            SchoolRegistration: "Completed",
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Currently",// nå 1737 fredag
            Summary: "Completed",
            flag: "Completed"
          }
        });
      } else {
        navigate("/ResourceCount", {
          state: {
            SchoolRegistration: "Completed",
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Currently",
            Summary: "Not_completed",
            flag: "Not_completed"
          }
        })
      }

  };

  const handlePreviousClick = () => {
    if (location.state.flag == "Completed") {

      navigate("/SchoolManagement", {
      state: {
        SchoolRegistration: "Completed",
        SchoolManagement:  "Currently",// nå 1737 fredag
        HumanResource: "Completed",
        ResourceCount: "Completed",
        Summary: "Completed",
        flag: "Completed"
      }
    });
  } else {
    navigate("/SchoolManagement", {
      state: {
        SchoolRegistration: "Completed",
        SchoolManagement: "Currently",
        HumanResource: "Not_completed",
        ResourceCount: "Not_completed",
        Summary: "Not_completed",
        flag: "Not_completed"
      }
    })
  }
  };

  const handleBlur = (data, e) => {
    setState({ ...state, ...data });
    const formData = getValues();
    console.log("OnBlur: Form data filled inn:", formData);
  };
  return (
    <Form onBlur={handleBlur} onSubmit={handleSubmit(saveData)}>
        <h3>Staff and Students</h3>
        <Field error={errors?.totalTeacher}>
          <div className="form-row">
            <label>
            <img src={teacher} alt="clock" className='icons'/>
              How many teachers at the school? <span className="mendatory"> *</span>
            </label>
            <input
              onBlur={handleBlur}
              {...register("totalTeacher", { 
                required: "Number of teacher is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
               })}
              id="totalTeacher"
              className={errors?.totalTeacher ? 'error' : ''}
            />
          </div>
        </Field>

        <Field error={errors?.femaleTeacher}>
          <div className="form-row">
            <label>
            <img src={female} alt="clock" className='icons'/>
              How many teachers are females?    
            </label>
            <input
              {...register("femaleTeacher")}
              id="femaleTeacher"
              onBlur={handleBlur}
            />
          </div>
        </Field>

        <Field error={errors?.email}>
          <div className="form-row">
            <label>
              <img src={male} alt="clock" className='icons'/>
              How many teachers are males?
            </label>
            <input
              onBlur={handleBlur}
              {...register("maleTeacher")}
              id="maleTeacher"
              min="0"
            />
          </div>
        </Field>

        <Field error={errors?.totalStudent}>
          <div className="form-row">
            <label>
            <img src={students} alt="clock" className='icons'/>
              How many students are at the school? <span className="mendatory"> *</span>
              </label>
            <input
              onBlur={handleBlur}
              {...register("totalStudent", { 
                required: "Number of students is required",
                validate: (value) =>
                  /^-?\d+$/.test(value) || "Please enter a valid number", 
               })}
               className={errors?.totalStudent ? 'error' : ''}
              id="totalStudent"
            />
          </div>
        </Field>

        <Field error={errors?.femaleStudent}>
          <div className="form-row">
            <label>
            <img src={female} alt="clock" className='icons'/>
              How many students are females?
             </label>
            <input
              onBlur={handleBlur}
              {...register("femaleStudent")}
              id="femaleStudent"
            />
          </div>
        </Field>        

        <Field error={errors?.maleStudent}>
          <div className="form-row">
            <label>
            <img src={male} alt="clock" className='icons'/>
              How many students are males?
             </label>
            <input
              onBlur={handleBlur}
              {...register("maleStudent")}
              id="maleStudent"
            />
          </div>
        </Field>


        <div className="button-row">
        <Button className="previous-button" onClick={handlePreviousClick}> Previous </Button>
          <Button className="next-button"> Next </Button>
        </div>
    </Form>
  );
};
