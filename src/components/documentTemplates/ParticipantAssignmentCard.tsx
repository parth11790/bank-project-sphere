
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const participantOptions = [{
  value: 'borrowing_business' as const,
  label: 'Borrowing Business',
  hasOwnership: false
}, {
  value: 'owners' as const,
  label: 'Owners',
  hasOwnership: true
}, {
  value: 'affiliated_business' as const,
  label: 'Affiliated Business',
  hasOwnership: true
}, {
  value: 'sellers' as const,
  label: 'Sellers',
  hasOwnership: true
}, {
  value: 'acquisition_business' as const,
  label: 'Acquisition Business',
  hasOwnership: false
}];

interface ParticipantAssignmentCardProps {
  editFormData: any;
  handleParticipantToggle: (participantValue: string, checked: boolean) => void;
}

export const ParticipantAssignmentCard = ({ 
  editFormData, 
  handleParticipantToggle 
}: ParticipantAssignmentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Participants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {participantOptions.map(participant => (
            <div key={participant.value} className="flex items-center space-x-2">
              <Checkbox 
                id={participant.value}
                checked={editFormData.assignedParticipants.includes(participant.value)}
                onCheckedChange={(checked) => handleParticipantToggle(participant.value, checked as boolean)}
              />
              <Label htmlFor={participant.value} className="text-sm font-medium">
                {participant.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
