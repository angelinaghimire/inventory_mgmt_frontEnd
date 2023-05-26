import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const chartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [12, 19, 6],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
