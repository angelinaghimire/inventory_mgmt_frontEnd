import React from "react";
import { Line } from "react-chartjs-2";

const MultiAxisLineChart = () => {
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70, 60],
        fill: false,
        borderColor: "#FF6384",
        yAxisID: "y-axis-1",
      },
      {
        label: "Dataset 2",
        data: [70, 65, 80, 75, 90, 85, 80, 75, 90, 85, 80, 75],
        fill: false,
        borderColor: "#36A2EB",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Set the chart width to 100%
    scales: {
      yAxes: [
        {
          id: "y-axis-1",
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true,
            suggestedMax: 100,
          },
        },
        {
          id: "y-axis-2",
          type: "linear",
          position: "right",
          ticks: {
            beginAtZero: true,
            suggestedMax: 100,
          },
        },
      ],
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default MultiAxisLineChart;
