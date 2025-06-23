
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import ContributionIndicator from '../ContributionIndicator';

interface BusinessTaxReturnRowProps {
  fieldName: string;
  label: string;
  selectedYears: string[];
  formValues: Record<string, string>;
  calculatedValues: {
    grossIncome: number;
    netIncome: number;
    totalDeductions: number;
    grossProfit: number;
    grossMargin: number;
    operatingCashFlow: number;
  };
  fieldNotes: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
  isIncome?: boolean;
  isExpense?: boolean;
  isCalculated?: boolean;
  category?: string;
}

const BusinessTaxReturnRow: React.FC<BusinessTaxReturnRowProps> = ({
  fieldName,
  label,
  selectedYears,
  formValues,
  calculatedValues,
  fieldNotes,
  onInputChange,
  isIncome = false,
  isExpense = false,
  isCalculated = false,
  category = ''
}) => {
  const getFieldKey = (fieldName: string, year: string) => `${fieldName}_${year}`;

  const calculatePercentage = (value: number, year: string): string => {
    const grossReceiptsKey = getFieldKey('grossReceipts', year);
    const grossReceipts = parseFloat(formValues[grossReceiptsKey] || '0');
    
    if (grossReceipts === 0) return '0.0%';
    
    const percentage = (value / grossReceipts) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  const renderInputCell = (fieldName: string, year: string, isReadOnly: boolean = false) => {
    const key = getFieldKey(fieldName, year);
    let value = formValues[key] || '';
    
    // For calculated fields, use the calculated values for the current year (2023)
    if (isReadOnly && year === '2023') {
      if (fieldName === 'grossProfit') {
        value = calculatedValues.grossProfit.toFixed(2);
      } else if (fieldName === 'netIncome') {
        value = calculatedValues.netIncome.toFixed(2);
      } else if (fieldName === 'totalDeductions') {
        value = calculatedValues.totalDeductions.toFixed(2);
      } else if (fieldName === 'grossMargin') {
        value = calculatedValues.grossMargin.toFixed(2);
      } else if (fieldName === 'operatingCashFlow') {
        value = calculatedValues.operatingCashFlow.toFixed(2);
      }
    }
    
    const inputType = fieldName === 'grossMargin' ? 'text' : 'number';
    const displayValue = fieldName === 'grossMargin' && isReadOnly ? `${value}%` : value;
    
    // Calculate percentage for display (skip for grossMargin as it's already a percentage)
    const numericValue = parseFloat(value) || 0;
    const percentageDisplay = fieldName === 'grossMargin' ? '' : calculatePercentage(numericValue, year);
    
    return (
      <TableCell className="p-2">
        <div className="flex items-center gap-2">
          <Input
            type={inputType}
            placeholder={fieldName === 'grossMargin' ? '0%' : '0'}
            value={displayValue}
            onChange={(e) => onInputChange(key, e.target.value)}
            readOnly={isReadOnly}
            className={`text-center ${isReadOnly ? "bg-muted-foreground/10" : ""}`}
          />
          {fieldName !== 'grossMargin' && numericValue !== 0 && (
            <div className="text-xs text-muted-foreground min-w-[3rem] text-right">
              {percentageDisplay}
            </div>
          )}
        </div>
      </TableCell>
    );
  };

  const note = fieldNotes[fieldName];
  
  return (
    <TableRow className={isCalculated ? "bg-muted font-semibold" : ""}>
      <TableCell className="font-medium w-32 p-3 text-xs">
        <span className="text-muted-foreground">{category}</span>
      </TableCell>
      <TableCell className="font-medium w-1/3 p-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {(isIncome || isExpense) && (
              <ContributionIndicator fieldType={isIncome ? "income" : "expense"} />
            )}
            <span>{label}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{note}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
      {selectedYears.map((year) => renderInputCell(fieldName, year, isCalculated))}
    </TableRow>
  );
};

export default BusinessTaxReturnRow;
