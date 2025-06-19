
import React, { useState } from 'react';
import { Participant } from '@/types/participant';
import ParticipantDialog from '../ParticipantDialog';
import BusinessDialog from './BusinessDialog';

interface ParticipantDialogHandlerProps {
  refetchParticipants: () => void;
}

export const useParticipantDialogHandler = ({ refetchParticipants }: ParticipantDialogHandlerProps) => {
  const [showAddBuyerDialog, setShowAddBuyerDialog] = useState(false);
  const [showAddSellerDialog, setShowAddSellerDialog] = useState(false);
  const [showAddBusinessDialog, setShowAddBusinessDialog] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const openAddBuyerDialog = () => setShowAddBuyerDialog(true);
  const openAddSellerDialog = () => setShowAddSellerDialog(true);
  const openAddBusinessDialog = (participant: Participant) => {
    setSelectedParticipant(participant);
    setShowAddBusinessDialog(true);
  };

  const handleAddParticipant = (participantData: any, role: string) => {
    // In a real app, this would call an API
    console.log('Adding participant:', participantData, 'as', role);
    refetchParticipants();
    
    if (role === 'buyer') setShowAddBuyerDialog(false);
    if (role === 'seller') setShowAddSellerDialog(false);
  };

  const handleAddBusiness = (businessData: any) => {
    // In a real app, this would call an API to add business to participant
    console.log('Adding business to participant:', selectedParticipant?.name, businessData);
    refetchParticipants();
    setShowAddBusinessDialog(false);
    setSelectedParticipant(null);
  };

  const participantDialog = (
    <>
      <ParticipantDialog
        open={showAddBuyerDialog}
        onOpenChange={setShowAddBuyerDialog}
        onSave={(data) => handleAddParticipant(data, 'buyer')}
        defaultType="buyer"
      />
      <ParticipantDialog
        open={showAddSellerDialog}
        onOpenChange={setShowAddSellerDialog}
        onSave={(data) => handleAddParticipant(data, 'seller')}
        defaultType="seller"
      />
    </>
  );

  const businessDialog = (
    <BusinessDialog
      open={showAddBusinessDialog}
      onOpenChange={setShowAddBusinessDialog}
      onSave={handleAddBusiness}
    />
  );

  return {
    openAddBuyerDialog,
    openAddSellerDialog,
    openAddBusinessDialog,
    participantDialog,
    businessDialog
  };
};
