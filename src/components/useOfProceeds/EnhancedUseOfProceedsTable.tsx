
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { categoryOptions, uniqueOverallCategories } from '@/components/useOfProceeds/categoryOptions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AddColumnDialog } from '@/components/useOfProceeds/AddColumnDialog';
import { AddRowDialog } from '@/components/useOfProceeds/AddRowDialog';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { useTableData } from '@/hooks/useTableData';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData/utilities';

// Enhanced types
export type UseOfProceedsColumn = {
  column_id: string;
  column_name: string;
  is_loan: boolean;
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
  // Convert the mock columns to our enhanced format
  const convertedColumns = mockUseOfProceedsColumns.map(col => ({
    ...col,
    is_loan: false,
  }));

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(convertedColumns);
  const [rows, setRows] = useState<UseOfProceedsRow[]>(mockUseOfProceedsRows);
  
  // State for dialogs
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [isAddRowDialogOpen, setIsAddRowDialogOpen] = useState(false);
  
  const { calculateLoanPayment } = useLoanCalculator();
  const { tableData, formatData } = useTableData({ data: initialData, rows, columns });

  // Calculate loan payments whenever columns change
  useEffect(() => {
    const updatedColumns = columns.map(column => {
      if (column.is_loan && column.interest_rate && column.term_years && column.amortization_months) {
        // Calculate the total amount for this loan column
        let totalLoanAmount = 0;
        Object.keys(tableData).forEach(rowName => {
          if (rowName !== 'TOTAL') {
            totalLoanAmount += tableData[rowName][column.column_name] || 0;
          }
        });

        // Calculate monthly and annual payments
        const { monthlyPayment } = calculateLoanPayment(
          totalLoanAmount,
          column.interest_rate,
          column.amortization_months
        );

        return {
          ...column,
          monthly_payment: monthlyPayment,
          annual_payment: monthlyPayment * 12
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  }, [tableData, columns, calculateLoanPayment]);

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

  // Calculate totals for each row
  const calculateRowTotal = (rowName: string) => {
    let total = 0;
    columns.forEach(column => {
      total += getCellValue(rowName, column.column_name);
    });
    return total;
  };

  // Add a new column with loan information
  const handleAddColumn = (newColumn: Partial<UseOfProceedsColumn>) => {
    const columnId = `col_${Date.now()}`;
    
    const column: UseOfProceedsColumn = {
      column_id: columnId,
      column_name: newColumn.column_name || 'New Column',
      is_loan: newColumn.is_loan || false,
      interest_rate: newColumn.interest_rate,
      term_years: newColumn.term_years,
      amortization_months: newColumn.amortization_months,
    };
    
    setColumns(prev => [...prev, column]);
    setIsAddColumnDialogOpen(false);
  };

  // Delete a column
  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.column_id !== columnId));
  };

  // Add a new row
  const handleAddRow = (overallCategory: string, rowName: string) => {
    if (!rowName) return;
    
    const newRow: UseOfProceedsRow = {
      row_id: `row_${Date.now()}`,
      row_name: rowName,
      overall_category: overallCategory
    };
    
    // Add the new row before TOTAL row
    const totalRowIndex = rows.findIndex(row => row.row_name === 'TOTAL');
    
    if (totalRowIndex !== -1) {
      const newRows = [...rows];
      newRows.splice(totalRowIndex, 0, newRow);
      setRows(newRows);
    } else {
      setRows([...rows, newRow]);
    }
    
    setIsAddRowDialogOpen(false);
  };

  // Delete a row
  const handleDeleteRow = (rowId: string) => {
    // Don't allow deleting the TOTAL row
    const rowToDelete = rows.find(row => row.row_id === rowId);
    if (rowToDelete?.row_name === 'TOTAL') return;
    
    setRows(rows.filter(row => row.row_id !== rowId));
  };

  // Handle save
  const handleSave = () => {
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] bg-muted/30 font-medium sticky left-0 z-10">Overall Category</TableHead>
                  <TableHead className="w-[180px] bg-muted/30 font-medium sticky left-[150px] z-10">Category</TableHead>
                  {columns.map(column => (
                    <TableHead key={column.column_id} className="bg-muted/30 font-medium text-right">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span>{column.column_name}</span>
                          {editMode && column.column_id !== 'col_1' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => handleDeleteColumn(column.column_id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          )}
                        </div>
                        {column.is_loan && (
                          <div className="text-xs text-muted-foreground font-normal mt-1">
                            <div>Rate: {column.interest_rate}% - Term: {column.term_years}yr</div>
                            <div>Monthly: {formatCurrency(column.monthly_payment || 0)}</div>
                          </div>
                        )}
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="bg-muted/30 font-medium text-right">Total</TableHead>
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
                      <TableCell className="font-medium sticky left-[150px] z-10 bg-white">
                        <div className="flex justify-between items-center">
                          <span>{row.row_name}</span>
                          {editMode && row.row_name !== 'TOTAL' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 -mr-2"
                              onClick={() => handleDeleteRow(row.row_id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
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
                      <TableCell className="font-medium text-right">
                        {formatCurrency(calculateRowTotal(row.row_name))}
                      </TableCell>
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
          <div className="space-y-1">
            <p>Loan types are determined by the Use of Proceeds allocation.</p>
            <p>Total monthly payment for all loans: {formatCurrency(columns.reduce((acc, col) => acc + (col.monthly_payment || 0), 0))}</p>
            <p>Total annual payment for all loans: {formatCurrency(columns.reduce((acc, col) => acc + (col.annual_payment || 0), 0))}</p>
          </div>
        </AlertDescription>
      </Alert>
      
      {/* Column Dialog */}
      <AddEnhancedColumnDialog 
        isOpen={isAddColumnDialogOpen}
        setIsOpen={setIsAddColumnDialogOpen}
        onAddColumn={handleAddColumn}
      />
      
      {/* Row Dialog */}
      <AddEnhancedRowDialog 
        isOpen={isAddRowDialogOpen}
        setIsOpen={setIsAddRowDialogOpen}
        onAddRow={handleAddRow}
        uniqueOverallCategories={uniqueOverallCategories}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};

interface AddEnhancedColumnDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddColumn: (column: Partial<UseOfProceedsColumn>) => void;
}

const AddEnhancedColumnDialog: React.FC<AddEnhancedColumnDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddColumn
}) => {
  const [columnName, setColumnName] = useState('');
  const [isLoan, setIsLoan] = useState(false);
  const [interestRate, setInterestRate] = useState<number | undefined>(undefined);
  const [termYears, setTermYears] = useState<number | undefined>(undefined);
  const [amortizationMonths, setAmortizationMonths] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    onAddColumn({
      column_name: columnName,
      is_loan: isLoan,
      interest_rate: interestRate,
      term_years: termYears,
      amortization_months: amortizationMonths,
    });
    
    // Reset form
    setColumnName('');
    setIsLoan(false);
    setInterestRate(undefined);
    setTermYears(undefined);
    setAmortizationMonths(undefined);
  };

  return (
    <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Column</h2>
        <p className="text-sm text-muted-foreground mb-4">Enter details for the new capital source</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Column Name</label>
            <Input 
              value={columnName} 
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="e.g. Phase 1, SBA Loan, etc."
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="isLoan" 
              checked={isLoan}
              onChange={(e) => setIsLoan(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="isLoan" className="text-sm font-medium">This is a loan</label>
          </div>
          
          {isLoan && (
            <div className="space-y-4 p-4 border rounded-md bg-muted/30">
              <div>
                <label className="text-sm font-medium">Interest Rate (% Annual)</label>
                <Input 
                  type="number"
                  value={interestRate || ''}
                  onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 5.25"
                  step="0.01"
                  min="0"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Term (Years)</label>
                <Input 
                  type="number"
                  value={termYears || ''}
                  onChange={(e) => setTermYears(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 10"
                  step="1"
                  min="1"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Amortization (Months)</label>
                <Input 
                  type="number"
                  value={amortizationMonths || ''}
                  onChange={(e) => setAmortizationMonths(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 120"
                  step="1"
                  min="1"
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!columnName || (isLoan && (!interestRate || !termYears || !amortizationMonths))}
          >
            Add Column
          </Button>
        </div>
      </div>
    </dialog>
  );
};

interface AddEnhancedRowDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddRow: (overallCategory: string, rowName: string) => void;
  uniqueOverallCategories: string[];
  categoryOptions: Array<{ overall: string; category: string }>;
}

const AddEnhancedRowDialog: React.FC<AddEnhancedRowDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddRow,
  uniqueOverallCategories,
  categoryOptions
}) => {
  const [selectedOverallCategory, setSelectedOverallCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // Handle overall category change
  useEffect(() => {
    if (selectedOverallCategory) {
      const filtered = categoryOptions
        .filter(option => option.overall === selectedOverallCategory)
        .map(option => option.category);
      
      setFilteredCategories(filtered);
      if (filtered.length > 0) {
        setSelectedCategory(filtered[0]);
      } else {
        setSelectedCategory('');
      }
    } else {
      setFilteredCategories([]);
      setSelectedCategory('');
    }
  }, [selectedOverallCategory, categoryOptions]);

  const handleSubmit = () => {
    if (selectedOverallCategory && selectedCategory) {
      onAddRow(selectedOverallCategory, selectedCategory);
      
      // Reset form
      setSelectedOverallCategory('');
      setSelectedCategory('');
    }
  };

  return (
    <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Row</h2>
        <p className="text-sm text-muted-foreground mb-4">Select the category for the new row</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Overall Category</label>
            <select
              value={selectedOverallCategory}
              onChange={(e) => setSelectedOverallCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
            >
              <option value="">Select an overall category</option>
              {uniqueOverallCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              disabled={filteredCategories.length === 0}
            >
              <option value="">Select a category</option>
              {filteredCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOverallCategory || !selectedCategory}
          >
            Add Row
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default EnhancedUseOfProceedsTable;
