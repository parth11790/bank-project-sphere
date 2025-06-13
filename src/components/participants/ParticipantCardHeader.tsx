
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Participant } from '@/types/participant';
import { user } from 'lucide-react';

interface ParticipantCardHeaderProps {
  participant: Participant;
  onNameClick: () => void;
}

export const ParticipantCardHeader: React.FC<ParticipantCardHeaderProps> = ({
  participant,
  onNameClick
}) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'buyer':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'seller':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          className="p-0 h-auto text-lg font-semibold text-primary hover:underline"
          onClick={onNameClick}
        >
          {participant.name}
        </Button>
        <Badge className={getRoleBadgeColor(participant.role)}>
          {participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{participant.email}</p>
    </div>
  );
};

export default ParticipantCardHeader;
