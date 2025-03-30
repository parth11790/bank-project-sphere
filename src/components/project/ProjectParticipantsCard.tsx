
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ParticipantWithDetails } from '@/types/participant';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface ProjectParticipantsCardProps {
  buyers: ParticipantWithDetails[];
  sellers: ParticipantWithDetails[];
  bankPersonnel: ParticipantWithDetails[];
  onViewAllParticipants: () => void;
}

const ProjectParticipantsCard: React.FC<ProjectParticipantsCardProps> = ({ 
  buyers, 
  sellers, 
  bankPersonnel,
  onViewAllParticipants
}) => {
  const renderParticipantList = (participants: ParticipantWithDetails[], title: string) => (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">{title} ({participants.length})</h3>
      <div className="space-y-2">
        {participants.slice(0, 3).map(participant => (
          <div key={participant.participant_id} className="flex items-center justify-between">
            <span className="text-sm">{participant.name}</span>
            <Badge variant="outline">{participant.email}</Badge>
          </div>
        ))}
        {participants.length > 3 && (
          <div className="text-xs text-muted-foreground">+ {participants.length - 3} more</div>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Participants</CardTitle>
        <CardDescription>People and businesses involved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {buyers.length > 0 && renderParticipantList(buyers, 'Buyers')}
        {sellers.length > 0 && renderParticipantList(sellers, 'Sellers')}
        {bankPersonnel.length > 0 && renderParticipantList(bankPersonnel, 'Bank Personnel')}
        
        {buyers.length === 0 && sellers.length === 0 && bankPersonnel.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No participants added yet</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={onViewAllParticipants} 
          className="w-full"
        >
          <Users className="mr-2 h-4 w-4" />
          View All Participants
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectParticipantsCard;
