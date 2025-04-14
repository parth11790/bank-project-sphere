
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'buyer':
        return 'default';
      case 'seller':
        return 'secondary';
      case 'bank_officer':
      case 'loan_specialist':
      case 'bank_manager':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{participant.name}</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={getRoleBadgeVariant(participant.role)}>
              {participant.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
            <span className="text-xs text-muted-foreground">{participant.email}</span>
          </div>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive" 
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default ParticipantCardHeader;
