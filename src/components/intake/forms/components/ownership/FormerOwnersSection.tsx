
import React from 'react';
import { Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FormerOwnerForm } from './FormerOwnerForm';
import { OwnershipFormValues } from '../../schemas/ownershipSchema';

interface FormerOwnersSectionProps {
  fields: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
}

export const FormerOwnersSection: React.FC<FormerOwnersSectionProps> = ({ 
  fields, 
  onAdd, 
  onRemove, 
  control, 
  citizenshipOptions 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium">Former Owners (Last 6 Months)</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Former Owner
        </Button>
      </div>
      
      {fields.length === 0 && (
        <div className="text-sm text-muted-foreground italic">
          No former owners entered. Add former owners only if ownership changed within the last 6 months.
        </div>
      )}
      
      {fields.map((field, index) => (
        <FormerOwnerForm
          key={field.id}
          index={index}
          control={control}
          citizenshipOptions={citizenshipOptions}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
};
