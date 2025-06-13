
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
import { ProjectBusinessStructure } from '@/components/project/ProjectBusinessStructure';
import ProjectLoadingState from '@/components/project/ProjectLoadingState';
import ProjectNotFound from '@/components/project/ProjectNotFound';
import ProjectOverviewEnhanced from '@/components/project/ProjectOverviewEnhanced';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
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

  const handleManageBusinessStructure = () => {
    setActiveTab('structure');
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="structure">Business Structure</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <ProjectOverviewEnhanced 
              project={projectData}
              dashboardData={dashboardData}
              participants={participantsData}
            />
          </TabsContent>

          <TabsContent value="structure" className="mt-6">
            <ProjectBusinessStructure
              project={projectData}
              onAddOwner={() => console.log('Add owner')}
              onAddSeller={() => console.log('Add seller')}
              onAddAffiliatedBusiness={(ownerId) => console.log('Add affiliated business for owner:', ownerId)}
            />
          </TabsContent>

          <TabsContent value="sections" className="mt-6">
            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
              <ProjectSections
                project={projectData}
                onGatherInformation={handleGatherInformation}
                onAnalysis={handleAnalysis}
                onGenerateDocumentation={handleGenerateDocumentation}
                onManageBusinessStructure={handleManageBusinessStructure}
              />
            </div>
          </TabsContent>
        </Tabs>
        
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
