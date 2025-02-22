import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-[1320px] mx-auto flex justify-between items-center h-[8vh] px-6">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-300 transition duration-300"
            >
              About
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/todo"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Todo List
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signin"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <AiOutlineClose
              className="text-3xl text-white cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <GiHamburgerMenu
              className="text-3xl text-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close button inside menu */}
          <button
            className="absolute top-4 right-4 text-3xl text-gray-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose />
          </button>

          <ul className="mt-12 space-y-6 text-lg font-medium text-gray-700">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-300 block"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition duration-300 block"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/todo"
                    className="hover:text-blue-600 transition duration-300 block"
                    onClick={() => setIsOpen(false)}
                  >
                    Todo List
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="hover:text-blue-600 transition duration-300 block"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/signin"
                    className="hover:text-blue-600 transition duration-300 block"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-600 transition duration-300 block"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
