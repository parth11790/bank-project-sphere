import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { LoanDistributionChart } from './LoanDistributionChart';
import { Activity, Users } from 'lucide-react';
import { getStatusString } from '@/types/project';
interface ProjectOverviewEnhancedProps {
  project: Project;
  dashboardData: any;
  participants: ParticipantWithDetails[];
}
const ProjectOverviewEnhanced: React.FC<ProjectOverviewEnhancedProps> = ({
  project,
  dashboardData,
  participants
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  const totalLoanAmount = project.loan_types.reduce((sum, loan) => {
    if (typeof loan === 'string') return sum;
    return sum + (loan.amount || 0);
  }, 0);
  const loanDistributionData = project.loan_types.filter((loan): loan is {
    type: string;
    amount: number;
  } => typeof loan !== 'string' && !!loan.amount).map(loan => ({
    name: loan.type,
    value: loan.amount
  }));
  const recentActivities = dashboardData.recentActivity.slice(0, 3);
  return <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>Key project information and financial summary</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-4">Project Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{getStatusString(project.status)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{project.project_type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{project.location || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Loan</p>
                  <p className="font-medium text-primary">{formatCurrency(totalLoanAmount)}</p>
                </div>
              </div>

              

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  {recentActivities.map((activity: any) => <div key={activity.id} className="text-sm">
                      <p>{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>)}
                </div>
              </div>
            </div>
          </div>

          <div>
            <LoanDistributionChart loanDistributionData={loanDistributionData} />
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default ProjectOverviewEnhanced;