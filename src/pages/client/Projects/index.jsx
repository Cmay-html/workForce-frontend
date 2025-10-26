import React from 'react';
import DashboardLayout from '../../../components/shared/dashboard/DashboardLayout';
import ProjectList from '../../../components/client/Projects/ProjectList';

const ClientProjectsPage = () => {
  return (
    <DashboardLayout>
      <ProjectList />
    </DashboardLayout>
  );
};

export default ClientProjectsPage;
