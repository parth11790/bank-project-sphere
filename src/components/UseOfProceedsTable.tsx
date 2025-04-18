
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';
import { useTableData } from '@/hooks/useTableData';
import { useUseOfProceedsForm } from '@/hooks/useUseOfProceedsForm';
import BaseTableContent from './useOfProceeds/BaseTableContent';
import BaseSummary from './useOfProceeds/BaseSummary';
import BaseTableActions from './useOfProceeds/BaseTableActions';
import { AddColumnDialog } from '@/components/useOfProceeds/AddColumnDialog';
import { AddRowDialog } from '@/components/useOfProceeds/AddRowDialog';

interface UseOfProceedsTableProps {
  projectId: string;
  data: Array<{
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

// Define types for columns and rows to match mockData structure
export type UseOfProceedsColumn = {
  column_id: string;
  column_name: string;
}

export type UseOfProceedsRow = {
  row_id: string;
  row_name: string;
  overall_category?: string;
}

const UseOfProceedsTable: React.FC<UseOfProceedsTableProps> = ({ projectId, data, onSave }) => {
  // State for managing custom columns and rows
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(mockUseOfProceedsColumns);
  const [rows, setRows] = useState<UseOfProceedsRow[]>(mockUseOfProceedsRows);
  
  const {
    editMode,
    isAddColumnDialogOpen,
    isAddRowDialogOpen,
    newColumnName,
    newRowCategory,
    selectedOverallCategory,
    filteredCategories,
    validationErrors,
    setIsAddColumnDialogOpen,
    setIsAddRowDialogOpen,
    setNewColumnName,
    setNewRowCategory,
    handleOverallCategoryChange,
    handleValueChange,
    getCellValue,
    handleSave,
    handleCancel,
    formatCurrency,
    calculateColumnTotal,
    startEditing,
    validateColumnName,
    validateRowCategory
  } = useUseOfProceedsForm({
    projectId,
    initialData: data,
    onSaveCallback: onSave
  });

  const { tableData } = useTableData({ data, rows, columns });

  // Function to add a new column
  const handleAddColumn = () => {
    const error = validateColumnName && validateColumnName(newColumnName);
    
    if (error || newColumnName.trim() === '') {
      return;
    }
    
    const newColumn: UseOfProceedsColumn = {
      column_id: `col_${Date.now()}`,
      column_name: newColumnName
    };
    
    setColumns([...columns, newColumn]);
    setNewColumnName('');
    setIsAddColumnDialogOpen(false);
  };

  // Function to add a new row
  const handleAddRow = () => {
    const error = validateRowCategory && validateRowCategory();
    
    if (error || newRowCategory.trim() === '') {
      return;
    }
    
    const newRow: UseOfProceedsRow = {
      row_id: `row_${Date.now()}`,
      row_name: newRowCategory,
      overall_category: selectedOverallCategory
    };
    
    setRows([...rows, newRow]);
    setNewRowCategory('');
    setIsAddRowDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <Card className="w-full overflow-hidden border-border/50 text-[10px]">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-semibold">Use of Proceeds</CardTitle>
              <CardDescription className="text-[10px]">Financial breakdown for the project</CardDescription>
            </div>
            <BaseTableActions 
              editMode={editMode}
              onEdit={startEditing}
              onSave={() => handleSave(rows, columns)}
              onCancel={handleCancel}
              onAddColumn={() => setIsAddColumnDialogOpen(true)}
              onAddRow={() => setIsAddRowDialogOpen(true)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <BaseTableContent 
              columns={columns}
              rows={rows}
              editMode={editMode}
              tableData={tableData}
              getCellValue={(rowName, columnName) => getCellValue(rowName, columnName, tableData)}
              handleValueChange={handleValueChange}
              calculateColumnTotal={(columnName) => calculateColumnTotal(columnName, tableData)}
              formatCurrency={formatCurrency}
              categoryOptions={categoryOptions}
              validationErrors={validationErrors}
              className="text-[10px]"
            />
          </div>
        </CardContent>
      </Card>
      
      <BaseSummary message="Loan types are determined by the Use of Proceeds allocation. Changes made here will update the project's loan types." />
      
      {/* Dialogs */}
      <AddColumnDialog 
        isOpen={isAddColumnDialogOpen}
        setIsOpen={setIsAddColumnDialogOpen}
        newColumnName={newColumnName}
        setNewColumnName={setNewColumnName}
        onAddColumn={handleAddColumn}
        validationErrors={validationErrors}
        validateColumnName={validateColumnName}
      />
      
      <AddRowDialog 
        isOpen={isAddRowDialogOpen}
        setIsOpen={setIsAddRowDialogOpen}
        selectedOverallCategory={selectedOverallCategory}
        newRowCategory={newRowCategory}
        filteredCategories={filteredCategories}
        onOverallCategoryChange={handleOverallCategoryChange}
        setNewRowCategory={setNewRowCategory}
        onAddRow={handleAddRow}
        uniqueOverallCategories={categoryOptions ? [...new Set(categoryOptions.map(item => item.overall))] : []}
        validationErrors={validationErrors}
      />
    </div>
  );
};

export default UseOfProceedsTable;
