import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectEditForm from '../../../components/client/Projects/ProjectEditForm';

const CreateProjectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8" style={{ minWidth: '1024px' }}>
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600">Fill in the details below to create a new project</p>
      </div>
      <ProjectEditForm />
    </div>
  );
};

export default CreateProjectPage;