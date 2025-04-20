
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
      <TableCell className="p-2 h-12">
        <div className="flex items-center justify-between">
          <Input
            type="text"
            value={formatCurrency(value)}
            onChange={(e) => onChange?.(rowKey, periodIndex, e.target.value)}
            className="h-8 text-right bg-transparent border-0 focus:ring-1 w-[calc(100%-70px)]"
          />
          {showChangeIndicator && calculateYearlyChange && (
            <div className="w-[60px] text-right">
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
    <TableCell className="p-2 h-12">
      <div className="flex items-center justify-between">
        <span className="text-right w-[calc(100%-70px)]">{formatCurrency(value)}</span>
        {showChangeIndicator && calculateYearlyChange && (
          <div className="w-[60px] text-right">
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
