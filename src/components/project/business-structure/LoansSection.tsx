
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Plus, Eye, Edit } from 'lucide-react';
import { Project } from '@/types/project';

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
      case 'underwriting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSBAGuaranty = (loanType: string) => {
    if (loanType.toLowerCase().includes('sba')) {
      return loanType.includes('504') ? '40%' : '75%';
    }
    return 'N/A';
  };

  const getLoanPurpose = (loanType: string) => {
    if (loanType.toLowerCase().includes('504')) return 'Real estate acquisition';
    if (loanType.toLowerCase().includes('7(a)')) return 'Business acquisition';
    if (loanType.toLowerCase().includes('equipment')) return 'Equipment financing';
    if (loanType.toLowerCase().includes('working') || loanType.toLowerCase().includes('operating')) return 'Working capital';
    return 'General business purposes';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle>Project Loans</CardTitle>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Loan
          </Button>
        </div>
        <CardDescription>All loans associated with this project</CardDescription>
      </CardHeader>
      <CardContent>
        {project.loans && project.loans.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>SBA Guaranty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.loans.map((loan) => (
                  <TableRow key={loan.loan_id}>
                    <TableCell className="font-medium">{loan.loan_type}</TableCell>
                    <TableCell>{formatCurrency(loan.amount)}</TableCell>
                    <TableCell>{loan.term ? `${loan.term} months` : 'N/A'}</TableCell>
                    <TableCell>{loan.rate ? `${loan.rate}%` : 'N/A'}</TableCell>
                    <TableCell>{getLoanPurpose(loan.loan_type)}</TableCell>
                    <TableCell>{getSBAGuaranty(loan.loan_type)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(loan.status)}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
