
import React from 'react';
import { Button } from '@/components/ui/button';

interface SelectedLoanDisplayProps {
  selectedLoan: any;
  formatCurrency: (amount: number) => string;
  onChangeLoan: () => void;
}

const SelectedLoanDisplay: React.FC<SelectedLoanDisplayProps> = ({
  selectedLoan,
  formatCurrency,
  onChangeLoan
}) => {
  return (
    <div className="p-4 border rounded-md bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Selected Loan:</span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onChangeLoan}
        >
          Change Loan
        </Button>
      </div>
      <div className="text-sm space-y-1">
        <p><strong>{selectedLoan.loan_type}</strong></p>
        <p>Amount: {formatCurrency(selectedLoan.amount)}</p>
        {selectedLoan.rate && <p>Rate: {selectedLoan.rate}%</p>}
        {selectedLoan.term && <p>Term: {selectedLoan.term} years</p>}
        {selectedLoan.payment && <p>Monthly Payment: {formatCurrency(selectedLoan.payment)}</p>}
      </div>
    </div>
  );
};

export default SelectedLoanDisplay;
