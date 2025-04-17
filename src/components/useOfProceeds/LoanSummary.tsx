
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';

interface LoanSummaryProps {
  columns: UseOfProceedsColumn[];
  formatCurrency: (value: number) => string;
}

const LoanSummary: React.FC<LoanSummaryProps> = ({ columns, formatCurrency }) => {
  const totalMonthlyPayment = columns.reduce((acc, col) => acc + (col.monthly_payment || 0), 0);
  const totalAnnualPayment = columns.reduce((acc, col) => acc + (col.annual_payment || 0), 0);

  return (
    <Alert>
      <AlertDescription>
        <div className="space-y-1">
          <p>Loan types are determined by the Use of Proceeds allocation.</p>
          <p>Total monthly payment for all loans: {formatCurrency(totalMonthlyPayment)}</p>
          <p>Total annual payment for all loans: {formatCurrency(totalAnnualPayment)}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default LoanSummary;
