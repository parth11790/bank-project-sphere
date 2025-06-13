
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ParticipantCard from './ParticipantCard';
import { Participant } from '@/types/participant';

interface Form {
  form_id: string;
  name: string;
}

interface ParticipantsListProps {
  title: string;
  participants: Participant[];
  emptyMessage: string;
  onAddParticipant: () => void;
  onRemoveParticipant: (id: string) => void;
  onAssignDocuments: (participant: Participant) => void;
  onAssignForms: (participant: Participant) => void;
  onAssignBusinessDocuments: (participant: Participant) => void;
  onAssignBusinessForms: (participant: Participant) => void;
  onAddBusiness: (participant: Participant) => void;
  formTemplates: {
    individual: Form[];
    business: Form[];
  };
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  title,
  participants,
  emptyMessage,
  onAddParticipant,
  onRemoveParticipant,
  onAssignDocuments,
  onAssignForms,
  onAssignBusinessDocuments,
  onAssignBusinessForms,
  onAddBusiness,
  formTemplates
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={onAddParticipant}>
          <Plus className="h-4 w-4 mr-2" />
          Add {title.slice(0, -1)} {/* Remove 's' from the title */}
        </Button>
      </div>
      
      {participants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">{emptyMessage}</p>
            <Button 
              variant="outline"
              onClick={onAddParticipant}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First {title.slice(0, -1)} {/* Remove 's' from the title */}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {participants.map(participant => (
            <ParticipantCard 
              key={participant.participant_id}
              participant={participant}
              onRemove={() => onRemoveParticipant(participant.participant_id)}
              onAssignDocuments={() => onAssignDocuments(participant)}
              onAssignForms={() => onAssignForms(participant)}
              onAssignBusinessDocuments={participant.business ? 
                () => onAssignBusinessDocuments(participant) : undefined}
              onAssignBusinessForms={participant.business ? 
                () => onAssignBusinessForms(participant) : undefined}
              onAddBusiness={() => onAddBusiness(participant)}
              formTemplates={[...formTemplates.individual, ...formTemplates.business]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ParticipantsList;
