
import React from 'react';
import { Badge } from '@/components/ui/badge';
import FormsList from './FormsList';

interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  title?: string;
  ownership_percentage?: number;
  forms: Array<{
    form_id: string;
    name: string;
  }>;
}

interface BusinessSectionProps {
  business: Business;
  onAssignBusinessForms: () => void;
  onFormClick: (formId: string, formName: string) => void;
}

const BusinessSection: React.FC<BusinessSectionProps> = ({
  business,
  onAssignBusinessForms,
  onFormClick,
}) => {
  return (
    <div className="space-y-3 border-t pt-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Business: {business.name}</h3>
          <Badge variant="outline" className="text-xs">{business.entity_type}</Badge>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="grid grid-cols-2 gap-2 p-2 bg-muted/30 rounded-md">
          <div>
            <p className="text-xs text-muted-foreground">Title:</p>
            <p className="text-sm font-medium">{business.title || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ownership:</p>
            <p className="text-sm font-medium">{business.ownership_percentage || '0'}%</p>
          </div>
        </div>
      </div>
      
      <FormsList 
        title="Required Forms" 
        forms={business.forms} 
        onAssign={onAssignBusinessForms} 
        onFormClick={onFormClick} 
      />
    </div>
  );
};

export default BusinessSection;
