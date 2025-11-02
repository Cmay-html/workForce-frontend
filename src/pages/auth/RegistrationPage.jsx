// src/pages/auth/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientRegistrationForm from '../../components/shared/auth/ClientRegistrationForm';
import FreelancerRegistrationForm from '../../components/shared/auth/FreelancerRegistrationForm';

const RegistrationPage = () => {
  const [userType, setUserType] = useState(''); // 'client' or 'freelancer'

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
            Join WorkforceFlow
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Choose your account type to get started
          </p>
        </div>

        {!userType ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">I want to:</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                onClick={() => setUserType('client')}
                className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-primary-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire Freelancers</h3>
                  <p className="text-gray-600">Post projects, find talent, and manage your business</p>
                </div>
              </div>

              <div
                onClick={() => setUserType('freelancer')}
                className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Work</h3>
                  <p className="text-gray-600">Apply to projects, showcase your skills, and get paid</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setUserType('')}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to selection
              </button>
              <span className="text-sm text-gray-500 capitalize">{userType} Registration</span>
            </div>

            {userType === 'client' ? (
              <ClientRegistrationForm />
            ) : (
              <FreelancerRegistrationForm />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;