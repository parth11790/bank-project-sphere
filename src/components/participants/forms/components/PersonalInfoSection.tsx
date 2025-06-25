
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Participant } from '@/types/participant';
import { BasicInformationSection } from './BasicInformationSection';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { FormsAssignmentSectionWithSave } from './FormsAssignmentSectionWithSave';
import { BusinessOwnershipSectionWithSave } from './BusinessOwnershipSectionWithSave';

interface PersonalInfoSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
  participant?: Participant;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  form,
  participant
}) => {
  return (
    <div className="space-y-4">
      {/* Basic Information & Address Section */}
      <BasicInformationSection form={form} />

      {/* Personal Details Section */}
      <PersonalDetailsSection form={form} />

      {/* Forms Assignment Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Forms Assignment</h3>
        <FormsAssignmentSectionWithSave participant={participant} />
      </div>

      {/* Business Ownership Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Businesses & Ownership</h3>
        <BusinessOwnershipSectionWithSave form={form} participant={participant} />
      </div>
    </div>
  );
};
