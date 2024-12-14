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
        const inspectionResponse = await fetch("https://research.im.dhis2.org/in5320g11/api/tracker/events", {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa("in5320:P1@tform")
          },
          mode: 'cors'
        });
        if (!inspectionResponse.ok) {
          throw new Error(`Failed to fetch inspections: ${inspectionResponse.statusText}`);
        }
        const inspectionData = await inspectionResponse.json();

        // Step 2: Process inspections and map data for display
        const inspectionsWithDetails = await Promise.all(inspectionData.instances.map(async inspection => {
          const schoolDetails = await fetchOrgUnitDetails(inspection.orgUnit);
          const clusterDetails = await fetchOrgUnitDetails(schoolDetails.parentId);
          const regionDetails = await fetchOrgUnitDetails(clusterDetails.parentId);
          return {
            eventId: inspection.event,
            createdAt: inspection.createdAt,
            schoolName: schoolDetails.name,
            clusterName: clusterDetails.name,
            regionName: regionDetails.name
          };
        }));
        setInspections(inspectionsWithDetails);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };
    fetchInspectionData();
  }, []);
  const fetchOrgUnitDetails = async orgUnitId => {
    var _data$parent;
    const orgUnitUrl = `https://research.im.dhis2.org/in5320g11/api/29/organisationUnits/${orgUnitId}.json`;
    const response = await fetch(orgUnitUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa("in5320:P1@tform")
      },
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orgUnit: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      name: data.name,
      parentId: ((_data$parent = data.parent) === null || _data$parent === void 0 ? void 0 : _data$parent.id) || null
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container submitted-inspections"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "t24"
  }, "Inspection Log"), error && /*#__PURE__*/React.createElement("div", {
    className: "error-message t14",
    style: {
      color: 'red'
    }
  }, "Error: ", error), /*#__PURE__*/React.createElement(DataTable, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(DataTableRow, null, /*#__PURE__*/React.createElement(DataTableColumnHeader, {
    className: "t14"
  }, "Inspaction ID"), /*#__PURE__*/React.createElement(DataTableColumnHeader, {
    className: "t14"
  }, "Date"), /*#__PURE__*/React.createElement(DataTableColumnHeader, {
    className: "t14"
  }, "School Name"), /*#__PURE__*/React.createElement(DataTableColumnHeader, {
    className: "t14"
  }, "Cluster Name"), /*#__PURE__*/React.createElement(DataTableColumnHeader, {
    className: "t14"
  }, "Region Name"))), /*#__PURE__*/React.createElement(TableBody, null, inspections.length > 0 ? inspections.map(inspection => /*#__PURE__*/React.createElement(DataTableRow, {
    key: inspection.eventId
  }, /*#__PURE__*/React.createElement(DataTableCell, {
    className: "t14"
  }, inspection.eventId), /*#__PURE__*/React.createElement(DataTableCell, {
    className: "t14"
  }, new Date(inspection.createdAt).toLocaleDateString()), /*#__PURE__*/React.createElement(DataTableCell, {
    className: "t14"
  }, inspection.schoolName), /*#__PURE__*/React.createElement(DataTableCell, {
    className: "t14"
  }, inspection.clusterName), /*#__PURE__*/React.createElement(DataTableCell, {
    className: "t14"
  }, inspection.regionName))) : /*#__PURE__*/React.createElement(DataTableRow, null, /*#__PURE__*/React.createElement(DataTableCell, {
    colSpan: "5",
    className: "t14"
  }, "No data available"))), /*#__PURE__*/React.createElement(TableFoot, null, /*#__PURE__*/React.createElement(DataTableRow, null, /*#__PURE__*/React.createElement(DataTableCell, {
    colSpan: "5",
    className: "t14"
  }, "End of results")))));
};