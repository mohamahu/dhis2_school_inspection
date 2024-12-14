# School inspection


This solution for school inspections is a multipage form. 



The process begins with the school registration page where the user selects a cluster, school, and inspection date. These are mandatory fields to ensure all inspections are properly linked to their respective schools. To provide a clear overview of the inspection form’s progress, a progress bar is displayed at the top indicating the current stage of the process.



Once the registration is complete, the user proceeds to the school management page where questions related to the schools facilities are filled out. The mandatory fields are clearly marked, so the users can efficiently fill out the required fields. The application also includes validation checks to ensure data accuracy, such as alerting users if text is entered in a field that expects numerical input. This is followed by the school staff and students page where detailed information about the teachers and students is recorded. The next step is the resource count page where the inspector logs the quantity of resources such as pencils, chairs, and textbooks.



The final step is the summary page where all collected data is displayed for review. At this stage, the application highlights any discrepancies based on recommended ratio guidelines, providing feedback if any resources isn’t according to acceptable standards. 



Before submission, the user can review and edit each section of the form to ensure accuracy. Upon confirming and submitting the inspection, the application provides a confirmation notification to ensure the inspection is successfully completed and recorded.



From a technical perspective: 



The submission of the form uses DHIS2 useDataQuery to POST/mutate the data into the DHIS2 Instance. We did hardcode the SchoolInspection program id into the solution to make it easier for us, along with the programStage.



Inspection log 



The user can overview the submitted inspection by navigation to inspection log in the sidebar in the left hand side. This page will display the inspections with five columns: inspection id, date, school name, cluster name and region name. In this page, it is used two different APIs to fetch all the nessacary data. 





The technical standpoint of the inspection log is as following: 



It retrieves a list of inspection events from the inspection events API, which provides details like event ID, creation date, and associated organization unit IDs. For each inspection, the organization units API is used to fetch detailed information about the organizational hierarchy, including the school, cluster, and region linked to the event. The data is processed and rendered in a structured table with columns for Event ID, Date, School Name, Cluster Name, and Region Name, using components from dhis2. 



Feature 2: Create a new school



Create new school is available in the main menu as the last menu item to choose from. The Minimum requirements: develop a solution that allows a school inspector to record and store data about a new school identified in their cluster, including real-time capture of geo-coordinates and a picture of the school structure! This page successfully complements the requirements with: 

1. The user can select a cluster Under Banjul which is level 3 Organisation unit and select one of the chosen clusters. It’s that selected cluster where the new school will be created under! \



2. Then the user types the school name and a short name both of this are required, then the user selects a date based on when the school was first discovered/created.



3. The user is able to choose an image from the «Device» In this example it is a computer(that’s what we have tested on so far).\

 

4. The user is able to get the real-time coordinates based on a fetch api from: https://api.bigdatacloud.net this coordinates retrieve the latitude and longitude based on the users location.



5. When the user clicks on the submit button all the data is POSTED to the DHIS2 Instance where you can view the newly created school at: https://research.im.dhis2.org/in5320g11/dhis-web-maintenance/index.html#/list/organisationUnitSection/organisationUnit






It is implemented code for validating the name so we dont get duplicates of school names



Feature 7: Dashboard (school management report)



The dashboard (school management report) is accessible under the Dashboard section in the sidebar, which provides head teachers with detailed visualizations of key school performance indicators.



On the Dashboard, users begin by selecting a cluster followed by a specific school. This is selected from the dropdown menus over the graph. Once a school is selected, a graph dynamically updates to display five lines representing resources: desks, textbooks, teachers, students, and chairs. 



The x-axis shows inspection dates while the y-axis displays resource values over time. 



The right hand sidebar allows users to select a specific inspection for the chosen school. When an inspection is selected, detailed resource information is displayed alongside learner to resource ratios. These ratios are color coded for clarity with green indicating sufficient resources and red highlighting areas of deficiency.



This feature enables schools to track performance over time and identify areas requiring attention. The clusters and schools data is fetched from the API, but the resource data is generated as dummy data. 



From a technical perspective, the dashboard provides a visual representation of school inspection data, integrating components like GetInspections and ManagementReport. 



To fetch data about clusters and school, we have used the "useDataQuery"-method. The two queries, Schools_Query and Clusters_Query, are developed in Dashboard.js to be accessed. When a user selects a cluster, it sends a request to the API. At the same time, the different schools for the chosen cluster will also be generated in the other dropdown-menu.



The GetInspections component fetches inspection data for a selected school through the tracker API which is as following: https://research.im.dhis2.org/in5320g11/api/tracker/events. 



While the ManagementReport component dynamically visualizes this data in a line chart from the library of Charts.js. The chart displays inspection dates on the x-axis and resource values on the y-axis, offering school inspectors a clear and interactive overview of key performance indicators over time.







Start the program:

Step 1: run: npm install chart.js react-chartjs-2

Step 2 : run "yarn global add dhis-portal"
step 3 : run "npx dhis-portal --target=https://research.im.dhis2.org/in5320g11/"


Step 4:
In the following folder:
 ~/.../IN5320_Group11_Project/IN5320_Group11_Project/IN5320ProjectG11

In two different terminals run:


yarn start



npx dhis-portal --target=https://research.im.dhis2.org/in5320g11

