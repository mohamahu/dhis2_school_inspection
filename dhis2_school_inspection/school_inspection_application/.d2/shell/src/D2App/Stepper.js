import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./css/common.css";
import Blue_Encircled_Step1 from "./icons/Blue_Encircled_Step1.svg";
import Blue_Encircled_Step2 from "./icons/Blue_Encircled_Step2.svg";
import Blue_Encircled_Step3 from "./icons/Blue_Encircled_Step3.svg";
import Blue_Encircled_Step4 from "./icons/Blue_Encircled_Step4.svg";
import Blue_Encircled_Step5 from "./icons/Blue_Encircled_Step5.svg";
import Grey_step2 from "./icons/Grey_step2.svg";
import Grey_step3 from "./icons/Grey_step3.svg";
import Grey_step4 from "./icons/Grey_step4.svg";
import Grey_step5 from "./icons/Grey_step5.svg";
export const Stepper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getStepIcon = (path, defaultIcon) => {
    if (!location.state) {
      return defaultIcon;
    } else {
      console.log("getStepIcon sin else statement viser bluecheck");
      return location.state[path] === "Completed" ? (() => {
        return /*#__PURE__*/React.createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "step-icon",
          viewBox: "0 0 32 32"
        }, /*#__PURE__*/React.createElement("circle", {
          cx: "16",
          cy: "16",
          r: "16",
          fill: "#1E6194"
        }), /*#__PURE__*/React.createElement("path", {
          fill: "#fff",
          d: "m13.136 18.91-3.102-3.134L9 16.821 13.136 21 22 12.045 20.966 11l-7.83 7.91Z"
        }));
      })() : defaultIcon; // den blir default icon selc om bluececk mark sin consollog printes Why?
    }
  };
  // den tar ResourceCount:Completed fra forrige steg (fra next button fra Resource count i stedet for prevous button) skjønner ikke hvorfor

  const isCurrentStep = path => location.pathname === path;
  const removeStepperWhenSubmittetInspection = () => {
    return location.pathname == "/SubmittedReceipt" ? "hidden" : "stepper";
  };
  const handleNavigationWithProgressBar = stepname => {
    console.log("Edit button is pressed: goto: ", stepname);
    switch (stepname) {
      case "School Management":
        navigate("/SchoolManagement", {
          state: {
            SchoolRegistration: "Completed",
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Completed",
            Summary: "Completed"
          }
        });
        break;
      case "Human Resource":
        navigate("/HumanResource", {
          state: {
            SchoolRegistration: "Completed",
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Completed",
            Summary: "Completed"
          }
        });
        break;
      case "Resource Count":
        navigate("/ResourceCount", {
          state: {
            SchoolRegistration: "Completed",
            SchoolManagement: "Completed",
            HumanResource: "Completed",
            ResourceCount: "Completed",
            Summary: "Completed"
          }
        });
        break;
      default:
        console.error("Unknown step name:", stepname);
    }
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: removeStepperWhenSubmittetInspection()
  }, /*#__PURE__*/React.createElement("div", {
    className: "stepper_row"
  }, /*#__PURE__*/React.createElement("ol", {
    className: "Progressbar-nav"
  }, /*#__PURE__*/React.createElement("li", {
    className: "step-item"
  }, getStepIcon("SchoolRegistration", /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#1260B9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#1260B9",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "1"))), /*#__PURE__*/React.createElement("span", null, "School selection")), /*#__PURE__*/React.createElement("li", {
    className: "step-item"
  }, " ", getStepIcon("SchoolManagement", isCurrentStep("/SchoolManagement") ? /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#1260B9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#1260B9",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "2")) : /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#D0D5DD",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#D0D5DD",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "2"))), /*#__PURE__*/React.createElement("span", null, "School management")), /*#__PURE__*/React.createElement("li", {
    className: "step-item"
  }, " ", getStepIcon("HumanResource", isCurrentStep("/HumanResource") ? /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "34",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#1260B9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#1260B9",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "3")) : /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#D0D5DD",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#D0D5DD",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "3"))), /*#__PURE__*/React.createElement("span", null, "School staff and students")), /*#__PURE__*/React.createElement("li", {
    className: "step-item",
    onClick: () => navigate('/ResourceCount')
  }, "    ", getStepIcon("ResourceCount", isCurrentStep("/ResourceCount") ? /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "34",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#1260B9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#1260B9",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "4")) : /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#D0D5DD",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#D0D5DD",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "4"))), /*#__PURE__*/React.createElement("span", null, "Resource Count")), /*#__PURE__*/React.createElement("li", {
    className: "step-item"
  }, " ", getStepIcon("Summary", isCurrentStep("/Summary") ? /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "34",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#1260B9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#1260B9",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "5")) : /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "32",
    fill: "none",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: "#D0D5DD",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "16",
    textAnchor: "middle",
    fill: "#D0D5DD",
    fontSize: "16",
    fontFamily: "sans-serif",
    dy: ".35em"
  }, "5"))), /*#__PURE__*/React.createElement("span", null, "Summary")))));
};