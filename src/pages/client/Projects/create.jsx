import React from 'react';
import ProjectForm from '../../../components/client/Projects/ProjectForm';
import CreateProjectForm from '../../../components/client/Projects/CreateProjectForm';

const CreateProjectPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <ProjectForm />
      <CreateProjectForm />
    </div>
  );
};

export default CreateProjectPage;