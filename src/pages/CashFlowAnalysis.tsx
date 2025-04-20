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

  const mockData = {
    grossRevenue: [5200000, 5850000, 6300000, 6800000, 7200000],
    wages: [1560000, 1755000, 1890000, 2040000, 2160000],
    cogs: [2080000, 2340000, 2520000, 2720000, 2880000],
    grossProfit: [1560000, 1755000, 1890000, 2040000, 2160000],
    grossMargin: [30, 30, 30, 30, 30],
    depreciation: [180000, 195000, 210000, 225000, 240000],
    amortization: [50000, 50000, 50000, 50000, 50000],
    interest: [120000, 135000, 142000, 155000, 165000],
    borrowerOC: [250000, 262500, 275000, 288000, 302000],
    rentAddback: [180000, 189000, 198000, 208000, 218000],
    depAdjM1: [180000, 195000, 210000, 225000, 240000],
    adjustments: [90000, 95000, 100000, 105000, 110000],
    bookIncome: [1210000, 1386500, 1531000, 1700000, 1801000],
    noi: [1580000, 1776500, 1941000, 2125000, 2241000],
    nom: [30.4, 30.4, 30.8, 31.3, 31.1],
    proposedLoan1: [180000, 180000, 180000, 180000, 180000],
    proposedLoan2: [120000, 120000, 120000, 120000, 120000],
    proposedLoan3: [0, 0, 0, 0, 0],
    proposedLoan4: [0, 0, 0, 0, 0],
    sellerCarryDebt: [60000, 60000, 60000, 60000, 60000],
    existingDebt: [240000, 240000, 240000, 240000, 240000],
    otherDebt: [48000, 48000, 48000, 48000, 48000],
    debtService: [648000, 648000, 648000, 648000, 648000],
    availableCF: [932000, 1128500, 1293000, 1477000, 1593000],
    requiredOfficerComp: [250000, 262500, 275000, 288000, 302000],
    excessCF: [682000, 866000, 1018000, 1189000, 1291000]
  };

  const periods = [
    { date: '12/31/21', type: 'Tax Return', months: 12 },
    { date: '12/31/22', type: 'Tax Return', months: 12 },
    { date: '12/31/23', type: 'Tax Return', months: 12 },
    { date: '1/31/24', type: 'Interim', months: 12 },
    { date: '1/31/25', type: 'Projected', months: 12 }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1400px] mx-auto space-y-6"
      >
        <CashFlowHeader 
          projectName={project?.project_name || ''} 
          projectId={projectId || ''} 
        />
        <AnalysisTable 
          periods={periods} 
          formatCurrency={formatCurrency}
          mockData={mockData}
        />
      </motion.div>
    </Layout>
  );
};

export default CashFlowAnalysis;
