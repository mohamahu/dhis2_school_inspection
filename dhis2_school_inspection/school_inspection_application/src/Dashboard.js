import { useDataQuery } from '@dhis2/app-runtime';
import { Box, Card, CircularLoader, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React, { useCallback, useEffect, useState } from "react";
import { GetInspections } from "./GetInspection";
import { ManagementReport } from "./ManagementReport";
import teacher from "./icons/Graduation Cap.svg";
import teaching from "./icons/Teaching.svg";
import book from "./icons/book.svg";
import chair from "./icons/chair.svg";
import desk from "./icons/desk.svg";



// implemented a custom hook to fetch the schools based on the selected cluster
const useSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(false);

  // basing the query on the clusterId that is given
  const SCHOOLS_QUERY = {
      schools: {
          resource: 'organisationUnits',
          params: ({ clusterId }) => ({
              fields: 'id,displayFormName,parent[id,displayName]',
              filter: `parent.id:eq:${clusterId}`,
              level: 5,
          }),
      },
  };

  // since the cluster might be changed, we included a refetch so that we can fetch
  // if selected cluster is changed
  const { loading, error, data, refetch } = useDataQuery(SCHOOLS_QUERY, {
      lazy: true, 
  });

  // this method is called automatically when clusters are fetched, look at 
  // the SingleSelectField for clusters in the return block
  const fetchSchools = useCallback(
      (clusterId) => {
          setLoadingSchools(true);
          refetch({ clusterId }).then((res) => {
              setSchools(res.schools.organisationUnits || []);
              setLoadingSchools(false);
          }).catch((err) => {
              console.error('Error fetching schools:', err);
              setLoadingSchools(false);
          });
      },
      [refetch]
  );

  return { schools, loadingSchools, fetchSchools };
};

