import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectEditForm from '../../../components/client/Projects/ProjectEditForm';

const CreateProjectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full p-12" style={{ minWidth: '1024px' }}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600">Fill in the details below to create a new project</p>
      </div>
      <ProjectEditForm />
    </div>
  );
};

export default CreateProjectPage;