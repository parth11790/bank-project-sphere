
import React from 'react';
import { TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { UseOfProceedsColumn } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';

interface ColumnHeaderProps {
  column: UseOfProceedsColumn;
  editMode: boolean;
  isTotalColumn: boolean;
  onDeleteColumn?: (columnId: string) => void;
  formatCurrency: (value: number) => string;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  column,
  editMode,
  isTotalColumn,
  onDeleteColumn,
  formatCurrency
}) => {
  return (
    <TableHead 
      key={column.column_id} 
      className={`bg-muted/30 font-medium text-right text-xs ${isTotalColumn ? 'border-l' : ''}`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span>{column.column_name}</span>
          {editMode && column.column_id !== 'col_1' && onDeleteColumn && (
            <Button 
              variant="ghost" 
              size="icon"
              className="h-5 w-5"
              onClick={() => onDeleteColumn(column.column_id)}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
        {column.is_loan && (
          <div className="text-[10px] text-muted-foreground font-normal mt-0.5">
            <div>Rate: {column.interest_rate}% - Term: {column.term_years}yr</div>
            <div>Monthly: {formatCurrency(column.monthly_payment || 0)}</div>
          </div>
        )}
      </div>
    </TableHead>
  );
};

export default ColumnHeader;
