
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trash2 } from 'lucide-react';
import { Participant } from '@/types/participant';

interface ParticipantCardHeaderProps {
  participant: Participant;
  onDelete: () => void;
}

const ParticipantCardHeader: React.FC<ParticipantCardHeaderProps> = ({
  participant,
  onDelete,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${participant.name}`} alt={participant.name} />
            <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{participant.name}</CardTitle>
            <CardDescription>{participant.email}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {participant.role.replace('_', ' ')}
          </Badge>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ParticipantCardHeader;
