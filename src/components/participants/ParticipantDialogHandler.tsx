
import React, { useState } from 'react';
import { Participant } from '@/types/participant';
import ParticipantDialog from '@/components/ParticipantDialog';
import BusinessDialog, { BusinessFormData } from '@/components/participants/BusinessDialog';
import { toast } from 'sonner';

interface ParticipantDialogHandlerProps {
  refetchParticipants: () => void;
}

export const useParticipantDialogHandler = ({
  refetchParticipants
}: ParticipantDialogHandlerProps) => {
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  
  // Business dialog state
  const [isBusinessDialogOpen, setIsBusinessDialogOpen] = useState(false);
  const [participantForBusiness, setParticipantForBusiness] = useState<Participant | null>(null);

  const handleAddParticipant = (participant: Omit<Participant, 'participant_id' | 'documents' | 'forms' | 'user_id'>) => {
    // In a real app, this would call an API to add the participant
    toast(`${participant.role === 'buyer' ? 'Buyer' : 'Seller'} added successfully`);
    setIsParticipantDialogOpen(false);
    // Refetch participants to update the list
    refetchParticipants();
  };

  const handleAddBusiness = (businessData: BusinessFormData) => {
    if (!participantForBusiness) return;
    
    // In a real app, this would call an API to add the business
    toast(`Business ${businessData.name} added to ${participantForBusiness.name}`);
    setIsBusinessDialogOpen(false);
    
    // Refetch participants to update the list
    refetchParticipants();
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
  
  const openAddBusinessDialog = (participant: Participant) => {
    setParticipantForBusiness(participant);
    setIsBusinessDialogOpen(true);
  };

  const participantDialog = (
    <ParticipantDialog 
      open={isParticipantDialogOpen}
      onOpenChange={setIsParticipantDialogOpen}
      onSave={handleAddParticipant}
      defaultType={currentParticipant?.role as "buyer" | "seller" | undefined}
    />
  );
  
  const businessDialog = (
    <BusinessDialog
      open={isBusinessDialogOpen}
      onOpenChange={setIsBusinessDialogOpen}
      onSave={handleAddBusiness}
    />
  );

  return {
    openAddBuyerDialog,
    openAddSellerDialog,
    openAddBusinessDialog,
    participantDialog,
    businessDialog,
  };
};
