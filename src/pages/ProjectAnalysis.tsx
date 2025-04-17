import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import BuyerIncomeCard from '@/components/analysis/BuyerIncomeCard';
import BusinessCashFlowCard from '@/components/analysis/BusinessCashFlowCard';
import UseOfProceedsCard from '@/components/analysis/UseOfProceedsCard';

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

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/project/${projectId}`)}
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

        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow Analysis</TabsTrigger>
            <TabsTrigger value="use-of-proceeds">Use of Proceeds</TabsTrigger>
            <TabsTrigger value="dsc">DSC Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BuyerIncomeCard {...mockAnalysisData.buyerIncome} />
                    <BusinessCashFlowCard {...mockAnalysisData.businessCashFlow} />
                    <UseOfProceedsCard 
                      projectId={projectId || ''}
                      proceedsTotals={proceedsTotals}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="cash-flow" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed cash flow analysis will be displayed here.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate(`/project/cash-flow/${projectId}`)}
                >
                  Go to Cash Flow Analysis
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="use-of-proceeds" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Use of Proceeds</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed use of proceeds analysis will be displayed here.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
                >
                  Go to Use of Proceeds
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dsc" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Debt Service Coverage Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This section will contain pre-OC and post-OC debt service coverage analysis.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pre-OC DSC</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Pre-OC debt service coverage details will be displayed here.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Post-OC DSC</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Post-OC debt service coverage details will be displayed here.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default ProjectAnalysis;
