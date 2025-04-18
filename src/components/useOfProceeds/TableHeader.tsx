
import React from 'react';
import { TableHeader as UITableHeader, TableRow, TableHead } from '@/components/ui/table';
import TableHeaderCell from './TableHeaderCell';
import { UseOfProceedsColumn } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';

interface TableHeaderProps {
  columns: UseOfProceedsColumn[];
  editMode: boolean;
  formatCurrency: (value: number) => string;
  handleDeleteColumn: (columnId: string) => void;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onAddColumn?: () => void;
  onAddRow?: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  editMode,
  formatCurrency,
  handleDeleteColumn,
  onEdit,
  onSave,
  onCancel,
  onAddColumn,
  onAddRow
}) => {
  return (
    <UITableHeader>
      <TableRow className="text-xs">
        <TableHead className="w-[120px] bg-muted/30 font-medium sticky left-0 z-10 text-[10px]">
          Overall Category
        </TableHead>
        <TableHead className="w-[150px] bg-muted/30 font-medium sticky left-[120px] z-10 text-[10px]">
          Category
        </TableHead>
        {columns.map(column => (
          <TableHeaderCell
            key={column.column_id}
            columnName={column.column_name}
            isLoan={column.is_loan}
            interestRate={column.interest_rate}
            termYears={column.term_years}
            monthlyPayment={column.monthly_payment}
            editMode={editMode}
            columnId={column.column_id}
            onDelete={handleDeleteColumn}
            formatCurrency={formatCurrency}
          />
        ))}
        <TableHead className="bg-accent/10 font-medium text-right text-[10px] border-l">Total</TableHead>
      </TableRow>
    </UITableHeader>
  );
};

export default TableHeader;
