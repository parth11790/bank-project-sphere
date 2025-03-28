
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProjectList from '@/components/ProjectList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getProjects } from '@/services/supabaseService';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types/project';
import { Skeleton } from '@/components/ui/skeleton';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6 px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">Projects</h1>
                <p className="text-muted-foreground">Manage and track all your banking projects</p>
              </div>
              <Button disabled className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
            </div>
            
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-1">Projects</h1>
              <p className="text-muted-foreground">Manage and track all your banking projects</p>
            </motion.div>
            
            <Button 
              onClick={() => navigate('/create-project')}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
          </div>

          <ProjectList projects={projects as Project[] || []} />
        </div>
      </main>
    </div>
  );
};

export default Projects;