export const Dashboard = () => {
  const [clusters, setClusters] = useState([]);

  const [inspections, setInspections] = useState([]);
  const [chartData, setChartData] = useState({labels: [],datasets: [],});
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);

  const [inspectionDetails, setInspectionDetails] = useState(null);

  // NOTE: we haven't been able to get real data from the API as we understood
  // that some queries have missing values, so we chose to use dummy
  // data instead

  // Query for clusters
  const CLUSTERS_QUERY = {
    clusters: {
      resource: "organisationUnits",
      id: "RlPlK44dtoo",
      params: {
        fields: ["id", "displayName", "children[id,displayName]"],
      },
    },
  };

  const { loading: queryLoadingClusters, data: clusterData } = useDataQuery(CLUSTERS_QUERY);

  // updating the clusterData state
  useEffect(() => {
    if (clusterData && clusterData.clusters) {
      setClusters(clusterData.clusters.children || []);
    }
  }, [clusterData]);

  const { schools, loadingSchools, fetchSchools } = useSchools(); 


  const handleInspectionsLoaded = (inspectionsData) => {

    // only setting inspections if inspectionsData actually contain somethingg
    if (!inspectionsData || Object.keys(inspectionsData).length === 0) return;

    // structuring the received data making it more presentable
    const formattedInspections = Object.entries(inspectionsData).map(([eventId, date]) => ({
      id: eventId,
      label: date,
    }));

    setInspections(formattedInspections);

    // this will be used in the chart
    const labels = formattedInspections.map((inspection) => inspection.label); 

    // these are the different values that are display in the chart
    // look how we are using Math.random() to generate dummy data 
    const datasets = [
      {
        label: "Students",
        data: formattedInspections.map(() => Math.floor(Math.random() * 100)), 
        borderColor: "rgba(228, 10, 22)",
        backgroundColor: "rgba(255, 102, 102)",
        tension: 0,
      },
      {
        label: "Desks",
        data: formattedInspections.map(() => Math.floor(Math.random() * 100)), 
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0,
      },
      {
        label: "Textbooks",
        data: formattedInspections.map(() => Math.floor(Math.random() * 100)), 
        borderColor: "rgba(193, 225, 193, 1)", // Litt mørkere grønn
        backgroundColor: "rgba(193, 225, 193, 0.5)", // Pastellgrønn
        tension: 0,
      },      
      
      {
        label: "Teachers",
        data: formattedInspections.map(() => Math.floor(Math.random() * 100)), 
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0,
      },
      {
        label: "Chairs",
        data: formattedInspections.map(() => Math.floor(Math.random() * 100)), 
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0,
      },
      {
        label: "Toilets",
        data: formattedInspections.map(() => Math.floor(Math.random() * 100)), 
        borderColor: "#5D2C8D", 
        backgroundColor: "#8E44AD",
        tension: 0,
      }
    ];

    setChartData({labels, datasets});
  };


  // method to handle the inspection drop down
  const handleInspectionSelection = (inspectionId) => {

    setSelectedInspection(inspectionId);

    // collecting data for the chosen inspection
    const inspectionIndex = inspections.findIndex((inspection) => inspection.id === inspectionId);

    // addressing both name and value for the chartData
    if (inspectionIndex !== -1) {
      const details = chartData.datasets.map((dataset) => ({
        name: dataset.label,
        value: dataset.data[inspectionIndex],
      }));
      setInspectionDetails(details);
    }  
    else {
      setInspectionDetails(null);
    }
  };

  useEffect(() => {
    setSelectedInspection(null);
    setInspectionDetails(null);
    setInspections([]);
  }, [selectedSchool, selectedCluster]);
  
  const recommendedRatioForItemNames = (itemName) => {
    switch (itemName) {
        case "Chairs":
            return "1:1 (Seat to Student)";
        case "Textbooks":
            return "1:1 (Textbook to Student)";
        case "Classrooms":
            return "<53:1 (Learner to Classroom)";
        case "Teachers":
            return "<45:1 (Learner to Teacher)";
        case "Toilets":
            return "<25:1 (Learner to Toilet)";
        default:
            return "";
    }
  };

  // this is a help method to separate the student card on the right hand menu from the other resources
  const getStudentNumberFromInspectionDetails = (details) => {
    const studentDetail = details.find((item) => item.name === "Students");
    return studentDetail ? studentDetail.value : "Not available";
}


  return (

    <div style={{ display: "flex", paddingLeft:"30px", height: "100vh", fontFamily: 'Roboto' }}>
      <div style={{ flex: 3, padding: "5px" }}>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", justifyContent: 'center' }}>
          <div>
            <h4 style={{ fontFamily: 'Roboto' }}>Select Cluster</h4>

            {queryLoadingClusters ? (
              <CircularLoader />
            ) : (
              <SingleSelectField
                placeholder="Select cluster"
                selected={selectedCluster}
                onChange={({ selected }) => {
                  setSelectedCluster(selected);
                  setSelectedSchool(null);
                  // here it is resetting
                  setChartData({ labels: [], datasets: [] }); 
                  fetchSchools(selected);
                }}
              >
                {clusters.map((cluster) => (
                  <SingleSelectOption key={cluster.id} value={cluster.id} label={cluster.displayName} />
                ))}
              </SingleSelectField>
            )}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Roboto', fontSize: '16px' }}>Select School</h4>

            {loadingSchools ? (
              <CircularLoader />
            ) : (
              <SingleSelectField
                placeholder="Select school"
                selected={selectedSchool}
                onChange={({ selected }) => {
                  setSelectedSchool(selected);
                  // this is resetting
                  setChartData({ labels: [], datasets: [] }); 
                }}
                disabled={!selectedCluster}
              >
                {schools.map((school) => (
                  <SingleSelectOption key={school.id} value={school.id} label={school.displayFormName}/>
                ))}

              </SingleSelectField>
            )}
          </div>  
        </div>

        { selectedSchool && 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16px' }}>
              <p style={{ fontSize: "12px", color: "#555", margin: "0", fontFamily: 'Roboto', }}>
                    Press the resource type to filter
                </p>
        </div>
        }
 
        <ManagementReport chartData={chartData} />
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderLeft: "1px solid #ddd",
          fontFamily: 'Roboto',
        }}
      >

        <h4 style={{ fontFamily: 'Roboto', fontSize: '24px' }}>Inspection Details</h4>
        <div style={{ marginBottom: "20px" }}>

          <GetInspections
            orgUnit={selectedSchool}
            onDataLoaded={(data) => {
              if (inspections.length === 0) handleInspectionsLoaded(data);
            }}
          />

          <SingleSelectField
            placeholder="Select inspection"
            selected={selectedInspection}
            onChange={({ selected }) => handleInspectionSelection(selected)}
            disabled={!selectedSchool || inspections.length === 0}
          >

            {inspections.map((inspection) => (
              <SingleSelectOption key={inspection.id} value={inspection.id} label={inspection.label} />
            ))}

          </SingleSelectField>
        </div>


        {inspectionDetails ? ( 
          <div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
            {inspectionDetails.map((item) => {
              const studentNumber = getStudentNumberFromInspectionDetails(inspectionDetails); 

              // generating ratio and ratiocolor that is displayed on the cards
              const ratio = studentNumber / item.value;
              const ratioColor = ratio < 1 ? "green" : "red";
              const icon =
                item.name.toLowerCase() === "desks"
                  ? desk
                  : item.name.toLowerCase() === "textbooks"
                  ? book
                  : item.name.toLowerCase() === "teachers"
                  ? teacher
                  : item.name.toLowerCase() === "chairs"
                  ? chair
                  : teaching;

              return (
                <div
                  key={item.name}
                  style={{
                    marginBottom: "20px",
                    padding: "6px", 
                    border: "2px solid #ddd",
                    borderRadius: "8px", 
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", 
                    backgroundColor: "#fff", 
                    fontFamily: 'Roboto',
                  }}
                >
                  {/* using existing Card and Box from DHIS2 to display ratio information */}
                  <Card>
                    <Box display="flex" alignItems="center" marginBottom="8px">
                      {/* the icon followed by the resource name */}
                      {
                        typeof icon === "string" ? (
                          <img
                            src={icon}
                            alt={`${item.name} icon`}
                            style={{ width: "20px", marginRight: "8px" }}
                          />
                        ) : (
                          React.createElement(icon, {
                            style: { fontSize: "20px", marginRight: "8px" },
                          })
                        )
                      }

                      <strong>{`${item.name}: ${item.value}`}</strong>

                    </Box>

                    {item.name !== "Students" && (
                      <Box>   
                        <p style={{ color: ratioColor, margin: "4px 0", fontFamily: 'Roboto' }}>
                          <strong>
                            Students to {item.name.toLowerCase()} ratio:{" "}
                            {studentNumber}:{item.value}
                          </strong>
                        </p>

                        {/* Showing the recommended ratio */}
                        {recommendedRatioForItemNames(item.name) !== "" && (
                          <p style={{ fontSize: "12px", color: "#555", margin: "0", fontFamily: 'Roboto' }}>
                            Recommended: {recommendedRatioForItemNames(item.name)}
                          </p>
                        )}
                      </Box>
                    )}
                  </Card>
                </div>
              );
          })}
      </ul>
    </div>
    ) : (
      // if no found inspections, no need to display anything
        selectedInspection && 
            <p style={{ fontFamily: 'Roboto' }}>
              No data available for the selected inspection.
            </p>
        )}
      </div>
    </div>
  );
}
