import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectEditForm from '../../../components/client/Projects/ProjectEditForm';

const CreateProjectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full p-12" style={{ minWidth: '1024px' }}>
      <ProjectEditForm />
    </div>
  );
};

export default CreateProjectPage;