import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      toast.warn("All field are required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );

      toast.success("Login successfully", { position: "top-right" });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/todo");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-[400px] w-full">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-gray-800">Login</h1>

        {/* Email Input */}
        <div className="mt-6">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        {/* Login Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
