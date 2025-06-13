
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { Project } from '@/types/project';

interface LoanDetailsTableProps {
  project: Project;
}

const LoanDetailsTable: React.FC<LoanDetailsTableProps> = ({ project }) => {
  const proceedsData = getUseOfProceedsForProject(project.project_id);
  
  // Group proceeds data by loan type (column_name)
  const loanGroups = proceedsData.reduce((groups: Record<string, any[]>, item) => {
    const loanType = item.column_name || 'Other';
    if (!groups[loanType]) {
      groups[loanType] = [];
    }
    groups[loanType].push(item);
    return groups;
  }, {});

  // Calculate totals for each loan type
  const loanTotals = Object.entries(loanGroups).map(([loanType, items]) => {
    const total = items.reduce((sum, item) => sum + (item.value || 0), 0);
    return { loanType, total, items };
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details from Use of Proceeds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {loanTotals.map(({ loanType, total, items }) => (
            <div key={loanType} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">{loanType}</h4>
                <span className="text-lg font-bold text-primary">{formatCurrency(total)}</span>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Use of Proceeds</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.overall_category || 'General'}
                      </TableCell>
                      <TableCell>{item.row_name}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.value || 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanDetailsTable;
