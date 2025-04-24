
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DocumentTypeSelector from './DocumentTypeSelector';

interface AdvancedSettingsProps {
  description: string | undefined;
  documentGenerationTypes: string[];
  onDescriptionChange: (value: string) => void;
  onDocTypeChange: (type: string) => void;
  selectedTypes: string[];
}

const AdvancedSettings = ({
  description,
  documentGenerationTypes,
  onDescriptionChange,
  onDocTypeChange,
  selectedTypes,
}: AdvancedSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Add a description for this form requirement"
          value={description || ''}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-[80px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Document Generation Types</Label>
        <p className="text-xs text-muted-foreground mb-2">
          Select document types this form will be used to generate
        </p>
        <DocumentTypeSelector 
          selectedTypes={selectedTypes}
          onTypeChange={onDocTypeChange}
          documentGenerationTypes={documentGenerationTypes}
        />
      </div>
    </div>
  );
};

export default AdvancedSettings;
