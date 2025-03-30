
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

interface ProjectNotFoundProps {
  onBackToProjects: () => void;
}

const ProjectNotFound: React.FC<ProjectNotFoundProps> = ({ onBackToProjects }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={onBackToProjects}>Back to Projects</Button>
      </div>
    </Layout>
  );
};

export default ProjectNotFound;
