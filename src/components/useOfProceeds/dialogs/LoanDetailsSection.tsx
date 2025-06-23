
import React from 'react';
import LoanInputMethodSelector from './LoanInputMethodSelector';
import SelectedLoanDisplay from './SelectedLoanDisplay';
import ManualLoanInputs from './ManualLoanInputs';
import { Button } from '@/components/ui/button';

interface LoanDetailsSectionProps {
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
}

const LoanDetailsSection: React.FC<LoanDetailsSectionProps> = ({
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
  formatCurrency
}) => {
  const handleLoanInputMethodChange = (method: 'select' | 'manual') => {
    setLoanInputMethod(method);
    if (method === 'select' && projectLoans.length > 0) {
      setIsLoanSelectionOpen(true);
    } else if (method === 'manual') {
      setSelectedLoan(null);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-muted/30">
      <LoanInputMethodSelector
        loanInputMethod={loanInputMethod}
        onMethodChange={handleLoanInputMethodChange}
        projectLoansCount={projectLoans.length}
      />

      {loanInputMethod === 'select' && selectedLoan && (
        <SelectedLoanDisplay
          selectedLoan={selectedLoan}
          formatCurrency={formatCurrency}
          onChangeLoan={() => setIsLoanSelectionOpen(true)}
        />
      )}

      {loanInputMethod === 'select' && !selectedLoan && projectLoans.length > 0 && (
        <div className="text-center py-4">
          <Button 
            variant="outline"
            onClick={() => setIsLoanSelectionOpen(true)}
          >
            Select a Project Loan
          </Button>
        </div>
      )}
      
      {loanInputMethod === 'manual' && (
        <ManualLoanInputs
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          termYears={termYears}
          setTermYears={setTermYears}
          amortizationMonths={amortizationMonths}
          setAmortizationMonths={setAmortizationMonths}
        />
      )}
    </div>
  );
};

export default LoanDetailsSection;
