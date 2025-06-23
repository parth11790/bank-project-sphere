
import React from 'react';
import { Input } from '@/components/ui/input';

interface ManualLoanInputsProps {
  interestRate?: number;
  setInterestRate: (rate?: number) => void;
  termYears?: number;
  setTermYears: (years?: number) => void;
  amortizationMonths?: number;
  setAmortizationMonths: (months?: number) => void;
}

const ManualLoanInputs: React.FC<ManualLoanInputsProps> = ({
  interestRate,
  setInterestRate,
  termYears,
  setTermYears,
  amortizationMonths,
  setAmortizationMonths
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Interest Rate (% Annual)</label>
        <Input 
          type="number"
          value={interestRate || ''}
          onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : undefined)}
          placeholder="e.g. 5.25"
          step="0.01"
          min="0"
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Term (Years)</label>
        <Input 
          type="number"
          value={termYears || ''}
          onChange={(e) => setTermYears(e.target.value ? Number(e.target.value) : undefined)}
          placeholder="e.g. 10"
          step="1"
          min="1"
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Amortization (Months)</label>
        <Input 
          type="number"
          value={amortizationMonths || ''}
          onChange={(e) => setAmortizationMonths(e.target.value ? Number(e.target.value) : undefined)}
          placeholder="e.g. 120"
          step="1"
          min="1"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default ManualLoanInputs;
