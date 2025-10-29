// src/pages/auth/RegistrationPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClientRegistrationForm from "../../components/shared/auth/ClientRegistrationForm";
import FreelancerRegistrationForm from "../../components/shared/auth/FreelancerRegistrationForm";

const RegistrationPage = () => {
  const [userType, setUserType] = useState(""); // 'client' or 'freelancer'
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mx-auto shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-3xl">KF</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join KaziFlow
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Choose your account type and start your journey with our workflow
            intelligence platform
          </p>
        </div>

        {!userType ? (
          // Account Type Selection
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                How do you want to use KaziFlow?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Select your role to customize your experience and access
                relevant features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Client Option */}
              <div
                onClick={() => setUserType("client")}
                className="group border-2 border-gray-200/80 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:scale-105 bg-white"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300 shadow-lg">
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                    Hire Talent
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Post projects, find skilled professionals, and manage your
                    business efficiently
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-blue-900 mb-2 text-sm uppercase tracking-wide">
                      Perfect for:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Business owners & managers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Project managers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Startup founders
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Freelancer Option */}
              <div
                onClick={() => setUserType("freelancer")}
                className="group border-2 border-gray-200/80 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:border-green-500 hover:shadow-2xl hover:scale-105 bg-white"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300 shadow-lg">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                    Find Work
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Showcase your skills, apply to exciting projects, and grow
                    your freelance career
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-green-900 mb-2 text-sm uppercase tracking-wide">
                      Perfect for:
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Developers & designers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Writers & creatives
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Consultants & experts
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-200/60">
              <p className="text-gray-600 text-lg">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline underline-offset-4"
                >
                  Sign in to your account
                </Link>
              </p>
            </div>
          </div>
        ) : (
          // Registration Form
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-2xl p-8">
            {/* Back Navigation */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <button
                onClick={() => setUserType("")}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Choose different role
              </button>
              <div className="text-right">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full uppercase tracking-wide">
                  {userType} Registration
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="px-4">
              {userType === "client" ? (
                <ClientRegistrationForm />
              ) : (
                <FreelancerRegistrationForm />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
