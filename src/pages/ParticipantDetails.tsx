
import React from 'react';
import { useParams } from 'react-router-dom';
import ParticipantPageManager from '@/components/participants/ParticipantPageManager';

const ParticipantDetails = () => {
  const { projectId, participantId } = useParams<{ 
    projectId: string; 
    participantId: string; 
  }>();

  if (!projectId || !participantId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Invalid participant or project ID</p>
      </div>
    );
  }

  return (
    <ParticipantPageManager 
      participantId={participantId} 
      projectId={projectId} 
    />
  );
};

export default ParticipantDetails;
