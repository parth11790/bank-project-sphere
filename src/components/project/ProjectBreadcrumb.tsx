
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project, getStatusString } from '@/types/project';

interface ProjectBreadcrumbProps {
  project: Project;
  currentPageTitle?: string;
}

const ProjectBreadcrumb: React.FC<ProjectBreadcrumbProps> = ({
  project,
  currentPageTitle
}) => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`/project/${project.project_id}`);
  };

  return (
    <div className="mb-3 p-2 bg-muted/30 rounded-lg border border-border/30">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-base sm:text-lg hover:text-primary"
            onClick={handleProjectClick}
          >
            {project.project_name}
          </Button>
          <div className="flex items-center gap-2">
            <Badge 
              variant={
                project.status === 'active' ? 'default' : 
                project.status === 'pending' ? 'secondary' : 
                'outline'
              }
              className="text-xs"
            >
              {getStatusString(project.status)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              ID: {project.project_id}
            </span>
          </div>
        </div>
        {currentPageTitle && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-medium">{currentPageTitle}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBreadcrumb;
