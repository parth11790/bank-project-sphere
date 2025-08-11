
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import BuyerIncomeCard from '@/components/analysis/BuyerIncomeCard';
import BusinessCashFlowCard from '@/components/analysis/BusinessCashFlowCard';
import UseOfProceedsCard from '@/components/analysis/UseOfProceedsCard';
import ProjectBreadcrumb from '@/components/project/ProjectBreadcrumb';
import { Project, isProject } from '@/types/project';

const mockAnalysisData = {
  buyerIncome: {
    netWorth: 750000,
    requiredSalary: 120000,
    availableCashForDebt: 45000
  },
  businessCashFlow: {
    averageCashFlow: 280000,
    debtServiceRatioBeforeOC: 1.85,
    debtServiceRatioAfterOC: 1.45
  }
};

const ProjectAnalysis: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: projectData, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    toast.error('Project not found');
    navigate('/projects');
    return null;
  }

  const proceedsData = getUseOfProceedsForProject(projectId || '');
  
  const calculateTotalsByCategory = () => {
    const totals = {
      borrower: 0,
      seller: 0,
      loanType1: 0,
      loanType2: 0,
      overall: 0
    };
    
    proceedsData.forEach(item => {
      const value = item.value || 0;
      totals.overall += value;
      
      if (item.overall_category?.toLowerCase().includes('land') || 
          item.overall_category?.toLowerCase().includes('construction')) {
        totals.seller += value;
      } else {
        totals.borrower += value;
      }
      
      if (item.overall_category?.toLowerCase().includes('construction')) {
        totals.loanType1 += value;
      } else if (item.overall_category?.toLowerCase().includes('working capital')) {
        totals.loanType2 += value;
      }
    });
    
    return totals;
  };
  
  const proceedsTotals = calculateTotalsByCategory();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <ProjectBreadcrumb project={project} currentPageTitle="Analysis" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/project/${projectId}`)}
                onMouseEnter={() => import('@/pages/Project')}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Project</span>
              </Button>
            </div>
            <h1 className="text-3xl font-bold mt-4">Project Analysis</h1>
            <p className="text-muted-foreground">{project.project_name}</p>
          </div>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BuyerIncomeCard {...mockAnalysisData.buyerIncome} projectId={projectId} />
                <BusinessCashFlowCard {...mockAnalysisData.businessCashFlow} projectId={projectId} />
                <UseOfProceedsCard 
                  projectId={projectId || ''}
                  proceedsTotals={proceedsTotals}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ProjectAnalysis;
