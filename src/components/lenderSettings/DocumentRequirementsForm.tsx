
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import FormHeader from './documentRequirements/FormHeader';
import LoanRangeInputs from './documentRequirements/LoanRangeInputs';
import DocumentTypeSelector from './documentRequirements/DocumentTypeSelector';

const documentGenerationTypes = [
  "Credit Check",
  "Background Check",
  "Bankruptcy Report",
  "Underwriting Documents",
  "Closing Documents"
];

interface DocumentRequirementsFormProps {
  newFormRequirement: {
    loanType: string;
    loanAmountMin: number;
    loanAmountMax: number;
    participantType: string;
    formName: string;
    description?: string;
    isRequired: boolean;
    documentGenerationTypes: string[];
  };
  loanTypes: string[];
  onFormChange: (form: any) => void;
  onAddForm: () => void;
}

const DocumentRequirementsForm = ({
  newFormRequirement,
  loanTypes,
  onFormChange,
  onAddForm
}: DocumentRequirementsFormProps) => {
  const [accordionValue, setAccordionValue] = useState<string>("");
  
  const handleDocGenTypeChange = (type: string) => {
    const currentTypes = [...(newFormRequirement.documentGenerationTypes || [])];
    const exists = currentTypes.includes(type);
    
    onFormChange({
      documentGenerationTypes: exists 
        ? currentTypes.filter(t => t !== type)
        : [...currentTypes, type]
    });
  };

  return (
    <div>
      <FormHeader />
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reqLoanType">Loan Type</Label>
          <Select
            value={newFormRequirement.loanType}
            onValueChange={(value) => onFormChange({loanType: value})}
          >
            <SelectTrigger id="reqLoanType">
              <SelectValue placeholder="Select Loan Type" />
            </SelectTrigger>
            <SelectContent>
              {loanTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <LoanRangeInputs 
          minAmount={newFormRequirement.loanAmountMin}
          maxAmount={newFormRequirement.loanAmountMax}
          onMinChange={(value) => onFormChange({loanAmountMin: value})}
          onMaxChange={(value) => onFormChange({loanAmountMax: value})}
        />

        <div className="space-y-2">
          <Label htmlFor="participantType">Participant Type</Label>
          <Select
            value={newFormRequirement.participantType}
            onValueChange={(value) => onFormChange({participantType: value})}
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

        <div className="space-y-2">
          <Label htmlFor="formName">Form Name</Label>
          <Input 
            id="formName"
            value={newFormRequirement.formName}
            onChange={(e) => onFormChange({formName: e.target.value})}
            placeholder="e.g. Personal Financial Statement"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isRequired" 
            checked={newFormRequirement.isRequired}
            onCheckedChange={(checked) => 
              onFormChange({isRequired: !!checked})
            }
          />
          <label
            htmlFor="isRequired"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Required Document
          </label>
        </div>

        <Accordion 
          type="single" 
          collapsible
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="border rounded-md"
        >
          <AccordionItem value="advanced-settings">
            <AccordionTrigger className="px-4">Advanced Settings</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a description for this form requirement"
                    value={newFormRequirement.description || ''}
                    onChange={(e) => onFormChange({description: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Document Generation Types</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Select document types this form will be used to generate
                  </p>
                  <DocumentTypeSelector 
                    selectedTypes={newFormRequirement.documentGenerationTypes || []}
                    onTypeChange={handleDocGenTypeChange}
                    documentGenerationTypes={documentGenerationTypes}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button onClick={onAddForm} className="mt-2">
          <Plus className="mr-2 h-4 w-4" /> Add Requirement
        </Button>
      </div>
    </div>
  );
};

export default DocumentRequirementsForm;
