
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';
import { Project, getStatusString } from '@/types/project';
import { LoanDistributionChart } from './LoanDistributionChart';

interface ProjectOverviewProps {
  project: Project;
  onViewUseOfProceeds: () => void;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, onViewUseOfProceeds }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate total loan amount
  const totalLoanAmount = project.loan_types.reduce((sum, loan) => {
    if (typeof loan === 'string') {
      return sum;
    }
    return sum + (loan.amount || 0);
  }, 0);
  
  // Prepare loan distribution data
  const loanDistributionData = project.loan_types
    .filter((loan): loan is { type: string; amount: number; description: string } => 
      typeof loan !== 'string' && !!loan.amount
    )
    .map(loan => ({
      name: loan.type,
      value: loan.amount
    }));

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>Key project information and loan details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Details</h3>
            <dl className="grid grid-cols-[120px_1fr] gap-2">
              <dt className="text-sm font-medium">Status:</dt>
              <dd className="text-sm">{getStatusString(project.status)}</dd>
              
              <dt className="text-sm font-medium">Type:</dt>
              <dd className="text-sm">{project.project_type}</dd>
              
              <dt className="text-sm font-medium">Start Date:</dt>
              <dd className="text-sm">{new Date(project.created_at).toLocaleDateString()}</dd>
              
              <dt className="text-sm font-medium">Location:</dt>
              <dd className="text-sm">{project.location || 'Not specified'}</dd>
            </dl>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Loan Summary</h3>
            <dl className="space-y-2">
              {project.loan_types.map((loan, index) => {
                const loanType = typeof loan === 'string' ? loan : loan.type;
                const loanAmount = typeof loan === 'string' ? 0 : (loan.amount || 0);
                
                return (
                  <div key={index} className="flex justify-between items-center">
                    <dt className="text-sm font-medium">{loanType}:</dt>
                    <dd className="text-sm font-mono">{formatCurrency(loanAmount)}</dd>
                  </div>
                );
              })}
              <Separator className="my-2" />
              <div className="flex justify-between items-center font-bold">
                <dt className="text-sm">Total Loan Amount:</dt>
                <dd className="text-sm font-mono">{formatCurrency(totalLoanAmount)}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <LoanDistributionChart loanDistributionData={loanDistributionData} />
      </CardContent>
      <CardFooter className="justify-between border-t px-6 py-4">
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date(project.updated_at || project.created_at).toLocaleString()}
        </div>
        <Button 
          variant="outline"
          onClick={onViewUseOfProceeds}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Use of Proceeds
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectOverview;
