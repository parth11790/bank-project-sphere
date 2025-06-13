
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { Business } from '@/types/business';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getFormTemplatesData } from '@/lib/mockDataServices/formService';
import AssignmentDialog from '@/components/AssignmentDialog';
import { toast } from 'sonner';

interface BusinessFormsSectionProps {
  business: Business;
}

const BusinessFormsSection: React.FC<BusinessFormsSectionProps> = ({ business }) => {
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

  // Fetch available business forms for assignment
  const { data: availableForms = [] } = useQuery({
    queryKey: ['business-forms'],
    queryFn: () => getFormTemplatesData('business'),
  });

  const getStatusIcon = (status: string | undefined) => {
    if (!status) {
      return <FileText className="h-3.5 w-3.5 text-gray-600" />;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
      case 'submitted':
        return <CheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-500" />;
      case 'in_progress':
        return <Clock className="h-3.5 w-3.5 text-orange-500" />;
      case 'pending':
        return <AlertCircle className="h-3.5 w-3.5 text-red-600" />;
      default:
        return <FileText className="h-3.5 w-3.5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) {
      return <Badge variant="outline" className="text-xs px-2 py-0">Not Started</Badge>;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
      case 'submitted':
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0",
              "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400"
            )}
          >
            Submitted
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0",
              "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400"
            )}
          >
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0",
              "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
            )}
          >
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-xs px-2 py-0">Not Started</Badge>;
    }
  };

  // Enhanced mock forms data - 5-8 forms per business
  const forms = business.forms || [
    { form_id: 'form_8', name: 'Business Tax Returns (3 years)', status: 'submitted' },
    { form_id: 'form_9', name: 'Balance Sheet', status: 'in_progress' },
    { form_id: 'form_10', name: 'Profit & Loss Statement', status: 'submitted' },
    { form_id: 'form_11', name: 'Accounts Receivable & Payable', status: 'pending' },
    { form_id: 'form_12', name: 'Inventory and Equipment List', status: 'pending' },
    { form_id: 'form_13', name: 'Broker Listing Agreement', status: 'completed' },
    { form_id: 'form_14', name: 'Business Acquisition Questionnaire', status: 'in_progress' },
    { form_id: 'form_15', name: 'Business Debt Schedule', status: 'submitted' }
  ];

  const handleFormClick = (formId: string, formName: string) => {
    console.log(`Clicked form: ${formId} - ${formName}`);
    toast(`Opening form: ${formName}`);
    // Navigate to form details or handle form interaction
  };

  const handleAssignForms = (selectedForms: any[]) => {
    toast(`Assigned ${selectedForms.length} form(s) to ${business.name} successfully`);
    setIsAssignmentDialogOpen(false);
    // In a real app, this would update the business forms
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg">Forms</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAssignmentDialogOpen(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Assign
            </Button>
          </div>
          <CardDescription className="text-xs">Required forms and their completion status</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {forms.length > 0 ? (
            <div className="grid gap-2">
              {forms.map((form: any) => (
                <div 
                  key={form.form_id} 
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted/80 transition-colors",
                    form.status === 'completed' || form.status === 'submitted' ? 'bg-green-50 dark:bg-green-950/30' : 'bg-muted'
                  )}
                  onClick={() => handleFormClick(form.form_id, form.name)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getStatusIcon(form.status)}
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium truncate block">{form.name}</span>
                      <span className="text-xs text-muted-foreground">ID: {form.form_id}</span>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {getStatusBadge(form.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No forms assigned to this business</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        onSave={handleAssignForms}
        type="forms"
        participantName={business.name}
        availableItems={availableForms}
      />
    </>
  );
};

export default BusinessFormsSection;
