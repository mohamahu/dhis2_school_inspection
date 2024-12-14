import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import * as React from 'react';
import { useState } from "react";
import classes from './App.module.css';
import { Dashboard } from './Dashboard';
import { InputFields } from './InputFields';
import { Navigation } from "./Navigation";
import { NewSchool } from './NewSchool';
import { SubmittedInspections } from "./SubmittedInspections";
const query = {
  me: {
    resource: 'me'
  }
};
const MyApp = () => {
  const {
    error,
    loading,
    data
  } = useDataQuery(query);
  const [activePage, setActivePage] = useState("Create an event");

  // changing the string for active page further down
  function activePageHandler(page) {
    setActivePage(page);
  }
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, i18n.t('ERROR'));
  }
  if (loading) {
    return /*#__PURE__*/React.createElement("span", null, i18n.t('Loading...'));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: classes.left
  }, /*#__PURE__*/React.createElement(Navigation, {
    activePage: activePage,
    activePageHandler: activePageHandler
  })), /*#__PURE__*/React.createElement("div", {
    className: classes.right
  }, " ", activePage === "Create an event" && /*#__PURE__*/React.createElement(InputFields, null), activePage === "Inspections log" && /*#__PURE__*/React.createElement(SubmittedInspections, null), activePage === "Dashboard" && /*#__PURE__*/React.createElement(Dashboard, null), activePage === "Create a new school" && /*#__PURE__*/React.createElement(NewSchool, null)));
};
export default MyApp;