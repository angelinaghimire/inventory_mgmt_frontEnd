import React from "react";
import "../stylesheets/header.css";
import emblem from "../assets/emblem.png";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="header">
      <Link to="/Dashboard">
        <h1 className="title">
          Dhulikhel Municipality Office
          <br />
          <h3>Inventory Management System</h3>
        </h1>
      </Link>
      <Link to="/Dashboard">
        <img src={emblem} alt="Emblem of Nepal" className="emblem" />
      </Link>
    </div>
  );
};
export default Header;
