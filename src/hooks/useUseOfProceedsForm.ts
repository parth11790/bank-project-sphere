
import { useState } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { categoryOptions } from '@/components/useOfProceeds/categoryOptions';

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

  // Handle save
  const handleSave = (rows: UseOfProceedsRow[], columns: UseOfProceedsColumn[]) => {
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
  };

  // Handle cancel
  const handleCancel = () => {
    setEditMode(false);
    setEditedData({});
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
  const calculateColumnTotal = (columnName: string, tableData: any) => {
    let total = 0;
    Object.keys(tableData).forEach(rowName => {
      if (rowName !== 'TOTAL') {
        total += getCellValue(rowName, columnName, tableData);
      }
    });
    return total;
  };

  return {
    editMode,
    editedData,
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
    setNewColumnName,
    setNewRowCategory,
    setNewRowOverallCategory,
    handleOverallCategoryChange,
    handleValueChange,
    getCellValue,
    handleSave,
    handleCancel,
    formatCurrency,
    calculateColumnTotal
  };
};
