
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { Project as ProjectType } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { getUserById } from '@/lib/mockData';
import { generateProjectDashboardData } from '@/types/dashboard';

import ProjectEditDialog from '@/components/ProjectEditDialog';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectOverview from '@/components/project/ProjectOverview';
import { ProjectSections } from '@/components/project/ProjectSections';
import ProjectLoadingState from '@/components/project/ProjectLoadingState';
import ProjectNotFound from '@/components/project/ProjectNotFound';
import ProjectDetailsCard from '@/components/project/ProjectDetailsCard';
import ParticipantProgressTabs from '@/components/project/ParticipantProgressTabs';
import RecentActivityCard from '@/components/project/RecentActivityCard';
import DashboardStats from '@/components/project/DashboardStats';

const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId
  });
  
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['participants', projectId],
    queryFn: () => getParticipantsWithDetailsData(projectId || ''),
    enabled: !!projectId
  });
  
  const isLoading = projectLoading || participantsLoading;
  
  if (isLoading) {
    return <ProjectLoadingState />;
  }
  
  if (!project) {
    return <ProjectNotFound onBackToProjects={() => navigate('/projects')} />;
  }
  
  const projectData = project as ProjectType;
  const participantsData = participants || [] as ParticipantWithDetails[];

  // Calculate dashboard data
  const dashboardData = generateProjectDashboardData(participantsData);
  
  const buyerParticipants = dashboardData.participants.filter(p => p.role === 'buyer');
  const sellerParticipants = dashboardData.participants.filter(p => p.role === 'seller');
  const bankParticipants = dashboardData.participants.filter(p => 
    p.role === 'bank_officer' || p.role === 'loan_specialist' || p.role === 'bank_manager'
  );
  
  const handleGatherInformation = () => {
    navigate(`/project/participants/${projectId}`);
  };
  
  const handleAnalysis = () => {
    navigate(`/project/analysis/${projectId}`);
  };
  
  const handleGenerateDocumentation = () => {
    navigate(`/project/documentation/${projectId}`);
  };
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6"
      >
        <ProjectHeader 
          project={projectData} 
          onEdit={() => setEditDialogOpen(true)}
        />
        
        <ProjectSections
          project={projectData}
          onGatherInformation={handleGatherInformation}
          onAnalysis={handleAnalysis}
          onGenerateDocumentation={handleGenerateDocumentation}
        />
        
        {/* Dashboard Stats */}
        <DashboardStats 
          buyersCount={dashboardData.stats.buyers}
          sellersCount={dashboardData.stats.sellers}
          documents={dashboardData.stats.documents}
          forms={dashboardData.stats.forms}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectOverview project={projectData} />
          </div>
          <RecentActivityCard activities={dashboardData.recentActivity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ParticipantProgressTabs 
            buyerParticipants={buyerParticipants}
            sellerParticipants={sellerParticipants}
            bankParticipants={bankParticipants}
            getUserById={getUserById}
          />          
          <ProjectDetailsCard project={projectData} />
        </div>
        
        {editDialogOpen && (
          <ProjectEditDialog
            project={projectData}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
        )}
      </motion.div>
    </Layout>
  );
};

export default Project;
