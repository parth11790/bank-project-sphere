
import { useState } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { useTableData } from '@/hooks/useTableData';
import { useUseOfProceedsColumns } from '@/hooks/useUseOfProceedsColumns';
import { useUseOfProceedsRows } from '@/hooks/useUseOfProceedsRows';
import { useUseOfProceedsEditData } from '@/hooks/useUseOfProceedsEditData';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';

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
  // Initialize with all default columns
  const initialColumns: UseOfProceedsColumn[] = [
    { column_id: 'col_1', column_name: 'Borrower Equity', is_loan: false },
    { column_id: 'col_2', column_name: 'Borrower Contribution', is_loan: false },
    { column_id: 'col_3', column_name: 'Seller or Participant', is_loan: true, interest_rate: 5, term_years: 10, amortization_months: 120 },
    { column_id: 'col_4', column_name: 'Seller (Standby)', is_loan: true, interest_rate: 5, term_years: 10, amortization_months: 120 },
    { column_id: 'col_5', column_name: '7(a)', is_loan: true, interest_rate: 6, term_years: 25, amortization_months: 300 },
    { column_id: 'col_6', column_name: '504', is_loan: true, interest_rate: 5.5, term_years: 25, amortization_months: 300 },
    { column_id: 'col_7', column_name: 'Express', is_loan: true, interest_rate: 7, term_years: 10, amortization_months: 120 },
    { column_id: 'col_8', column_name: 'Loan 4', is_loan: true, interest_rate: 6, term_years: 15, amortization_months: 180 }
  ];

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
