import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route goes to login/signup */}
        <Route path="/" element={<AuthForm />} />
        
        {/* Dashboard route */}
        <Route path="/dashboard" element={<DashboardLayout />} />

        {/* Catch-all redirects back to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
