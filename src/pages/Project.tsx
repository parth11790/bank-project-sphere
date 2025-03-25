
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/mockData';
import { Users, BarChart, FileText, ArrowLeft } from 'lucide-react';

const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  // Find the project by ID
  const project = projects.find(p => p.project_id === projectId);
  
  // If project doesn't exist, redirect to the projects list
  if (!project) {
    return <Navigate to="/projects" replace />;
  }
  
  // Format the loan amount with commas and currency symbol
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(project.loan_amount);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/projects')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{project.project_name}</h1>
                <p className="text-muted-foreground">Project ID: {projectId}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => navigate(`/project/participants/${projectId}`)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>Participants</span>
              </Button>
              <Button 
                onClick={() => navigate(`/project/dashboard/${projectId}`)}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <Button 
                onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Use of Proceeds</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Information about this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Project Type</h3>
                  <p>{project.project_type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Loan Amount</h3>
                  <p>{formattedAmount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Loan Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.loan_types.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Created At</h3>
                  <p>{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Project;
