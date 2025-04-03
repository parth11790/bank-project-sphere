
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Project as ProjectType } from '@/types/project';
import { Project as MockProjectType } from '@/lib/mockData/types';

interface ProjectDetailsCardProps {
  project: ProjectType | MockProjectType;
}

const ProjectDetailsCard: React.FC<ProjectDetailsCardProps> = ({ project }) => {
  // Helper function to safely get loan types from either project type
  const getLoanTypes = (project: ProjectType | MockProjectType) => {
    if ('loan_types' in project) {
      const loanTypes = project.loan_types;
      if (Array.isArray(loanTypes)) {
        return loanTypes.filter(loan => {
          return typeof loan === 'object' && loan !== null && 'type' in loan && 'amount' in loan;
        }).map(loan => typeof loan === 'object' ? loan : { type: 'Unknown', amount: 0, description: '' });
      }
    }
    return [];
  };
  
  const loanTypes = getLoanTypes(project);
  const totalAmount = loanTypes.reduce((total, loan) => total + loan.amount, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>Information about this project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Project Type</h3>
            <p>{project.project_type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">Location</h3>
            <p>{project.city || 'N/A'}, {project.state || 'N/A'}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Loan Information</h3>
          <div className="border rounded-md divide-y">
            {loanTypes.map((loan, index) => (
              <div key={index} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-medium">{loan.type}</span>
                  <p className="text-sm text-muted-foreground">{loan.description || ''}</p>
                </div>
                <div className="text-right font-medium">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(loan.amount)}
                </div>
              </div>
            ))}
            <div className="p-3 flex justify-between bg-muted/50">
              <span className="font-bold">Total Loan Amount</span>
              <span className="font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsCard;
