function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
      fields: "id,displayName,children[id,displayName]"
    }
  },
  schools: {
    resource: "organisationUnits",
    params: {
      fields: "id,displayName,parent[id,displayName]",
      level: 5,
      // Match the original API call's level
      pageSize: 500
    }
  }
};
export const SchoolRegistration = () => {
  var _data$clusters, _data$clusters$childr;
  const [state, setState] = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: state,
    mode: "onSubmit"
  });
  const {
    loading,
    error,
    data
  } = useDataQuery(query);
  const [selectedCluster, setSelectedCluster] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const watchCluster = watch("cluster");
  const watchSchool = watch("schoolId");

  // Filter schools based on selected cluster
  useEffect(() => {
    var _data$schools;
    if (data !== null && data !== void 0 && (_data$schools = data.schools) !== null && _data$schools !== void 0 && _data$schools.organisationUnits) {
      const allSchools = data.schools.organisationUnits;
      if (selectedCluster) {
        setFilteredSchools(allSchools.filter(school => {
          var _school$parent;
          return ((_school$parent = school.parent) === null || _school$parent === void 0 ? void 0 : _school$parent.id) === selectedCluster;
        }));
      } else {
        setFilteredSchools([]);
      }
    }
    if (state == null || state == undefined || state == "{}" || state.length == 0 || state.length == undefined) {} else {}
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
      });
    }
  }, [selectedCluster, data, navigate]);

  // 17:08 kommentar NEBIL: Dette kan være en årsak til feil, navigate er gul, sjekk dette når mergingen er over

  const saveData = data => {
    // save data is called when subitting the form on the page, ie. pressing next
    setState({
      ...state,
      ...data
    });
    if (location.state.flag == "Completed") {
      navigate("/SchoolManagement", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Currently",
          // nå 1737 fredag
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
      });
    }
  };
  const handleBlur = () => {
    const formData = getValues();
    console.log("OnBlur: Form data filled in:", formData);
  };
  if (loading) return /*#__PURE__*/React.createElement(CircularLoader, null);
  if (error) return /*#__PURE__*/React.createElement("p", null, "Error: ", error.message);
  return /*#__PURE__*/React.createElement(Form, {
    onBlur: handleBlur,
    onSubmit: handleSubmit(saveData)
  }, /*#__PURE__*/React.createElement("h3", null, "School Registration"), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.cluster
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: school,
    alt: "cluster",
    className: "icons"
  }), "Name of the Cluster ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, "*")), /*#__PURE__*/React.createElement("select", _extends({
    className: "dropdown"
  }, register("cluster", {
    required: "Cluster name is required"
  }), {
    onChange: e => {
      const selected = e.target.value;
      setValue("cluster", selected);
      setSelectedCluster(selected);
    }
  }), /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select a cluster"), data === null || data === void 0 ? void 0 : (_data$clusters = data.clusters) === null || _data$clusters === void 0 ? void 0 : (_data$clusters$childr = _data$clusters.children) === null || _data$clusters$childr === void 0 ? void 0 : _data$clusters$childr.map(cluster => /*#__PURE__*/React.createElement("option", {
    key: cluster.id,
    value: cluster.id
  }, cluster.displayName))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.schoolId
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: school,
    alt: "school",
    className: "icons"
  }), "Name of the School ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, "*")), /*#__PURE__*/React.createElement("select", _extends({
    className: "dropdown"
  }, register("schoolId", {
    required: "School name is required"
  }), {
    disabled: !watchCluster,
    onChange: e => {
      const selected = e.target.value;
      setValue("schoolId", selected);
    }
  }), /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select a school"), filteredSchools.map(school => /*#__PURE__*/React.createElement("option", {
    key: school.id,
    value: school.id
  }, school.displayName))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.date
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: clock,
    alt: "clock",
    className: "icons"
  }), "Inspection Date ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, "*")), /*#__PURE__*/React.createElement("input", _extends({
    type: "date"
  }, register("date", {
    required: "Date is required"
  }), {
    id: "date"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "button-row"
  }, /*#__PURE__*/React.createElement(Button, {
    id: "next-button-firstpage"
  }, "Next")));
};