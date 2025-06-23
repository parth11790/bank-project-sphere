
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Save, X } from 'lucide-react';
import { Business } from '@/types/business';
import { useQuery } from '@tanstack/react-query';
import { getFormTemplatesData } from '@/lib/mockDataServices/formService';
import AssignmentDialog from '@/components/AssignmentDialog';
import { toast } from 'sonner';
import BusinessFormsList from './forms/BusinessFormsList';

interface EditableBusinessFormsSectionProps {
  business: Business;
}

const EditableBusinessFormsSection: React.FC<EditableBusinessFormsSectionProps> = ({ business }) => {
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedForms, setEditedForms] = useState(business.forms || []);

  // Fetch available business forms for assignment
  const { data: availableForms = [] } = useQuery({
    queryKey: ['business-forms'],
    queryFn: () => getFormTemplatesData('business'),
  });

  // Enhanced mock forms data - 5-8 forms per business
  const forms = editedForms.length > 0 ? editedForms : [
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
    if (!isEditing) {
      console.log(`Clicked form: ${formId} - ${formName}`);
      toast(`Opening form: ${formName}`);
    }
  };

  const handleAssignForms = (selectedForms: any[]) => {
    toast(`Assigned ${selectedForms.length} form(s) to ${business.name} successfully`);
    setIsAssignmentDialogOpen(false);
  };

  const handleSave = () => {
    toast.success('Form statuses updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedForms(business.forms || []);
    setIsEditing(false);
  };

  const updateFormStatus = (formId: string, newStatus: string) => {
    setEditedForms(prev => 
      prev.map(form => 
        form.form_id === formId ? { ...form, status: newStatus } : form
      )
    );
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
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAssignmentDialogOpen(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Assign
                  </Button>
                </>
              )}
            </div>
          </div>
          <CardDescription className="text-xs">Required forms and their completion status</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {forms.length > 0 ? (
            <BusinessFormsList 
              forms={forms}
              isEditing={isEditing}
              onFormClick={handleFormClick}
              onStatusUpdate={updateFormStatus}
            />
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

export default EditableBusinessFormsSection;
