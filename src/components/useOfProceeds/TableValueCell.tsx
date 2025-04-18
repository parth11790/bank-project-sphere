
import React, { useState, useRef, useEffect } from 'react';
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
  // Track if this cell is being edited
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize local value when external value changes or on first render
  useEffect(() => {
    setLocalValue(value === 0 ? '' : value.toString());
  }, [value]);
  
  // Re-focus the input after a render if this cell was focused
  useEffect(() => {
    if (editMode && isFocused && inputRef.current) {
      inputRef.current.focus();
      
      // Place cursor at the end of input text
      const len = localValue.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [editMode, isFocused, localValue]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // When losing focus, make sure the parent component gets the final value
    if (onChange) {
      onChange(rowName, columnName, localValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Also update parent component
    if (onChange) {
      onChange(rowName, columnName, newValue);
    }
  };

  return (
    <TableCell className={`text-right py-1 text-[10px] ${isTotal ? 'bg-accent/5' : ''}`}>
      {editMode && !isTotal ? (
        <Input
          ref={inputRef}
          type="text" // Changed from "number" to allow more control
          className="w-full text-right h-6 text-xs"
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          min="0"
          step="1"
          inputMode="numeric" // Better for mobile
          pattern="[0-9]*" // Ensures only numbers
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
