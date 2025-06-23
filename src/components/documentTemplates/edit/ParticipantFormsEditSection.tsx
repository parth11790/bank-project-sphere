
import React from 'react';
import { Label } from '@/components/ui/label';
import { MultiSelectFormField } from '../MultiSelectFormField';
import { OwnershipRangeManager } from '../OwnershipRangeManager';
import { OwnershipRange } from '@/types/documentTemplate';
import { getFormsByEntityType } from '@/lib/utils/formCategorization';

const participantOptions = [
  { value: 'borrowing_business' as const, label: 'Borrowing Business', hasOwnership: false },
  { value: 'affiliated_business' as const, label: 'Affiliated Business', hasOwnership: true },
  { value: 'owners' as const, label: 'Owners', hasOwnership: true },
  { value: 'sellers' as const, label: 'Sellers', hasOwnership: true },
  { value: 'acquisition_business' as const, label: 'Acquisition Business', hasOwnership: false },
];

const availableForms = getFormsByEntityType('All');

interface ParticipantFormsEditSectionProps {
  formData: any;
  updateParticipantForms: (participantType: string, forms: string[]) => void;
  updateOwnershipRanges: (participantType: string, ranges: OwnershipRange[]) => void;
}

export const ParticipantFormsEditSection = ({
  formData,
  updateParticipantForms,
  updateOwnershipRanges
}: ParticipantFormsEditSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Forms by Participant Type</h3>
      {participantOptions.map((participant) => (
        <div key={participant.value} className="space-y-4 border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">{participant.label}</Label>
          </div>
          
          {/* Basic Forms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Basic Forms (always required)</Label>
            <MultiSelectFormField
              value={formData.participantForms[participant.value]}
              onChange={(forms) => updateParticipantForms(participant.value, forms)}
              options={availableForms}
              placeholder={`Select basic forms for ${participant.label.toLowerCase()}...`}
              participantType={participant.value}
              showEntityTypeFilter={true}
            />
          </div>

          {/* Ownership-based Forms */}
          {participant.hasOwnership && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Ownership-Based Forms</Label>
              <OwnershipRangeManager
                participantType={participant.value}
                participantLabel={participant.label}
                ranges={formData.ownershipRanges[participant.value]}
                onChange={(ranges) => updateOwnershipRanges(participant.value, ranges)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
