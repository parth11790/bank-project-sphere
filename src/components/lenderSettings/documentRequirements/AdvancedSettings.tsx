
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
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs">Description</Label>
        <Textarea
          id="description"
          placeholder="Add a description for this form requirement"
          value={description || ''}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-[60px] text-sm"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <Label className="text-xs font-medium">Document Generation Types</Label>
          <p className="text-xs text-muted-foreground">
            Select document types this form will be used to generate
          </p>
        </div>
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
