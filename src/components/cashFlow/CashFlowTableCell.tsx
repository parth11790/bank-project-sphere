
import React from 'react';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import ChangeIndicator from './ChangeIndicator';

interface CashFlowTableCellProps {
  rowKey: string;
  periodIndex: number;
  value: number;
  isEditable: boolean;
  showChangeIndicator: boolean;
  formatCurrency: (amount: number) => string;
  onChange?: (rowKey: string, periodIndex: number, value: string) => void;
  calculateYearlyChange?: (rowKey: string, periodIndex: number) => number | null;
}

const CashFlowTableCell: React.FC<CashFlowTableCellProps> = ({
  rowKey,
  periodIndex,
  value,
  isEditable,
  showChangeIndicator,
  formatCurrency,
  onChange,
  calculateYearlyChange
}) => {
  if (isEditable) {
    return (
      <TableCell className="p-2 align-middle h-12">
        <div className="flex items-center justify-end space-x-2 h-full">
          <Input
            type="text"
            value={formatCurrency(value)}
            onChange={(e) => onChange?.(rowKey, periodIndex, e.target.value)}
            className="h-8 w-full text-right bg-transparent border-0 focus:ring-1 self-center"
          />
          {showChangeIndicator && calculateYearlyChange && (
            <ChangeIndicator 
              change={calculateYearlyChange(rowKey, periodIndex)} 
              className="self-center"
            />
          )}
        </div>
      </TableCell>
    );
  }

  return (
    <TableCell className="p-2 text-right h-12">
      <div className="flex items-center justify-end space-x-2 h-full">
        <span className="self-center">{formatCurrency(value)}</span>
        {showChangeIndicator && calculateYearlyChange && (
          <ChangeIndicator 
            change={calculateYearlyChange(rowKey, periodIndex)} 
            className="self-center"
          />
        )}
      </div>
    </TableCell>
  );
};

export default CashFlowTableCell;
