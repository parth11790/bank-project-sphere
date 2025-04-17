
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';

interface AddEnhancedColumnDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddColumn: (column: Partial<UseOfProceedsColumn>) => void;
}

const AddEnhancedColumnDialog: React.FC<AddEnhancedColumnDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddColumn
}) => {
  const [columnName, setColumnName] = useState('');
  const [isLoan, setIsLoan] = useState(false);
  const [interestRate, setInterestRate] = useState<number | undefined>(undefined);
  const [termYears, setTermYears] = useState<number | undefined>(undefined);
  const [amortizationMonths, setAmortizationMonths] = useState<number | undefined>(undefined);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setColumnName('');
      setIsLoan(false);
      setInterestRate(undefined);
      setTermYears(undefined);
      setAmortizationMonths(undefined);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onAddColumn({
      column_name: columnName,
      is_loan: isLoan,
      interest_rate: interestRate,
      term_years: termYears,
      amortization_months: amortizationMonths,
    });
    
    // Close dialog after submission
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset form and close dialog
    setColumnName('');
    setIsLoan(false);
    setInterestRate(undefined);
    setTermYears(undefined);
    setAmortizationMonths(undefined);
    setIsOpen(false);
  };

  // If the dialog is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="isLoan" 
              checked={isLoan}
              onChange={(e) => setIsLoan(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="isLoan" className="text-sm font-medium">This is a loan</label>
          </div>
          
          {isLoan && (
            <div className="space-y-4 p-4 border rounded-md bg-muted/30">
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
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!columnName || (isLoan && (!interestRate || !termYears || !amortizationMonths))}
          >
            Add Column
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default AddEnhancedColumnDialog;
