
import React from 'react';
import { TableRow as UITableRow } from '@/components/ui/table';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import CategoryCell from './CategoryCell';
import RowNameCell from './RowNameCell';
import TableCell from './TableCell';

interface TableRowProps {
  row: UseOfProceedsRow;
  columns: UseOfProceedsColumn[];
  rowIndex: number;
  editMode: boolean;
  tableData: any;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateRowTotal: (rowName: string) => number;
  formatCurrency: (value: number) => string;
  handleDeleteRow: (rowId: string) => void;
  overallCategory: string;
}

const TableRowComponent: React.FC<TableRowProps> = ({
  row,
  columns,
  rowIndex,
  editMode,
  tableData,
  getCellValue,
  handleValueChange,
  calculateRowTotal,
  formatCurrency,
  handleDeleteRow,
  overallCategory
}) => {
  const isTotalRow = row.row_name === 'TOTAL';
  const alternateRow = rowIndex % 2 === 0;
  const rowClass = isTotalRow 
    ? 'bg-accent/5 font-semibold border-t border-t-border/50' 
    : alternateRow ? 'bg-muted/5' : '';

  return (
    <UITableRow key={row.row_id} className={`text-xs ${rowClass}`}>
      <CategoryCell 
        categoryName={overallCategory} 
        isTotalRow={isTotalRow} 
        rowIndex={rowIndex} 
      />
      
      <RowNameCell 
        rowName={row.row_name} 
        rowId={row.row_id} 
        isTotalRow={isTotalRow} 
        rowIndex={rowIndex} 
        editMode={editMode} 
        onDeleteRow={handleDeleteRow} 
      />
      
      {columns.map((column, colIndex) => (
        <TableCell 
          key={column.column_id}
          value={getCellValue(row.row_name, column.column_name)}
          isEditing={editMode}
          isTotalRow={isTotalRow}
          isTotalColumn={false}
          isLastColumn={colIndex === columns.length - 1}
          alternateRowColor={alternateRow}
          onValueChange={(value) => handleValueChange(row.row_name, column.column_name, value)}
          formatValue={formatCurrency}
        />
      ))}
      
      {/* Total column */}
      <TableCell 
        value={calculateRowTotal(row.row_name)}
        isEditing={false}
        isTotalRow={isTotalRow}
        isTotalColumn={true}
        isLastColumn={true}
        alternateRowColor={alternateRow}
        formatValue={formatCurrency}
      />
    </UITableRow>
  );
};

export default TableRowComponent;
