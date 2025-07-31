import { useState } from "react";
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await login(username, password);
      navigate("/"); // Use navigate for smooth client-side routing
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  font-sans antialiased">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 sm:pl-20 pr-20 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200 transform transition-all duration-300 hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
          Welcome Back!
        </h2>

        {/* Username Input */}
        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-base"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-base"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm text-center mb-4 border border-red-200">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                     transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          Sign In
        </button>

        {/* Optional: Add a link for "Forgot Password" or "Sign Up" */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginComponent;