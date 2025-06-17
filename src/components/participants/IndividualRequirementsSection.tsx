
import React from 'react';
import FormsList from './FormsList';

interface Form {
  form_id: string;
  name: string;
}

interface IndividualRequirementsSectionProps {
  forms: Form[];
  onAssignForms: () => void;
  onFormClick: (formId: string, formName: string) => void;
}

const IndividualRequirementsSection: React.FC<IndividualRequirementsSectionProps> = ({
  forms,
  onAssignForms,
  onFormClick,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <h3 className="text-sm font-medium">Individual Requirements</h3>
      </div>
      
      <FormsList 
        title="Required Forms" 
        forms={forms} 
        onAssign={onAssignForms} 
        onFormClick={onFormClick} 
      />
    </div>
  );
};

export default IndividualRequirementsSection;
