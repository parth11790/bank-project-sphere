
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Project } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import { LoanDistributionChart } from './LoanDistributionChart';
import { Edit, Save, X, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
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
      <CardHeader className="p-3 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <CardTitle className="text-base sm:text-lg">Project Overview</CardTitle>
              <CardDescription className="text-xs">Key project information and financial summary</CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="h-7 px-2 text-xs"
                >
                  <X className="mr-1 h-3 w-3" />
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="h-7 px-2 text-xs"
                >
                  <Save className="mr-1 h-3 w-3" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)} size="sm" className="h-7 px-2 text-xs">
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2 space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Column - Project Details */}
          <div className="space-y-3">
            {/* Basic Information */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium text-sm leading-tight">{getStatusString(project.status)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Type</p>
                {isEditing ? (
                  <Input
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleInputChange}
                    className="h-7 text-sm"
                  />
                ) : (
                  <p className="font-medium text-sm leading-tight">{project.project_type}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Location</p>
                {isEditing ? (
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    className="h-7 text-sm"
                  />
                ) : (
                  <p className="font-medium text-sm leading-tight">{project.location || 'N/A'}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Assigned To</p>
                <p className="font-medium text-sm leading-tight">{assignedTo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-medium text-sm leading-tight">{formatDate(project.created_at)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Updated</p>
                <p className="font-medium text-sm leading-tight">{formatDate(project.updated_at || project.created_at)}</p>
              </div>
            </div>

            {/* Project Name */}
            <div className="border-t pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                <p className="text-xs font-semibold text-muted-foreground">Project Name</p>
              </div>
              {isEditing ? (
                <Input
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  className="h-8 text-base font-semibold"
                />
              ) : (
                <p className="text-base font-semibold leading-tight">{project.project_name}</p>
              )}
            </div>

            {/* Collapsible Description */}
            <div className="border-t pt-2">
              <Collapsible open={isDescriptionExpanded} onOpenChange={setIsDescriptionExpanded}>
                <CollapsibleTrigger className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2 hover:text-foreground transition-colors">
                  {isDescriptionExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  <span>Description</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  {isEditing ? (
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Project description"
                      className="min-h-[60px] resize-none text-sm"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed">
                      {project.description || 'No description provided'}
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Right Column - Financial Details & Chart */}
          <div className="space-y-3">
            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Loan Amount</p>
                <p className="font-medium text-primary text-base leading-tight">{formatCurrency(totalLoanAmount)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Required Equity</p>
                <p className="font-medium text-sm leading-tight">{requiredEquity}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Number of Loans</p>
                <p className="font-medium text-sm leading-tight">{numberOfLoans}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Participants</p>
                <p className="font-medium text-sm leading-tight">{participants.length}</p>
              </div>
            </div>

            {/* Loan Distribution Chart */}
            <div className="border-t pt-2">
              <LoanDistributionChart loanDistributionData={loanDistributionData} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewEnhanced;
