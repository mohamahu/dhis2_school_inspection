import React, { useEffect } from "react";

export const GetInspections = ({ orgUnit, onDataLoaded }) => {



  useEffect(() => {


    const fetchInspections = async () => {


      try {

        const response = await fetch(
          `https://research.im.dhis2.org/in5320g11/api/tracker/events?orgUnit=${orgUnit}`,

          {
            headers: {
              Authorization: "Basic " + btoa("in5320:P1@tform"),
            },
          }
        );

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();

        const validInspections = data.instances.reduce((acc, event) => {


          const date = event.occurredAt;
          const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) : null;

          if (formattedDate !== "Invalid Date") {

            acc[event.event] = formattedDate;

          }

          return acc;

        }, {});

        onDataLoaded(validInspections);
      } 
      catch (err) {

        console.error("Error fetching inspections:", err);
        onDataLoaded({}); 

      }
    };



    if (orgUnit) {

      fetchInspections();

    }
  }, [orgUnit, onDataLoaded]);

  return null; 
};
