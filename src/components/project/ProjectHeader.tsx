
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Edit, TrendingUp } from 'lucide-react';
import { Project, getStatusString } from '@/types/project';

interface ProjectHeaderProps {
  project: Project;
  onEdit: () => void;
  onViewParticipants: () => void;
  onViewCashFlow: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  project, 
  onEdit,
  onViewParticipants,
  onViewCashFlow
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{project.project_name}</h1>
          <Badge variant={
            project.status === 'active' ? 'default' :
            project.status === 'pending' ? 'secondary' :
            'outline'
          }>
            {getStatusString(project.status)}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          {project.description || 'No description available'}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline"
          onClick={onEdit}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
        <Button
          variant="outline"
          onClick={onViewCashFlow}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Cash Flow Analysis
        </Button>
        <Button
          variant="default"
          onClick={onViewCashFlow}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Use of Proceeds
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
