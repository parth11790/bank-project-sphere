
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
  // Create local state for the input value
  const [inputValue, setInputValue] = useState<string>('');
  // Track if this cell is being edited
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update local input value only when component mounts or value prop changes
  useEffect(() => {
    setInputValue(value === 0 ? '' : value.toString());
  }, [value]);
  
  // When focused, ensure the input remains focused and cursor is at the right position
  useEffect(() => {
    if (editMode && isFocused && inputRef.current) {
      inputRef.current.focus();
      
      // Place cursor at the end of the input text
      const length = inputValue.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [editMode, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // When losing focus, make sure the parent component gets the final value
    if (onChange) {
      onChange(rowName, columnName, inputValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update local state immediately without involving parent component
    setInputValue(e.target.value);
  };

  // Only notify parent when blur happens or when user presses Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onChange) {
        onChange(rowName, columnName, inputValue);
      }
      
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <TableCell className={`text-right py-1 text-[10px] ${isTotal ? 'bg-accent/5' : ''}`}>
      {editMode && !isTotal ? (
        <Input
          ref={inputRef}
          type="text"
          className="w-full text-right h-6 text-xs"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
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
