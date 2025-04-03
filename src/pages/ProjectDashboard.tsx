
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { 
  FileText, 
  ClipboardCheck, 
  BarChart, 
  ArrowLeft, 
  TrendingUp,
  Users
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { projects, users, getUserById } from '@/lib/mockData';
import ProjectDetailsCard from '@/components/project/ProjectDetailsCard';
import ParticipantProgressTabs from '@/components/project/ParticipantProgressTabs';
import RecentActivityCard from '@/components/project/RecentActivityCard';

const ProjectDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.project_id === projectId);
  
  if (!project) {
    return <Navigate to="/projects" replace />;
  }
  
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
      { 
        id: '1', 
        text: 'John Doe uploaded Proof of Income', 
        time: '2 hours ago',
        type: 'document' as const
      },
      { 
        id: '2', 
        text: 'Jane Smith completed Personal Information form', 
        time: '4 hours ago',
        type: 'form' as const
      },
      { 
        id: '3', 
        text: `You assigned 3 new documents to ${getUserById('user_3')?.name || 'Participant'}`,
        time: '1 day ago',
        type: 'status' as const
      },
      { 
        id: '4', 
        text: 'Property Deed document was rejected', 
        time: '2 days ago',
        type: 'warning' as const
      }
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

          <ProjectDetailsCard project={project} />

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
            <ParticipantProgressTabs 
              buyerParticipants={buyerParticipants}
              sellerParticipants={sellerParticipants}
              bankParticipants={bankParticipants}
              getUserById={getUserById}
            />
            
            <RecentActivityCard activities={projectData.recentActivity} />
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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <Progress value={progress} className="h-1 mt-2" />
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
