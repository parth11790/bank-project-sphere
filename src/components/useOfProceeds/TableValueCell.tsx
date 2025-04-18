
import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface TableValueCellProps {
  value: number;
  rowName: string;
  columnName: string;
  editMode: boolean;
  isTotal?: boolean;
  onChange?: (rowName: string, columnName: string, value: string) => void;
  formatCurrency: (value: number) => string;
}

const TableValueCell: React.FC<TableValueCellProps> = ({
  value,
  rowName,
  columnName,
  editMode,
  isTotal,
  onChange,
  formatCurrency
}) => {
  return (
    <TableCell className={`text-right py-1 text-[10px] ${isTotal ? 'bg-accent/5' : ''}`}>
      {editMode && !isTotal ? (
        <Input
          type="number"
          className="w-full text-right h-6 text-xs"
          value={value}
          onChange={(e) => onChange?.(rowName, columnName, e.target.value)}
        />
      ) : (
        <motion.div
          key={`${rowName}-${columnName}-${value}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`text-xs ${isTotal ? 'font-semibold' : ''}`}
        >
          {formatCurrency(value)}
        </motion.div>
      )}
    </TableCell>
  );
};

export default TableValueCell;
