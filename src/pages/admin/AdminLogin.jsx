  // src/Pages/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AdminLogin = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const { state } = location;
    if (state) {
      setFormData({ email: state.email || "", password: state.password || "" });
    } else {
      const savedEmail = localStorage.getItem("lastAdminEmail") || "";
      const savedPassword = localStorage.getItem("lastAdminPassword") || "";
      setFormData({ email: savedEmail, password: savedPassword });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    try {
      console.log("Sending admin login request with:", formData);
      const response = await axios.post(
        "https://workforce-backend-kfxw.onrender.com/api/auth/admin-login",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("Login successful:", response.data);
      
      // Store auth data manually for admin login
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      localStorage.setItem("lastAdminEmail", formData.email);
      localStorage.setItem("lastAdminPassword", formData.password);
      
      // Force page reload to update auth context
      window.location.href = "/admin";
    } catch (err) {
      console.error("Login error:", err.response || err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Login failed: Invalid credentials";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-dark-blue-900 text-white p-6 flex items-center justify-center">
      <div className="bg-dark-blue-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-orange-400">Admin Login</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-orange-200">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full p-3 rounded bg-dark-blue-700 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-orange-200">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full p-3 rounded bg-dark-blue-700 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
