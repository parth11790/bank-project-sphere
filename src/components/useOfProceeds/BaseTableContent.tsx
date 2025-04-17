
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { CategoryOption, categoryOptions } from './categoryOptions';

interface BaseTableContentProps {
  columns: UseOfProceedsColumn[];
  rows: UseOfProceedsRow[];
  tableData: any;
  editMode: boolean;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateColumnTotal: (columnName: string) => number;
  formatCurrency: (value: number) => string;
  categoryOptions: CategoryOption[];
}

const BaseTableContent: React.FC<BaseTableContentProps> = ({
  columns,
  rows,
  tableData,
  editMode,
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
          <TableHead className="w-[200px] bg-muted/30 font-medium sticky left-0 z-10">Category</TableHead>
          {columns.map(column => (
            <TableHead key={column.column_id} className="bg-muted/30 font-medium text-right">
              {column.column_name}
            </TableHead>
          ))}
          <TableHead className="bg-muted/30 font-medium text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => {
          const overallCategory = tableData[row.row_name]?.overall_category || 
            row.overall_category ||
            categoryOptions.find(opt => opt.category === row.row_name)?.overall || 
            'Other';
          
          return (
            <TableRow key={row.row_id} className={row.row_name === 'TOTAL' ? 'bg-muted/20 font-semibold' : ''}>
              <TableCell className="font-medium sticky left-0 z-10 bg-white">
                {row.row_name}
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
                    formatCurrency(calculateColumnTotal(column.column_name))
                  ) : (
                    formatCurrency(getCellValue(row.row_name, column.column_name))
                  )}
                </TableCell>
              ))}
              <TableCell className="font-medium text-right">
                {/* Calculate row total */}
                {formatCurrency(
                  columns.reduce(
                    (total, column) => total + getCellValue(row.row_name, column.column_name),
                    0
                  )
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BaseTableContent;
