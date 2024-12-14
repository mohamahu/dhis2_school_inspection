import React from 'react'
import  {useEffect, useState} from 'react'
import {
    ReactFinalForm,
    InputFieldFF,
    Button,
    SingleSelectFieldFF,
    hasValue,
    number,
    composeValidators,
} from '@dhis2/ui'

export const SubmittedInspections = () => {
/*
// Oblig 3: 
const dataQuery = {
    dataSets: {
        resource: 'dataSets',
        id: ({ id }) => id,
        params: {
            fields: ['dataSetElements[dataElement[id, displayName,created]'],
            paging: false,
        },
    },
}
    const [searchQuery, setSearchQuery] = useState(); // Default = No search query
    const [apiData, setApiData] = useState([]);


// Oblig 2
useEffect(() => {
    // All parameters are appended to this URL.
   // let apiQuery = "https://research.im.dhis2.org/in5320g11";
    let apiQuery = "https://research.im.dhis2.org/in5320g11/api/organisationUnits?pageSize=3700";

// Maybe this is solutin for why we are getting fetch failed: https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
    



   // Hvordan legge til query parametere til strengen
    //if (searchQuery) {
     //   apiQuery = apiQuery + "&fields=" + searchQuery;
    //}

    // Query data from API.
    console.log("Querying: " + apiQuery);
    fetch(apiQuery)
      .then((results) => results.json())
      .then((data) => {  
        console.log(data);
          setApiData(data);     // Then add response to state.
                
      });
  }, [] ); // Array containing which state changes that should re-reun useEffect()

*/
  const [searchQuery, setSearchQuery] = useState(); // Default = No search query


fetch("https://research.im.dhis2.org/in5320g11/api/tracker/events?orgUnit=oXTcmBQ3JjJ&program=UxK2o06ScIe&fields=event,orgUnitName,eventDate,dataValues[dataElement,value]", {
    method: 'GET', // or 'POST', 'PUT', etc. depending on your request
    headers: {
      'Authorization': 'Basic ' + btoa("in5320" + ":" + "P1@tform")  // Encoding credentials
    },
  mode: 'cors'
  
  })
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();  // Parse the JSON from the response
  })
  .then(data => {
    setSearchQuery(data)
    console.log(data);  
  });


    return (
        <div>
            <h1>Vi er på submittedInspections</h1>

            {<span>{JSON.stringify(searchQuery, null, 2)}</span>}
            
          
        </div>
    )
}