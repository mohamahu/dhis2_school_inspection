import { Chart } from "@dhis2/analytics"; // DHIS2 Visualization Library
import React from "react";
import { dummyAnalyticsData } from "./data/DummyDataDHIS2"; // Import dummy data

const BarChartDHIS2 = () => {
  // Transform dummy data into a format suitable for the DHIS2 Chart
  const categories = dummyAnalyticsData.metaData.dimensions.pe.map(
    (period) => dummyAnalyticsData.metaData.items[period].name
  );

  const seriesData = dummyAnalyticsData.metaData.dimensions.dx.map((datasetId) => {
    const datasetName = datasetId; // Mocked dataset names; replace as needed
    const dataValues = categories.map((_, index) => {
      const periodId = dummyAnalyticsData.metaData.dimensions.pe[index];
      const row = dummyAnalyticsData.rows.find(
        (r) => r[0] === datasetId && r[1] === periodId
      );
      return row ? row[2] : 0; // Default to 0 if no data found
    });

    return {
      name: datasetName,
      data: dataValues,
    };
  });

  const config = {
    type: "bar",
    xAxis: {
      categories, // X-axis labels from the metadata
    },
    yAxis: {
      title: {
        text: "Values", // Y-axis title
      },
    },
    series: seriesData, // Map series data to Chart
    title: {
      text: "Bar Chart with Dummy Data (DHIS2 Visualizer)",
    },
  };

  return <Chart config={config} />;
};

export default BarChartDHIS2;
