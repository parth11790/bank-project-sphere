
import { useState } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { useUseOfProceedsFormatting } from '@/hooks/useUseOfProceedsFormatting';
import { useTableCalculations } from '@/hooks/useTableCalculations';
import { FormattedTableData } from '@/hooks/useTableData';

interface UseUseOfProceedsEditDataProps {
  initialData: Array<{
    id?: number;
    proceeds_id?: string;
    project_id?: string;
    column_name?: string;
    row_name: string;
    overall_category?: string;
    value: number;
  }>;
  projectId: string;
  rows: UseOfProceedsRow[];
  columns: UseOfProceedsColumn[];
  tableData: FormattedTableData;
  onSave?: (updatedData: any) => void;
}

export const useUseOfProceedsEditData = ({
  initialData,
  projectId,
  rows,
  columns,
  tableData,
  onSave
}: UseUseOfProceedsEditDataProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  const { formatCurrency } = useUseOfProceedsFormatting();

  // Handle value change when editing
  const handleValueChange = (rowName: string, columnName: string, value: string) => {
    const key = `${rowName}-${columnName}`;
    const numericValue = value === '' ? 0 : Number(value);
    
    setEditedData(prev => ({
      ...prev,
      [key]: numericValue
    }));
  };

  // Get display value for a cell (either edited or original)
  const getCellValue = (rowName: string, columnName: string) => {
    const key = `${rowName}-${columnName}`;
    if (editMode && key in editedData) {
      return editedData[key];
    }
    return tableData[rowName]?.[columnName] || 0;
  };

  // Use the new table calculations hook
  const {
    calculateColumnTotal,
    calculateRowTotal: calculateRowTotalByColumns
  } = useTableCalculations({
    tableData,
    getCellValue
  });

  // Calculate totals for each row (wrapper for compatibility)
  const calculateRowTotal = (rowName: string) => {
    return calculateRowTotalByColumns(rowName, columns.map(col => col.column_name));
  };

  // Handle save
  const handleSave = () => {
    // Create updated data in the original format
    const updatedData = [...initialData];
    
    Object.entries(editedData).forEach(([key, value]) => {
      const [rowName, columnName] = key.split('-');
      const itemIndex = updatedData.findIndex(
        item => item.row_name === rowName && item.column_name === columnName
      );
      
      // Find the overall category for this row
      const row = rows.find(r => r.row_name === rowName);
      const overallCategory = row?.overall_category || '';
      
      if (itemIndex >= 0) {
        updatedData[itemIndex] = {
          ...updatedData[itemIndex],
          value,
          overall_category: overallCategory
        };
      } else {
        // Add a new item if it doesn't exist
        updatedData.push({
          proceeds_id: `proc_new_${Date.now()}`,
          project_id: projectId,
          column_name: columnName,
          row_name: rowName,
          overall_category: overallCategory,
          value
        });
      }
    });
    
    if (onSave) {
      onSave(updatedData);
    }
    
    setEditMode(false);
    setEditedData({});
  };

  // Handle cancel
  const handleCancel = () => {
    setEditMode(false);
    setEditedData({});
  };

  return {
    editMode,
    setEditMode,
    handleValueChange,
    getCellValue,
    calculateColumnTotal,
    calculateRowTotal,
    formatCurrency,
    handleSave,
    handleCancel
  };
};
