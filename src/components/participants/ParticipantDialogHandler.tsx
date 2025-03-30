
import React, { useState } from 'react';
import { Participant } from '@/types/participant';
import ParticipantDialog from '@/components/ParticipantDialog';
import { toast } from 'sonner';

interface ParticipantDialogHandlerProps {
  refetchParticipants: () => void;
}

export const useParticipantDialogHandler = ({
  refetchParticipants
}: ParticipantDialogHandlerProps) => {
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);

  const handleAddParticipant = (participant: Omit<Participant, 'participant_id' | 'documents' | 'forms' | 'user_id'>) => {
    // In a real app, this would call an API to add the participant
    toast(`${participant.role === 'buyer' ? 'Buyer' : 'Seller'} added successfully`);
    setIsParticipantDialogOpen(false);
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

  const participantDialog = (
    <ParticipantDialog 
      open={isParticipantDialogOpen}
      onOpenChange={setIsParticipantDialogOpen}
      onSave={handleAddParticipant}
      defaultType={currentParticipant?.role as "buyer" | "seller" | undefined}
    />
  );

  return {
    openAddBuyerDialog,
    openAddSellerDialog,
    participantDialog,
  };
};
