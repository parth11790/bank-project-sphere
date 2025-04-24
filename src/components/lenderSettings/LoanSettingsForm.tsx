
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LoanSettingsFormProps {
  newSetting: {
    loanType: string;
    amountMin: number;
    amountMax: number;
    interestRate: number;
    term: number;
    amortization: number;
    softCostPercentage: number;
    requiredDocuments: {
      creditCheck: boolean;
      backgroundCheck: boolean;
      bankruptcyReport: boolean;
      underwritingDocuments: boolean;
      closingReport: boolean;
    };
  };
  loanTypes: string[];
  onSettingChange: (setting: any) => void;
  onAddSetting: () => void;
}

const LoanSettingsForm = ({ 
  newSetting, 
  loanTypes, 
  onSettingChange, 
  onAddSetting 
}: LoanSettingsFormProps) => {
  const [accordionValue, setAccordionValue] = useState<string>("");
  
  const handleDocRequirementChange = (key: string, checked: boolean) => {
    onSettingChange({
      ...newSetting,
      requiredDocuments: {
        ...newSetting.requiredDocuments,
        [key]: checked
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Add New Loan Setting</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Configure interest rates, terms, and fees for different loan types and amount ranges.
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="loanType">Loan Type</Label>
          <Select
            value={newSetting.loanType}
            onValueChange={(value) => onSettingChange({...newSetting, loanType: value})}
          >
            <SelectTrigger id="loanType">
              <SelectValue placeholder="Select Loan Type" />
            </SelectTrigger>
            <SelectContent>
              {loanTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amountMin">Min Amount ($)</Label>
            <Input 
              id="amountMin"
              type="number"
              value={newSetting.amountMin}
              onChange={(e) => onSettingChange({...newSetting, amountMin: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amountMax">Max Amount ($)</Label>
            <Input 
              id="amountMax"
              type="number"
              value={newSetting.amountMax}
              onChange={(e) => onSettingChange({...newSetting, amountMax: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          <Input 
            id="interestRate"
            type="number"
            step="0.01"
            value={newSetting.interestRate}
            onChange={(e) => onSettingChange({...newSetting, interestRate: Number(e.target.value)})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="term">Term (years)</Label>
            <Input 
              id="term"
              type="number"
              value={newSetting.term}
              onChange={(e) => onSettingChange({...newSetting, term: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amortization">Amortization (months)</Label>
            <Input 
              id="amortization"
              type="number"
              value={newSetting.amortization}
              onChange={(e) => onSettingChange({...newSetting, amortization: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="softCostPercentage">Soft Costs (%)</Label>
          <Input 
            id="softCostPercentage"
            type="number"
            step="0.01"
            value={newSetting.softCostPercentage}
            onChange={(e) => onSettingChange({...newSetting, softCostPercentage: Number(e.target.value)})}
          />
        </div>

        <Accordion 
          type="single" 
          collapsible
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="border rounded-md"
        >
          <AccordionItem value="document-requirements">
            <AccordionTrigger className="px-4">Required Document Generation</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="creditCheck" 
                    checked={newSetting.requiredDocuments.creditCheck}
                    onCheckedChange={(checked) => handleDocRequirementChange('creditCheck', !!checked)}
                  />
                  <Label htmlFor="creditCheck">Credit Check</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="backgroundCheck" 
                    checked={newSetting.requiredDocuments.backgroundCheck}
                    onCheckedChange={(checked) => handleDocRequirementChange('backgroundCheck', !!checked)}
                  />
                  <Label htmlFor="backgroundCheck">Background Check</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="bankruptcyReport" 
                    checked={newSetting.requiredDocuments.bankruptcyReport}
                    onCheckedChange={(checked) => handleDocRequirementChange('bankruptcyReport', !!checked)}
                  />
                  <Label htmlFor="bankruptcyReport">Bankruptcy Report</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="underwritingDocuments" 
                    checked={newSetting.requiredDocuments.underwritingDocuments}
                    onCheckedChange={(checked) => handleDocRequirementChange('underwritingDocuments', !!checked)}
                  />
                  <Label htmlFor="underwritingDocuments">Underwriting Documents</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="closingReport" 
                    checked={newSetting.requiredDocuments.closingReport}
                    onCheckedChange={(checked) => handleDocRequirementChange('closingReport', !!checked)}
                  />
                  <Label htmlFor="closingReport">Closing Report</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button onClick={onAddSetting} className="mt-2">
          <Plus className="mr-2 h-4 w-4" /> Add Setting
        </Button>
      </div>
    </div>
  );
};

export default LoanSettingsForm;
