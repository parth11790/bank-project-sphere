import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { getReferralFees, saveReferralFees } from '@/services/referralService';
import { Project as ProjectType } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { ReferralFee } from '@/types/referral';
import { generateProjectDashboardData } from '@/types/dashboard';
import ProjectEditDialog from '@/components/ProjectEditDialog';
import ProjectHeader from '@/components/project/ProjectHeader';
import { ProjectSections } from '@/components/project/ProjectSections';
import ProjectBusinessStructure from '@/components/project/ProjectBusinessStructure';
import ProjectLoadingState from '@/components/project/ProjectLoadingState';
import ProjectNotFound from '@/components/project/ProjectNotFound';
import ProjectOverviewEnhanced from '@/components/project/ProjectOverviewEnhanced';
import BorrowerOwnershipSection from '@/components/project/BorrowerOwnershipSection';
import { ReferralSection } from '@/components/referral/ReferralSection';

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [showReferralSection, setShowReferralSection] = useState(false);
  
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

  const { data: referralFees, isLoading: referralLoading, refetch: refetchReferrals } = useQuery({
    queryKey: ['referrals', projectId],
    queryFn: () => getReferralFees(projectId || ''),
    enabled: !!projectId
  });

  const isLoading = projectLoading || participantsLoading || referralLoading;

  if (isLoading) {
    return <ProjectLoadingState />;
  }

  if (!project) {
    return <ProjectNotFound onBackToProjects={() => navigate('/projects')} />;
  }

  const projectData = project as ProjectType;
  const participantsData = participants || [] as ParticipantWithDetails[];
  const referralFeesData = referralFees || [] as ReferralFee[];
  const dashboardData = generateProjectDashboardData(participantsData);

  const handleGatherInformation = () => {
    // Navigate to business information instead since participants page is removed
    navigate(`/business/${projectId}`);
  };

  const handleAnalysis = () => {
    navigate(`/project/analysis/${projectId}`);
  };

  const handleGenerateDocumentation = () => {
    navigate(`/project/documentation/${projectId}`);
  };

  const handleManageBusinessStructure = () => {
    const structureSection = document.getElementById('business-structure-section');
    if (structureSection) {
      structureSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleManageReferrals = () => {
    setShowReferralSection(!showReferralSection);
  };

  const handleUpdateReferrals = async (fees: ReferralFee[]) => {
    const success = await saveReferralFees(projectId || '', fees);
    if (success) {
      refetchReferrals();
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <ProjectHeader project={projectData} />

        {/* Project Overview Section */}
        <div className="space-y-6">
          <ProjectOverviewEnhanced 
            project={projectData} 
            dashboardData={dashboardData} 
            participants={participantsData}
            onEdit={() => setEditDialogOpen(true)}
          />
        </div>

        {/* Borrower and Ownership Information Section */}
        <div className="space-y-6">
          <BorrowerOwnershipSection project={projectData} />
        </div>

        {/* Business Structure Section */}
        <div id="business-structure-section" className="space-y-6">
          <ProjectBusinessStructure 
            project={projectData} 
            onAddOwner={() => console.log('Add owner')} 
            onAddSeller={() => console.log('Add seller')} 
            onAddAffiliatedBusiness={ownerId => console.log('Add affiliated business for owner:', ownerId)} 
          />
        </div>

        {/* Referral Section */}
        {showReferralSection && (
          <div className="space-y-6">
            <ReferralSection 
              projectId={projectId || ''}
              project={projectData}
              referralFees={referralFeesData}
              onUpdate={handleUpdateReferrals}
            />
          </div>
        )}

        {/* Project Sections */}
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
            <ProjectSections 
              project={projectData} 
              onGatherInformation={handleGatherInformation} 
              onAnalysis={handleAnalysis} 
              onGenerateDocumentation={handleGenerateDocumentation} 
              onManageBusinessStructure={handleManageBusinessStructure}
              onManageReferrals={handleManageReferrals}
            />
          </div>
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
