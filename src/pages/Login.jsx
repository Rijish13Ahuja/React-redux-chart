import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication logic
    if (username === "admin" && password === "password") {
      dispatch(loginSuccess("mock-token"));
      navigate("/dashboard");
    } else {
      dispatch(loginFailure("Invalid username or password"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        className="bg-gray-800 p-6 rounded shadow-md text-white w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
