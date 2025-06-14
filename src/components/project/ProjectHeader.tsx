
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Project, getStatusString } from '@/types/project';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{project.project_name}</h1>
          <Badge variant={project.status === 'active' ? 'default' : project.status === 'pending' ? 'secondary' : 'outline'}>
            {getStatusString(project.status)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Project ID: {project.project_id}
        </p>
      </div>
    </div>
  );
};

export default ProjectHeader;
