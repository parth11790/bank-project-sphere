
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getProjectById, getBusinessFinancialData } from '@/services';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CashFlowAnalysis: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
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
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(`/project/${projectId}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Cash Flow Analysis</h1>
            <p className="text-muted-foreground">
              {project?.project_name || 'Loading...'}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Name #1</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Statement Date</TableHead>
                    {periods.map((period, index) => (
                      <TableHead key={index} className="text-right">
                        <div>{period.type}</div>
                        <div>{period.date}</div>
                        <div>{period.months} months</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: 'Gross Revenue', group: 'revenue' },
                    { label: 'Growth', group: 'revenue' },
                    { label: 'Wages', group: 'expenses' },
                    { label: 'COGS', group: 'expenses' },
                    { label: 'Gross Profit', group: 'profit', bold: true },
                    { label: 'Gross Margin', group: 'profit' },
                    { label: 'Depreciation', group: 'adjustments' },
                    { label: 'Amortization', group: 'adjustments' },
                    { label: 'Interest', group: 'adjustments' },
                    { label: 'Existing Borrower OC', group: 'adjustments' },
                    { label: 'Rent Addback', group: 'adjustments' },
                    { label: 'Dep. Adj. M-1', group: 'adjustments' },
                    { label: 'Adjustments', group: 'adjustments' },
                    { label: 'M-1 Book Income', group: 'income', bold: true },
                    { label: 'NOI', group: 'income' },
                    { label: 'NOM', group: 'income' },
                    { label: 'Proposed SBA Loan #1', group: 'loans' },
                    { label: 'Proposed SBA Loan #2', group: 'loans' },
                    { label: 'Proposed SBA Loan #3', group: 'loans' },
                    { label: 'Proposed SBA Loan #4', group: 'loans' },
                    { label: 'Seller Carry Debt', group: 'debt' },
                    { label: 'Existing Business Debt', group: 'debt' },
                    { label: 'Other Debt', group: 'debt' },
                    { label: 'Debt Service', group: 'summary', bold: true },
                    { label: 'Available CF', group: 'summary', bold: true },
                    { label: 'Required Officer Comp', group: 'summary' },
                    { label: 'Excess CF', group: 'summary', negative: true, bold: true }
                  ].map((row, index) => (
                    <TableRow key={index} className={row.bold ? 'font-bold' : ''}>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      {periods.map((_, periodIndex) => (
                        <TableCell key={periodIndex} className="text-right">
                          {formatCurrency(0)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/50 py-4">
                      <div className="font-semibold mb-2">Income Statement Analysis</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Revenue trends:</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Increasing
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Decreasing
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Consistent
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Inconsistent
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">COGS:</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Increasing
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Decreasing
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Consistent
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Inconsistent
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Operating expenses:</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Increasing
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Decreasing
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Consistent
                            </label>
                            <label className="flex items-center gap-1">
                              <input type="checkbox" /> Inconsistent
                            </label>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default CashFlowAnalysis;
