import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/InputFields.css";
import { HumanResource } from "./HumanResource";
import { ResourceCount } from "./ResourceCount";
import { SchoolManagement } from "./SchoolManagement";
import { SchoolRegistration } from "./SchoolRegistration";
import { AppProvider } from "./state";
import { SubmittedReceipt } from "./SubmittedReceipt";
import { Stepper } from "./Stepper";
import { Summary } from "./Summary";
export const InputFields = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "inputFields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inspection-form"
  }, /*#__PURE__*/React.createElement(AppProvider, null, /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(Stepper, null), /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(SchoolRegistration, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/SchoolManagement",
    element: /*#__PURE__*/React.createElement(SchoolManagement, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/HumanResource",
    element: /*#__PURE__*/React.createElement(HumanResource, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/ResourceCount",
    element: /*#__PURE__*/React.createElement(ResourceCount, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/Summary",
    element: /*#__PURE__*/React.createElement(Summary, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/SubmittedReceipt",
    element: /*#__PURE__*/React.createElement(SubmittedReceipt, null)
  }))))));
};