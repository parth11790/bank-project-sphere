
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DocumentRequirementsFormProps {
  newFormRequirement: {
    loanType: string;
    amountMin: number;
    amountMax: number;
    participantType: string;
    formName: string;
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
  return (
    <div>
      <h3 className="text-lg font-medium">Add Required Document</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Specify which forms are required for different participants based on loan type and amount.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reqLoanType">Loan Type</Label>
          <Select
            value={newFormRequirement.loanType}
            onValueChange={(value) => onFormChange({...newFormRequirement, loanType: value})}
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reqAmountMin">Min Amount ($)</Label>
            <Input 
              id="reqAmountMin"
              type="number"
              value={newFormRequirement.amountMin}
              onChange={(e) => onFormChange({...newFormRequirement, amountMin: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reqAmountMax">Max Amount ($)</Label>
            <Input 
              id="reqAmountMax"
              type="number"
              value={newFormRequirement.amountMax}
              onChange={(e) => onFormChange({...newFormRequirement, amountMax: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="participantType">Participant Type</Label>
          <Select
            value={newFormRequirement.participantType}
            onValueChange={(value) => onFormChange({...newFormRequirement, participantType: value})}
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
            onChange={(e) => onFormChange({...newFormRequirement, formName: e.target.value})}
            placeholder="e.g. Personal Financial Statement"
          />
        </div>

        <Button onClick={onAddForm} className="mt-2">
          <Plus className="mr-2 h-4 w-4" /> Add Requirement
        </Button>
      </div>
    </div>
  );
};

export default DocumentRequirementsForm;
