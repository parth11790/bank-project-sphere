
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, User, Building } from 'lucide-react';
import { Project } from '@/types/project';
import { useParticipantClassification } from '@/hooks/useParticipantClassification';
import { useParticipantNavigation } from '@/components/project/ParticipantNavigationService';

interface ProjectParticipantStructureProps {
  project: Project;
}

const ProjectParticipantStructure: React.FC<ProjectParticipantStructureProps> = ({ project }) => {
  const { 
    borrowingBusinesses, 
    businessOwners, 
    affiliatedBusinesses,
    acquisitionBusinesses,
    acquisitionOwners 
  } = useParticipantClassification(project);
  
  const { navigateToParticipant } = useParticipantNavigation();

  const ParticipantSection = ({ 
    title, 
    icon: Icon, 
    participants, 
    description 
  }: {
    title: string;
    icon: any;
    participants: any[];
    description: string;
  }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline">{participants.length}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {participants.length > 0 ? (
          <div className="space-y-2">
            {participants.map((participant) => (
              <div 
                key={participant.participant_id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 cursor-pointer"
                onClick={() => navigateToParticipant(participant)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{participant.name}</span>
                    <Badge variant={participant.entity_type === 'business' ? 'default' : 'secondary'}>
                      {participant.entity_type}
                    </Badge>
                  </div>
                  {participant.ownership_percentage && (
                    <span className="text-sm text-muted-foreground">
                      {participant.ownership_percentage}% ownership
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  View {participant.display_section === 'business' ? 'Business' : 'Personal'} Info
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No participants in this category</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Project Participant Structure</h2>
        <p className="text-muted-foreground mb-4">
          Organized by participant category and entity type
        </p>
      </div>

      <ParticipantSection 
        title="Borrowing Business"
        icon={Building2}
        participants={borrowingBusinesses}
        description="The primary business entity borrowing funds"
      />

      <ParticipantSection 
        title="Business Owners"
        icon={Users}
        participants={businessOwners}
        description="Individuals and businesses that own the borrowing business"
      />

      <ParticipantSection 
        title="Affiliated Businesses"
        icon={Building}
        participants={affiliatedBusinesses}
        description="Other businesses owned by the business owners"
      />

      {acquisitionBusinesses.length > 0 && (
        <ParticipantSection 
          title="Acquisition Businesses"
          icon={Building2}
          participants={acquisitionBusinesses}
          description="Businesses being acquired as part of this project"
        />
      )}

      {acquisitionOwners.length > 0 && (
        <ParticipantSection 
          title="Acquisition Owners"
          icon={User}
          participants={acquisitionOwners}
          description="Owners of the acquisition businesses"
        />
      )}
    </div>
  );
};

export default ProjectParticipantStructure;
