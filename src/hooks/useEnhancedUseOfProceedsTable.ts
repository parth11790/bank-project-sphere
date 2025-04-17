
import { useState, useEffect } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';
import { useTableData } from '@/hooks/useTableData';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { useUseOfProceedsFormatting } from '@/hooks/useUseOfProceedsFormatting';

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
  const convertedColumns = [
    { column_id: 'col_1', column_name: 'Value', is_loan: false },
    { column_id: 'col_2', column_name: 'Percent', is_loan: false }
  ];

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(convertedColumns);
  const [rows, setRows] = useState<UseOfProceedsRow[]>([
    { row_id: 'row_1', row_name: 'Land', overall_category: 'Real Estate' },
    { row_id: 'row_2', row_name: 'Buildings', overall_category: 'Real Estate' },
    { row_id: 'row_3', row_name: 'Equipment', overall_category: 'Equipment' },
    { row_id: 'row_4', row_name: 'Working Capital', overall_category: 'Working Capital' },
    { row_id: 'row_5', row_name: 'TOTAL', overall_category: '' }
  ]);
  
  // State for dialogs
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [isAddRowDialogOpen, setIsAddRowDialogOpen] = useState(false);
  
  const { calculateLoanPayment } = useLoanCalculator();
  const { formatCurrency } = useUseOfProceedsFormatting();
  const { tableData, formatData } = useTableData({ data: initialData, rows, columns });

  // Calculate loan payments whenever columns change
  useEffect(() => {
    // Create a copy to avoid direct mutation
    const updatedColumns = [...columns];
    let hasChanges = false;

    columns.forEach((column, index) => {
      if (column.is_loan && column.interest_rate && column.term_years && column.amortization_months) {
        // Calculate the total amount for this loan column
        let totalLoanAmount = 0;
        Object.keys(tableData).forEach(rowName => {
          if (rowName !== 'TOTAL') {
            totalLoanAmount += tableData[rowName][column.column_name] || 0;
          }
        });

        // Calculate monthly and annual payments
        const { monthlyPayment } = calculateLoanPayment(
          totalLoanAmount,
          column.interest_rate,
          column.amortization_months
        );

        // Only update if the values actually changed
        if (
          updatedColumns[index].monthly_payment !== monthlyPayment ||
          updatedColumns[index].annual_payment !== monthlyPayment * 12
        ) {
          updatedColumns[index] = {
            ...column,
            monthly_payment: monthlyPayment,
            annual_payment: monthlyPayment * 12
          };
          hasChanges = true;
        }
      }
    });

    // Only update state if there were actual changes
    if (hasChanges) {
      setColumns(updatedColumns);
    }
  }, [tableData, calculateLoanPayment]);

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

  // Calculate totals for each column
  const calculateColumnTotal = (columnName: string) => {
    let total = 0;
    Object.keys(tableData).forEach(rowName => {
      if (rowName !== 'TOTAL') {
        total += getCellValue(rowName, columnName);
      }
    });
    return total;
  };

  // Calculate totals for each row
  const calculateRowTotal = (rowName: string) => {
    let total = 0;
    columns.forEach(column => {
      total += getCellValue(rowName, column.column_name);
    });
    return total;
  };

  // Add a new column with loan information
  const handleAddColumn = (newColumn: Partial<UseOfProceedsColumn>) => {
    const columnId = `col_${Date.now()}`;
    
    const column: UseOfProceedsColumn = {
      column_id: columnId,
      column_name: newColumn.column_name || 'New Column',
      is_loan: newColumn.is_loan || false,
      interest_rate: newColumn.interest_rate,
      term_years: newColumn.term_years,
      amortization_months: newColumn.amortization_months,
    };
    
    setColumns(prev => [...prev, column]);
    setIsAddColumnDialogOpen(false);
  };

  // Delete a column
  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.column_id !== columnId));
  };

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
    
    setIsAddRowDialogOpen(false);
  };

  // Delete a row
  const handleDeleteRow = (rowId: string) => {
    // Don't allow deleting the TOTAL row
    const rowToDelete = rows.find(row => row.row_id === rowId);
    if (rowToDelete?.row_name === 'TOTAL') return;
    
    setRows(rows.filter(row => row.row_id !== rowId));
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
      const overallCategory = row?.overall_category || 
        categoryOptions.find(opt => opt.category === rowName)?.overall || '';
      
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
    handleDeleteRow,
    handleSave,
    handleCancel,
    setEditMode,
    setIsAddColumnDialogOpen,
    setIsAddRowDialogOpen
  };
};
