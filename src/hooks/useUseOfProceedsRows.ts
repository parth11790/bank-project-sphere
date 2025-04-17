
import { useState } from 'react';
import { UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';

interface UseUseOfProceedsRowsProps {
  initialRows: UseOfProceedsRow[];
}

export const useUseOfProceedsRows = ({
  initialRows
}: UseUseOfProceedsRowsProps) => {
  const [rows, setRows] = useState<UseOfProceedsRow[]>(initialRows);

  // Add a new row
  const handleAddRow = (overallCategory: string, rowName: string) => {
    if (!rowName) return;
    
    const newRow: UseOfProceedsRow = {
      row_id: `row_${Date.now()}`,
      row_name: rowName,
      overall_category: overallCategory
    };
    
    // Add the new row before TOTAL row
    const totalRowIndex = rows.findIndex(row => row.row_name === 'TOTAL');
    
    if (totalRowIndex !== -1) {
      const newRows = [...rows];
      newRows.splice(totalRowIndex, 0, newRow);
      setRows(newRows);
    } else {
      setRows([...rows, newRow]);
    }
  };

  // Add multiple rows at once
  const handleAddMultipleRows = (selectedOptions: Array<{overall: string, category: string}>) => {
    if (!selectedOptions.length) return;
    
    const newRows = [...rows];
    const totalRowIndex = newRows.findIndex(row => row.row_name === 'TOTAL');
    
    // Create new row objects from selected options
    const rowsToAdd = selectedOptions.map(option => ({
      row_id: `row_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      row_name: option.category,
      overall_category: option.overall
    }));
    
    // Insert new rows before TOTAL row if it exists
    if (totalRowIndex !== -1) {
      newRows.splice(totalRowIndex, 0, ...rowsToAdd);
      setRows(newRows);
    } else {
      setRows([...rows, ...rowsToAdd]);
    }
  };

  // Delete a row
  const handleDeleteRow = (rowId: string) => {
    // Don't allow deleting the TOTAL row
    const rowToDelete = rows.find(row => row.row_id === rowId);
    if (rowToDelete?.row_name === 'TOTAL') return;
    
    setRows(rows.filter(row => row.row_id !== rowId));
  };

  return {
    rows,
    setRows,
    handleAddRow,
    handleAddMultipleRows,
    handleDeleteRow
  };
};
