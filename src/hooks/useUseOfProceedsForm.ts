
import { useState, useCallback } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';
import { toast } from 'sonner';
import { useUseOfProceedsValidation } from './useUseOfProceedsValidation';
import { useUseOfProceedsDialogs } from './useUseOfProceedsDialogs';
import { useUseOfProceedsFormatting } from './useUseOfProceedsFormatting';

interface UseUseOfProceedsFormProps {
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
  onSaveCallback?: (updatedData: any) => void;
}

export const useUseOfProceedsForm = ({ 
  projectId, 
  initialData, 
  onSaveCallback 
}: UseUseOfProceedsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  
  // Import hooks
  const {
    validationErrors,
    setValidationErrors,
    validateColumnName,
    validateRowCategory,
    validateValue,
    clearValidationError,
    validateAllData
  } = useUseOfProceedsValidation();

  const {
    isAddColumnDialogOpen,
    isAddRowDialogOpen,
    newColumnName,
    newRowCategory,
    newRowOverallCategory,
    selectedOverallCategory,
    filteredCategories,
    setIsAddColumnDialogOpen,
    setIsAddRowDialogOpen,
    setNewRowCategory,
    setNewRowOverallCategory,
    handleOverallCategoryChange,
    handleColumnNameChange
  } = useUseOfProceedsDialogs();

  const { formatCurrency, calculateColumnTotal } = useUseOfProceedsFormatting();

  // Toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);
  
  // Enter edit mode
  const startEditing = () => setEditMode(true);
  
  // Handle value change when editing
  const handleValueChange = (rowName: string, columnName: string, value: string) => {
    const key = `${rowName}-${columnName}`;
    const validationError = validateValue(value, rowName, columnName);
    
    if (validationError) {
      setValidationErrors(prev => ({
        ...prev,
        [key]: validationError
      }));
      return;
    } else {
      clearValidationError(key);
    }
    
    const numericValue = value === '' ? 0 : Number(value);
    
    setEditedData(prev => ({
      ...prev,
      [key]: numericValue
    }));
  };

  // Get display value for a cell (either edited or original)
  const getCellValue = (rowName: string, columnName: string, tableData: any) => {
    const key = `${rowName}-${columnName}`;
    if (editMode && key in editedData) {
      return editedData[key];
    }
    return tableData[rowName]?.[columnName] || 0;
  };

  // Handle save
  const handleSave = useCallback((rows: UseOfProceedsRow[], columns: UseOfProceedsColumn[]) => {
    // First validate all data
    if (!validateAllData(editedData)) {
      toast.error("Please fix validation errors before saving");
      return;
    }
    
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
    
    if (onSaveCallback) {
      onSaveCallback(updatedData);
    }
    
    setEditMode(false);
    setEditedData({});
    setValidationErrors({});
  }, [editedData, initialData, projectId, onSaveCallback, validateAllData, setValidationErrors]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setEditMode(false);
    setEditedData({});
    setValidationErrors({});
  }, [setValidationErrors]);

  // Custom setNewColumnName function that includes validation
  const setNewColumnNameWithValidation = (value: string) => {
    handleColumnNameChange(value, validateColumnName, clearValidationError, setValidationErrors);
  };

  return {
    editMode,
    editedData,
    validationErrors,
    isAddColumnDialogOpen,
    isAddRowDialogOpen,
    newColumnName,
    newRowCategory,
    newRowOverallCategory,
    selectedOverallCategory,
    filteredCategories,
    toggleEditMode,
    startEditing,
    setIsAddColumnDialogOpen,
    setIsAddRowDialogOpen,
    setNewColumnName: setNewColumnNameWithValidation,
    setNewRowCategory,
    setNewRowOverallCategory,
    handleOverallCategoryChange,
    handleValueChange,
    getCellValue,
    handleSave,
    handleCancel,
    formatCurrency,
    calculateColumnTotal: (columnName: string, tableData: any) => 
      calculateColumnTotal(columnName, tableData, getCellValue),
    validateColumnName,
    validateRowCategory: () => validateRowCategory(newRowCategory, newRowOverallCategory),
    validateValue
  };
};
