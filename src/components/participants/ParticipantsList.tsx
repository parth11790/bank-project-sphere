
import React from 'react';
import { Participant } from '@/types/participant';
import ParticipantCard from './ParticipantCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ParticipantsListProps {
  title: string;
  participants: Participant[];
  emptyMessage: string;
  onAddParticipant: () => void;
  onRemoveParticipant: (id: string) => void;
  onAssignForms: (participant: Participant) => void;
  onAssignBusinessForms: (participant: Participant) => void;
  onAddBusiness: (participant: Participant) => void;
  formTemplates: Array<{ form_id: string; name: string; }>;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  title,
  participants,
  emptyMessage,
  onAddParticipant,
  onRemoveParticipant,
  onAssignForms,
  onAssignBusinessForms,
  onAddBusiness,
  formTemplates
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={onAddParticipant} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </div>
      
      {participants.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.participant_id}
              participant={participant}
              onRemove={() => onRemoveParticipant(participant.participant_id)}
              onAssignForms={() => onAssignForms(participant)}
              onAssignBusinessForms={() => onAssignBusinessForms(participant)}
              onAddBusiness={() => onAddBusiness(participant)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipantsList;
