import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';

// Import our components
import ParticipantHeader from '@/components/participants/ParticipantHeader';
import ParticipantsList from '@/components/participants/ParticipantsList';
import BankPersonnelList from '@/components/participants/BankPersonnelList';
import ProjectBreadcrumb from '@/components/project/ProjectBreadcrumb';
import { useParticipantData } from '@/hooks/useParticipantData';
import { useFormDocumentData } from '@/hooks/useFormDocumentData';
import { useParticipantDialogHandler } from '@/components/participants/ParticipantDialogHandler';
import { useAssignmentHandler } from '@/components/participants/AssignmentHandler';
import { Project, isProject } from '@/types/project';

const ProjectParticipants: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  // Get project details
  const { data: projectData, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  // Load participant data using our custom hook
  const { 
    buyers, 
    sellers, 
    bankUsers, 
    isLoading: participantsLoading, 
    refetchParticipants
  } = useParticipantData(projectId || '');

  // Load forms data only (no documents)
  const {
    individualForms,
    businessForms
  } = useFormDocumentData();

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;

  // Handle participant dialog
  const {
    openAddBuyerDialog,
    openAddSellerDialog,
    openAddBusinessDialog,
    participantDialog,
    businessDialog
  } = useParticipantDialogHandler({
    refetchParticipants
  });

  // Handle assignment dialog for forms only
  const {
    openAssignDialog,
    assignmentDialog
  } = useAssignmentHandler({
    projectId: projectId || '',
    refetchParticipants,
    individualForms,
    businessForms,
    individualDocuments: [], // Empty since we removed documents
    businessDocuments: [] // Empty since we removed documents
  });

  const handleRemoveParticipant = (id: string) => {
    // In a real app, this would call an API to remove the participant
    toast('Participant removed');
    // Refetch participants to update the list
    refetchParticipants();
  };

  if (projectLoading || participantsLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          <Tabs defaultValue="buyers">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
              <TabsTrigger value="bank">Bank Personnel</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyers" className="mt-6">
              <Skeleton className="h-72 w-full" />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Project not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <ProjectBreadcrumb project={project} currentPageTitle="Participants" />
        
        <ParticipantHeader 
          projectId={projectId || ''}
          projectName={project?.project_name || 'Project'}
        />

        <Tabs defaultValue="buyers">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="bank">Bank Personnel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buyers" className="mt-6">
            <ParticipantsList 
              title="Buyers"
              participants={buyers}
              emptyMessage="No buyers added yet"
              onAddParticipant={openAddBuyerDialog}
              onRemoveParticipant={handleRemoveParticipant}
              onAssignForms={(participant) => openAssignDialog(participant, 'forms')}
              onAssignBusinessForms={(participant) => openAssignDialog(participant, 'forms', 'business')}
              onAddBusiness={openAddBusinessDialog}
              formTemplates={individualForms}
            />
          </TabsContent>
          
          <TabsContent value="sellers" className="mt-6">
            <ParticipantsList 
              title="Sellers"
              participants={sellers}
              emptyMessage="No sellers added yet"
              onAddParticipant={openAddSellerDialog}
              onRemoveParticipant={handleRemoveParticipant}
              onAssignForms={(participant) => openAssignDialog(participant, 'forms')}
              onAssignBusinessForms={(participant) => openAssignDialog(participant, 'forms', 'business')}
              onAddBusiness={openAddBusinessDialog}
              formTemplates={individualForms}
            />
          </TabsContent>
          
          <TabsContent value="bank" className="mt-6">
            <BankPersonnelList bankUsers={bankUsers} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {participantDialog}
      {businessDialog}
      {assignmentDialog}
    </Layout>
  );
};

export default ProjectParticipants;
