
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';

interface ColumnSelectionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddColumns: (columns: Partial<UseOfProceedsColumn>[]) => void;
  projectLoans?: Array<{
    loan_id: string;
    loan_type: string;
    amount: number;
    rate?: number;
    term?: number;
  }>;
  existingColumns: UseOfProceedsColumn[];
}

const ColumnSelectionDialog: React.FC<ColumnSelectionDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddColumns,
  projectLoans = [],
  existingColumns
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Predefined column options
  const predefinedOptions = [
    { id: 'borrower_equity', name: 'Borrower Equity', is_loan: false },
    { id: 'borrower_contribution', name: 'Borrower Contribution', is_loan: false },
    { id: 'seller_loan', name: 'Seller Loan', is_loan: true, interest_rate: 5, term_years: 10, amortization_months: 120 },
    { id: 'seller_standby', name: 'Seller Standby', is_loan: true, interest_rate: 5, term_years: 10, amortization_months: 120 }
  ];

  // Project loan options
  const loanOptions = projectLoans.map(loan => ({
    id: `loan_${loan.loan_id}`,
    name: loan.loan_type,
    is_loan: true,
    interest_rate: loan.rate || 6,
    term_years: loan.term || 10,
    amortization_months: (loan.term || 10) * 12
  }));

  // Combine all options
  const allOptions = [...predefinedOptions, ...loanOptions];

  // Filter out columns that already exist
  const existingColumnNames = existingColumns.map(col => col.column_name.toLowerCase());
  const availableOptions = allOptions.filter(option => 
    !existingColumnNames.includes(option.name.toLowerCase())
  );

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleAddSelected = () => {
    const columnsToAdd = selectedColumns.map(columnId => {
      const option = allOptions.find(opt => opt.id === columnId);
      if (!option) return null;
      
      return {
        column_name: option.name,
        is_loan: option.is_loan,
        interest_rate: option.interest_rate,
        term_years: option.term_years,
        amortization_months: option.amortization_months
      };
    }).filter(Boolean) as Partial<UseOfProceedsColumn>[];

    onAddColumns(columnsToAdd);
    setSelectedColumns([]);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedColumns([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Columns
          </DialogTitle>
          <DialogDescription>
            Select the capital sources you want to add as columns
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 max-h-96 overflow-y-auto">
          {availableOptions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              All available columns have already been added
            </p>
          ) : (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Available Capital Sources</Label>
              
              {/* Predefined options */}
              {availableOptions.filter(opt => predefinedOptions.some(p => p.id === opt.id)).map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedColumns.includes(option.id)}
                    onCheckedChange={() => handleColumnToggle(option.id)}
                  />
                  <label htmlFor={option.id} className="text-sm flex-1 cursor-pointer">
                    {option.name}
                    {option.is_loan && (
                      <span className="text-xs text-muted-foreground ml-1">(Loan)</span>
                    )}
                  </label>
                </div>
              ))}

              {/* Project loans */}
              {loanOptions.length > 0 && availableOptions.some(opt => loanOptions.some(l => l.id === opt.id)) && (
                <>
                  <div className="border-t pt-3 mt-3">
                    <Label className="text-sm font-medium text-muted-foreground">Project Loans</Label>
                  </div>
                  {availableOptions.filter(opt => loanOptions.some(l => l.id === opt.id)).map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={selectedColumns.includes(option.id)}
                        onCheckedChange={() => handleColumnToggle(option.id)}
                      />
                      <label htmlFor={option.id} className="text-sm flex-1 cursor-pointer">
                        {option.name}
                        <span className="text-xs text-muted-foreground ml-1">(Project Loan)</span>
                      </label>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddSelected}
            disabled={selectedColumns.length === 0}
          >
            Add Selected ({selectedColumns.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnSelectionDialog;
