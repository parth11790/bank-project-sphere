
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { Project as ProjectType } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { generateProjectDashboardData } from '@/types/dashboard';

import ProjectEditDialog from '@/components/ProjectEditDialog';
import ProjectHeader from '@/components/project/ProjectHeader';
import { ProjectSections } from '@/components/project/ProjectSections';
import ProjectLoadingState from '@/components/project/ProjectLoadingState';
import ProjectNotFound from '@/components/project/ProjectNotFound';
import ProjectOverviewEnhanced from '@/components/project/ProjectOverviewEnhanced';

const Project = () => {
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
  const dashboardData = generateProjectDashboardData(participantsData);
  
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-6"
      >
        <ProjectHeader 
          project={projectData} 
          onEdit={() => setEditDialogOpen(true)}
        />
        
        <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
          <ProjectSections
            project={projectData}
            onGatherInformation={handleGatherInformation}
            onAnalysis={handleAnalysis}
            onGenerateDocumentation={handleGenerateDocumentation}
          />
        </div>

        <ProjectOverviewEnhanced 
          project={projectData}
          dashboardData={dashboardData}
          participants={participantsData}
        />
        
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
