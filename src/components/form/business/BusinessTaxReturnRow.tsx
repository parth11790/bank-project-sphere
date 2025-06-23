
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

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculatePercentage = (value: number, year: string): string => {
    const grossReceiptsKey = getFieldKey('grossReceipts', year);
    const grossReceipts = parseFloat(formValues[grossReceiptsKey] || '0');
    
    if (grossReceipts === 0) return '0.0%';
    
    const percentage = (value / grossReceipts) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  const formatInputValue = (value: string): string => {
    if (!value || value === '0') return '';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    return formatCurrency(numericValue);
  };

  const parseInputValue = (value: string): string => {
    // Remove currency formatting and return raw number
    if (!value) return '';
    const cleanValue = value.replace(/[$,]/g, '');
    return cleanValue;
  };

  const renderInputCell = (fieldName: string, year: string, isReadOnly: boolean = false) => {
    const key = getFieldKey(fieldName, year);
    let rawValue = formValues[key] || '';
    
    // For calculated fields, use the calculated values for the current year (2023)
    if (isReadOnly && year === '2023') {
      if (fieldName === 'grossProfit') {
        rawValue = calculatedValues.grossProfit.toFixed(2);
      } else if (fieldName === 'netIncome') {
        rawValue = calculatedValues.netIncome.toFixed(2);
      } else if (fieldName === 'totalDeductions') {
        rawValue = calculatedValues.totalDeductions.toFixed(2);
      } else if (fieldName === 'operatingCashFlow') {
        rawValue = calculatedValues.operatingCashFlow.toFixed(2);
      }
    }
    
    const numericValue = parseFloat(rawValue) || 0;
    const displayValue = isReadOnly ? formatCurrency(numericValue) : formatInputValue(rawValue);
    const percentageDisplay = calculatePercentage(numericValue, year);
    
    return (
      <TableCell className="p-2">
        <div className="flex items-center gap-2">
          {isReadOnly ? (
            <div className="flex-1 text-center bg-muted-foreground/10 px-3 py-2 rounded border">
              {displayValue}
            </div>
          ) : (
            <Input
              type="text"
              placeholder="$0"
              value={displayValue}
              onChange={(e) => {
                const cleanValue = parseInputValue(e.target.value);
                onInputChange(key, cleanValue);
              }}
              className="text-center"
            />
          )}
          {numericValue !== 0 && (
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
