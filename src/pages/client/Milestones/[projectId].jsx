import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/shared/dashboard/DashboardLayout';
import MilestoneList from '../../../components/client/Milestones/MilestoneList';

const ProjectMilestonesPage = () => {
  const { projectId } = useParams();

  return (
    <DashboardLayout>
      <MilestoneList projectId={projectId} />
    </DashboardLayout>
  );
};

export default ProjectMilestonesPage;
