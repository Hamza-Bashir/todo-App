import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSign = async () => {
    if (!userData.name || !userData.email || !userData.password) {
      toast.warn("Please fill all field", { position: "top-right" });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/signIn",
        userData
      );
      toast.success("Sign in successfully", { position: "top-right" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(`Error:${error}`, { position: "top-right" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-[400px] w-full">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Sign In
        </h1>

        {/* Name Input */}
        <div className="mt-6">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userData.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        {/* Email Input */}
        <div className="mt-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userData.email}
            onChange={handleChange}
            name="email"
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
            value={userData.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        {/* Sign In Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={handleSign}
          >
            Sign In
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
