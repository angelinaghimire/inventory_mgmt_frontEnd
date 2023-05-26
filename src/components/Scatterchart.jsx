import React from "react";
import { Scatter } from "react-chartjs-2";

const ScatterChart = () => {
  const chartData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 10 },
          { x: 7, y: 25 },
          { x: 12, y: 17 },
          { x: 20, y: 8 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  return <Scatter data={chartData} options={chartOptions} />;
};

export default ScatterChart;
