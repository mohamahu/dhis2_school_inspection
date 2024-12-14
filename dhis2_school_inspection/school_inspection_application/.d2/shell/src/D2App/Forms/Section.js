import React from "react";
import { Link } from "react-router-dom";
export const Section = _ref => {
  let {
    title,
    children,
    url
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "section mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-row mb-4"
  }, /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement(Link, {
    className: `btn btn-secondary`,
    to: url
  }, "Edit")), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, children));
};
export const SectionRow = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, children);
};