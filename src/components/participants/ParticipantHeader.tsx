
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight } from 'lucide-react';

interface ParticipantHeaderProps {
  projectId: string;
  projectName: string;
}

const ParticipantHeader: React.FC<ParticipantHeaderProps> = ({ projectId, projectName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/project/${projectId}`)}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Project</span>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mt-4">Project Participants</h1>
        <p className="text-muted-foreground">{projectName}</p>
      </div>
      <Button 
        onClick={() => navigate(`/project/dashboard/${projectId}`)}
      >
        View Project Dashboard
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ParticipantHeader;
