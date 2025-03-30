
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
  Edit
} from 'lucide-react';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Project as ProjectType } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import ProjectEditDialog from '@/components/ProjectEditDialog';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectOverview from '@/components/project/ProjectOverview';
import ProjectParticipantsCard from '@/components/project/ProjectParticipantsCard';
import ProjectLoadingState from '@/components/project/ProjectLoadingState';
import ProjectNotFound from '@/components/project/ProjectNotFound';

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
  
  const buyerParticipants = participantsData.filter(p => p.role === 'buyer');
  const sellerParticipants = participantsData.filter(p => p.role === 'seller');
  const bankParticipants = participantsData.filter(p => 
    p.role === 'bank_officer' || p.role === 'loan_specialist' || p.role === 'bank_manager'
  );
  
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
          onViewParticipants={() => navigate(`/project/participants/${projectId}`)}
          onViewCashFlow={() => navigate(`/project/cash-flow/${projectId}`)}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProjectOverview 
            project={projectData} 
            onViewUseOfProceeds={() => navigate(`/project/use-of-proceeds/${projectId}`)}
          />
          
          <ProjectParticipantsCard 
            buyers={buyerParticipants}
            sellers={sellerParticipants}
            bankPersonnel={bankParticipants}
            onViewAllParticipants={() => navigate(`/project/participants/${projectId}`)}
          />
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

export default Project;
