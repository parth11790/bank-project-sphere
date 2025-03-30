
import React, { useState } from 'react';
import { FormTemplate, Document, isFormTemplate } from '@/types/form';
import { Participant } from '@/types/participant';
import AssignmentDialog from '@/components/AssignmentDialog';
import { toast } from 'sonner';

interface AssignmentHandlerProps {
  projectId: string;
  refetchParticipants: () => void;
  individualForms: FormTemplate[];
  businessForms: FormTemplate[];
  individualDocuments: Document[];
  businessDocuments: Document[];
}

export const useAssignmentHandler = ({
  projectId,
  refetchParticipants,
  individualForms,
  businessForms,
  individualDocuments,
  businessDocuments
}: AssignmentHandlerProps) => {
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [assignmentType, setAssignmentType] = useState<'documents' | 'forms'>('documents');
  const [entityType, setEntityType] = useState<'individual' | 'business'>('individual');

  const handleAssignItems = (items: FormTemplate[] | Document[]) => {
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

  // Get the appropriate available items for the current assignment dialog
  const getAvailableItems = () => {
    if (assignmentType === 'forms') {
      return entityType === 'individual' ? individualForms : businessForms;
    } else {
      return entityType === 'individual' ? individualDocuments : businessDocuments;
    }
  };

  const assignmentDialog = (
    <AssignmentDialog
      open={isAssignmentDialogOpen}
      onOpenChange={setIsAssignmentDialogOpen}
      onSave={handleAssignItems}
      type={assignmentType}
      participantName={currentParticipant?.name || ''}
      availableItems={getAvailableItems()}
    />
  );

  return {
    openAssignDialog,
    assignmentDialog,
  };
};
