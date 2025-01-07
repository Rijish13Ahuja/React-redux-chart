import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess, loginFailure } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      dispatch(loginSuccess("mock-token"));
      navigate("/dashboard");
    } else {
      dispatch(loginFailure("Invalid username or password"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <form
        className="bg-gray-800 p-8 rounded-xl shadow-lg text-white w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Please enter your credentials to continue
        </p>
        {error && (
          <div className="mb-4 text-sm text-center bg-red-500 bg-opacity-10 text-red-400 px-4 py-2 rounded">
            {error}
          </div>
        )}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm transition"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm transition"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow-md transition"
        >
          Login
        </button>
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>
            Forgot your password?{" "}
            <Link
              to="/reset-password"
              className="text-blue-500 hover:underline"
            >
              Reset it here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
