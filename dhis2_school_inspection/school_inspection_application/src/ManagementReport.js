import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export const ManagementReport = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
            display: true,
            text: "Inspection dates",
            font: {
                size: 18, 
                weight: 'bold', 
            },
        },
    },    
      y: {
        title: {
          display: true,
          text: "Amount",
          align: "centre",
          font: {
            size: 18,
            weight: 'bold', 
          },
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
