import React, { useState, useEffect } from 'react';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/mockData/utilities';
import { useParams } from 'react-router-dom';
import { Loan, Project, isProject } from '@/types/project';
import LoanSelectionDialog from './LoanSelectionDialog';
import AddColumnDialogContent from './dialogs/AddColumnDialogContent';

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

  const isSubmitDisabled = !columnName || 
    (isLoan && loanInputMethod === 'select' && !selectedLoan) ||
    (isLoan && loanInputMethod === 'manual' && (!interestRate || !termYears || !amortizationMonths));

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
        <AddColumnDialogContent
          columnName={columnName}
          setColumnName={setColumnName}
          isLoan={isLoan}
          setIsLoan={setIsLoan}
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
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitDisabled={isSubmitDisabled}
        />
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
