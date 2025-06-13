
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign } from 'lucide-react';
import { Project } from '@/types/project';
import { getUseOfProceedsForProject } from '@/lib/mockData/utilities';

interface LoansSectionProps {
  project: Project;
}

const LoansSection: React.FC<LoansSectionProps> = ({ project }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get use of proceeds data for loan details
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle>Loans</CardTitle>
          </div>
        </div>
        <CardDescription>Loans assigned to the main business with detailed breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        {project.loans && project.loans.length > 0 ? (
          <div className="space-y-6">
            {/* Basic Loan Information */}
            <div className="space-y-4">
              {project.loans.map((loan) => (
                <div key={loan.loan_id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{loan.loan_type}</h4>
                    <Badge className={getStatusColor(loan.status)}>{loan.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium">{formatCurrency(loan.amount)}</p>
                    </div>
                    {loan.rate && (
                      <div>
                        <p className="text-muted-foreground">Rate</p>
                        <p className="font-medium">{loan.rate}%</p>
                      </div>
                    )}
                    {loan.term && (
                      <div>
                        <p className="text-muted-foreground">Term</p>
                        <p className="font-medium">{loan.term} years</p>
                      </div>
                    )}
                  </div>
                  {loan.description && (
                    <p className="text-sm text-muted-foreground mt-2">{loan.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Use of Proceeds Details */}
            {loanTotals.length > 0 && (
              <div className="space-y-4">
                <Separator />
                <div>
                  <h4 className="text-lg font-semibold mb-4">Detailed Use of Proceeds</h4>
                  <div className="space-y-6">
                    {loanTotals.map(({ loanType, total, items }) => (
                      <div key={loanType} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="text-md font-semibold">{loanType}</h5>
                          <span className="text-md font-bold text-primary">{formatCurrency(total)}</span>
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
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No loans configured</p>
            <Button className="mt-4">Add Loan</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoansSection;
