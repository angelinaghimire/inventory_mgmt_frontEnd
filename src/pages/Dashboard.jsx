import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "../stylesheets/Dashboard.css"
import { FcShipped, FcBusinessman, FcPackage, FcDatabase } from "react-icons/fc";

const Dashboard = ({ inventory }) => {
  return (
    <div className="dashboard">

      <div class="alerts">
       <div className="icon1"><FaExclamationCircle color="#F44336" /></div>
       <div className="Alert1">Critically Low</div>
      </div>

      <div class="warnings">
       <div className="icon2"><FaExclamationCircle color="#86741D" /></div>
       <div className="Alert2"> Warning </div>
      </div>

    <div class="summary">
      <div class="block">
      <div className="icon3"><FcDatabase size={50} /></div>
        <div className="total"> Total Categories </div>
      </div>
      <div class="block">
      <div className="icon3"><FcPackage size={50} /></div>
       <div className="total"> Total Products </div>
      </div>
      <div class="block">
      <div className="icon3"><FcBusinessman size={50} /></div>
       <div className="total"> Total Receivers </div>
      </div>
      <div class="block">
       <div className="icon3"><FcShipped size={50} /></div>

       <div className="total"> Total Suppliers </div>
      </div>
     </div> 

    </div>
  );
};

export default Dashboard;

