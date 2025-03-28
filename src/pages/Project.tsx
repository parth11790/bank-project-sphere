
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BarChart, FileText, ArrowLeft, TrendingUp, DollarSign } from 'lucide-react';
import { getProjectById } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { LoanType, Project as ProjectType, isProject } from '@/types/project';

const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: projectData, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6 px-4 md:px-6 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-96" />
            </div>
            <Skeleton className="h-72 w-full" />
          </div>
        </main>
      </div>
    );
  }
  
  if (isError || !projectData || !isProject(projectData)) {
    return <Navigate to="/projects" replace />;
  }

  const project = projectData as ProjectType;
  
  // Safely handle loan_types
  const loanTypes = Array.isArray(project.loan_types) 
    ? project.loan_types 
    : [];
    
  // Calculate total loan amount
  const totalLoanAmount = loanTypes.reduce((total, loan) => {
    if (typeof loan === 'object' && 'amount' in loan) {
      return total + loan.amount;
    }
    return total;
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
              <Button 
                onClick={() => navigate(`/project/cash-flow/${projectId}`)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Cash Flow Analysis</span>
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
                  <h3 className="text-sm font-medium mb-1">Location</h3>
                  <p>{project.city}, {project.state}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Loan Information</h3>
                <div className="border rounded-md divide-y">
                  {loanTypes.map((loan, index) => (
                    <div key={index} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-medium">{loan.type}</span>
                        <p className="text-sm text-muted-foreground">{loan.description}</p>
                      </div>
                      <div className="text-right font-medium">
                        {formatCurrency(loan.amount)}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 flex justify-between bg-muted/50">
                    <span className="font-bold">Total Loan Amount</span>
                    <span className="font-bold">
                      {formatCurrency(totalLoanAmount)}
                    </span>
                  </div>
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
