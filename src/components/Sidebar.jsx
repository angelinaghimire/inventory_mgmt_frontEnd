import React, { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GoPackage } from "react-icons/go";
import { RiUserReceived2Line } from "react-icons/ri";
import { FaBars, FaCog } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import "../stylesheets/Sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      path: "/products",
      name: "Products",
      icon: <GoPackage />,
    },
    {
      path: "/suppliers",
      name: "Suppliers",
      icon: <CiDeliveryTruck />,
    },
    {
      path: "/receivers",
      name: "Receivers",
      icon: <RiUserReceived2Line />,
    },
    {
      path: "/transactions",
      name: "Transactions",
      icon: <VscArrowSwap />,
    },
    {
      path: "/report",
      name: "Report",
      icon: <HiOutlineClipboardDocumentList />,
    },
    {
      path: "/usercontrol",
      name: "Users",
      icon: <FiUsers />,
    },
  ];
  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">Menu</h1>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
        <div className="settings">
          <NavLink to="/settings" className="link">
            <div className="icon settings-icon">
              <FaCog />
            </div>
          </NavLink>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
