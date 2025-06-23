
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoanDetailsSection from './LoanDetailsSection';

interface AddColumnDialogContentProps {
  columnName: string;
  setColumnName: (name: string) => void;
  isLoan: boolean;
  setIsLoan: (isLoan: boolean) => void;
  loanInputMethod: 'select' | 'manual';
  setLoanInputMethod: (method: 'select' | 'manual') => void;
  interestRate?: number;
  setInterestRate: (rate?: number) => void;
  termYears?: number;
  setTermYears: (years?: number) => void;
  amortizationMonths?: number;
  setAmortizationMonths: (months?: number) => void;
  selectedLoan: any;
  setSelectedLoan: (loan: any) => void;
  projectLoans: any[];
  setIsLoanSelectionOpen: (open: boolean) => void;
  formatCurrency: (amount: number) => string;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitDisabled: boolean;
}

const AddColumnDialogContent: React.FC<AddColumnDialogContentProps> = ({
  columnName,
  setColumnName,
  isLoan,
  setIsLoan,
  loanInputMethod,
  setLoanInputMethod,
  interestRate,
  setInterestRate,
  termYears,
  setTermYears,
  amortizationMonths,
  setAmortizationMonths,
  selectedLoan,
  setSelectedLoan,
  projectLoans,
  setIsLoanSelectionOpen,
  formatCurrency,
  onSubmit,
  onCancel,
  isSubmitDisabled
}) => {
  const handleLoanCheckboxChange = (checked: boolean) => {
    setIsLoan(checked);
    if (!checked) {
      setSelectedLoan(null);
      setInterestRate(undefined);
      setTermYears(undefined);
      setAmortizationMonths(undefined);
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Column</h2>
      <p className="text-sm text-muted-foreground mb-4">Enter details for the new capital source</p>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Column Name</label>
          <Input 
            value={columnName} 
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="e.g. Phase 1, SBA Loan, etc."
            className="mt-1"
            disabled={selectedLoan !== null}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="isLoan" 
            checked={isLoan}
            onChange={(e) => handleLoanCheckboxChange(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="isLoan" className="text-sm font-medium">This is a loan</label>
        </div>

        {isLoan && (
          <LoanDetailsSection
            loanInputMethod={loanInputMethod}
            setLoanInputMethod={setLoanInputMethod}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            termYears={termYears}
            setTermYears={setTermYears}
            amortizationMonths={amortizationMonths}
            setAmortizationMonths={setAmortizationMonths}
            selectedLoan={selectedLoan}
            setSelectedLoan={setSelectedLoan}
            projectLoans={projectLoans}
            setIsLoanSelectionOpen={setIsLoanSelectionOpen}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={isSubmitDisabled}
        >
          Add Column
        </Button>
      </div>
    </div>
  );
};

export default AddColumnDialogContent;
