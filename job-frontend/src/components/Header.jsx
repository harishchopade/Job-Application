import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/auth'; // Assuming these functions exist

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  useEffect(() => {
    // This effect ensures 'loggedIn' state reflects the actual login status on mount.
    // For real-time updates (e.g., after login/logout without full page refresh),
    // you might need a context API or a global state manager.
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setIsMobileMenuOpen(false); // Close mobile menu on logout
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-md relative"> {/* Add 'relative' for absolute positioning of mobile menu */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight hover:text-blue-200 transition duration-300 ease-in-out"
        >
          HireHub
        </Link>

        {/* Desktop Navigation (visible on medium screens and up) */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/companies"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg"
          >
            Companies
          </Link>

          <Link
            to="/jobs"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg"
          >
            Jobs
          </Link>

          {!loggedIn && (
            <Link
              to="/login"
              className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg"
            >
              Login
            </Link>
          )}

          {loggedIn && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Button (visible on small screens only) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? (
              // Close icon (X)
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 absolute inset-x-0 top-full shadow-lg py-4 z-50">
          <nav className="flex flex-col items-center space-y-4">
            <Link
              to="/companies"
              onClick={closeMobileMenu} // Close menu on link click
              className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg w-full text-center py-2"
            >
              Companies
            </Link>

            <Link
              to="/jobs"
              onClick={closeMobileMenu} // Close menu on link click
              className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg w-full text-center py-2"
            >
              Jobs
            </Link>

            {!loggedIn && (
              <Link
                to="/login"
                onClick={closeMobileMenu} // Close menu on link click
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg w-full text-center py-2"
              >
                Login
              </Link>
            )}

            {loggedIn && (
              <button
                onClick={handleLogout} // handleLogout already closes the menu
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg w-full text-center py-2"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;