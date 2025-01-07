import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import { setData, addRow, deleteRow } from "../../store/tableSlice";
import { loadCSV } from "../../services/csvLoader";
import { validateNewRow } from "../utils/rowValidations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);

  const [newRow, setNewRow] = useState({
    user: "",
    broker: "",
    "API key": "",
    "API secret": "",
    pnl: "",
    margin: "",
    max_risk: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV();
        dispatch(setData(csvData));
      } catch (error) {
        console.error("Error loading CSV:", error);
        toast.error("Failed to load CSV data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const resetTable = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the table to its original state?"
    );
    if (confirmReset) {
      try {
        dispatch(setData([]));
        toast.success("Table reset successfully.");
      } catch (error) {
        console.error("Error resetting table:", error);
        toast.error("Failed to reset the table.");
      }
    }
  };

  const handleAddRow = () => {
    const errors = validateNewRow(newRow, data);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Please correct the validation errors.");
      return;
    }

    setValidationErrors({});
    dispatch(addRow(newRow));
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

  const handleDeleteRow = (index) => {
    dispatch(deleteRow(index));
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
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            onClick={() => handleDeleteRow(row.index)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 text-sm rounded transition"
          >
            Delete
          </button>
        ),
      },
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

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Data Table</h2>
        <button
          onClick={resetTable}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Reset Table
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Add New Row</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(newRow).map((key) => (
            <div key={key} className="relative">
              <input
                name={key}
                value={newRow[key]}
                onChange={(e) =>
                  setNewRow({ ...newRow, [e.target.name]: e.target.value })
                }
                placeholder={`Enter ${key}`}
                className={`p-3 rounded bg-gray-800 text-white border w-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-sm ${
                  validationErrors[key]
                    ? "border-red-500 focus:ring-red-500 focus:ring-offset-red-200"
                    : "border-gray-600 focus:ring-blue-500 focus:ring-offset-blue-200"
                }`}
              />
              {validationErrors[key] && (
                <div className="mt-2 text-red-400 text-xs font-medium bg-red-500 bg-opacity-10 p-2 rounded">
                  {validationErrors[key]}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddRow}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded transition font-bold"
        >
          Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="w-full text-left text-white table-auto border-separate border-spacing-2"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerGroup.id}`}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`header-${column.id}`}
                    className="py-2 px-4 border-b border-gray-700 text-sm bg-gray-800 hover:bg-gray-700 transition"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={`row-${rowIndex}`}
                  className="hover:bg-gray-800 transition"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className="py-2 px-4 border-b border-gray-700 text-sm truncate"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
};

export default DataTable;
