import React from "react";
export const Field = _ref => {
  let {
    children,
    label,
    error
  } = _ref;
  const id = getChildId(children);
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 mb-3 fRow"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: "form-label"
  }, label), children, error && /*#__PURE__*/React.createElement("small", {
    className: "error"
  }, error.message));
};

// Get id prop from a child element
export const getChildId = children => {
  const child = React.Children.only(children);
  if ("id" in (child === null || child === void 0 ? void 0 : child.props)) {
    return child.props.id;
  }
};