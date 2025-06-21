import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Check, Clock, X } from 'lucide-react';
import { useFormDocumentData } from '@/hooks/useFormDocumentData';
import { FormTemplate } from '@/types/form';
import AssignmentDialog from '@/components/AssignmentDialog';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
interface FormsAssignmentSectionProps {
  participant?: any;
}
interface AssignedForm extends FormTemplate {
  assignment_id: string;
  assigned_date: string;
  due_date: string;
  status: 'pending' | 'submitted' | 'overdue';
}

// Mock assigned forms data with realistic financial forms
const getMockAssignedForms = (participantId: string): AssignedForm[] => {
  const baseForms: Omit<AssignedForm, 'assignment_id' | 'assigned_date' | 'due_date' | 'status'>[] = [{
    form_id: "pif_001",
    name: "Personal Information Form",
    entity_type: "individual"
  }, {
    form_id: "pfs_001",
    name: "Personal Financial Statement",
    entity_type: "individual"
  }, {
    form_id: "tax_001",
    name: "Personal Tax Returns (3 Years)",
    entity_type: "individual"
  }, {
    form_id: "credit_001",
    name: "Credit Authorization Form",
    entity_type: "individual"
  }, {
    form_id: "intent_001",
    name: "Letter of Intent",
    entity_type: "individual"
  }, {
    form_id: "resume_001",
    name: "Professional Resume",
    entity_type: "individual"
  }, {
    form_id: "ref_001",
    name: "Professional References Form",
    entity_type: "individual"
  }, {
    form_id: "exp_001",
    name: "Management Experience Questionnaire",
    entity_type: "individual"
  }, {
    form_id: "acquire_001",
    name: "Acquisition Questionnaire",
    entity_type: "individual"
  }, {
    form_id: "bank_001",
    name: "Bank Statements (6 Months)",
    entity_type: "individual"
  }];
  const statuses: AssignedForm['status'][] = ['pending', 'submitted', 'overdue'];
  return baseForms.slice(0, Math.floor(Math.random() * 6) + 5).map((form, index) => ({
    ...form,
    assignment_id: `af_${participantId}_${form.form_id}`,
    assigned_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    due_date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));
};
export const FormsAssignmentSection: React.FC<FormsAssignmentSectionProps> = ({
  participant
}) => {
  const navigate = useNavigate();
  const {
    individualForms
  } = useFormDocumentData();
  const [assignedForms, setAssignedForms] = useState<AssignedForm[]>(participant ? getMockAssignedForms(participant.participant_id) : []);
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const handleFormClick = (form: AssignedForm) => {
    // Navigate to the specific form with query parameters
    navigate(`/form/${form.form_id}?name=${encodeURIComponent(form.name)}&participant=${encodeURIComponent(participant?.name || 'Unknown')}`);
  };
  const handleAssignForms = (forms: FormTemplate[]) => {
    const newAssignments: AssignedForm[] = forms.map(form => ({
      ...form,
      assignment_id: `af_${participant?.participant_id || 'unknown'}_${form.form_id}`,
      assigned_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      // 14 days from now
      status: 'pending' as const
    }));
    setAssignedForms(prev => [...prev, ...newAssignments]);
    setShowAssignmentDialog(false);
    toast.success(`Assigned ${forms.length} form(s) to ${participant?.name || 'participant'}`);
  };
  const handleRemoveForm = (assignmentId: string) => {
    setAssignedForms(prev => prev.filter(form => form.assignment_id !== assignmentId));
    toast.success('Form assignment removed');
  };
  const getStatusIcon = (status: AssignedForm['status']) => {
    switch (status) {
      case 'submitted':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <Clock className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };
  const getStatusBadge = (status: AssignedForm['status']) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Submitted</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>;
      default:
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Pending</Badge>;
    }
  };
  const availableForms = individualForms.filter(form => !assignedForms.some(assigned => assigned.form_id === form.form_id));
  return <div className="space-y-6">
      <Card>
        
        
      </Card>

      <AssignmentDialog open={showAssignmentDialog} onOpenChange={setShowAssignmentDialog} onSave={handleAssignForms} type="forms" participantName={participant?.name || 'Unknown'} availableItems={availableForms} />
    </div>;
};