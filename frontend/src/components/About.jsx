import React from "react";

function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-6">
      {/* Left Section - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="https://i.pinimg.com/474x/ea/ac/26/eaac269b38f72dc15c683a2229d2bd55.jpg"
          alt="About Us"
          className="rounded-lg shadow-lg w-72 md:w-96"
        />
      </div>

      {/* Right Section - Content */}
      <div className="md:w-1/2 text-white text-center md:text-left mt-6 md:mt-0 md:pl-10">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed">
          Welcome to <strong>MyBrand</strong>, where we make organizing your
          work seamless and efficient. Our mission is to provide top-notch
          solutions to help you stay on track and boost productivity.
        </p>
        <p className="mt-4 text-lg">
          Join us and take your workflow to the next level!
        </p>
      </div>
    </div>
  );
}

export default About;
