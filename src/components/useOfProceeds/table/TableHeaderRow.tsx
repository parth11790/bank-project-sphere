
import React from 'react';
import { TableHead, TableRow } from '@/components/ui/table';
import { UseOfProceedsColumn } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import ColumnHeader from './ColumnHeader';

interface TableHeaderRowProps {
  columns: UseOfProceedsColumn[];
  editMode: boolean;
  onDeleteColumn?: (columnId: string) => void;
  formatCurrency: (value: number) => string;
}

const TableHeaderRow: React.FC<TableHeaderRowProps> = ({
  columns,
  editMode,
  onDeleteColumn,
  formatCurrency
}) => {
  return (
    <TableRow className="text-xs">
      <TableHead className="w-[120px] bg-muted/30 font-medium sticky left-0 z-10 text-xs">
        Overall Category
      </TableHead>
      <TableHead className="w-[150px] bg-muted/30 font-medium sticky left-[120px] z-10 text-xs">
        Category
      </TableHead>
      
      {columns.map(column => (
        <ColumnHeader
          key={column.column_id}
          column={column}
          editMode={editMode}
          isTotalColumn={false}
          onDeleteColumn={onDeleteColumn}
          formatCurrency={formatCurrency}
        />
      ))}
      
      <TableHead className="bg-accent/10 font-medium text-right text-xs border-l">
        Total
      </TableHead>
    </TableRow>
  );
};

export default TableHeaderRow;
