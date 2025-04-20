
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
      <TableCell className="p-0 align-middle h-[52px]">
        <div className="flex items-center justify-end space-x-2 py-1">
          <Input
            type="text"
            value={formatCurrency(value)}
            onChange={(e) => onChange?.(rowKey, periodIndex, e.target.value)}
            className="h-8 w-full text-right bg-transparent border-0 focus:ring-1"
          />
          {showChangeIndicator && calculateYearlyChange && (
            <ChangeIndicator change={calculateYearlyChange(rowKey, periodIndex)} />
          )}
        </div>
      </TableCell>
    );
  }

  return (
    <TableCell className="text-right py-4">
      <div className="flex items-center justify-end space-x-2 py-1">
        {formatCurrency(value)}
        {showChangeIndicator && calculateYearlyChange && (
          <ChangeIndicator change={calculateYearlyChange(rowKey, periodIndex)} />
        )}
      </div>
    </TableCell>
  );
};

export default CashFlowTableCell;
