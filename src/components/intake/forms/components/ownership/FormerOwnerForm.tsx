
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../schemas/ownershipSchema';
import { FormerOwnerHeader } from './former-owner/FormerOwnerHeader';
import { FormerOwnerPersonalInfo } from './former-owner/FormerOwnerPersonalInfo';
import { FormerOwnerStatus } from './former-owner/FormerOwnerStatus';

interface FormerOwnerFormProps {
  index: number;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
  onRemove: () => void;
}

export const FormerOwnerForm: React.FC<FormerOwnerFormProps> = ({ 
  index, 
  control, 
  citizenshipOptions,
  onRemove
}) => {
  return (
    <Card className="mb-4">
      <FormerOwnerHeader index={index} onRemove={onRemove} />
      
      <CardContent className="space-y-4">
        <FormerOwnerPersonalInfo
          index={index}
          control={control}
          citizenshipOptions={citizenshipOptions}
        />
        
        <FormerOwnerStatus
          index={index}
          control={control}
        />
      </CardContent>
    </Card>
  );
};
