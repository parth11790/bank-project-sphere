
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData';
import { AddColumnDialog } from '@/components/useOfProceeds/AddColumnDialog';
import { AddRowDialog } from '@/components/useOfProceeds/AddRowDialog';
import { categoryOptions, uniqueOverallCategories } from '@/components/useOfProceeds/categoryOptions';
import { useTableData, BaseUseOfProceedsColumn } from '@/hooks/useTableData';
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
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  
  // State for managing custom columns and rows
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(mockUseOfProceedsColumns);
  const [rows, setRows] = useState<UseOfProceedsRow[]>(mockUseOfProceedsRows);
  
  // State for dialogs - set both to false by default to prevent auto-opening
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

  const { tableData, formatData } = useTableData({ data, rows, columns });

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
      overall_category: newRowOverallCategory
    };
    
    setRows([...rows, newRow]);
    setNewRowCategory('');
    setNewRowOverallCategory('');
    setIsAddRowDialogOpen(false);
  };

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

  // Handle save
  const handleSave = () => {
    // Create updated data in the original format
    const updatedData = [...data];
    
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
            <BaseTableActions 
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
              getCellValue={getCellValue}
              handleValueChange={handleValueChange}
              calculateColumnTotal={calculateColumnTotal}
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
