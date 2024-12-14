import React from "react";
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
  const {
    postData,
    loading
  } = usePostDataToApi();
  const [state, setState] = useAppState();
  const {
    handleSubmit
  } = useForm({
    defaultValues: state,
    mode: "onSubmit"
  });
  const saveData = (data, e) => {
    postData(data, e);
    navigate("/SubmittedReceipt", {
      state: {
        SchoolRegistration: "Completed",
        SchoolManagement: "Completed",
        HumanResource: "Completed",
        ResourceCount: "Completed",
        Summary: "Completed",
        flag: "Completed"
      }
    });
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
  const truthyValueToString = value => {
    switch (value) {
      case "true":
        return "Yes";
      case "false":
        return "No";
      default:
        return "";
    }
  };
  return /*#__PURE__*/React.createElement(Form, {
    onSubmit: handleSubmit(saveData)
  }, /*#__PURE__*/React.createElement("h1", null, " Summary "), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(CollapseableCard, {
    stepname: "School Management",
    step_number: "1",
    props: state
  }, /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have consistent electricity supply?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.electricSupply))), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have a computer lab for learners?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.computerLab))), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have a laboratory?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.laboratory))), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have hand-washing facilities?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.handWashingFacilities))), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have a library?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.library))), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of classrooms?"), /*#__PURE__*/React.createElement("div", null, state.numberOfClassrooms)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of toilets for teachers?"), /*#__PURE__*/React.createElement("div", null, state.amountToiletsTeachers)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of toilets for students?"), /*#__PURE__*/React.createElement("div", null, state.amountToiletsStudent)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have a yard/playground?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.playground))), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "Does the school have a dining area?"), /*#__PURE__*/React.createElement("div", null, truthyValueToString(state.diningArea)))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(CollapseableCard, {
    stepname: "Human Resource",
    step_number: "2",
    props: state
  }, /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "How many teachers at the school?"), /*#__PURE__*/React.createElement("div", null, state.totalTeacher)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "How many teachers are females?"), /*#__PURE__*/React.createElement("div", null, state.femaleTeacher)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "How many teachers are males?"), /*#__PURE__*/React.createElement("div", null, state.maleTeacher)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "How many students are at the school?"), /*#__PURE__*/React.createElement("div", null, state.totalStudent)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "How many students are females?"), /*#__PURE__*/React.createElement("div", null, state.femaleStudent)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "How many students are males?"), /*#__PURE__*/React.createElement("div", null, state.maleStudent))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(CollapseableCard, {
    stepname: "Resource Count",
    step_number: "3",
    props: state
  }, /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of pencils?"), /*#__PURE__*/React.createElement("div", null, state.amountPencil)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of notebooks?"), /*#__PURE__*/React.createElement("div", null, state.amountNotebooks)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of erasers?"), /*#__PURE__*/React.createElement("div", null, state.amountErasers)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of textbooks?"), /*#__PURE__*/React.createElement("div", null, state.amountTextbooks)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of desks?"), /*#__PURE__*/React.createElement("div", null, state.numberDesk)), /*#__PURE__*/React.createElement(SectionRow, null, /*#__PURE__*/React.createElement("div", null, "What is the total number of chairs?"), /*#__PURE__*/React.createElement("div", null, state.numberChairs)))), /*#__PURE__*/React.createElement("div", {
    className: "button-row"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "previous-button",
    onClick: handlePreviousClick
  }, " Previous "), /*#__PURE__*/React.createElement(Button, {
    className: "next-button"
  }, " Submit")));
};