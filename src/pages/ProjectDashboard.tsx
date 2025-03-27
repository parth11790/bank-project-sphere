
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  ClipboardCheck, 
  Bell, 
  BarChart, 
  LayoutDashboard,
  Calendar,
  ArrowLeft
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

const ProjectDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  // Find the project by ID from mockData
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
  
  // Mock data for the dashboard
  const projectData = {
    stats: {
      buyers: 2,
      sellers: 1,
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
      { id: '3', text: `You assigned 3 new documents to ${users[2].name}`, time: '1 day ago' },
      { id: '4', text: 'Property Deed document was rejected', time: '2 days ago' }
    ],
    participants: [
      { 
        userId: users[2].user_id, 
        documents: { assigned: 8, completed: 3 },
        forms: { assigned: 5, completed: 2 }
      },
      { 
        userId: users[4].user_id, 
        documents: { assigned: 7, completed: 3 },
        forms: { assigned: 3, completed: 1 }
      },
      { 
        userId: users[0].user_id, 
        documents: { assigned: 0, completed: 0 },
        forms: { assigned: 0, completed: 0 }
      }
    ]
  };

  const documentsProgress = (projectData.stats.documents.completed / projectData.stats.documents.total) * 100;
  const formsProgress = (projectData.stats.forms.completed / projectData.stats.forms.total) * 100;

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate(`/project/participants/${projectId}`)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>Participants</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span>Use of Proceeds</span>
              </Button>
            </div>
          </div>

          {/* Project Details Card */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <StatCard 
              title="Created On"
              value={new Date(project.created_at).toLocaleDateString()}
              description="Project start date"
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Participant Progress</CardTitle>
                <CardDescription>Document and form completion status by participant</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-center">Documents</TableHead>
                      <TableHead className="text-center">Forms</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectData.participants.map((participant) => {
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
                            <Badge variant={user.role === 'buyer' ? 'secondary' : 'outline'}>
                              {user.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
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
                    })}
                  </TableBody>
                </Table>
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
