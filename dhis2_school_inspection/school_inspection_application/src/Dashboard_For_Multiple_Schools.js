import React, { useState, useEffect } from "react";
import { SingleSelectField, SingleSelectOption, CircularLoader } from "@dhis2/ui";
import { GetInspections } from "./GetInspection";

export function Dashboard_For_Multiple_Schools() {


  // school 1
  const [clusters1, setClusters1] = useState([]);
  const [schools1, setSchools1] = useState([]);
  const [loadingClusters1, setLoadingClusters1] = useState(false);
  const [loadingSchools1, setLoadingSchools1] = useState(false);
  const [selectedCluster1, setSelectedCluster1] = useState(null);
  const [selectedSchool1, setSelectedSchool1] = useState(null);
  const [orgUnitId1, setOrgUnitId1] = useState(null);
  const [inspections1, setInspections1] = useState([]);
  const [selectedInspection1, setSelectedInspection1] = useState(null);

  // school 2
  const [clusters2, setClusters2] = useState([]);
  const [schools2, setSchools2] = useState([]);
  const [loadingClusters2, setLoadingClusters2] = useState(false);
  const [loadingSchools2, setLoadingSchools2] = useState(false);
  const [selectedCluster2, setSelectedCluster2] = useState(null);
  const [selectedSchool2, setSelectedSchool2] = useState(null);
  const [orgUnitId2, setOrgUnitId2] = useState(null);
  const [inspections2, setInspections2] = useState([]);
  const [selectedInspection2, setSelectedInspection2] = useState(null);

  const [selectedResource, setSelectedResource] = useState(null);

  // fetch clusters for school 1
  const fetchClusters1 = async () => {


    setLoadingClusters1(true);
    try {

      const response = await fetch(
        "https://research.im.dhis2.org/in5320g11/api/organisationUnits/RlPlK44dtoo?fields=id,displayName,children[id,displayName]",
        {
          headers: {
            Authorization: "Basic " + btoa("in5320:P1@tform"),
          },
        }
      );

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setClusters1(data.children || []);

    } 
    catch (error) {

      console.error("Error fetching clusters:", error);

    } 
    finally {

      setLoadingClusters1(false);

    }
  };

  // fetch clusters for school 2
  const fetchClusters2 = async () => {

    setLoadingClusters2(true);

    try {

      const response = await fetch(
        "https://research.im.dhis2.org/in5320g11/api/organisationUnits/RlPlK44dtoo?fields=id,displayName,children[id,displayName]",

        {
          headers: {
            Authorization: "Basic " + btoa("in5320:P1@tform")
          }
        }

      );



      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setClusters2(data.children || []);

    } 
    catch (error) {

      console.error("Error fetching clusters:", error);

    } 
    finally {

      setLoadingClusters2(false);

    }
  };

  // fetch school from the cluster
  const fetchSchools = async (clusterId, setSchools, setLoadingSchools) => {

    setLoadingSchools(true);


    try {
      const response = await fetch(

        `https://research.im.dhis2.org/in5320g11/api/organisationUnits?fields=id,displayFormName,parent[id,displayName]&filter=parent.id:eq:${clusterId}&level=5`,
        {
          headers: {
            Authorization: "Basic " + btoa("in5320:P1@tform")
          }
        }
      );


      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setSchools(data.organisationUnits || []);

    } 
    
    catch (error) {

      console.error("Error fetching schools:", error);

    } 
    
    finally {

      setLoadingSchools(false);

    }
  };

  useEffect(() => {

    fetchClusters1();
    fetchClusters2();

  }, []);

  return (

    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ flex: 3, padding: "20px" }}>
      </div>

      <div style={{ flex: 1, backgroundColor: "#f4f4f4", padding: "20px", borderLeft: "1px solid #ddd", borderRadius: "8px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Resources</h3>

        <div style={{ display: "flex", gap: "10px" }}>


          <div style={{ flex: 1 }}>
            <h4>School 1</h4>


            {loadingClusters1 ? (

              <CircularLoader />
            ) : (

              <SingleSelectField
                placeholder="Select cluster"
                selected={selectedCluster1}
                onChange={({ selected }) => {

                  setSelectedCluster1(selected);
                  setSelectedSchool1(null);
                  setOrgUnitId1(null);
                  setInspections1([]);
                  fetchSchools(selected, setSchools1, setLoadingSchools1);

                }}
              >

                {clusters1.map((cluster) => (
                  <SingleSelectOption key={cluster.id} value={cluster.id} label={cluster.displayName} />
                ))}

              </SingleSelectField>
            )}


            {loadingSchools1 ? (

              <CircularLoader />

            ) : (

              <SingleSelectField
                placeholder="Select school"
                selected={selectedSchool1}
                onChange={({ selected }) => {
                  const school = schools1.find((s) => s.id === selected);
                  setSelectedSchool1(selected);
                  setOrgUnitId1(school?.id);

                }}

                disabled={!selectedCluster1 || schools1.length === 0}

              >
                {schools1.map((school) => (

                  <SingleSelectOption key={school.id} value={school.id} label={school.displayFormName} />

                ))}

              </SingleSelectField>

            )}

            <SingleSelectField

              placeholder="Select inspection"
              selected={selectedInspection1}

              onChange={({ selected }) => {

                setSelectedInspection1(selected);

              }}

              disabled={inspections1.length === 0}
            >

              {inspections1.map((inspection) => (
                <SingleSelectOption key={inspection.id} value={inspection.id} label={inspection.label} />
              ))}

            </SingleSelectField>


            {orgUnitId1 && (

              <GetInspections

                orgUnit={orgUnitId1}
                onDataLoaded={(data) => {

                  const formattedInspections = Object.entries(data).map(([eventId, date]) => ({
                    id: eventId,
                    label: `Inspection: ${date}`

                  }));

                  setInspections1(formattedInspections);
                }}
              />
            )}

          </div>

          <div style={{ flex: 1 }}>
            <h4>School 2</h4>


            {loadingClusters2 ? (

              <CircularLoader />

            ) : (

              <SingleSelectField

                placeholder="Select cluster"
                selected={selectedCluster2}
                onChange={({ selected }) => {

                  setSelectedCluster2(selected);
                  setSelectedSchool2(null);
                  setOrgUnitId2(null);
                  setInspections2([]);
                  fetchSchools(selected, setSchools2, setLoadingSchools2);

                }}
              >

                {clusters2.map((cluster) => (

                  <SingleSelectOption key={cluster.id} value={cluster.id} label={cluster.displayName} />

                ))}

              </SingleSelectField>

            )}

            {loadingSchools2 ? (

              <CircularLoader />

            ) : (

              <SingleSelectField

                placeholder="Select school"
                selected={selectedSchool2}
                onChange={({ selected }) => {

                  const school = schools2.find((s) => s.id === selected);
                  setSelectedSchool2(selected);
                  setOrgUnitId2(school?.id);

                }}


                disabled={!selectedCluster2 || schools2.length === 0}
              >


                {schools2.map((school) => (

                  <SingleSelectOption key={school.id} value={school.id} label={school.displayFormName} />

                ))}

              </SingleSelectField>

            )}

            <SingleSelectField

              placeholder="Select inspection"
              selected={selectedInspection2}
              onChange={({ selected }) => {

                setSelectedInspection2(selected);

              }}
              disabled={inspections2.length === 0}
            >

              {inspections2.map((inspection) => (

                <SingleSelectOption key={inspection.id} value={inspection.id} label={inspection.label} />
              ))}

            </SingleSelectField>

            {orgUnitId2 && (

              <GetInspections
                orgUnit={orgUnitId2}
                onDataLoaded={(data) => {

                  const formattedInspections = Object.entries(data).map(([eventId, date]) => ({
                    id: eventId,
                    label: `Inspection: ${date}`,
                  }));

                  setInspections2(formattedInspections);
                }}

              />

            )}

          </div>

        </div>

        <hr style={{ margin: "15px 0" }} />

        <SingleSelectField

          placeholder="Select resource type"
          selected={selectedResource}
          onChange={({ selected }) => {

            setSelectedResource(selected);
          }}

        >

          <SingleSelectOption value="Textbooks" label="Textbooks" />
          <SingleSelectOption value="Tables" label="Tables" />
          <SingleSelectOption value="Chairs" label="Chairs" />

        </SingleSelectField>
        
      </div>
    </div>
  );
}
