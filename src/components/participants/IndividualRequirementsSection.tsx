
import React from 'react';
import DocumentsList from './DocumentsList';
import FormsList from './FormsList';

interface Document {
  document_id: string;
  name: string;
}

interface Form {
  form_id: string;
  name: string;
}

interface IndividualRequirementsSectionProps {
  documents: Document[];
  forms: Form[];
  onAssignDocuments: () => void;
  onAssignForms: () => void;
  onFormClick: (formId: string, formName: string) => void;
}

const IndividualRequirementsSection: React.FC<IndividualRequirementsSectionProps> = ({
  documents,
  forms,
  onAssignDocuments,
  onAssignForms,
  onFormClick,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <h3 className="text-sm font-medium">Individual Requirements</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DocumentsList 
          title="Required Documents" 
          documents={documents} 
          onAssign={onAssignDocuments} 
        />
        
        <FormsList 
          title="Required Forms" 
          forms={forms} 
          onAssign={onAssignForms} 
          onFormClick={onFormClick} 
        />
      </div>
    </div>
  );
};

export default IndividualRequirementsSection;
