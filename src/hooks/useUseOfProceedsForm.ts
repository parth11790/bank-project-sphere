
import { useState, useCallback } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';
import { toast } from 'sonner';

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

// Define validation error types
interface ValidationErrors {
  [key: string]: string;
}

export const useUseOfProceedsForm = ({ 
  projectId, 
  initialData, 
  onSaveCallback 
}: UseUseOfProceedsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Dialogs state
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [isAddRowDialogOpen, setIsAddRowDialogOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newRowCategory, setNewRowCategory] = useState('');
  const [newRowOverallCategory, setNewRowOverallCategory] = useState('');
  const [selectedOverallCategory, setSelectedOverallCategory] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // Toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);
  
  // Enter edit mode
  const startEditing = () => setEditMode(true);
  
  // Validation utilities
  const validateValue = (value: string, rowName: string, columnName: string): string | null => {
    const key = `${rowName}-${columnName}`;
    
    // Check if value is a valid number
    if (value === '') {
      return null; // Empty is valid (will be converted to 0)
    }
    
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    
    if (numValue < 0) {
      return "Value cannot be negative";
    }
    
    // Additional validation for specific categories could be added here
    // For example, if certain categories have maximum values
    
    return null; // No validation error
  };
  
  // Clear validation errors for a specific field
  const clearValidationError = (key: string) => {
    if (validationErrors[key]) {
      const newErrors = { ...validationErrors };
      delete newErrors[key];
      setValidationErrors(newErrors);
    }
  };
  
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

  // Handle overall category change in add row dialog
  const handleOverallCategoryChange = (value: string) => {
    setSelectedOverallCategory(value);
    setNewRowOverallCategory(value);
    
    // Filter categories based on selected overall category
    const filtered = categoryOptions
      .filter(option => option.overall === value)
      .map(option => option.category);
    
    setFilteredCategories(filtered);
    if (filtered.length > 0) {
      setNewRowCategory(filtered[0]);
    } else {
      setNewRowCategory('');
    }
  };

  // Validate new column name
  const validateColumnName = (name: string): string | null => {
    if (!name.trim()) {
      return "Column name cannot be empty";
    }
    
    if (name.length > 30) {
      return "Column name must be 30 characters or less";
    }
    
    return null;
  };
  
  // Validate all data before saving
  const validateAllData = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;
    
    // Validate all edited data
    Object.entries(editedData).forEach(([key, value]) => {
      const [rowName, columnName] = key.split('-');
      const error = validateValue(String(value), rowName, columnName);
      
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });
    
    setValidationErrors(errors);
    return isValid;
  };

  // Handle save
  const handleSave = useCallback((rows: UseOfProceedsRow[], columns: UseOfProceedsColumn[]) => {
    // First validate all data
    if (!validateAllData()) {
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
  }, [editedData, initialData, projectId, onSaveCallback]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setEditMode(false);
    setEditedData({});
    setValidationErrors({});
  }, []);

  // Format a value as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate totals for each column
  const calculateColumnTotal = (columnName: string, tableData: any) => {
    let total = 0;
    Object.keys(tableData).forEach(rowName => {
      if (rowName !== 'TOTAL') {
        total += getCellValue(rowName, columnName, tableData);
      }
    });
    return total;
  };

  // Validate new row category
  const validateRowCategory = (): string | null => {
    if (!newRowCategory.trim()) {
      return "Category name cannot be empty";
    }
    
    if (!newRowOverallCategory.trim()) {
      return "Overall category must be selected";
    }
    
    return null;
  };

  // Handle column name change with validation
  const handleColumnNameChange = (value: string) => {
    setNewColumnName(value);
    const error = validateColumnName(value);
    
    if (error) {
      setValidationErrors(prev => ({
        ...prev,
        newColumnName: error
      }));
    } else {
      clearValidationError('newColumnName');
    }
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
    setNewColumnName: handleColumnNameChange,
    setNewRowCategory,
    setNewRowOverallCategory,
    handleOverallCategoryChange,
    handleValueChange,
    getCellValue,
    handleSave,
    handleCancel,
    formatCurrency,
    calculateColumnTotal,
    validateColumnName,
    validateRowCategory,
    validateValue
  };
};
