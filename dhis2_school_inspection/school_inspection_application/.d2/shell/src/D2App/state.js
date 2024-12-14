import React from "react";
import { createContext, useContext, useState } from "react";
export function AppProvider(_ref) {
  let {
    children
  } = _ref;
  const value = useState({});
  return /*#__PURE__*/React.createElement(AppStateContext.Provider, {
    value: value
  }, children);
}
export const AppStateContext = /*#__PURE__*/createContext();
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}