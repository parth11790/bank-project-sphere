
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { LoanDistributionChart } from './LoanDistributionChart';
import { Activity, Users, Edit, Save, X } from 'lucide-react';
import { getStatusString } from '@/types/project';
import { updateProject } from '@/services/projectService';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface ProjectOverviewEnhancedProps {
  project: Project;
  dashboardData: any;
  participants: ParticipantWithDetails[];
  onEdit?: () => void;
}

const ProjectOverviewEnhanced: React.FC<ProjectOverviewEnhancedProps> = ({
  project,
  dashboardData,
  participants,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: project.project_name,
    project_type: project.project_type,
    location: project.location || '',
    description: project.description || ''
  });

  const queryClient = useQueryClient();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProject(project.project_id, formData);
      toast.success('Project updated successfully');
      queryClient.invalidateQueries({ queryKey: ['project', project.project_id] });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      project_name: project.project_name,
      project_type: project.project_type,
      location: project.location || '',
      description: project.description || ''
    });
    setIsEditing(false);
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

  const numberOfLoans = project.loan_types.length;
  const assignedTo = project.created_by_user?.name || 'Not assigned';
  const requiredEquity = 'Not specified';

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Key project information and financial summary</CardDescription>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Project Details */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{getStatusString(project.status)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  {isEditing ? (
                    <Input
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                      className="h-8"
                    />
                  ) : (
                    <p className="font-medium">{project.project_type}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className="h-8"
                    />
                  ) : (
                    <p className="font-medium">{project.location || 'N/A'}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{assignedTo}</p>
                </div>
              </div>
            </div>

            {/* Project Name */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Project Name</h3>
              {isEditing ? (
                <Input
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  className="text-lg font-semibold"
                />
              ) : (
                <p className="text-lg font-semibold">{project.project_name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Description</h3>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Project description"
                  className="min-h-[100px] resize-none"
                />
              ) : (
                <p className="text-sm leading-relaxed">
                  {project.description || 'No description provided'}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Created Date</p>
                  <p className="font-medium">{formatDate(project.created_at)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(project.updated_at || project.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Financial Details & Chart */}
          <div className="space-y-6">
            {/* Financial Summary */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Loan Amount</p>
                  <p className="font-medium text-primary text-lg">{formatCurrency(totalLoanAmount)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Required Equity</p>
                  <p className="font-medium">{requiredEquity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Number of Loans</p>
                  <p className="font-medium">{numberOfLoans}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="font-medium">{participants.length}</p>
                </div>
              </div>
            </div>

            {/* Loan Distribution Chart */}
            <div>
              <LoanDistributionChart loanDistributionData={loanDistributionData} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewEnhanced;
