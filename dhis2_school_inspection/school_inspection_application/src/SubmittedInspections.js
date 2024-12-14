import { DataTable, DataTableCell, DataTableColumnHeader, DataTableRow, TableBody, TableFoot, TableHead } from '@dhis2/ui';
import React, { useEffect, useState } from 'react';
import './SubmittedInspections.css';
import "./css/common.css";



export const SubmittedInspections = () => {

  const [inspections, setInspections] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {


    const fetchInspectionData = async () => {


      try {
        
        // Step 1: Fetch all inspections
        const inspectionResponse = await fetch(
          
          "https://research.im.dhis2.org/in5320g11/api/tracker/events",

          {method: 'GET',
            headers: {'Authorization': 'Basic ' + btoa("in5320:P1@tform")},
            mode: 'cors'}
        );

        if (!inspectionResponse.ok) {

          throw new Error(`Failed to fetch inspections: ${inspectionResponse.statusText}`);

        }


        const inspectionData = await inspectionResponse.json();

        // Step 2: Process inspections and map data for display
        const inspectionsWithDetails = await Promise.all(
          inspectionData.instances.map(async (inspection) => {

            const schoolDetails = await fetchOrgUnitDetails(inspection.orgUnit);
            const clusterDetails = await fetchOrgUnitDetails(schoolDetails.parentId);
            const regionDetails = await fetchOrgUnitDetails(clusterDetails.parentId);

            return {
              eventId: inspection.event,
              createdAt: inspection.createdAt, 
              schoolName: schoolDetails.name,
              clusterName: clusterDetails.name,
              regionName: regionDetails.name,
            };
          })
        );

        setInspections(inspectionsWithDetails);
      } 
      catch (err) {

        console.error('Error fetching data:', err);
        setError(err.message);

      }
    };

    fetchInspectionData();
  }, []);

  const fetchOrgUnitDetails = async (orgUnitId) => {

    const orgUnitUrl = `https://research.im.dhis2.org/in5320g11/api/29/organisationUnits/${orgUnitId}.json`;
    const response = await fetch(orgUnitUrl, {
      method: 'GET',
      headers: {'Authorization': 'Basic ' + btoa("in5320:P1@tform")},
      mode: 'cors',
    });


    if (!response.ok) {
      throw new Error(`Failed to fetch orgUnit: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      name: data.name,
      parentId: data.parent?.id || null,
    };
  };

  return (

  <div className="container submitted-inspections">
    <h1 className="t24">Inspection Log</h1> 

    {error && <div className="error-message t14" style={{ color: 'red' }}>Error: {error}</div>}

    <DataTable>

      <TableHead>
        <DataTableRow>
          <DataTableColumnHeader className="t14">Inspaction ID</DataTableColumnHeader>
          <DataTableColumnHeader className="t14">Date</DataTableColumnHeader>
          <DataTableColumnHeader className="t14">School Name</DataTableColumnHeader>
          <DataTableColumnHeader className="t14">Cluster Name</DataTableColumnHeader>
          <DataTableColumnHeader className="t14">Region Name</DataTableColumnHeader>
        </DataTableRow>
      </TableHead>


      <TableBody>
        {inspections.length > 0 ? (

          inspections.map((inspection) => (

            <DataTableRow key={inspection.eventId}>
              <DataTableCell className="t14">{inspection.eventId}</DataTableCell>
              <DataTableCell className="t14">{new Date(inspection.createdAt).toLocaleDateString()}</DataTableCell>
              <DataTableCell className="t14">{inspection.schoolName}</DataTableCell>
              <DataTableCell className="t14">{inspection.clusterName}</DataTableCell>
              <DataTableCell className="t14">{inspection.regionName}</DataTableCell>
            </DataTableRow>
          ))
        ) : (

          <DataTableRow>
            <DataTableCell colSpan="5" className="t14">No data available</DataTableCell>
          </DataTableRow>

        )}
      </TableBody>


    <TableFoot>
      <DataTableRow>
        <DataTableCell colSpan="5" className="t14">End of results</DataTableCell>
      </DataTableRow>
    </TableFoot>
  </DataTable>
  </div>
    
);};