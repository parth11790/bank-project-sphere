
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RowNameCellProps {
  rowName: string;
  rowId: string;
  isTotalRow: boolean;
  rowIndex: number;
  editMode: boolean;
  onDeleteRow?: (rowId: string) => void;
}

const RowNameCell: React.FC<RowNameCellProps> = ({
  rowName,
  rowId,
  isTotalRow,
  rowIndex,
  editMode,
  onDeleteRow
}) => {
  const bgClass = isTotalRow 
    ? 'bg-accent/5' 
    : rowIndex % 2 === 0 ? 'bg-muted/5' : 'bg-white';

  return (
    <TableCell className={`font-medium sticky left-[120px] z-10 ${bgClass} text-xs py-2`}>
      <div className="flex justify-between items-center">
        <span>{rowName}</span>
        {editMode && !isTotalRow && onDeleteRow && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 -mr-2"
            onClick={() => onDeleteRow(rowId)}
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>
    </TableCell>
  );
};

export default RowNameCell;
