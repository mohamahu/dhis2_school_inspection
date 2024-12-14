

export const dummyLineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'Desks',
          data: [30, 40, 32, 45, 50, 42, 60],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
      },
      {
        label: 'Textbooks',
        data: [15, 30, 25, 70, 45, 38, 52],
        borderColor: 'rgba(255, 99, 132, 1)', // Line color
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Area under the line
        tension: 0.4, // Smooth line
    },
    {
        label: 'Teachers',
        data: [10, 20, 15, 30, 35, 25, 40],
        borderColor: 'rgba(54, 162, 235, 1)', // Line color
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Area under the line
        tension: 0.4, // Smooth line
    },

    {
      label: 'Toilets',
      data: [10, 9, 7, 11, 12, 10, 9],
      borderColor: 'rgba(54, 162, 235, 1)', // Line color
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Area under the line
      tension: 0.4, // Smooth line
      },
      {
        label: 'Chair',
        data: [10, 20, 15, 30, 35, 25, 40],
        borderColor: 'rgba(54, 162, 235, 1)', // Line color
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Area under the line
        tension: 0.4, // Smooth line
    },
  ],
  };
  