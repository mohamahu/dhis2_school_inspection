function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
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
    formState: {
      errors
    }
  } = useForm({
    defaultValues: state,
    mode: "onSubmit"
  }); //  defaultValues: state,

  const navigate = useNavigate();
  const location = useLocation(); // sets the state for the progress bare to base off of: to either show bluecheck mark or number with grey/blue circle

  const saveData = data => {
    console.log("navigate.state:", navigate.state);
    setState({
      ...state,
      ...data
    });
    if (location.state.flag == "Completed") {
      navigate("/HumanResource", {
        state: {
          SchoolRegistration: "Completed",
          SchoolManagement: "Completed",
          HumanResource: "Currently",
          // nå 1737 fredag
          ResourceCount: "Completed",
          Summary: "Completed",
          flag: "Completed"
        }
      });
    } else {
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
  const handleBlur = e => {
    const formData = getValues();
    console.log('OnBlur: Form data filled inn:', formData);
    console.log("history:", history);
    console.log("Hva er: state[path] fra school Management", location.state);
  };
  const handlePreviousClick = () => {
    if (location.state && location.state.flag == "Completed") {
      navigate("/", {
        state: {
          SchoolRegistration: "Currently",
          // nå 1737 fredag
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
      });
    }
  };
  return /*#__PURE__*/React.createElement(Form, {
    onSubmit: handleSubmit(saveData)
  }, /*#__PURE__*/React.createElement("h2", null, "School facilities"), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.electricSupply
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: Laptop,
    alt: "electricity question",
    className: "icons"
  }), "Does the school have consistent electricity supply?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("electricSupply"), {
    id: "electricSupplyYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "electricSupplyYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("electricSupply"), {
    id: "electricSupplyNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "electricSupplyNo"
  }, "No"))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.computerLab
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: Laptop,
    alt: "clock",
    className: "icons"
  }), "Does the school have computer lab for learners?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("computerLab"), {
    id: "computerLabYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "computerLabYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("computerLab"), {
    id: "computerLabNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "computerLabNo"
  }, "No"))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.laboratory
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: TestTube,
    alt: "laboratory question field, yes or no",
    className: "icons"
  }), "Does the school have a laboratory?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("laboratory"), {
    id: "laboratoryYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "laboratoryYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("laboratory"), {
    id: "laboratoryNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "laboratoryNo"
  }, "No"))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.handWashingFacilitiesYes
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: cleanHand,
    alt: "hand.washing facilities question field, yes or no",
    className: "icons"
  }), "Does the school have hand-washing facilities?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("handWashingFacilities"), {
    id: "handWashingFacilitiesYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "handWashingFacilitiesYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("handWashingFacilities"), {
    id: "handWashingFacilitiesNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "handWashingFacilitiesNo"
  }, "No"))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.library
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: Library,
    alt: "libraryg facilities question field, yes or no",
    className: "icons"
  }), "Does the school have a library?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("library"), {
    id: "libraryYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "libraryYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("library"), {
    id: "libraryNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "libraryNo"
  }, "No"))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.numberOfClassrooms
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: classroom,
    alt: "clock",
    className: "icons"
  }), "What is the total number of classrooms? ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    id: "numberOfClassrooms"
  }, register("numberOfClassrooms", {
    required: "Number of classrooms is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "text",
    className: errors !== null && errors !== void 0 && errors.numberOfClassrooms ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.amountToiletsTeachers
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: toilet,
    alt: "clock",
    className: "icons"
  }), "What is the total number of toilets for teachers ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("amountToiletsTeachers", {
    required: "Amount of toilets for teachers is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "amountToiletsTeachers",
    id: "amountToiletsTeachers",
    className: errors !== null && errors !== void 0 && errors.amountToiletsTeachers ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.amountToiletsStudent
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: toilet,
    alt: "clock",
    className: "icons"
  }), "What is the total number of toilets for students ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("amountToiletsStudent", {
    required: "Amount of toilets for student is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "amountToiletsStudent",
    id: "amountToiletsStudent",
    className: errors !== null && errors !== void 0 && errors.amountToiletsStudent ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.playground
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: Soccer,
    alt: "playground question field, yes or no",
    className: "icons"
  }), "Does the school have a yard/playground?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("playground"), {
    id: "playgroundYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "playgroundYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("playground"), {
    id: "playgroundNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "playgroundNo"
  }, "No"))))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.diningArea
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: Dining,
    alt: "Dining question field, yes or no",
    className: "icons"
  }), "Does the school have a dining area?"), /*#__PURE__*/React.createElement("div", {
    className: "form-row-radio-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("diningArea"), {
    id: "diningAreaYes",
    value: "true",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "diningAreaYes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, register("diningArea"), {
    id: "diningAreaNo",
    value: "false",
    onBlur: handleBlur
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "diningAreaNo"
  }, "No"))))), /*#__PURE__*/React.createElement("div", {
    className: "button-row"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "previous-button",
    onClick: handlePreviousClick
  }, " Previous "), /*#__PURE__*/React.createElement(Button, {
    className: "next-button"
  }, "Next")));
};