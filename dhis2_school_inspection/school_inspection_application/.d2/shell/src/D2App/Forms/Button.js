function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
import { forwardRef } from "react";
export const Button = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    children,
    variant = "primary",
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `btn btn-${variant}`
  }, props), children);
});