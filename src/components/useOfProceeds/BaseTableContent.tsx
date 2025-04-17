
import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow, TableFooter } from '@/components/ui/table';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { CategoryOption } from './categoryOptions';

interface BaseTableContentProps {
  columns: UseOfProceedsColumn[];
  rows: UseOfProceedsRow[];
  editMode: boolean;
  tableData: { [key: string]: { [key: string]: any } };
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateColumnTotal: (columnName: string) => number;
  formatCurrency: (value: number) => string;
  categoryOptions: CategoryOption[];
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
  // Get the overall category for a row
  const getOverallCategory = (rowName: string) => {
    if (tableData[rowName]?.overall_category) {
      return tableData[rowName].overall_category;
    }
    
    const category = categoryOptions.find(option => option.category === rowName);
    return category ? category.overall : '';
  };

  return (
    <Table className="border-b">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-[200px]">Category</TableHead>
          {columns.map(column => (
            <TableHead key={column.column_id} className="text-right">
              {column.column_name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.row_id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span>{row.row_name}</span>
                <span className="text-xs text-muted-foreground">
                  {getOverallCategory(row.row_name)}
                </span>
              </div>
            </TableCell>
            {columns.map(column => (
              <TableCell key={`${row.row_id}-${column.column_id}`} className="text-right">
                {editMode ? (
                  <input
                    type="number"
                    value={getCellValue(row.row_name, column.column_name)}
                    onChange={(e) => handleValueChange(row.row_name, column.column_name, e.target.value)}
                    className="w-full text-right p-1 border rounded"
                  />
                ) : (
                  formatCurrency(getCellValue(row.row_name, column.column_name))
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-muted/20">
        <TableRow>
          <TableCell className="font-bold">TOTAL</TableCell>
          {columns.map(column => (
            <TableCell key={`total-${column.column_id}`} className="text-right font-bold">
              {formatCurrency(calculateColumnTotal(column.column_name))}
            </TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default BaseTableContent;
