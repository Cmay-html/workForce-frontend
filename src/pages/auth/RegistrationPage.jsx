// src/pages/auth/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientRegistrationForm from '../../components/shared/auth/ClientRegistrationForm';

const RegistrationPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6" style={{ minWidth: '1024px' }}>
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">KF</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Join as a Client
          </h1>
          <p className="text-gray-600 text-lg font-medium">
           Create your client profile to start posting projects and hiring freelancers
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <ClientRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;