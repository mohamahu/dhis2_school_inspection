function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
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
    navigate("/Summary", {
      state: {
        SchoolRegistration: "Completed",
        SchoolManagement: "Completed",
        HumanResource: "Completed",
        ResourceCount: "Completed",
        Summary: "Not_completed",
        flag: "Not_completed"
      }
    });
  };
  const handleBlur = e => {
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
          HumanResource: "Currently",
          // nå 1737 fredag
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
  return /*#__PURE__*/React.createElement(Form, {
    onBlur: handleBlur,
    onSubmit: handleSubmit(saveData)
  }, /*#__PURE__*/React.createElement("h3", null, " ResourceCount"), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.amountPencil
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: pencil,
    alt: "pencil",
    className: "icons"
  }), "Total Number of Pencil ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("amountPencil", {
    required: "Amount of Pencils is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "amountPencil",
    id: "amountPencil",
    className: errors !== null && errors !== void 0 && errors.amountPencil ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.amountNotebooks
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: notebook,
    alt: "pencil",
    className: "icons"
  }), "Total Number of Notebooks ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("amountNotebooks", {
    required: "Amount of Notebooks is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "amountNotebooks",
    id: "amountNotebooks",
    className: errors !== null && errors !== void 0 && errors.amountNotebooks ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.amountErasers
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: eraser,
    alt: "erasers",
    className: "icons"
  }), "Total Number of Erasers ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("amountErasers", {
    required: "Amount of Erasers is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "amountErasers",
    id: "amountErasers",
    className: errors !== null && errors !== void 0 && errors.amountErasers ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.amountTextbooks
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: textbook,
    alt: "textbooks",
    className: "icons"
  }), "Total Number of Textbooks ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("amountTextbooks", {
    required: "Amount of Textbooks is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "amountTextbooks",
    id: "amountTextbooks",
    className: errors !== null && errors !== void 0 && errors.amountTextbooks ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.numberDesk
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: desk,
    alt: "clock",
    className: "icons"
  }), "What is the total number of desks ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("numberDesk", {
    required: "number desks is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "numberDesk",
    id: "numberDesk",
    className: errors !== null && errors !== void 0 && errors.numberDesk ? 'error' : ''
  })))), /*#__PURE__*/React.createElement(Field, {
    error: errors === null || errors === void 0 ? void 0 : errors.numberChairs
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: chair,
    alt: "clock",
    className: "icons"
  }), "What is the total number of chairs ", /*#__PURE__*/React.createElement("span", {
    className: "mendatory"
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    onBlur: handleBlur
  }, register("numberChairs", {
    required: "Number of chairs is required",
    validate: value => /^-?\d+$/.test(value) || "Please enter a valid number"
  }), {
    type: "numberChairs",
    id: "numberChairs",
    className: errors !== null && errors !== void 0 && errors.numberChairs ? 'error' : ''
  })))), /*#__PURE__*/React.createElement("div", {
    className: "button-row"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "previous-button",
    onClick: setPrevousNavigationState
  }, " Previous "), /*#__PURE__*/React.createElement(Button, {
    className: "next-button"
  }, " Next")));
};