
import { useState } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { useTableData } from '@/hooks/useTableData';
import { useUseOfProceedsColumns } from '@/hooks/useUseOfProceedsColumns';
import { useUseOfProceedsRows } from '@/hooks/useUseOfProceedsRows';
import { useUseOfProceedsEditData } from '@/hooks/useUseOfProceedsEditData';

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
  // Convert the mock columns to our enhanced format
  const initialColumns = [
    { column_id: 'col_1', column_name: 'Value', is_loan: false },
    { column_id: 'col_2', column_name: 'Percent', is_loan: false }
  ];

  const initialRows = [
    { row_id: 'row_1', row_name: 'Land', overall_category: 'Real Estate' },
    { row_id: 'row_2', row_name: 'Buildings', overall_category: 'Real Estate' },
    { row_id: 'row_3', row_name: 'Equipment', overall_category: 'Equipment' },
    { row_id: 'row_4', row_name: 'Working Capital', overall_category: 'Working Capital' },
    { row_id: 'row_5', row_name: 'TOTAL', overall_category: '' }
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
