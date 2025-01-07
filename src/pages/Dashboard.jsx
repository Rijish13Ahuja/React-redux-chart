import React, { useState } from "react";
import { FaHome, FaChartBar, FaCog, FaBars, FaChevronLeft } from "react-icons/fa";
import Table from "../components/Table/DataTable";
import LineChart from "../components/Chart/LineChart";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Home":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive Chart */}
            <div className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-bold mb-4">Real-Time Data Chart</h2>
              <LineChart />
            </div>

            {/* Dynamic Table */}
            <div className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-bold mb-4">Data Table</h2>
              <Table />
            </div>
          </div>
        );
      case "Reports":
        return (
          <div>
            <h2 className="text-lg font-bold">Reports Section</h2>
            <LineChart />
            <div className="mt-6">
              <h2 className="text-lg font-bold">Data Table</h2>
              <Table />
            </div>
          </div>
        );
      case "Settings":
        return (
          <div>
            <h2 className="text-lg font-bold">Settings</h2>
            <p className="mt-2 text-sm text-gray-400">
              Manage application settings and preferences here.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Panel (Navigation) */}
      <div
        className={`bg-gray-800 p-4 ${
          isCollapsed ? "w-16" : "w-[14%]"
        } transition-all duration-300 hidden md:block`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-bold ${isCollapsed ? "hidden" : "block"}`}>
            Navigation
          </h2>
          <button
            onClick={toggleCollapse}
            className="text-white hover:text-gray-300"
          >
            {isCollapsed ? <FaBars /> : <FaChevronLeft />}
          </button>
        </div>
        <ul className="space-y-2">
          {[
            { label: "Home", icon: <FaHome /> },
            { label: "Reports", icon: <FaChartBar /> },
            { label: "Settings", icon: <FaCog /> },
          ].map((item) => (
            <li
              key={item.label}
              className={`flex items-center p-3 rounded transition cursor-pointer ${
                activeMenu === item.label ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => handleMenuClick(item.label)}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel (Main Content) */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">{activeMenu}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
