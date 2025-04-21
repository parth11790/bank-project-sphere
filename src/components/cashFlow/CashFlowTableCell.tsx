import React from 'react';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

  const getCalculationDetails = () => {
    switch (rowKey) {
      case 'grossProfit':
        const grossRevenue = document.querySelector(`[data-row-key="grossRevenue"][data-period-index="${periodIndex}"]`)?.textContent;
        const cogs = document.querySelector(`[data-row-key="cogs"][data-period-index="${periodIndex}"]`)?.textContent;
        return {
          title: 'Gross Profit Calculation',
          formula: [
            { label: 'Gross Revenue', value: grossRevenue },
            { label: 'COGS', value: cogs, operator: '-' },
            { label: 'Gross Profit', value: formatValue(value), final: true }
          ]
        };
      case 'grossMargin':
        const profit = document.querySelector(`[data-row-key="grossProfit"][data-period-index="${periodIndex}"]`)?.textContent;
        const revenue = document.querySelector(`[data-row-key="grossRevenue"][data-period-index="${periodIndex}"]`)?.textContent;
        return {
          title: 'Gross Margin Calculation',
          formula: [
            { label: 'Gross Profit', value: profit },
            { label: 'Gross Revenue', value: revenue, operator: '÷' },
            { label: 'Gross Margin', value: formatValue(value), final: true }
          ]
        };
      case 'dscPreOc':
        const noiPre = document.querySelector(`[data-row-key="noi"][data-period-index="${periodIndex}"]`)?.textContent;
        const debtServicePre = document.querySelector(`[data-row-key="debtService"][data-period-index="${periodIndex}"]`)?.textContent;
        return {
          title: 'DSC Pre OC Calculation',
          formula: [
            { label: 'NOI', value: noiPre },
            { label: 'Debt Service', value: debtServicePre, operator: '÷' },
            { label: 'DSC Pre OC', value: formatValue(value), final: true }
          ]
        };
      case 'dscPostOc':
        const noi = document.querySelector(`[data-row-key="noi"][data-period-index="${periodIndex}"]`)?.textContent;
        const requiredOC = document.querySelector(`[data-row-key="requiredOfficerComp"][data-period-index="${periodIndex}"]`)?.textContent;
        const debtService = document.querySelector(`[data-row-key="debtService"][data-period-index="${periodIndex}"]`)?.textContent;
        
        const noiValue = Number(noi?.replace(/[^0-9.-]+/g, '')) || 0;
        const requiredOCValue = Number(requiredOC?.replace(/[^0-9.-]+/g, '')) || 0;
        const subtotal = noiValue - requiredOCValue;
        
        return {
          title: 'DSC Post OC Calculation',
          formula: [
            { label: 'NOI', value: noi },
            { label: 'Required Officer Comp', value: requiredOC, operator: '-' },
            { label: 'Subtotal', value: formatCurrency(subtotal) },
            { label: 'Debt Service', value: debtService, operator: '÷' },
            { label: 'DSC Post OC', value: formatValue(value), final: true }
          ]
        };
      default:
        return null;
    }
  };

  const renderCalculatedValue = () => {
    const calculationDetails = getCalculationDetails();
    
    if (!calculationDetails) {
      return <span>{formatValue(value)}</span>;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">{formatValue(value)}</span>
          </TooltipTrigger>
          <TooltipContent className="p-4 max-w-sm">
            <p className="font-medium mb-2">{calculationDetails.title}</p>
            <div className="space-y-1 text-sm">
              {calculationDetails.formula.map((item, index) => (
                <p key={index} className={item.final ? 'border-t mt-2 pt-2' : ''}>
                  {item.operator && <span className="mr-1">{item.operator}</span>}
                  {item.label}: {item.value}
                </p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
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
          {renderCalculatedValue()}
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
