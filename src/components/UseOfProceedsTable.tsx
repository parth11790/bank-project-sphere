
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData';
import { AddColumnDialog } from '@/components/useOfProceeds/AddColumnDialog';
import { AddRowDialog } from '@/components/useOfProceeds/AddRowDialog';
import { categoryOptions, uniqueOverallCategories } from '@/components/useOfProceeds/categoryOptions';
import { useTableData, BaseUseOfProceedsColumn } from '@/hooks/useTableData';
import { useUseOfProceedsForm } from '@/hooks/useUseOfProceedsForm';
import BaseTableContent from './useOfProceeds/BaseTableContent';
import BaseSummary from './useOfProceeds/BaseSummary';
import BaseTableActions from './useOfProceeds/BaseTableActions';

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
export type UseOfProceedsColumn = BaseUseOfProceedsColumn;

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
    startEditing
  } = useUseOfProceedsForm({
    projectId,
    initialData: data,
    onSaveCallback: onSave
  });

  const { tableData } = useTableData({ data, rows, columns });

  // Function to add a new column
  const handleAddColumn = () => {
    if (newColumnName.trim() === '') return;
    
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
    if (newRowCategory.trim() === '') return;
    
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
      <Card className="w-full overflow-hidden border-border/50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">Use of Proceeds</CardTitle>
              <CardDescription>Financial breakdown for the project</CardDescription>
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
          <div className="flex justify-end p-4 gap-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsAddColumnDialogOpen(true)}
            >
              <Plus size={16} />
              <span>Add Column</span>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsAddRowDialogOpen(true)}
            >
              <Plus size={16} />
              <span>Add Row</span>
            </Button>
          </div>
          
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
        uniqueOverallCategories={uniqueOverallCategories}
      />
    </div>
  );
};

export default UseOfProceedsTable;
