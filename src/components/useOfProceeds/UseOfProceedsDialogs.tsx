
import React from 'react';
import AddEnhancedColumnDialog from './AddEnhancedColumnDialog';
import AddEnhancedRowDialog from './AddEnhancedRowDialog';
import { UseOfProceedsColumn } from './EnhancedUseOfProceedsTable';
import { categoryOptions } from './categoryOptions';

interface UseOfProceedsDialogsProps {
  isAddColumnDialogOpen: boolean;
  isAddRowDialogOpen: boolean;
  setIsAddColumnDialogOpen: (open: boolean) => void;
  setIsAddRowDialogOpen: (open: boolean) => void;
  handleAddColumn: (column: Partial<UseOfProceedsColumn>) => void;
  handleAddRow: (overallCategory: string, rowName: string) => void;
  handleAddMultipleRows: (selectedOptions: Array<{overall: string, category: string}>) => void;
  existingRows: string[];
}

const UseOfProceedsDialogs: React.FC<UseOfProceedsDialogsProps> = ({
  isAddColumnDialogOpen,
  isAddRowDialogOpen,
  setIsAddColumnDialogOpen,
  setIsAddRowDialogOpen,
  handleAddColumn,
  handleAddRow,
  handleAddMultipleRows,
  existingRows
}) => {
  return (
    <>
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
    </>
  );
};

export default UseOfProceedsDialogs;
