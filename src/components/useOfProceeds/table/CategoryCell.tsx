
import React from 'react';
import { TableCell } from '@/components/ui/table';

interface CategoryCellProps {
  categoryName: string;
  isTotalRow: boolean;
  rowIndex: number;
}

const CategoryCell: React.FC<CategoryCellProps> = ({
  categoryName,
  isTotalRow,
  rowIndex
}) => {
  const bgClass = isTotalRow 
    ? 'bg-accent/5' 
    : rowIndex % 2 === 0 ? 'bg-muted/5' : 'bg-white';

  return (
    <TableCell className={`font-medium sticky left-0 z-10 ${bgClass} text-xs py-2`}>
      {isTotalRow ? '' : categoryName}
    </TableCell>
  );
};

export default CategoryCell;
