
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getProjects } from '@/services';
import ProjectCard from '@/components/ProjectCard';
import { Building, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyProjects: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
  
  // Filter projects to only show ones where the user is a participant
  const myProjects = projects?.filter(project => 
    project.participants?.some(p => p.user.user_id === user?.id)
  ) || [];
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">
            View and manage the projects where you are a participant.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        ) : myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProjects.map(project => (
              <div key={project.project_id} onClick={() => navigate(`/my-project/${project.project_id}`)}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
              <p className="text-muted-foreground">
                You are not currently assigned to any projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Card className="w-full sm:w-64">
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <Building className="mr-2 h-4 w-4" />
                      Add Your Business
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      Register your business to start the loan process
                    </p>
                    <Button size="sm" className="w-full" variant="outline">Add Business</Button>
                  </CardContent>
                </Card>
                <Card className="w-full sm:w-64">
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Complete Your Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      Update your profile information
                    </p>
                    <Button size="sm" className="w-full" variant="outline">Edit Profile</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default MyProjects;
