
import React from 'react';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ChangeIndicator from './ChangeIndicator';
import { Calculator } from 'lucide-react';

interface CashFlowTableCellProps {
  rowKey: string;
  periodIndex: number;
  value: number;
  isEditable: boolean;
  showChangeIndicator: boolean;
  formatCurrency: (amount: number) => string;
  onChange?: (rowKey: string, periodIndex: number, value: string) => void;
  calculateYearlyChange?: (rowKey: string, periodIndex: number) => number | null;
  showPercentages?: boolean;
}

const CashFlowTableCell: React.FC<CashFlowTableCellProps> = ({
  rowKey,
  periodIndex,
  value,
  isEditable,
  showChangeIndicator,
  formatCurrency,
  onChange,
  calculateYearlyChange,
  showPercentages = true
}) => {
  const percentageOnlyRows = ['grossMargin', 'nom'];
  const ratioOnlyRows = ['dscPreOc', 'dscPostOc'];
  const isPercentageOnly = percentageOnlyRows.includes(rowKey);
  const isRatioOnly = ratioOnlyRows.includes(rowKey);

  const formatValue = (val: number) => {
    if (isPercentageOnly) {
      if (!showPercentages) {
        return '-';
      }
      return `${val.toFixed(1)}%`;
    }
    if (isRatioOnly) {
      return val.toFixed(2);
    }
    return formatCurrency(val);
  };

  const renderCalculationTooltip = () => {
    if (rowKey === 'grossProfit') {
      const grossRevenue = document.querySelector(`[data-row-key="grossRevenue"][data-period-index="${periodIndex}"]`)?.textContent;
      const cogs = document.querySelector(`[data-row-key="cogs"][data-period-index="${periodIndex}"]`)?.textContent;
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 cursor-help">
                <span>{formatValue(value)}</span>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-4 max-w-sm">
              <p className="font-medium mb-2">Gross Profit Calculation</p>
              <div className="space-y-1 text-sm">
                <p>Gross Revenue: {grossRevenue}</p>
                <p>- COGS: {cogs}</p>
                <div className="border-t mt-2 pt-2">
                  <p>= Gross Profit: {formatValue(value)}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return formatValue(value);
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
                showPercentages={showPercentages}
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
    <TableCell className="p-2 h-12" data-row-key={rowKey} data-period-index={periodIndex}>
      <div className="flex items-center">
        <div className="flex-1 pr-2 text-right">
          {renderCalculationTooltip()}
        </div>
        {showChangeIndicator && calculateYearlyChange && (
          <div className="w-16 text-right border-l pl-2">
            <ChangeIndicator 
              change={calculateYearlyChange(rowKey, periodIndex)}
              showPercentages={showPercentages}
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

