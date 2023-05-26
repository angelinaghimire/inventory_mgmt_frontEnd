import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "../stylesheets/Dashboard.css";
import {
  FcShipped,
  FcBusinessman,
  FcPackage,
  FcDatabase,
} from "react-icons/fc";
import Chart from "../components/Chart.js";
import Barchart from "../components/Barchart.js";
import MultiAxisLineChart from "../components/MultiAxisLineChart.jsx";
import ScatterChart from "../components/Scatterchart.jsx";
import Header from "../components/Header";

const Dashboard = ({ inventory }) => {
  return (
    <div className="dashboard">
      <Header />
      <div class="alerts">
        <div className="icon1">
          <FaExclamationCircle color="#F44336" />
        </div>
        <div className="Alert1">Critically Low</div>
      </div>

      <div class="warnings">
        <div className="icon2">
          <FaExclamationCircle color="#86741D" />
        </div>
        <div className="Alert2"> Warning </div>
      </div>

      <div class="summary">
        <div class="block">
          <div className="icon3">
            <FcDatabase size={50} />
          </div>
          <div className="total"> Total Categories </div>
        </div>
        <div class="block">
          <div className="icon3">
            <FcPackage size={50} />
          </div>
          <div className="total"> Total Products </div>
        </div>
        <div class="block">
          <div className="icon3">
            <FcBusinessman size={50} />
          </div>
          <div className="total"> Total Receivers </div>
        </div>
        <div class="block">
          <div className="icon3">
            <FcShipped size={50} />
          </div>
          <div className="total"> Total Suppliers </div>
        </div>
      </div>
      <div className="chart-container1">
        <div className="barchart">
          <Barchart />
        </div>
        <div className="piechart">
          <Chart />
        </div>
      </div>
      <div className="linechart">
        <MultiAxisLineChart />
      </div>
    </div>
  );
};

export default Dashboard;
