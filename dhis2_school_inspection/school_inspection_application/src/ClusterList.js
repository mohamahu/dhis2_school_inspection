import { useDataQuery } from "@dhis2/app-runtime";
import {
  CircularLoader,
  SingleSelectField,
  SingleSelectOption
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";
// import "../css/SchoolList.css";

// Object to query clusters and schools.
const query = {
  clusters: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName"],
      level: 3,
    },
  },
  schools: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName", "parent[id,displayName]"],
      level: 4,
    },
  },
};

export function ClusterList({ onClusterSelect }) {
  const { loading, error, data } = useDataQuery(query);

  // states for schools and cluster
  const [selectedCluster, setSelectedCluster] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    if (data && data.schools) {
      const schools = data.schools.organisationUnits;
      if (selectedCluster) { // this filtering is not heppening
        // filter school if cluster is selected
        setFilteredSchools(
          schools.filter((school) => school.parent?.id === selectedCluster)
        );
      } else {
        // set all the schools in the state by default
        setFilteredSchools(schools);// this is always happening: So all schools from data go into useState an array
      }
    }
  }, [selectedCluster, data]);

  if (loading) return <CircularLoader />;
  if (error) return <p>Error: {error.message}</p>;
  // hva er det jeg vil
  // jeg vil lagre data.school.organisationUnits inni vår form

  return (
    <div className="schoolList">
        
      {/* cluster dropdown */}
      <SingleSelectField
      className="dropdown"
        selected={selectedCluster}
        onChange={({ selected }) => {setSelectedCluster(selected);
        onClusterSelect(selected)}}
        tabIndex="0"
      >
        <SingleSelectOption value=" " />
        {data?.clusters?.organisationUnits?.map((cluster) => (
          <SingleSelectOption
            key={cluster.id}
            label={cluster.displayName}
            value={cluster.id}
          />
        ))}
      </SingleSelectField>


      {/* School list */}
     
    </div>
  );
}