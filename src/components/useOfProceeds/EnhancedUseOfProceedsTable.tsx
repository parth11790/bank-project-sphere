
import React from 'react';
import { useEnhancedUseOfProceedsTable } from '@/hooks/useEnhancedUseOfProceedsTable';
import UseOfProceedsTableHeader from './UseOfProceedsTableHeader';
import UseOfProceedsTableContent from './UseOfProceedsTableContent';
import LoanSummary from './LoanSummary';
import UseOfProceedsDialogs from './UseOfProceedsDialogs';

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
      <div className="w-full overflow-hidden border-border/50">
        <UseOfProceedsTableHeader 
          editMode={editMode}
          onEdit={() => setEditMode(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onAddColumn={() => setIsAddColumnDialogOpen(true)}
          onAddRow={() => setIsAddRowDialogOpen(true)}
        />
        <UseOfProceedsTableContent 
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
      
      <LoanSummary columns={columns} formatCurrency={formatCurrency} />
      
      <UseOfProceedsDialogs 
        isAddColumnDialogOpen={isAddColumnDialogOpen}
        isAddRowDialogOpen={isAddRowDialogOpen}
        setIsAddColumnDialogOpen={setIsAddColumnDialogOpen}
        setIsAddRowDialogOpen={setIsAddRowDialogOpen}
        handleAddColumn={handleAddColumn}
        handleAddRow={handleAddRow}
        handleAddMultipleRows={handleAddMultipleRows}
        existingRows={existingRows}
      />
    </div>
  );
};

export default EnhancedUseOfProceedsTable;
