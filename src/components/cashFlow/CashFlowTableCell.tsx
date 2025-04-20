
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
      <TableCell className="p-2 h-12 relative">
        <div className="grid grid-cols-[1fr,auto] gap-2 items-center h-full">
          <Input
            type="text"
            value={formatCurrency(value)}
            onChange={(e) => onChange?.(rowKey, periodIndex, e.target.value)}
            className="h-8 text-right bg-transparent border-0 focus:ring-1"
          />
          {showChangeIndicator && calculateYearlyChange && (
            <div className="min-w-[60px]">
              <ChangeIndicator 
                change={calculateYearlyChange(rowKey, periodIndex)}
              />
            </div>
          )}
        </div>
      </TableCell>
    );
  }

  return (
    <TableCell className="p-2 h-12 relative">
      <div className="grid grid-cols-[1fr,auto] gap-2 items-center h-full">
        <span className="text-right">{formatCurrency(value)}</span>
        {showChangeIndicator && calculateYearlyChange && (
          <div className="min-w-[60px]">
            <ChangeIndicator 
              change={calculateYearlyChange(rowKey, periodIndex)}
            />
          </div>
        )}
      </div>
    </TableCell>
  );
};

export default CashFlowTableCell;
