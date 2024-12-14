import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/common.css";
import "./css/InputFields.css";
import { Button } from "./Forms/Button";
import { Field } from "./Forms/Field";
import { Form } from "./Forms/Form";
import clock from "./icons/Clock.svg";
import school from "./icons/Inspection.svg";
import { useAppState } from "./state";

// Query to fetch data
const query = {
  clusters: {
    resource: "organisationUnits/RlPlK44dtoo",
    params: {
      fields: "id,displayName,children[id,displayName]",
    },
  },
  schools: {
    resource: "organisationUnits",
    params: {
      fields: "id,displayName,parent[id,displayName]",
      level: 5, // Match the original API call's level
      pageSize: 500,
    },
  },
};


export const SchoolRegistration = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });

  const { loading, error, data } = useDataQuery(query);
  const [selectedCluster, setSelectedCluster] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);

  const watchCluster = watch("cluster");
  const watchSchool = watch("schoolId");

  // Filter schools based on selected cluster
  useEffect(() => { 
    if (data?.schools?.organisationUnits) {
      const allSchools = data.schools.organisationUnits;
      if (selectedCluster) {
        setFilteredSchools(
          allSchools.filter((school) => school.parent?.id === selectedCluster)
        );
      } else {
        setFilteredSchools([]);
      }
    }

    if (state == null ||state == undefined || state == "{}" || state.length == 0 || state.length == undefined ){
    } else{
    }
    //console.log("Nå er state null", state==null ? "null" : "ikke null" )
    if (location.state && location.state.flag == "Completed") {
      navigate("/", {
      state: {
        SchoolRegistration: "Currently",
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
        SchoolRegistration: "Currently",
        SchoolManagement: "Not_completed",
        HumanResource: "Not_completed",
        ResourceCount: "Not_completed",
        Summary: "Not_completed",
        flag: "Not_completed"
      }
    })
  }

  }, [selectedCluster, data, navigate]);

  // 17:08 kommentar NEBIL: Dette kan være en årsak til feil, navigate er gul, sjekk dette når mergingen er over

  const saveData = (data) => { // save data is called when subitting the form on the page, ie. pressing next
    setState({ ...state, ...data });
    if (location.state.flag == "Completed") {
      navigate("/SchoolManagement", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement:  "Currently",// nå 1737 fredag
          HumanResource: "Completed",
          ResourceCount: "Completed",
          Summary: "Completed",
          flag: "Completed",
        },
      });
    } else {
      navigate("/SchoolManagement", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Currently",
          HumanResource: "Not_completed",
          ResourceCount: "Not_completed",
          Summary: "Not_completed",
          flag: "Not_completed",
        },
      });
    }
  };

  const handleBlur = () => {
    const formData = getValues();
    console.log("OnBlur: Form data filled in:", formData);
  };

  if (loading) return <CircularLoader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form onBlur={handleBlur} onSubmit={handleSubmit(saveData)}>
      <h3>School Registration</h3>

      {/* Cluster Dropdown */}
      <Field error={errors?.cluster}>
        <div className="form-row">
          <label>
            <img src={school} alt="cluster" className="icons" />
            Name of the Cluster <span className="mendatory">*</span>
          </label>
          <select
            className="dropdown"
            {...register("cluster", { required: "Cluster name is required" })}
            onChange={(e) => {
              const selected = e.target.value;
              setValue("cluster", selected);
              setSelectedCluster(selected);
            }}
          >
            <option value="">Select a cluster</option>
            {data?.clusters?.children?.map((cluster) => (
              <option key={cluster.id} value={cluster.id}>
                {cluster.displayName}
              </option>
            ))}
          </select>
        </div>
      </Field>

      {/* School Dropdown */}
      <Field error={errors?.schoolId}>
        <div className="form-row">
          <label>
            <img src={school} alt="school" className="icons" />
            Name of the School <span className="mendatory">*</span>
          </label>
          <select
            className="dropdown"
            {...register("schoolId", { required: "School name is required" })}
            disabled={!watchCluster}
            onChange={(e) => {
              const selected = e.target.value;
              setValue("schoolId", selected);
            }}
          >
            <option value="">Select a school</option>
            {filteredSchools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.displayName}
              </option>
            ))}
          </select>
        </div>
      </Field>

      {/* Inspection Date */}
      <Field error={errors?.date}>
        <div className="form-row">
          <label>
            <img src={clock} alt="clock" className="icons" />
            Inspection Date <span className="mendatory">*</span>
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            id="date"
          />
        </div>
      </Field>

      <div className="button-row">
        <Button id="next-button-firstpage">Next</Button>
      </div>
    </Form>
  );
};