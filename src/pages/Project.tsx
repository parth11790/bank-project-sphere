
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { Project as ProjectType } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { getUserById } from '@/lib/mockData';
import { 
  FileText, 
  ClipboardCheck, 
  BarChart, 
  TrendingUp,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ProjectEditDialog from '@/components/ProjectEditDialog';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectOverview from '@/components/project/ProjectOverview';
import { ProjectSections } from '@/components/project/ProjectSections';
import ProjectLoadingState from '@/components/project/ProjectLoadingState';
import ProjectNotFound from '@/components/project/ProjectNotFound';
import ProjectDetailsCard from '@/components/project/ProjectDetailsCard';
import ParticipantProgressTabs from '@/components/project/ParticipantProgressTabs';
import RecentActivityCard from '@/components/project/RecentActivityCard';

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
    return <ProjectLoadingState />;
  }
  
  if (!project) {
    return <ProjectNotFound onBackToProjects={() => navigate('/projects')} />;
  }
  
  const projectData = project as ProjectType;
  const participantsData = participants || [] as ParticipantWithDetails[];

  // Calculate dashboard data
  const dashboardData = {
    stats: {
      buyers: participantsData.filter(p => p.role === 'buyer').length || 0,
      sellers: participantsData.filter(p => p.role === 'seller').length || 0,
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
    participants: participantsData.map(p => {
      const docsAssigned = Math.floor(Math.random() * 8) + 3;
      const docsCompleted = Math.floor(Math.random() * docsAssigned);
      const formsAssigned = Math.floor(Math.random() * 6) + 2;
      const formsCompleted = Math.floor(Math.random() * formsAssigned);
      
      return {
        userId: p.participant_id,
        role: p.role,
        documents: { assigned: docsAssigned, completed: docsCompleted },
        forms: { assigned: formsAssigned, completed: formsCompleted }
      };
    })
  };

  const documentsProgress = (dashboardData.stats.documents.completed / dashboardData.stats.documents.total) * 100;
  const formsProgress = (dashboardData.stats.forms.completed / dashboardData.stats.forms.total) * 100;
  
  const buyerParticipants = dashboardData.participants.filter(p => p.role === 'buyer');
  const sellerParticipants = dashboardData.participants.filter(p => p.role === 'seller');
  const bankParticipants = dashboardData.participants.filter(p => 
    p.role === 'bank_officer' || p.role === 'loan_specialist' || p.role === 'bank_manager'
  );
  
  const handleGatherInformation = () => {
    navigate(`/project/participants/${projectId}`);
  };
  
  const handleAnalysis = () => {
    navigate(`/project/analysis/${projectId}`);
  };
  
  const handleGenerateDocumentation = () => {
    navigate(`/project/documentation/${projectId}`);
  };
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6"
      >
        <ProjectHeader 
          project={projectData} 
          onEdit={() => setEditDialogOpen(true)}
          onViewGatherInformation={handleGatherInformation}
          onViewAnalysis={handleAnalysis}
          onViewGenerateDocumentation={handleGenerateDocumentation}
        />
        
        <ProjectSections
          project={projectData}
          onGatherInformation={handleGatherInformation}
          onAnalysis={handleAnalysis}
          onGenerateDocumentation={handleGenerateDocumentation}
        />
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Participants"
            value={`${dashboardData.stats.buyers + dashboardData.stats.sellers}`}
            description={`${dashboardData.stats.buyers} Buyers, ${dashboardData.stats.sellers} Sellers`}
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard 
            title="Documents"
            value={`${dashboardData.stats.documents.completed}/${dashboardData.stats.documents.total}`}
            description="Documents uploaded"
            icon={<FileText className="h-4 w-4" />}
            progress={documentsProgress}
          />
          <StatCard 
            title="Forms"
            value={`${dashboardData.stats.forms.completed}/${dashboardData.stats.forms.total}`}
            description="Forms completed"
            icon={<ClipboardCheck className="h-4 w-4" />}
            progress={formsProgress}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectOverview 
              project={projectData} 
              onViewUseOfProceeds={() => navigate(`/project/use-of-proceeds/${projectId}`)}
            />
          </div>
          <RecentActivityCard activities={dashboardData.recentActivity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ParticipantProgressTabs 
            buyerParticipants={buyerParticipants}
            sellerParticipants={sellerParticipants}
            bankParticipants={bankParticipants}
            getUserById={getUserById}
          />          
          <ProjectDetailsCard project={projectData} />
        </div>
        
        {editDialogOpen && (
          <ProjectEditDialog
            project={projectData}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
        )}
      </motion.div>
    </Layout>
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

export default Project;
