
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { 
  FileText, 
  ClipboardCheck, 
  BarChart, 
  ArrowLeft, 
  TrendingUp,
  Users  // Add this import
} from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { projects, users, getUserById } from '@/lib/mockData';

interface LoanType {
  type: string;
  amount: number;
  description: string;
}

interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  loan_types: LoanType[];
  loan_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  city?: string;
  state?: string;
  participants?: { userId: string; role: string }[];
}

const ProjectDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.project_id === projectId) as Project | undefined;
  
  if (!project) {
    return <Navigate to="/projects" replace />;
  }
  
  const totalLoanAmount = project.loan_types.reduce((total, loan) => total + loan.amount, 0);
  
  const projectData = {
    stats: {
      buyers: project.participants?.filter(p => {
        const user = getUserById(p.userId);
        return user && user.role === 'buyer';
      }).length || 0,
      sellers: project.participants?.filter(p => {
        const user = getUserById(p.userId);
        return user && user.role === 'seller';
      }).length || 0,
      documents: {
        total: 15,
        completed: 6
      },
      forms: {
        total: 8,
        completed: 3
      }
    },
    recentActivity: [
      { id: '1', text: 'John Doe uploaded Proof of Income', time: '2 hours ago' },
      { id: '2', text: 'Jane Smith completed Personal Information form', time: '4 hours ago' },
      { id: '3', text: `You assigned 3 new documents to ${getUserById('user_3')?.name || 'Participant'}`, time: '1 day ago' },
      { id: '4', text: 'Property Deed document was rejected', time: '2 days ago' }
    ],
    participants: project.participants?.map(p => {
      const user = getUserById(p.userId);
      if (!user) return null;
      
      const docsAssigned = Math.floor(Math.random() * 8) + 3;
      const docsCompleted = Math.floor(Math.random() * docsAssigned);
      const formsAssigned = Math.floor(Math.random() * 6) + 2;
      const formsCompleted = Math.floor(Math.random() * formsAssigned);
      
      return {
        userId: p.userId,
        role: p.role,
        documents: { assigned: docsAssigned, completed: docsCompleted },
        forms: { assigned: formsAssigned, completed: formsCompleted }
      };
    }).filter(Boolean) || []
  };

  const documentsProgress = (projectData.stats.documents.completed / projectData.stats.documents.total) * 100;
  const formsProgress = (projectData.stats.forms.completed / projectData.stats.forms.total) * 100;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const buyerParticipants = projectData.participants.filter(p => {
    const user = getUserById(p.userId);
    return user && user.role === 'buyer';
  });
  
  const sellerParticipants = projectData.participants.filter(p => {
    const user = getUserById(p.userId);
    return user && user.role === 'seller';
  });
  
  const bankParticipants = projectData.participants.filter(p => {
    const user = getUserById(p.userId);
    return user && (user.role === 'bank_officer' || user.role === 'loan_specialist' || user.role === 'bank_manager');
  });

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
            <div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/projects')}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">{project.project_name}</h1>
              </div>
              <p className="text-muted-foreground">Project ID: {projectId}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Use of Proceeds</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/project/cash-flow/${projectId}`)}
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
                  {project.loan_types.map((loan, index) => (
                    <div key={index} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-medium">{loan.type}</span>
                        <p className="text-sm text-muted-foreground">{loan.description}</p>
                      </div>
                      <div className="text-right font-medium">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }).format(loan.amount)}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 flex justify-between bg-muted/50">
                    <span className="font-bold">Total Loan Amount</span>
                    <span className="font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(totalLoanAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Participants"
              value={`${projectData.stats.buyers + projectData.stats.sellers}`}
              description={`${projectData.stats.buyers} Buyers, ${projectData.stats.sellers} Sellers`}
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard 
              title="Documents"
              value={`${projectData.stats.documents.completed}/${projectData.stats.documents.total}`}
              description="Documents uploaded"
              icon={<FileText className="h-4 w-4" />}
              progress={documentsProgress}
            />
            <StatCard 
              title="Forms"
              value={`${projectData.stats.forms.completed}/${projectData.stats.forms.total}`}
              description="Forms completed"
              icon={<ClipboardCheck className="h-4 w-4" />}
              progress={formsProgress}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Participant Progress</CardTitle>
                <CardDescription>Document and form completion status by participant</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="buyers">
                  <TabsList className="mb-4">
                    <TabsTrigger value="buyers">Buyers</TabsTrigger>
                    <TabsTrigger value="sellers">Sellers</TabsTrigger>
                    <TabsTrigger value="bank">Bank Personnel</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buyers">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Participant</TableHead>
                          <TableHead className="text-center">Documents</TableHead>
                          <TableHead className="text-center">Forms</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {buyerParticipants.length > 0 ? (
                          buyerParticipants.map((participant) => {
                            const user = getUserById(participant.userId);
                            if (!user) return null;
                            
                            return (
                              <TableRow key={participant.userId}>
                                <TableCell className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center">
                                    <span>{participant.documents.completed}/{participant.documents.assigned}</span>
                                    <Progress 
                                      value={(participant.documents.completed / (participant.documents.assigned || 1)) * 100} 
                                      className="h-1.5 w-24 mt-1" 
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center">
                                    <span>{participant.forms.completed}/{participant.forms.assigned}</span>
                                    <Progress 
                                      value={(participant.forms.completed / (participant.forms.assigned || 1)) * 100} 
                                      className="h-1.5 w-24 mt-1" 
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                              No buyers for this project
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="sellers">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Participant</TableHead>
                          <TableHead className="text-center">Documents</TableHead>
                          <TableHead className="text-center">Forms</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sellerParticipants.length > 0 ? (
                          sellerParticipants.map((participant) => {
                            const user = getUserById(participant.userId);
                            if (!user) return null;
                            
                            return (
                              <TableRow key={participant.userId}>
                                <TableCell className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center">
                                    <span>{participant.documents.completed}/{participant.documents.assigned}</span>
                                    <Progress 
                                      value={(participant.documents.completed / (participant.documents.assigned || 1)) * 100} 
                                      className="h-1.5 w-24 mt-1" 
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center">
                                    <span>{participant.forms.completed}/{participant.forms.assigned}</span>
                                    <Progress 
                                      value={(participant.forms.completed / (participant.forms.assigned || 1)) * 100} 
                                      className="h-1.5 w-24 mt-1" 
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                              No sellers for this project
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="bank">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Personnel</TableHead>
                          <TableHead>Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bankParticipants.length > 0 ? (
                          bankParticipants.map((participant) => {
                            const user = getUserById(participant.userId);
                            if (!user) return null;
                            
                            return (
                              <TableRow key={participant.userId}>
                                <TableCell className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="capitalize">
                                    {user.role.replace('_', ' ')}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                              No bank personnel assigned to this project
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.recentActivity.map(activity => (
                    <div key={activity.id} className="flex flex-col space-y-1 pb-3 border-b last:border-b-0">
                      <p className="text-sm">{activity.text}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, progress }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <Progress value={progress} className="h-1 mt-2" />
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectDashboard;
