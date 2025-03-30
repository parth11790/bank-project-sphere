
import React from 'react';
import { Badge } from '@/components/ui/badge';
import DocumentsList from './DocumentsList';
import FormsList from './FormsList';

interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  title?: string;
  ownership_percentage?: number;
  documents: Array<{
    document_id: string;
    name: string;
  }>;
  forms: Array<{
    form_id: string;
    name: string;
  }>;
}

interface BusinessSectionProps {
  business: Business;
  onAssignBusinessDocuments: () => void;
  onAssignBusinessForms: () => void;
  onFormClick: (formId: string, formName: string) => void;
}

const BusinessSection: React.FC<BusinessSectionProps> = ({
  business,
  onAssignBusinessDocuments,
  onAssignBusinessForms,
  onFormClick,
}) => {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-medium">Business: {business.name}</h3>
        <Badge variant="outline">{business.entity_type}</Badge>
      </div>
      
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2 p-2 bg-muted/30 rounded-md">
          <div>
            <p className="text-sm text-muted-foreground">Title:</p>
            <p className="font-medium">{business.title || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ownership:</p>
            <p className="font-medium">{business.ownership_percentage || '0'}%</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DocumentsList 
          title="Required Documents" 
          documents={business.documents} 
          onAssign={onAssignBusinessDocuments} 
        />
        
        <FormsList 
          title="Required Forms" 
          forms={business.forms} 
          onAssign={onAssignBusinessForms} 
          onFormClick={onFormClick} 
        />
      </div>
    </div>
  );
};

export default BusinessSection;
