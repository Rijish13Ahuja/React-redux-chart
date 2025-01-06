import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { loadCSV } from "../../services/csvLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]); // Store the original CSV data
  const [newRow, setNewRow] = useState({
    user: "",
    broker: "",
    "API key": "",
    "API secret": "",
    pnl: "",
    margin: "",
    max_risk: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV();
        setData(csvData);
        setOriginalData(csvData); // Save the original data for recovery
        setLoading(false);
      } catch (error) {
        console.error("Error loading CSV:", error);
        toast.error("Failed to load CSV data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resetTable = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the table to its original state?"
    );
    if (confirmReset) {
      try {
        setData(originalData); // Restore original data
        toast.success("Table reset successfully.");
      } catch (error) {
        console.error("Error resetting table:", error);
        toast.error("Failed to reset the table.");
      }
    }
  };

  const addRow = () => {
    // Validate inputs
    if (
      !newRow.user ||
      !newRow.broker ||
      !newRow["API key"] ||
      !newRow["API secret"] ||
      isNaN(parseFloat(newRow.pnl)) ||
      isNaN(parseFloat(newRow.margin)) ||
      isNaN(parseFloat(newRow.max_risk))
    ) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    // Check for duplicate user
    if (data.some((row) => row.user === newRow.user)) {
      toast.error("A row with this user already exists.");
      return;
    }

    setData([...data, newRow]);
    setNewRow({
      user: "",
      broker: "",
      "API key": "",
      "API secret": "",
      pnl: "",
      margin: "",
      max_risk: "",
    });
    toast.success("Row added successfully.");
  };

  const deleteRow = (rowIndex) => {
    setData(data.filter((_, index) => index !== rowIndex));
    toast.success("Row deleted successfully.");
  };

  const columns = React.useMemo(
    () => [
      { Header: "User", accessor: "user" },
      { Header: "Broker", accessor: "broker" },
      { Header: "Key", accessor: "API key" },
      { Header: "Secret", accessor: "API secret" },
      { Header: "PnL", accessor: "pnl" },
      { Header: "Margin", accessor: "margin" },
      { Header: "Risk", accessor: "max_risk" },
      { Header: "Actions", accessor: "actions" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useSortBy,
    usePagination
  );

  if (loading) {
    return <div className="text-center text-white">Loading data...</div>;
  }

  return (
    <div className="p-4">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Reset Button */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Data Table</h2>
        <button
          onClick={resetTable}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Reset Table
        </button>
      </div>

      {/* Form Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Add New Row</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(newRow).map((key) => (
            <input
              key={key}
              name={key}
              value={newRow[key]}
              onChange={(e) =>
                setNewRow({ ...newRow, [e.target.name]: e.target.value })
              }
              placeholder={`Enter ${key}`}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600 w-full hover:border-blue-500 focus:border-blue-500 transition"
            />
          ))}
        </div>
        <button
          onClick={addRow}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
        >
          Add Row
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="w-full text-left text-white table-auto border-separate border-spacing-2"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id || column.accessor}
                    className="py-2 px-4 border-b border-gray-700 text-sm bg-gray-800 hover:bg-gray-700 transition"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-gray-800 transition"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id || cell.column.accessor}
                      className="py-2 px-4 border-b border-gray-700 text-sm truncate"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteRow(index)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 text-sm rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
