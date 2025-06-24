
import { useNavigate } from 'react-router-dom';
import { ParticipantClassification } from '@/types/participantTypes';

export const useParticipantNavigation = () => {
  const navigate = useNavigate();

  const navigateToParticipant = (participant: ParticipantClassification) => {
    console.log(`Navigating to ${participant.entity_type} participant:`, participant.name);
    navigate(participant.info_route);
  };

  const navigateToParticipantInfo = (
    participantId: string, 
    entityType: 'individual' | 'business', 
    projectId?: string
  ) => {
    if (entityType === 'business') {
      navigate(`/business/${participantId}`);
    } else if (projectId) {
      navigate(`/project/participants/${projectId}/personal-info/${participantId}`);
    }
  };

  return {
    navigateToParticipant,
    navigateToParticipantInfo
  };
};
