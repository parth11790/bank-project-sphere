
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getProjectById, getBusinessFinancialData } from '@/services';
import Layout from '@/components/Layout';
import CashFlowHeader from '@/components/cashFlow/CashFlowHeader';
import AnalysisTable from '@/components/cashFlow/AnalysisTable';

const CashFlowAnalysis: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || '')
  });

  const { data: financialData } = useQuery({
    queryKey: ['financialData', projectId],
    queryFn: () => getBusinessFinancialData(projectId || '')
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const periods = [
    { date: '12/31/21', type: 'Tax Return', months: 12 },
    { date: '12/31/22', type: 'Tax Return', months: 12 },
    { date: '12/31/23', type: 'Tax Return', months: 12 },
    { date: '1/31/24', type: 'Interim', months: 12 },
    { date: '1/31/23', type: 'Interim', months: 12 }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <CashFlowHeader 
          projectName={project?.project_name || ''} 
          projectId={projectId || ''} 
        />
        <AnalysisTable 
          periods={periods} 
          formatCurrency={formatCurrency} 
        />
      </motion.div>
    </Layout>
  );
};

export default CashFlowAnalysis;
