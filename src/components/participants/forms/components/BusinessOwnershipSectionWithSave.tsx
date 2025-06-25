
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import BusinessOwnershipSection from './BusinessOwnershipSection';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Participant } from '@/types/participant';

interface BusinessOwnershipSectionWithSaveProps {
  form: UseFormReturn<PersonalInformationFormValues>;
  participant?: Participant;
}

export const BusinessOwnershipSectionWithSave: React.FC<BusinessOwnershipSectionWithSaveProps> = ({ 
  form, 
  participant 
}) => {
  const handleSaveBusinessOwnership = () => {
    const businessOwnershipFields = ['business_ownership'];
    
    const businessOwnershipData = businessOwnershipFields.reduce((acc, field) => {
      const value = form.getValues(field as keyof PersonalInformationFormValues);
      if (value !== undefined) {
        acc[field] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    console.log('[AUDIT] Business Ownership section saved:', {
      timestamp: new Date().toISOString(),
      userId: 'current_user',
      action: 'section_save',
      section: 'business_ownership',
      participantId: participant?.participant_id,
      data: businessOwnershipData
    });

    toast.success('Business ownership information saved successfully');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Businesses & Ownership</CardTitle>
          <Button onClick={handleSaveBusinessOwnership} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <BusinessOwnershipSection form={form} participant={participant} />
      </CardContent>
    </Card>
  );
};
