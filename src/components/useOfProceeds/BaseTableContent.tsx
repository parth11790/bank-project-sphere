
import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { categoryOptions } from './categoryOptions';

interface BaseTableContentProps {
  columns: Array<{ column_id: string; column_name: string }>;
  rows: Array<{ row_id: string; row_name: string; overall_category?: string }>;
  editMode: boolean;
  tableData: any;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateColumnTotal: (columnName: string) => number;
  formatCurrency: (value: number) => string;
  categoryOptions: Array<{ overall: string; category: string }>;
}

const BaseTableContent: React.FC<BaseTableContentProps> = ({
  columns,
  rows,
  editMode,
  tableData,
  getCellValue,
  handleValueChange,
  calculateColumnTotal,
  formatCurrency,
  categoryOptions
}) => {
  return (
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
  );
};

export default BaseTableContent;
