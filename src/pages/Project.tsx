import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Building,
  CheckCircle2,
  Clock,
  UserCircle,
  Store,
  DollarSign,
  Edit
} from 'lucide-react';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  Tooltip
} from 'recharts';
import { Project as ProjectType, getStatusString } from '@/types/project';
import { Participant, ParticipantWithDetails } from '@/types/participant';
import ProjectEditDialog from '@/components/ProjectEditDialog';

const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId
  });
  
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['participants', projectId],
    queryFn: () => getParticipantsWithDetailsData(projectId || ''),
    enabled: !!projectId
  });
  
  const isLoading = projectLoading || participantsLoading;
  
  if (isLoading) {
    return (
      <Layout>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 md:col-span-2" />
            <Skeleton className="h-32" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
        </div>
      </Layout>
    );
  }
  
  const projectData = project as ProjectType;
  const participantsData = participants || [];
  
  const buyerParticipants = participantsData.filter(p => p.role === 'buyer');
  const sellerParticipants = participantsData.filter(p => p.role === 'seller');
  const bankParticipants = participantsData.filter(p => 
    p.role === 'bank_officer' || p.role === 'loan_specialist' || p.role === 'bank_manager'
  );
  
  const totalLoanAmount = projectData.loan_types.reduce((sum, loan) => {
    if (typeof loan === 'string') {
      return sum;
    }
    return sum + (loan.amount || 0);
  }, 0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const loanDistributionData = projectData.loan_types
    .filter((loan): loan is { type: string; amount: number; description: string } => 
      typeof loan !== 'string' && !!loan.amount
    )
    .map(loan => ({
      name: loan.type,
      value: loan.amount
    }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{projectData.project_name}</h1>
              <Badge variant={
                projectData.status === 'active' ? 'default' :
                projectData.status === 'pending' ? 'secondary' :
                'outline'
              }>
                {getStatusString(projectData.status)}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {projectData.description || 'No description available'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate(`/project/participants/${projectId}`)}
            >
              <Users className="mr-2 h-4 w-4" />
              Participants
            </Button>
            <Button 
              variant="outline"
              onClick={() => setEditDialogOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
            <Button
              variant="default"
              onClick={() => navigate(`/project/cash-flow/${projectId}`)}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Cash Flow Analysis
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Key project information and loan details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Details</h3>
                  <dl className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="text-sm font-medium">Status:</dt>
                    <dd className="text-sm">{getStatusString(projectData.status)}</dd>
                    
                    <dt className="text-sm font-medium">Type:</dt>
                    <dd className="text-sm">{projectData.project_type}</dd>
                    
                    <dt className="text-sm font-medium">Start Date:</dt>
                    <dd className="text-sm">{new Date(projectData.created_at).toLocaleDateString()}</dd>
                    
                    <dt className="text-sm font-medium">Location:</dt>
                    <dd className="text-sm">{projectData.location || 'Not specified'}</dd>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Loan Summary</h3>
                  <dl className="space-y-2">
                    {projectData.loan_types.map((loan, index) => {
                      const loanType = typeof loan === 'string' ? loan : loan.type;
                      const loanAmount = typeof loan === 'string' ? 0 : (loan.amount || 0);
                      
                      return (
                        <div key={index} className="flex justify-between items-center">
                          <dt className="text-sm font-medium">{loanType}:</dt>
                          <dd className="text-sm font-mono">{formatCurrency(loanAmount)}</dd>
                        </div>
                      );
                    })}
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center font-bold">
                      <dt className="text-sm">Total Loan Amount:</dt>
                      <dd className="text-sm font-mono">{formatCurrency(totalLoanAmount)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Loan Distribution</h3>
                <div className="flex justify-center h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={loanDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {loanDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => formatCurrency(value as number)} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(projectData.updated_at || projectData.created_at).toLocaleString()}
              </div>
              <Button 
                variant="outline"
                onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Use of Proceeds
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Completion</CardTitle>
              <CardDescription>Overall progress tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center rounded-full border-8 border-primary/10 p-8">
                  <div className="text-4xl font-bold">65%</div>
                </div>
                <div className="text-xs text-muted-foreground">Overall Completion</div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Documentation</span>
                    </div>
                    <span className="text-sm">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Participants</span>
                    </div>
                    <span className="text-sm">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Business Analysis</span>
                    </div>
                    <span className="text-sm">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Loan Approval</span>
                    </div>
                    <span className="text-sm">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Participant Progress</CardTitle>
            <CardDescription>Status of all project participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Building className="h-5 w-5" />
                  Bank Personnel ({bankParticipants.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {bankParticipants.map((participant) => (
                    <Card key={participant.participant_id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{participant.name || 'Unknown'}</p>
                            <p className="text-xs text-muted-foreground">{participant.email || 'No email'}</p>
                          </div>
                        </div>
                        <div className="border-t px-4 py-3 bg-muted/50">
                          <div className="flex justify-between text-xs">
                            <span>Tasks: {
                              (participant.documents?.length || 0) + 
                              (participant.forms?.length || 0)
                            }</span>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Active</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <UserCircle className="h-5 w-5" />
                  Buyers ({buyerParticipants.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {buyerParticipants.map((participant) => (
                    <Card key={participant.participant_id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                            <UserCircle className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{participant.name || 'Unknown'}</p>
                            <p className="text-xs text-muted-foreground">{participant.email || 'No email'}</p>
                          </div>
                        </div>
                        <div className="border-t px-4 py-3 bg-muted/50">
                          <div className="flex justify-between text-xs">
                            <span>
                              Docs: {participant.documents?.length || 0}/
                              {(participant.documents?.length || 0) + 3}
                            </span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-yellow-500" />
                              <span>In Progress</span>
                            </div>
                          </div>
                          <Progress 
                            value={((participant.documents?.length || 0) / 
                              ((participant.documents?.length || 0) + 3)) * 100} 
                            className="h-1 mt-2" 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Store className="h-5 w-5" />
                  Sellers ({sellerParticipants.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {sellerParticipants.map((participant) => (
                    <Card key={participant.participant_id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                            <Store className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">{participant.name || 'Unknown'}</p>
                            <p className="text-xs text-muted-foreground">{participant.email || 'No email'}</p>
                            {participant.business && (
                              <p className="text-xs mt-1 text-primary">{participant.business.name}</p>
                            )}
                          </div>
                        </div>
                        <div className="border-t px-4 py-3 bg-muted/50">
                          <div className="flex justify-between text-xs">
                            <span>
                              Docs: {participant.documents?.length || 0}/
                              {(participant.documents?.length || 0) + 2}
                            </span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-yellow-500" />
                              <span>In Progress</span>
                            </div>
                          </div>
                          <Progress 
                            value={((participant.documents?.length || 0) / 
                              ((participant.documents?.length || 0) + 2)) * 100} 
                            className="h-1 mt-2" 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t px-6 py-4">
            <Button onClick={() => navigate(`/project/participants/${projectId}`)}>
              View All Participants
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {project && <ProjectEditDialog 
        project={projectData}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />}
    </Layout>
  );
};

export default Project;
