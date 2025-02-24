import React, {useState} from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  return (
    <div className="max-w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Organize Your Work with Us
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-lg mx-auto opacity-90">
          Stay productive and manage your tasks efficiently with our intuitive
          and easy-to-use platform.
        </p>
        
      </div>
    </div>
  );
}

export default Home;
