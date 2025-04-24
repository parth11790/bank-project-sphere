
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ParticipantSelectorProps {
  participantType: string;
  onParticipantChange: (value: string) => void;
}

const ParticipantSelector = ({
  participantType,
  onParticipantChange,
}: ParticipantSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="participantType">Participant Type</Label>
      <Select
        value={participantType}
        onValueChange={onParticipantChange}
      >
        <SelectTrigger id="participantType">
          <SelectValue placeholder="Select Participant Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Borrower">Borrower</SelectItem>
          <SelectItem value="Buyer">Buyer</SelectItem>
          <SelectItem value="Seller">Seller</SelectItem>
          <SelectItem value="Guarantor">Guarantor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ParticipantSelector;
