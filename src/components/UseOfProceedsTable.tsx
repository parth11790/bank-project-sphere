
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
type UseOfProceedsColumn = {
  column_id: string;
  column_name: string;
}

type UseOfProceedsRow = {
  row_id: string;
  row_name: string;
  overall_category?: string;
}

// Define the category options based on the user's requirements
const categoryOptions = [
  { overall: 'Purchase', category: 'BUSINESS ASSETS' },
  { overall: 'Land', category: 'LAND & BUILDING' },
  { overall: 'Construction', category: 'CONSTRUCTION' },
  { overall: 'Construction', category: 'PLANS AND PERMITS' },
  { overall: 'Construction', category: 'ARCH. & ENG.' },
  { overall: 'Construction', category: 'CONTINGENCY' },
  { overall: 'Construction', category: 'SUPERVISION FEE' },
  { overall: 'Construction', category: 'CONSTRUCTION SOFT COSTS' },
  { overall: 'Construction', category: 'INTEREST RESERVE' },
  { overall: 'INVentory', category: 'INVENTORY' },
  { overall: 'Furniture Fixtures and Equipment', category: 'EQUIPMENT' },
  { overall: 'Other', category: 'COMPLETION COMMITMENT' },
  { overall: 'Other', category: 'REFINANCE' },
  { overall: 'Soft Costs', category: 'APPRAISALS' },
  { overall: 'Soft Costs', category: 'EPA' },
  { overall: 'Soft Costs', category: 'ASBESTOS INSPECTION' },
  { overall: 'Soft Costs', category: 'BUSINESS VALUATION' },
  { overall: 'Soft Costs', category: 'LEGAL FEES' },
  { overall: 'Soft Costs', category: 'SBA LOAN PACKAGING FEE' },
  { overall: 'Soft Costs', category: 'TITLE' },
  { overall: 'Soft Costs', category: 'SURVEY/UCC SEARCHES' },
  { overall: 'Soft Costs', category: 'VEHICLE TITLE FEES' },
  { overall: 'Soft Costs', category: 'SBA GUARANTY FEE' },
  { overall: 'Soft Costs', category: 'ORIGINATION FEE' },
  { overall: 'Soft Costs', category: 'SOFT COSTS' },
  { overall: 'Working Capital', category: 'WORKING CAPITAL' },
  { overall: 'Conscessions', category: 'CONCESSIONS' },
];

// Get unique overall categories
const uniqueOverallCategories = [...new Set(categoryOptions.map(item => item.overall))];

const UseOfProceedsTable: React.FC<UseOfProceedsTableProps> = ({ projectId, data, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  
  // State for managing custom columns and rows
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(mockUseOfProceedsColumns);
  const [rows, setRows] = useState<UseOfProceedsRow[]>(mockUseOfProceedsRows);
  
  // State for dialogs
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

  // Format the data for display in the table
  const formatData = () => {
    const tableData: { [key: string]: { overall_category?: string, [key: string]: any } } = {};
    
    // Initialize the table data with empty values
    rows.forEach(row => {
      const categoryOption = data.find(item => item.row_name === row.row_name);
      const overallCategory = row.overall_category || (categoryOption ? categoryOption.overall_category : '');
      
      tableData[row.row_name] = { overall_category: overallCategory };
      columns.forEach(column => {
        tableData[row.row_name][column.column_name] = 0;
      });
    });
    
    // Fill in the values from the data
    data.forEach(item => {
      if (tableData[item.row_name] && item.column_name) {
        tableData[item.row_name][item.column_name] = item.value;
        
        // Add overall category if it exists in the data
        if (item.overall_category) {
          tableData[item.row_name].overall_category = item.overall_category;
        }
      } else if (tableData[item.row_name]) {
        // For mock data which might not have column_name, use the first column
        tableData[item.row_name][columns[0].column_name] = item.value;
      }
    });
    
    return tableData;
  };

  const tableData = formatData();

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
            <div className="flex gap-2">
              {editMode ? (
                <>
                  <Button size="sm" variant="outline" onClick={handleCancel} className="flex items-center gap-1">
                    <X size={16} />
                    <span>Cancel</span>
                  </Button>
                  <Button size="sm" onClick={handleSave} className="flex items-center gap-1">
                    <Save size={16} />
                    <span>Save</span>
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setEditMode(true)} className="flex items-center gap-1">
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-end p-4 gap-3">
            <Dialog open={isAddColumnDialogOpen} onOpenChange={setIsAddColumnDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>Add Column</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Column</DialogTitle>
                  <DialogDescription>
                    Enter a name for the new column
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="columnName">Column Name</Label>
                  <Input
                    id="columnName"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="e.g. Phase 1"
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleAddColumn}>Add Column</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isAddRowDialogOpen} onOpenChange={setIsAddRowDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>Add Row</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Select an overall category and category for the new row
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <Label htmlFor="overallCategory">Overall Category</Label>
                    <Select
                      value={selectedOverallCategory}
                      onValueChange={handleOverallCategoryChange}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select an overall category" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueOverallCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newRowCategory}
                      onValueChange={setNewRowCategory}
                      disabled={filteredCategories.length === 0}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddRow}>Add Row</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] bg-muted/30 font-medium sticky left-0 z-10">Overall Category</TableHead>
                  <TableHead className="w-[180px] bg-muted/30 font-medium sticky left-[150px] z-10">Category</TableHead>
                  {columns.map(column => (
                    <TableHead key={column.column_id} className="bg-muted/30 font-medium text-right">
                      {column.column_name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(row => {
                  // Get overall category from the formatted data or from categoryOptions
                  const overallCategory = tableData[row.row_name]?.overall_category || 
                    row.overall_category ||
                    categoryOptions.find(opt => opt.category === row.row_name)?.overall || 
                    'Other';
                  
                  return (
                    <TableRow key={row.row_id} className={row.row_name === 'TOTAL' ? 'bg-muted/20 font-semibold' : ''}>
                      <TableCell className="font-medium sticky left-0 z-10 bg-white">
                        {row.row_name === 'TOTAL' ? '' : overallCategory}
                      </TableCell>
                      <TableCell className="font-medium sticky left-[150px] z-10 bg-white">{row.row_name}</TableCell>
                      {columns.map(column => (
                        <TableCell key={column.column_id} className="text-right">
                          {editMode && row.row_name !== 'TOTAL' ? (
                            <Input
                              type="number"
                              className="w-full text-right h-8"
                              value={getCellValue(row.row_name, column.column_name)}
                              onChange={(e) => handleValueChange(row.row_name, column.column_name, e.target.value)}
                            />
                          ) : row.row_name === 'TOTAL' ? (
                            <motion.div
                              key={`total-${column.column_name}-${calculateColumnTotal(column.column_name)}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {formatCurrency(calculateColumnTotal(column.column_name))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key={`${row.row_name}-${column.column_name}-${getCellValue(row.row_name, column.column_name)}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {formatCurrency(getCellValue(row.row_name, column.column_name))}
                            </motion.div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Alert>
        <AlertDescription>
          Loan types are determined by the Use of Proceeds allocation. Changes made here will update the project's loan types.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UseOfProceedsTable;
