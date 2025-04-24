
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LoanRangeInputsProps {
  minAmount: number;
  maxAmount: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const LoanRangeInputs = ({
  minAmount,
  maxAmount,
  onMinChange,
  onMaxChange,
}: LoanRangeInputsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="reqAmountMin">Min Amount ($)</Label>
        <Input 
          id="reqAmountMin"
          type="number"
          value={minAmount}
          onChange={(e) => onMinChange(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reqAmountMax">Max Amount ($)</Label>
        <Input 
          id="reqAmountMax"
          type="number"
          value={maxAmount}
          onChange={(e) => onMaxChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default LoanRangeInputs;
