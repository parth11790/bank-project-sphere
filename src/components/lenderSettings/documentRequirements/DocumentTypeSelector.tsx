
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FileCheck } from 'lucide-react';

interface DocumentTypeSelectorProps {
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
  documentGenerationTypes: string[];
}

const DocumentTypeSelector = ({
  selectedTypes,
  onTypeChange,
  documentGenerationTypes,
}: DocumentTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      {documentGenerationTypes.map((type) => (
        <div key={type} className="flex items-center space-x-2">
          <Checkbox
            id={`docgen-${type}`}
            checked={selectedTypes?.includes(type)}
            onCheckedChange={() => onTypeChange(type)}
          />
          <label
            htmlFor={`docgen-${type}`}
            className="text-sm font-medium leading-none flex items-center"
          >
            <FileCheck className="h-3 w-3 mr-1" />
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};

export default DocumentTypeSelector;
