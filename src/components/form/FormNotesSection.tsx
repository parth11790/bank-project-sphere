
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormNotesSectionProps {
  shouldShow: boolean;
  onInputChange: (field: string, value: string) => void;
}

const FormNotesSection: React.FC<FormNotesSectionProps> = ({
  shouldShow,
  onInputChange
}) => {
  if (!shouldShow) return null;

  return (
    <div className="mt-6">
      <Label htmlFor="notes">Additional Notes</Label>
      <Textarea 
        id="notes" 
        placeholder="Enter any additional information" 
        className="mt-2"
        onChange={(e) => onInputChange('notes', e.target.value)}
      />
    </div>
  );
};

export default FormNotesSection;
