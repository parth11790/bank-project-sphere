
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData/utilities';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { useTableData } from '@/hooks/useTableData';

// Import our extracted components
import AddEnhancedColumnDialog from './AddEnhancedColumnDialog';
import AddEnhancedRowDialog from './AddEnhancedRowDialog';
import ProceedsTable from './ProceedsTable';
import LoanSummary from './LoanSummary';
import TableActions from './TableActions';

// Enhanced types
export type UseOfProceedsColumn = {
  column_id: string;
  column_name: string;
  is_loan: boolean;
  interest_rate?: number;
  term_years?: number;
  amortization_months?: number;
  monthly_payment?: number;
  annual_payment?: number;
}

export type UseOfProceedsRow = {
  row_id: string;
  row_name: string;
  overall_category?: string;
}

interface EnhancedUseOfProceedsTableProps {
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

const EnhancedUseOfProceedsTable: React.FC<EnhancedUseOfProceedsTableProps> = ({
  projectId,
  initialData,
  onSave
}) => {
  // Convert the mock columns to our enhanced format
  const convertedColumns = mockUseOfProceedsColumns.map(col => ({
    ...col,
    is_loan: false,
  }));

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(convertedColumns);
  const [rows, setRows] = useState<UseOfProceedsRow[]>(mockUseOfProceedsRows);
  
  // State for dialogs - set both to false by default to prevent auto-opening
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [isAddRowDialogOpen, setIsAddRowDialogOpen] = useState(false);
  
  const { calculateLoanPayment } = useLoanCalculator();
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

  // Format a value as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
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

  return (
    <div className="space-y-4">
      <Card className="w-full overflow-hidden border-border/50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">Use of Proceeds</CardTitle>
              <CardDescription>Financial breakdown for the project</CardDescription>
            </div>
            <TableActions 
              editMode={editMode}
              onEdit={() => setEditMode(true)}
              onSave={handleSave}
              onCancel={handleCancel}
              onAddColumn={() => setIsAddColumnDialogOpen(true)}
              onAddRow={() => setIsAddRowDialogOpen(true)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <ProceedsTable 
              columns={columns}
              rows={rows}
              tableData={tableData}
              editMode={editMode}
              getCellValue={getCellValue}
              handleValueChange={handleValueChange}
              calculateColumnTotal={calculateColumnTotal}
              calculateRowTotal={calculateRowTotal}
              formatCurrency={formatCurrency}
              handleDeleteColumn={handleDeleteColumn}
              handleDeleteRow={handleDeleteRow}
            />
          </div>
        </CardContent>
      </Card>
      
      <LoanSummary columns={columns} formatCurrency={formatCurrency} />
      
      {/* Column Dialog */}
      <AddEnhancedColumnDialog 
        isOpen={isAddColumnDialogOpen}
        setIsOpen={setIsAddColumnDialogOpen}
        onAddColumn={handleAddColumn}
      />
      
      {/* Row Dialog */}
      <AddEnhancedRowDialog 
        isOpen={isAddRowDialogOpen}
        setIsOpen={setIsAddRowDialogOpen}
        onAddRow={handleAddRow}
        uniqueOverallCategories={categoryOptions ? [...new Set(categoryOptions.map(item => item.overall))] : []}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};

export default EnhancedUseOfProceedsTable;
