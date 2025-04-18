
import React from 'react';
import { TableCell as UITableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

interface TableCellProps {
  value: number;
  isEditing: boolean;
  isTotalRow: boolean;
  isTotalColumn: boolean;
  isLastColumn: boolean;
  alternateRowColor: boolean;
  onValueChange?: (value: string) => void;
  formatValue: (value: number) => string;
}

const TableCell: React.FC<TableCellProps> = ({
  value,
  isEditing,
  isTotalRow,
  isTotalColumn,
  isLastColumn,
  alternateRowColor,
  onValueChange,
  formatValue
}) => {
  const cellClasses = `
    text-right py-2
    ${isLastColumn ? 'border-l' : ''}
    ${isTotalRow ? 'bg-accent/5 font-semibold' : ''}
    ${isTotalColumn ? 'border-l bg-accent/5 font-semibold' : ''}
  `;

  if (isEditing && !isTotalRow) {
    return (
      <UITableCell className={cellClasses}>
        <Input
          type="number"
          className="w-full text-right h-6 text-xs"
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
        />
      </UITableCell>
    );
  }

  return (
    <UITableCell className={cellClasses}>
      <motion.div
        key={`${value}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`text-xs ${isTotalRow || isTotalColumn ? 'font-semibold' : ''}`}
      >
        {formatValue(value)}
      </motion.div>
    </UITableCell>
  );
};

export default TableCell;
