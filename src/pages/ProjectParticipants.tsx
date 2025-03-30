
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticipantDialog from '@/components/ParticipantDialog';
import AssignmentDialog from '@/components/AssignmentDialog';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { 
  getProjectById, 
  getFormTemplates, 
  getDocuments
} from '@/services';
import { Skeleton } from '@/components/ui/skeleton';

// Import our new components
import ParticipantHeader from '@/components/participants/ParticipantHeader';
import ParticipantsList from '@/components/participants/ParticipantsList';
import BankPersonnelList from '@/components/participants/BankPersonnelList';
import { useParticipantData, Participant } from '@/hooks/useParticipantData';
import { Project, isProject } from '@/types/project';
import { FormTemplate, isFormTemplate } from '@/types/form';

const ProjectParticipants: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [assignmentType, setAssignmentType] = useState<'documents' | 'forms'>('documents');
  const [entityType, setEntityType] = useState<'individual' | 'business'>('individual');
  
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

  // Load individual forms and documents
  const { data: individualFormsData } = useQuery({
    queryKey: ['forms', 'individual'],
    queryFn: () => getFormTemplates('individual'),
  });

  const { data: individualDocumentsData } = useQuery({
    queryKey: ['documents', 'individual'],
    queryFn: () => getDocuments('individual'),
  });

  // Load business forms and documents
  const { data: businessFormsData } = useQuery({
    queryKey: ['forms', 'business'],
    queryFn: () => getFormTemplates('business'),
  });

  const { data: businessDocumentsData } = useQuery({
    queryKey: ['documents', 'business'],
    queryFn: () => getDocuments('business'),
  });

  // Process form data to ensure it matches expected format
  const individualForms = individualFormsData || [];
  const businessForms = businessFormsData || [];
  const individualDocuments = individualDocumentsData || [];
  const businessDocuments = businessDocumentsData || [];

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;

  const handleAddParticipant = (participant: Omit<Participant, 'participant_id' | 'documents' | 'forms' | 'user_id'>) => {
    // In a real app, this would call an API to add the participant
    toast(`${participant.role === 'buyer' ? 'Buyer' : 'Seller'} added successfully`);
    setIsParticipantDialogOpen(false);
    // Refetch participants to update the list
    refetchParticipants();
  };

  const handleRemoveParticipant = (id: string) => {
    // In a real app, this would call an API to remove the participant
    toast('Participant removed');
    // Refetch participants to update the list
    refetchParticipants();
  };

  const handleAssignDocument = (items: { name: string }[]) => {
    if (!currentParticipant) return;
    
    toast(`${assignmentType === 'documents' ? 'Documents' : 'Forms'} assigned to ${currentParticipant.name} successfully`);
    setIsAssignmentDialogOpen(false);
    // Refetch participants to update the list
    refetchParticipants();
  };

  const openAssignDialog = (participant: Participant, type: 'documents' | 'forms', entity: 'individual' | 'business' = 'individual') => {
    setCurrentParticipant(participant);
    setAssignmentType(type);
    setEntityType(entity);
    setIsAssignmentDialogOpen(true);
  };

  const openAddBuyerDialog = () => {
    setIsParticipantDialogOpen(true);
    setCurrentParticipant({ 
      participant_id: '', 
      user_id: '', 
      name: '', 
      email: '', 
      role: 'buyer', 
      documents: [], 
      forms: [] 
    });
  };

  const openAddSellerDialog = () => {
    setIsParticipantDialogOpen(true);
    setCurrentParticipant({ 
      participant_id: '', 
      user_id: '', 
      name: '', 
      email: '', 
      role: 'seller', 
      documents: [], 
      forms: [] 
    });
  };

  if (projectLoading || participantsLoading) {
    return (
      <Layout>
        <div className="space-y-6">
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

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
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
              onAssignDocuments={(participant) => openAssignDialog(participant, 'documents')}
              onAssignForms={(participant) => openAssignDialog(participant, 'forms')}
              onAssignBusinessDocuments={(participant) => openAssignDialog(participant, 'documents', 'business')}
              onAssignBusinessForms={(participant) => openAssignDialog(participant, 'forms', 'business')}
              onAddBusiness={() => toast('Add business functionality would be implemented here')}
              formTemplates={{ 
                individual: individualForms.filter(isFormTemplate), 
                business: businessForms.filter(isFormTemplate) 
              }}
            />
          </TabsContent>
          
          <TabsContent value="sellers" className="mt-6">
            <ParticipantsList 
              title="Sellers"
              participants={sellers}
              emptyMessage="No sellers added yet"
              onAddParticipant={openAddSellerDialog}
              onRemoveParticipant={handleRemoveParticipant}
              onAssignDocuments={(participant) => openAssignDialog(participant, 'documents')}
              onAssignForms={(participant) => openAssignDialog(participant, 'forms')}
              onAssignBusinessDocuments={(participant) => openAssignDialog(participant, 'documents', 'business')}
              onAssignBusinessForms={(participant) => openAssignDialog(participant, 'forms', 'business')}
              onAddBusiness={() => toast('Add business functionality would be implemented here')}
              formTemplates={{ 
                individual: individualForms.filter(isFormTemplate), 
                business: businessForms.filter(isFormTemplate) 
              }}
            />
          </TabsContent>
          
          <TabsContent value="bank" className="mt-6">
            <BankPersonnelList bankUsers={bankUsers} />
          </TabsContent>
        </Tabs>
      </motion.div>

      <ParticipantDialog 
        open={isParticipantDialogOpen}
        onOpenChange={setIsParticipantDialogOpen}
        onSave={handleAddParticipant}
        defaultType={currentParticipant?.role as "buyer" | "seller" | undefined}
      />

      <AssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        onSave={handleAssignDocument}
        type={assignmentType}
        participantName={currentParticipant?.name || ''}
      />
    </Layout>
  );
};

export default ProjectParticipants;
