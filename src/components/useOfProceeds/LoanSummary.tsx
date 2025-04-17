
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';

interface LoanSummaryProps {
  columns: UseOfProceedsColumn[];
  formatCurrency: (value: number) => string;
}

const LoanSummary: React.FC<LoanSummaryProps> = ({ columns, formatCurrency }) => {
  const loanColumns = columns.filter(col => col.is_loan);
  const totalMonthlyPayment = columns.reduce((acc, col) => acc + (col.monthly_payment || 0), 0);
  const totalAnnualPayment = columns.reduce((acc, col) => acc + (col.annual_payment || 0), 0);

  return (
    <Alert>
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">Loan Summary</p>
          <div className="space-y-1">
            {loanColumns.length > 0 ? (
              <>
                <p>Total monthly payment for all loans: {formatCurrency(totalMonthlyPayment)}</p>
                <p>Total annual payment for all loans: {formatCurrency(totalAnnualPayment)}</p>
                <p className="text-sm text-muted-foreground mt-2">Loan types are determined by the Use of Proceeds allocation.</p>
              </>
            ) : (
              <p>No loan columns have been added yet. Add a column with loan details to see payment calculations.</p>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default LoanSummary;
