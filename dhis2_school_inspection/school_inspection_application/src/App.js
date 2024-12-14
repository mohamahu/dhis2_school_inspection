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
        resource: 'me',
    },
}

const MyApp = () => {
    const { error, loading, data } = useDataQuery(query)
    const [activePage, setActivePage] = useState("Create an event");

    // changing the string for active page further down
    function activePageHandler(page) { 
      setActivePage(page);
    }
  
    if (error) {
        return <span>{i18n.t('ERROR')}</span>
    }

    if (loading) {
        return <span>{i18n.t('Loading...')}</span>
    }

    return (
      <div className={classes.container}> {/* Div for sidebar+mainpage */}
        <div className={classes.left}>
        <Navigation
          activePage={activePage}
          activePageHandler={activePageHandler}
          />
      </div>

      <div className={classes.right}> {/* Div for content */}

          
        {/* Showing conditions for different pages */}
        {activePage === "Create an event" && <InputFields /> }
        {activePage === "Inspections log" && <SubmittedInspections />}
        {activePage === "Dashboard" && <Dashboard />}
        {activePage === "Create a new school" && <NewSchool />}
      </div>
      
        </div>
    )
}

export default MyApp
