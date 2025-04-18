
import React from 'react';
import { TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface TableHeaderCellProps {
  columnName: string;
  isLoan?: boolean;
  interestRate?: number;
  termYears?: number;
  monthlyPayment?: number;
  editMode?: boolean;
  columnId?: string;
  onDelete?: (columnId: string) => void;
  formatCurrency: (value: number) => string;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  columnName,
  isLoan,
  interestRate,
  termYears,
  monthlyPayment,
  editMode,
  columnId,
  onDelete,
  formatCurrency
}) => {
  return (
    <TableHead className="bg-muted/30 font-medium text-right text-[10px]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center text-[10px]">
          <span>{columnName}</span>
          {editMode && columnId !== 'col_1' && onDelete && (
            <Button 
              variant="ghost" 
              size="icon"
              className="h-5 w-5"
              onClick={() => onDelete(columnId!)}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
        {isLoan && (
          <div className="text-[8px] text-muted-foreground font-normal mt-0.5">
            <div>Rate: {interestRate}% - Term: {termYears}yr</div>
            <div>Monthly: {formatCurrency(monthlyPayment || 0)}</div>
          </div>
        )}
      </div>
    </TableHead>
  );
};

export default TableHeaderCell;
