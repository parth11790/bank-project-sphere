
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

const ProjectDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // Mock data - in a real app this would come from an API
  const projectData = {
    name: "Commercial Loan Project",
    createdAt: new Date().toLocaleDateString(),
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
      { id: '3', text: 'You assigned 3 new documents to John Doe', time: '1 day ago' },
      { id: '4', text: 'Property Deed document was rejected', time: '2 days ago' }
    ]
  };

  const documentsProgress = (projectData.stats.documents.completed / projectData.stats.documents.total) * 100;
  const formsProgress = (projectData.stats.forms.completed / projectData.stats.forms.total) * 100;

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
                  onClick={() => navigate(`/project/participants/${projectId}`)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">{projectData.name}</h1>
              </div>
              <p className="text-muted-foreground">Project ID: {projectId}</p>
            </div>
            <div className="flex gap-2">
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
              value={projectData.createdAt}
              description="Project start date"
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>All activities in this project</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="dashboard">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="activity">
                      <Bell className="h-4 w-4 mr-2" />
                      Activity
                    </TabsTrigger>
                    <TabsTrigger value="reports">
                      <BarChart className="h-4 w-4 mr-2" />
                      Reports
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="dashboard">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Document Completion</h3>
                          <Progress value={documentsProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {projectData.stats.documents.completed} of {projectData.stats.documents.total} documents uploaded
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Form Completion</h3>
                          <Progress value={formsProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {projectData.stats.forms.completed} of {projectData.stats.forms.total} forms completed
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-3">Participant Status</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm p-2 rounded bg-muted/50">
                            <span>Buyers</span>
                            <span className="font-medium">{projectData.stats.buyers}</span>
                          </div>
                          <div className="flex justify-between text-sm p-2 rounded bg-muted/50">
                            <span>Sellers</span>
                            <span className="font-medium">{projectData.stats.sellers}</span>
                          </div>
                          <div className="flex justify-between text-sm p-2 rounded bg-muted/50">
                            <span>Total Participants</span>
                            <span className="font-medium">{projectData.stats.buyers + projectData.stats.sellers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="activity">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Recent Activity</h3>
                      <div className="space-y-4">
                        {projectData.recentActivity.map(activity => (
                          <div key={activity.id} className="flex flex-col space-y-1 pb-3 border-b">
                            <p className="text-sm">{activity.text}</p>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reports">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <BarChart className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Reports Coming Soon</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Project reports and analytics will be available in a future update.
                      </p>
                    </div>
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
