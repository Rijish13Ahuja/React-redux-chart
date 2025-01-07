import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-500">
          Reset Password
        </h2>
        <p className="text-gray-400 mb-6">
          This feature is not yet implemented. Please contact support for
          assistance.
        </p>
        <Link
          to="/"
          className="block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold shadow-md transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
