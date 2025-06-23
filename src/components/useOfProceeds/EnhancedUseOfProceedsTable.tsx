
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useEnhancedUseOfProceedsTable } from '@/hooks/useEnhancedUseOfProceedsTable';

// Import components
import AddEnhancedColumnDialog from './AddEnhancedColumnDialog';
import AddEnhancedRowDialog from './AddEnhancedRowDialog';
import ProceedsTable from './ProceedsTable';
import LoanSummary from './LoanSummary';
import { TableHeader } from '@/components/ui/table';
import TableActions from './TableActions';
import { categoryOptions } from './categoryOptions';

// Enhanced types
export type UseOfProceedsColumn = {
  column_id: string;
  column_name: string;
  is_loan?: boolean;
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
  const {
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
  } = useEnhancedUseOfProceedsTable({
    projectId,
    initialData,
    onSave
  });

  // Get the existing row names
  const existingRows = rows.map(row => row.row_name);

  return (
    <div className="space-y-4">
      <Card className="w-full overflow-hidden border-border/50">
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Use of Proceeds</h3>
          <TableActions 
            editMode={editMode}
            onEdit={() => setEditMode(true)}
            onSave={handleSave}
            onCancel={handleCancel}
            onAddColumn={() => setIsAddColumnDialogOpen(true)}
            onAddRow={() => setIsAddRowDialogOpen(true)}
          />
        </div>
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
      
      {/* Row Dialog - Using our updated component with multiple selection */}
      <AddEnhancedRowDialog 
        isOpen={isAddRowDialogOpen}
        setIsOpen={setIsAddRowDialogOpen}
        onAddRow={handleAddRow}
        onAddMultipleRows={handleAddMultipleRows}
        uniqueOverallCategories={[...new Set(categoryOptions.map(item => item.overall))]}
        categoryOptions={categoryOptions}
        existingRows={existingRows}
      />
    </div>
  );
};

export default EnhancedUseOfProceedsTable;
