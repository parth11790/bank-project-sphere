
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectProgressListProps {
  projects: Project[];
}

export const ProjectProgressList: React.FC<ProjectProgressListProps> = ({ projects }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Completion Progress</CardTitle>
        <CardDescription>Overall completion status of active projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{project.project_name}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 40) + 60}% complete
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate(`/project/${project.project_id}`)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
