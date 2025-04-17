
import { useState } from 'react';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';

export const useUseOfProceedsDialogs = () => {
  // Dialogs state
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [isAddRowDialogOpen, setIsAddRowDialogOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newRowCategory, setNewRowCategory] = useState('');
  const [newRowOverallCategory, setNewRowOverallCategory] = useState('');
  const [selectedOverallCategory, setSelectedOverallCategory] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

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

  // Handle column name change
  const handleColumnNameChange = (value: string, validateColumnName: (name: string) => string | null, clearValidationError: (key: string) => void, setValidationErrors: (errors: any) => void) => {
    setNewColumnName(value);
    const error = validateColumnName(value);
    
    if (error) {
      setValidationErrors((prev: any) => ({
        ...prev,
        newColumnName: error
      }));
    } else {
      clearValidationError('newColumnName');
    }
  };

  return {
    isAddColumnDialogOpen,
    isAddRowDialogOpen,
    newColumnName,
    newRowCategory,
    newRowOverallCategory,
    selectedOverallCategory,
    filteredCategories,
    setIsAddColumnDialogOpen,
    setIsAddRowDialogOpen,
    setNewColumnName,
    setNewRowCategory,
    setNewRowOverallCategory,
    handleOverallCategoryChange,
    handleColumnNameChange
  };
};
