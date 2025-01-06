import React from "react";
import { FaHome, FaChartBar, FaCog } from "react-icons/fa";
import Table from "../components/Table/DataTable";
import LineChart from "../components/Chart/LineChart";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Panel (Navigation) */}
      <div className="w-1/12 bg-gray-800 p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">Navigation</h2>
        <ul>
          <li className="mb-2 flex items-center hover:bg-gray-700 p-2 rounded transition">
            <FaHome className="mr-2" /> Home
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-700 p-2 rounded transition">
            <FaChartBar className="mr-2" /> Reports
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-700 p-2 rounded transition">
            <FaCog className="mr-2" /> Settings
          </li>
        </ul>
      </div>

      {/* Right Panel (Main Content) */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
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
      </div>
    </div>
  );
};

export default Dashboard;
