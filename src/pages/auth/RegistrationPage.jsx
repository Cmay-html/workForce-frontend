// src/pages/auth/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ClientRegistrationForm from '../../components/shared/auth/ClientRegistrationForm';
import FreelancerRegistrationForm from '../../components/shared/auth/FreelancerRegistrationForm';

const RegistrationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get('role') || 'client'; // Default to client if no role specified

  const handleRoleSwitch = (newRole) => {
    setSearchParams({ role: newRole });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6" style={{ minWidth: '1024px' }}>
      <div style={{ width: '150%', maxWidth: 'none' }}>
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mx-auto shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-3xl">KF</span>
            </div>
          </div>

          {/* Role Selection Tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{
              backgroundColor: "#f3f4f6",
              padding: "4px",
              borderRadius: "8px",
              display: "flex",
              gap: "4px"
            }}>
              <button
                onClick={() => handleRoleSwitch('client')}
                style={{
                  padding: "8px 24px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  border: "none",
                  backgroundColor: role === 'client' ? "#ffffff" : "transparent",
                  color: role === 'client' ? "#111827" : "#6b7280",
                  boxShadow: role === 'client' ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Join as Client
              </button>
              <button
                onClick={() => handleRoleSwitch('freelancer')}
                style={{
                  padding: "8px 24px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  border: "none",
                  backgroundColor: role === 'freelancer' ? "#ffffff" : "transparent",
                  color: role === 'freelancer' ? "#111827" : "#6b7280",
                  boxShadow: role === 'freelancer' ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Join as Freelancer
              </button>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {role === 'freelancer' ? 'Join as a Freelancer' : 'Join as a Client'}
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            {role === 'freelancer'
              ? 'Create your freelancer profile to start getting projects'
              : 'Create your client profile to start posting projects and hiring freelancers'
            }
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          {role === 'freelancer' ? <FreelancerRegistrationForm /> : <ClientRegistrationForm />}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
