
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/mockData/utilities';
import { useParams } from 'react-router-dom';
import { Loan, Project, isProject } from '@/types/project';
import LoanSelectionDialog from './LoanSelectionDialog';

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
  const { projectId } = useParams<{ projectId: string }>();
  const [columnName, setColumnName] = useState('');
  const [isLoan, setIsLoan] = useState(false);
  const [loanInputMethod, setLoanInputMethod] = useState<'select' | 'manual'>('select');
  const [interestRate, setInterestRate] = useState<number | undefined>(undefined);
  const [termYears, setTermYears] = useState<number | undefined>(undefined);
  const [amortizationMonths, setAmortizationMonths] = useState<number | undefined>(undefined);
  const [isLoanSelectionOpen, setIsLoanSelectionOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // Fetch project data to get available loans
  const { data: projectData, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;
  
  // Get loans from the project - check both loans array and loan_types for compatibility
  const projectLoans: Loan[] = React.useMemo(() => {
    if (!project) return [];
    
    console.log('Project data:', project);
    console.log('Project loans:', project.loans);
    console.log('Project loan_types:', project.loan_types);
    
    // First try to get from the loans array (new structure)
    if (project.loans && Array.isArray(project.loans)) {
      return project.loans;
    }
    
    // Fallback to loan_types if loans array doesn't exist (legacy structure)
    if (project.loan_types && Array.isArray(project.loan_types)) {
      return project.loan_types.map((loanType, index) => {
        // Handle both string and object loan types
        if (typeof loanType === 'string') {
          return {
            loan_id: `loan_${index}`,
            loan_type: loanType,
            amount: 0,
            business_id: project.main_business?.business_id || '',
            status: 'active' as const
          };
        } else {
          return {
            loan_id: `loan_${index}`,
            loan_type: loanType.type,
            amount: loanType.amount,
            rate: loanType.rate,
            term: loanType.term,
            payment: loanType.payment,
            description: loanType.description,
            business_id: project.main_business?.business_id || '',
            status: 'active' as const
          };
        }
      });
    }
    
    return [];
  }, [project]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setColumnName('');
      setIsLoan(false);
      setLoanInputMethod('select');
      setInterestRate(undefined);
      setTermYears(undefined);
      setAmortizationMonths(undefined);
      setSelectedLoan(null);
    }
  }, [isOpen]);

  const handleLoanCheckboxChange = (checked: boolean) => {
    setIsLoan(checked);
    if (!checked) {
      setSelectedLoan(null);
      setInterestRate(undefined);
      setTermYears(undefined);
      setAmortizationMonths(undefined);
      setLoanInputMethod('select');
    }
  };

  const handleLoanInputMethodChange = (method: 'select' | 'manual') => {
    setLoanInputMethod(method);
    if (method === 'select' && projectLoans.length > 0) {
      setIsLoanSelectionOpen(true);
    } else if (method === 'manual') {
      setSelectedLoan(null);
    }
  };

  const handleLoanSelection = (loan: Loan) => {
    setSelectedLoan(loan);
    setColumnName(loan.loan_type);
    setInterestRate(loan.rate);
    setTermYears(loan.term);
    setAmortizationMonths(loan.term ? loan.term * 12 : undefined);
  };

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
    setLoanInputMethod('select');
    setInterestRate(undefined);
    setTermYears(undefined);
    setAmortizationMonths(undefined);
    setSelectedLoan(null);
    setIsOpen(false);
  };

  // If the dialog is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  if (isLoading) {
    return (
      <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
          <p>Loading project data...</p>
        </div>
      </dialog>
    );
  }

  return (
    <>
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
              <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                <div>
                  <label className="text-sm font-medium mb-3 block">How would you like to add loan details?</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="selectLoan" 
                        name="loanMethod"
                        checked={loanInputMethod === 'select'}
                        onChange={() => handleLoanInputMethodChange('select')}
                        className="rounded border-gray-300"
                        disabled={projectLoans.length === 0}
                      />
                      <label htmlFor="selectLoan" className="text-sm">
                        Select from project loans {projectLoans.length === 0 ? '(No loans available)' : `(${projectLoans.length} available)`}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="manualLoan" 
                        name="loanMethod"
                        checked={loanInputMethod === 'manual'}
                        onChange={() => handleLoanInputMethodChange('manual')}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="manualLoan" className="text-sm">Enter loan details manually</label>
                    </div>
                  </div>
                </div>

                {loanInputMethod === 'select' && selectedLoan && (
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Selected Loan:</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsLoanSelectionOpen(true)}
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
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={
                !columnName || 
                (isLoan && loanInputMethod === 'select' && !selectedLoan) ||
                (isLoan && loanInputMethod === 'manual' && (!interestRate || !termYears || !amortizationMonths))
              }
            >
              Add Column
            </Button>
          </div>
        </div>
      </dialog>

      <LoanSelectionDialog
        isOpen={isLoanSelectionOpen}
        setIsOpen={setIsLoanSelectionOpen}
        projectLoans={projectLoans}
        onSelectLoan={handleLoanSelection}
        formatCurrency={formatCurrency}
      />
    </>
  );
};

export default AddEnhancedColumnDialog;
