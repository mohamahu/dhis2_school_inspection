import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
// import "../css/SchoolList.css";

// Object to query clusters and schools.
const query = {
  clusters: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName"],
      level: 3
    }
  },
  schools: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName", "parent[id,displayName]"],
      level: 4
    }
  }
};
export function ClusterList(_ref) {
  var _data$clusters, _data$clusters$organi;
  let {
    onClusterSelect
  } = _ref;
  const {
    loading,
    error,
    data
  } = useDataQuery(query);

  // states for schools and cluster
  const [selectedCluster, setSelectedCluster] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  useEffect(() => {
    if (data && data.schools) {
      const schools = data.schools.organisationUnits;
      if (selectedCluster) {
        // this filtering is not heppening
        // filter school if cluster is selected
        setFilteredSchools(schools.filter(school => {
          var _school$parent;
          return ((_school$parent = school.parent) === null || _school$parent === void 0 ? void 0 : _school$parent.id) === selectedCluster;
        }));
      } else {
        // set all the schools in the state by default
        setFilteredSchools(schools); // this is always happening: So all schools from data go into useState an array
      }
    }
  }, [selectedCluster, data]);
  if (loading) return /*#__PURE__*/React.createElement(CircularLoader, null);
  if (error) return /*#__PURE__*/React.createElement("p", null, "Error: ", error.message);
  // hva er det jeg vil
  // jeg vil lagre data.school.organisationUnits inni vår form

  return /*#__PURE__*/React.createElement("div", {
    className: "schoolList"
  }, /*#__PURE__*/React.createElement(SingleSelectField, {
    className: "dropdown",
    selected: selectedCluster,
    onChange: _ref2 => {
      let {
        selected
      } = _ref2;
      setSelectedCluster(selected);
      onClusterSelect(selected);
    },
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    value: " "
  }), data === null || data === void 0 ? void 0 : (_data$clusters = data.clusters) === null || _data$clusters === void 0 ? void 0 : (_data$clusters$organi = _data$clusters.organisationUnits) === null || _data$clusters$organi === void 0 ? void 0 : _data$clusters$organi.map(cluster => /*#__PURE__*/React.createElement(SingleSelectOption, {
    key: cluster.id,
    label: cluster.displayName,
    value: cluster.id
  }))));
}