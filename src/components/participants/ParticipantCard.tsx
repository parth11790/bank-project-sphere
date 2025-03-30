
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Participant as ParticipantType } from '@/types/participant';
import ParticipantCardHeader from './ParticipantCardHeader';
import IndividualRequirementsSection from './IndividualRequirementsSection';
import BusinessSection from './BusinessSection';
import AddBusinessButton from './AddBusinessButton';

export interface Form {
  form_id: string;
  name: string;
}

export interface Document {
  document_id: string;
  name: string;
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  title?: string;
  ownership_percentage?: number;
  documents: Document[];
  forms: Form[];
}

export interface Participant extends ParticipantType {}

interface ParticipantCardProps {
  participant: Participant;
  onDelete: () => void;
  onAssignDocuments: () => void;
  onAssignForms: () => void;
  onAssignBusinessDocuments?: () => void;
  onAssignBusinessForms?: () => void;
  onAddBusiness: () => void;
  formTemplates: {
    individual: Form[];
    business: Form[];
  };
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  onDelete,
  onAssignDocuments,
  onAssignForms,
  onAssignBusinessDocuments,
  onAssignBusinessForms,
  onAddBusiness,
  formTemplates
}) => {
  const navigate = useNavigate();
  
  const handleFormClick = (formId: string, formName: string) => {
    navigate(`/form/${formId}?name=${encodeURIComponent(formName)}&participant=${encodeURIComponent(participant.name)}`);
  };

  const showAddBusinessButton = 
    !participant.business && 
    participant.role !== 'bank_officer' && 
    participant.role !== 'loan_specialist' && 
    participant.role !== 'bank_manager';

  return (
    <Card>
      <ParticipantCardHeader
        participant={participant}
        onDelete={onDelete}
      />
      <CardContent className="space-y-6">
        {/* Individual Requirements Section - Always Expanded */}
        <IndividualRequirementsSection
          documents={participant.documents}
          forms={participant.forms}
          onAssignDocuments={onAssignDocuments}
          onAssignForms={onAssignForms}
          onFormClick={handleFormClick}
        />
        
        {/* Business Section - Always Expanded if business exists */}
        {participant.business && (
          <BusinessSection
            business={participant.business}
            onAssignBusinessDocuments={onAssignBusinessDocuments || (() => {})}
            onAssignBusinessForms={onAssignBusinessForms || (() => {})}
            onFormClick={handleFormClick}
          />
        )}
        
        {showAddBusinessButton && (
          <AddBusinessButton onAddBusiness={onAddBusiness} />
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
