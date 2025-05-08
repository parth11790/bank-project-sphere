
import React from 'react';
import { Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CurrentOwnerForm } from './CurrentOwnerForm';
import { OwnershipFormValues } from '../../schemas/ownershipSchema';

interface CurrentOwnersSectionProps {
  fields: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
}

export const CurrentOwnersSection: React.FC<CurrentOwnersSectionProps> = ({ 
  fields, 
  onAdd, 
  onRemove, 
  control, 
  citizenshipOptions 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium">Current Owners</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Owner
        </Button>
      </div>
      
      {fields.map((field, index) => (
        <CurrentOwnerForm
          key={field.id}
          index={index}
          control={control}
          citizenshipOptions={citizenshipOptions}
          onRemove={() => onRemove(index)}
          canDelete={fields.length > 1}
        />
      ))}
    </div>
  );
};
