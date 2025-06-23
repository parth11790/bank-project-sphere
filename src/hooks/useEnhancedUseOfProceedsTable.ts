
import { useState, useMemo } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { useTableData } from '@/hooks/useTableData';
import { useUseOfProceedsColumns } from '@/hooks/useUseOfProceedsColumns';
import { useUseOfProceedsRows } from '@/hooks/useUseOfProceedsRows';
import { useUseOfProceedsEditData } from '@/hooks/useUseOfProceedsEditData';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/lib/mockData/utilities';
import { useParams } from 'react-router-dom';
import { Project, isProject, Loan } from '@/types/project';

interface UseEnhancedUseOfProceedsTableProps {
  projectId: string;
  initialData: Array<{
    id?: number;
    proceeds_id?: string;
    project_id?: string;
    column_name?: string;
    row_name: string;
    overall_category?: string;
    value: number;
  }>;
  onSave?: (updatedData: any) => void;
}

export const useEnhancedUseOfProceedsTable = ({
  projectId,
  initialData,
  onSave
}: UseEnhancedUseOfProceedsTableProps) => {
  // Fetch project data to get available loans
  const { data: projectData } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;
  
  // Get loans from the project - check both loans array and loan_types for compatibility
  const projectLoans: Loan[] = useMemo(() => {
    if (!project) return [];
    
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

  // Create initial columns with default columns + project loan columns
  const initialColumns: UseOfProceedsColumn[] = useMemo(() => {
    const defaultColumns: UseOfProceedsColumn[] = [
      { column_id: 'col_borrower_equity', column_name: 'Borrower Equity', is_loan: false },
      { column_id: 'col_borrower_contribution', column_name: 'Borrower Contribution', is_loan: false }
    ];

    // Add columns for each project loan
    const loanColumns: UseOfProceedsColumn[] = projectLoans.map((loan, index) => ({
      column_id: `col_loan_${loan.loan_id}`,
      column_name: loan.loan_type,
      is_loan: true,
      interest_rate: loan.rate,
      term_years: loan.term,
      amortization_months: loan.term ? loan.term * 12 : undefined,
    }));

    return [...defaultColumns, ...loanColumns];
  }, [projectLoans]);

  // Initialize with all category options as rows
  const initialRows: UseOfProceedsRow[] = [
    ...categoryOptions.map((option, index) => ({
      row_id: `row_${index}`,
      row_name: option.category,
      overall_category: option.overall
    })),
    // Add TOTAL row at the end
    { row_id: 'row_total', row_name: 'TOTAL', overall_category: '' }
  ];
  
  // State for dialogs - Explicitly initialize both to false to prevent auto-opening
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState<boolean>(false);
  const [isAddRowDialogOpen, setIsAddRowDialogOpen] = useState<boolean>(false);
  
  // Use our custom hooks
  const { rows, handleAddRow, handleAddMultipleRows, handleDeleteRow } = useUseOfProceedsRows({
    initialRows
  });
  
  const { tableData } = useTableData({ data: initialData, rows, columns: initialColumns });
  
  const { columns, handleAddColumn, handleDeleteColumn } = useUseOfProceedsColumns({
    initialColumns,
    tableData
  });
  
  const {
    editMode,
    setEditMode,
    handleValueChange,
    getCellValue,
    calculateColumnTotal,
    calculateRowTotal,
    formatCurrency,
    handleSave,
    handleCancel
  } = useUseOfProceedsEditData({
    initialData,
    projectId,
    rows,
    columns,
    tableData,
    onSave
  });

  return {
    editMode,
    columns,
    rows,
    tableData,
    isAddColumnDialogOpen,
    isAddRowDialogOpen,
    handleValueChange,
    getCellValue,
    calculateColumnTotal,
    calculateRowTotal,
    formatCurrency,
    handleAddColumn,
    handleDeleteColumn,
    handleAddRow,
    handleAddMultipleRows,
    handleDeleteRow,
    handleSave,
    handleCancel,
    setEditMode,
    setIsAddColumnDialogOpen,
    setIsAddRowDialogOpen
  };
};
