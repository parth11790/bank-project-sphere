
import React from 'react';
import { TableBody as UITableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import TableValueCell from './TableValueCell';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';

interface TableBodyProps {
  rows: UseOfProceedsRow[];
  columns: UseOfProceedsColumn[];
  tableData: any;
  editMode: boolean;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateRowTotal: (rowName: string) => number;
  formatCurrency: (value: number) => string;
}

const TableBody: React.FC<TableBodyProps> = ({
  rows,
  columns,
  tableData,
  editMode,
  getCellValue,
  handleValueChange,
  calculateRowTotal,
  formatCurrency
}) => {
  return (
    <UITableBody>
      {rows.map((row, rowIndex) => {
        const overallCategory = tableData[row.row_name]?.overall_category || row.overall_category || 'Other';
        const isTotal = row.row_name === 'TOTAL';
        
        return (
          <TableRow 
            key={row.row_id} 
            className={`text-[10px] ${
              isTotal 
                ? 'bg-accent/5 font-semibold border-t border-t-border/50' 
                : rowIndex % 2 === 0 ? 'bg-muted/5' : ''
            }`}
          >
            <TableHead className={`font-medium sticky left-0 z-10 ${
              isTotal 
                ? 'bg-accent/5' 
                : rowIndex % 2 === 0 ? 'bg-muted/5' : 'bg-white'
            } text-[10px] py-1`}>
              {!isTotal && overallCategory}
            </TableHead>
            <TableHead className={`font-medium sticky left-[120px] z-10 ${
              isTotal 
                ? 'bg-accent/5' 
                : rowIndex % 2 === 0 ? 'bg-muted/5' : 'bg-white'
            } text-[10px] py-1`}>
              {row.row_name}
            </TableHead>
            {columns.map(column => (
              <TableValueCell
                key={`${row.row_id}-${column.column_id}`}
                value={getCellValue(row.row_name, column.column_name)}
                rowName={row.row_name}
                columnName={column.column_name}
                editMode={editMode}
                isTotal={isTotal}
                onChange={handleValueChange}
                formatCurrency={formatCurrency}
              />
            ))}
            <TableCell className={`font-medium text-right text-xs py-1 border-l ${
              isTotal ? 'bg-accent/5 font-semibold' : ''
            }`}>
              {formatCurrency(calculateRowTotal(row.row_name))}
            </TableCell>
          </TableRow>
        );
      })}
    </UITableBody>
  );
};

export default TableBody;
