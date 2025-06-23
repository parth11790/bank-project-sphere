
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { Loan } from '@/types/project';

interface LoanSelectionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projectLoans: Loan[];
  onSelectLoan: (loan: Loan) => void;
  formatCurrency: (amount: number) => string;
}

const LoanSelectionDialog: React.FC<LoanSelectionDialogProps> = ({
  isOpen,
  setIsOpen,
  projectLoans,
  onSelectLoan,
  formatCurrency
}) => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleSelectLoan = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleConfirmSelection = () => {
    if (selectedLoan) {
      onSelectLoan(selectedLoan);
      setIsOpen(false);
      setSelectedLoan(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedLoan(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Project Loan</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {projectLoans.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No project loans available</p>
              <p className="text-sm">Create loans in the Project Loans section first</p>
            </div>
          ) : (
            projectLoans.map((loan) => (
              <Card 
                key={loan.loan_id}
                className={`cursor-pointer transition-all ${
                  selectedLoan?.loan_id === loan.loan_id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleSelectLoan(loan)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{loan.loan_type}</h3>
                      <Badge variant="outline" className="mt-1">
                        {loan.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-semibold">
                        <DollarSign className="h-4 w-4" />
                        {formatCurrency(loan.amount)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {loan.rate && (
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <span>Interest Rate: {loan.rate}%</span>
                      </div>
                    )}
                    {loan.term && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Term: {loan.term} years</span>
                      </div>
                    )}
                    {loan.payment && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Monthly Payment: {formatCurrency(loan.payment)}</span>
                      </div>
                    )}
                  </div>
                  
                  {loan.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {loan.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSelection}
            disabled={!selectedLoan}
          >
            Select Loan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanSelectionDialog;
