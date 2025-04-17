
import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseOfProceedsColumn, UseOfProceedsRow } from './EnhancedUseOfProceedsTable';
import { Trash2 } from 'lucide-react';
import { categoryOptions } from './categoryOptions';

interface ProceedsTableProps {
  columns: UseOfProceedsColumn[];
  rows: UseOfProceedsRow[];
  tableData: any;
  editMode: boolean;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateColumnTotal: (columnName: string) => number;
  calculateRowTotal: (rowName: string) => number;
  formatCurrency: (value: number) => string;
  handleDeleteColumn: (columnId: string) => void;
  handleDeleteRow: (rowId: string) => void;
}

const ProceedsTable: React.FC<ProceedsTableProps> = ({
  columns,
  rows,
  tableData,
  editMode,
  getCellValue,
  handleValueChange,
  calculateColumnTotal,
  calculateRowTotal,
  formatCurrency,
  handleDeleteColumn,
  handleDeleteRow
}) => {
  return (
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
  );
};

export default ProceedsTable;
