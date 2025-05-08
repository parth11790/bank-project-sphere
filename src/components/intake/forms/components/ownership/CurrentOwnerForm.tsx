
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../schemas/ownershipSchema';
import { CurrentOwnerHeader } from './current-owner/CurrentOwnerHeader';
import { CurrentOwnerPersonalInfo } from './current-owner/CurrentOwnerPersonalInfo';
import { CurrentOwnerDetails } from './current-owner/CurrentOwnerDetails';

interface CurrentOwnerFormProps {
  index: number;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
  onRemove: () => void;
  canDelete: boolean;
}

export const CurrentOwnerForm: React.FC<CurrentOwnerFormProps> = ({ 
  index, 
  control, 
  citizenshipOptions,
  onRemove,
  canDelete
}) => {
  return (
    <Card className="mb-4">
      <CurrentOwnerHeader 
        index={index} 
        onRemove={onRemove}
        canDelete={canDelete}
      />
      
      <CardContent className="space-y-4">
        <CurrentOwnerPersonalInfo
          index={index}
          control={control}
          citizenshipOptions={citizenshipOptions}
        />
        
        <CurrentOwnerDetails
          index={index}
          control={control}
          citizenshipOptions={citizenshipOptions}
        />
      </CardContent>
    </Card>
  );
};
