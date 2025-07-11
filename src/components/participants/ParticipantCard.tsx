
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Participant } from '@/types/participant';
import { ParticipantCardHeader } from './ParticipantCardHeader';
import IndividualRequirementsSection from './IndividualRequirementsSection';
import BusinessSection from './BusinessSection';
import { Trash2 } from 'lucide-react';

interface ParticipantCardProps {
  participant: Participant;
  onRemove: (id: string) => void;
  onAssignForms: (participant: Participant) => void;
  onAssignBusinessForms?: (participant: Participant) => void;
  onAddBusiness?: (participant: Participant) => void;
  formTemplates?: Array<{ form_id: string; name: string; }>;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  onRemove,
  onAssignForms,
  onAssignBusinessForms,
  onAddBusiness,
  formTemplates = []
}) => {
  const navigate = useNavigate();

  // Add safety check for participant
  if (!participant) {
    return null;
  }

  const handleNameClick = () => {
    // Navigate to personal information form for this participant
    const currentPath = window.location.pathname;
    const projectId = currentPath.split('/')[3]; // Extract project ID from current path
    navigate(`/project/participants/${projectId}/personal-info/${participant.participant_id}`);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <ParticipantCardHeader 
              participant={participant} 
              onNameClick={handleNameClick}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(participant.participant_id)}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <IndividualRequirementsSection
          forms={participant.forms || []}
          onAssignForms={() => onAssignForms(participant)}
          onFormClick={(formId, formName) => {
            console.log('Form clicked:', formId, formName);
          }}
        />
        
        {participant.business ? (
          <BusinessSection
            business={participant.business}
            onAssignBusinessForms={onAssignBusinessForms ? 
              () => onAssignBusinessForms(participant) : () => {}}
            onFormClick={(formId, formName) => {
              console.log('Business form clicked:', formId, formName);
            }}
          />
        ) : (
          onAddBusiness && (
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAddBusiness(participant)}
                className="w-full"
              >
                Add Business
              </Button>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
