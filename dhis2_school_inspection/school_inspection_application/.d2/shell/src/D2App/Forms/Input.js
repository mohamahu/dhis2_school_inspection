function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
export const Input = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    className: "form-control"
  }, props));
});