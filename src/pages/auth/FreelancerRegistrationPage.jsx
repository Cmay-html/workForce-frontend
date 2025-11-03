import React from 'react';
import { useNavigate } from 'react-router-dom';
import FreelancerRegistrationForm from '../../components/shared/auth/FreelancerRegistrationForm';

const FreelancerRegistrationPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/register');
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Compact Progress Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 bg-none border-none text-sm font-medium cursor-pointer mb-6 p-2 rounded-lg transition-all duration-200 hover:bg-orange-50"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to selection
          </button>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Join as Freelancer
            </h2>
            <p className="text-base text-gray-600 font-normal leading-6">
              Create your freelancer profile to find work
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 py-8 flex justify-center">
          <div className="w-full">
            <FreelancerRegistrationForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600 m-0">
            Already have an account?{' '}
            <span
              className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600 transition-colors duration-300"
              onClick={() => navigate('/login')}
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegistrationPage;
