function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
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
    formState: {
      errors
    }
  } = useForm({
    defaultValues: state,
    mode: "onSubmit"
  }); //  defaultValues: state,

  const watchPassword = watch("password");
  const navigate = useNavigate();
  const location = useLocation();
  const saveData = data => {
    setState({
      ...state,
      ...data
    });
    if (location.state.flag == "Completed") {
      navigate("/ResourceCount", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Completed",
          HumanResource: "Completed",
          ResourceCount: "Currently",
          // nå 1737 fredag
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
      });
    }
  };
  const handlePreviousClick = () => {
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
  const handleBlur = (data, e) => {
    setState({
      ...state,
      ...data
    });
    const formData = getValues();
    console.log("OnBlur: Form data filled inn:", formData);
  };
  return /*#__PURE__*/React.createElement(Form, {
    onBlur: handleBlur,
    onSubmit: handleSubmit(saveData)
  }, /*#__PURE__*/React.createElement("h3", null, "Staff and Students"), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.totalTeacher
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: teacher,
    alt: "clock",
    className: "icons"
  }), "How many teachers at the school? ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("totalTeacher", {
    required: "Number of teacher is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    id: "totalTeacher",
    className: errors !== null && errors !== void 0 && errors.totalTeacher ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.femaleTeacher
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: female,
    alt: "clock",
    className: "icons"
  }), "How many teachers are females?"), /*#__PURE__*/React.createElement("input", _extends({}, register("femaleTeacher"), {
    id: "femaleTeacher",
    onBlur: handleBlur
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.email
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: male,
    alt: "clock",
    className: "icons"
  }), "How many teachers are males?"), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("maleTeacher"), {
    id: "maleTeacher",
    min: "0"
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.totalStudent
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: students,
    alt: "clock",
    className: "icons"
  }), "How many students are at the school? ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("totalStudent", {
    required: "Number of students is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    className: errors !== null && errors !== void 0 && errors.totalStudent ? 'error' : '',
    id: "totalStudent"
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.femaleStudent
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: female,
    alt: "clock",
    className: "icons"
  }), "How many students are females?"), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("femaleStudent"), {
    id: "femaleStudent"
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.maleStudent
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: male,
    alt: "clock",
    className: "icons"
  }), "How many students are males?"), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("maleStudent"), {
    id: "maleStudent"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "button-row"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "previous-button",
    onClick: handlePreviousClick
  }, " Previous "), /*#__PURE__*/React.createElement(Button, {
    className: "next-button"
  }, " Next ")));
};