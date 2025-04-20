
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
  // Array of rows that should display only percentages
  const percentageOnlyRows = ['growth', 'grossMargin', 'nom'];
  const isPercentageOnly = percentageOnlyRows.includes(rowKey);

  const formatValue = (val: number) => {
    if (isPercentageOnly) {
      return `${val.toFixed(1)}%`;
    }
    return formatCurrency(val);
  };

  if (isEditable) {
    return (
      <TableCell className="p-2 h-12">
        <div className="flex items-center">
          <div className="flex-1 pr-2">
            <Input
              type="text"
              value={formatValue(value)}
              onChange={(e) => onChange?.(rowKey, periodIndex, e.target.value)}
              className="h-8 text-right bg-transparent border-0 focus:ring-1 font-mono tabular-nums"
            />
          </div>
          {showChangeIndicator && calculateYearlyChange && (
            <div className="w-16 text-right border-l pl-2">
              <ChangeIndicator 
                change={calculateYearlyChange(rowKey, periodIndex)}
              />
            </div>
          )}
          {!showChangeIndicator && (
            <div className="w-16 invisible">-</div>
          )}
        </div>
      </TableCell>
    );
  }

  return (
    <TableCell className="p-2 h-12">
      <div className="flex items-center">
        <div className="flex-1 pr-2">
          <span className="block text-right font-mono tabular-nums">{formatValue(value)}</span>
        </div>
        {showChangeIndicator && calculateYearlyChange && (
          <div className="w-16 text-right border-l pl-2">
            <ChangeIndicator 
              change={calculateYearlyChange(rowKey, periodIndex)}
            />
          </div>
        )}
        {!showChangeIndicator && (
          <div className="w-16 invisible">-</div>
        )}
      </div>
    </TableCell>
  );
};

export default CashFlowTableCell;
