
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Save, X } from 'lucide-react';
import { mockUseOfProceedsColumns, mockUseOfProceedsRows } from '@/lib/mockData';

interface UseOfProceedsTableProps {
  projectId: string;
  data: Array<{
    proceeds_id: string;
    project_id: string;
    column_name: string;
    row_name: string;
    value: number;
  }>;
  onSave?: (updatedData: any) => void;
}

const UseOfProceedsTable: React.FC<UseOfProceedsTableProps> = ({ projectId, data, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: string]: number }>({});

  // Format the data for display in the table
  const formatData = () => {
    const tableData: { [key: string]: { [key: string]: number } } = {};
    
    // Initialize the table data with empty values
    mockUseOfProceedsRows.forEach(row => {
      tableData[row.row_name] = {};
      mockUseOfProceedsColumns.forEach(column => {
        tableData[row.row_name][column.column_name] = 0;
      });
    });
    
    // Fill in the values from the data
    data.forEach(item => {
      tableData[item.row_name][item.column_name] = item.value;
    });
    
    return tableData;
  };

  const tableData = formatData();

  // Handle value change when editing
  const handleValueChange = (rowName: string, columnName: string, value: string) => {
    const key = `${rowName}-${columnName}`;
    const numericValue = value === '' ? 0 : parseFloat(value);
    
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
    return tableData[rowName][columnName];
  };

  // Format a value as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
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
      
      if (itemIndex >= 0) {
        updatedData[itemIndex] = {
          ...updatedData[itemIndex],
          value
        };
      } else {
        // Add a new item if it doesn't exist
        updatedData.push({
          proceeds_id: `proc_new_${Date.now()}`,
          project_id: projectId,
          column_name: columnName,
          row_name: rowName,
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] bg-muted/30 font-medium">Category</TableHead>
                {mockUseOfProceedsColumns.map(column => (
                  <TableHead key={column.column_id} className="bg-muted/30 font-medium text-right">
                    {column.column_name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUseOfProceedsRows.map(row => (
                <TableRow key={row.row_id} className={row.row_name === 'TOTAL' ? 'bg-muted/20 font-semibold' : ''}>
                  <TableCell className="font-medium">{row.row_name}</TableCell>
                  {mockUseOfProceedsColumns.map(column => (
                    <TableCell key={column.column_id} className="text-right">
                      {editMode && row.row_name !== 'TOTAL' ? (
                        <Input
                          type="number"
                          className="w-full text-right h-8"
                          value={getCellValue(row.row_name, column.column_name)}
                          onChange={(e) => handleValueChange(row.row_name, column.column_name, e.target.value)}
                        />
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
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseOfProceedsTable;
