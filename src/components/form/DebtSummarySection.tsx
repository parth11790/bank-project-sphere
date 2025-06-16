
import React from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface DebtSummarySectionProps {
  formValues: Record<string, string>;
  calculatedValues: {
    grossCashFlow: number;
    netCashFlow: number;
    livingExpenses: number;
  };
  onInputChange: (field: string, value: string) => void;
  selectedYears: string[];
}

const DebtSummarySection: React.FC<DebtSummarySectionProps> = ({
  formValues,
  calculatedValues,
  onInputChange,
  selectedYears
}) => {
  // Instructions for debt summary fields
  const debtFieldNotes: Record<string, string> = {
    'mortgage': 'Use payment on CBI or estimate the payment using a 20 yr amort or 1.5% of balance - Note, only include payments based on what is drawn or about to be drawn (i.e. for injection). Don\'t estimate payment if they have been keeping $0 balance.',
    'homeEquityLine': 'Use payment on CBI or estimate the payment using a 20 yr amort or 1.5% of balance',
    'auto': 'Use payment on CBI or estimate based on typical auto loan terms',
    'revolvingCredit': 'Use payment on CBI or 3% of balance',
    'creditCard': 'Use payment on CBI or minimum payment requirement',
    'storeCard': 'Use payment on CBI or minimum payment requirement',
    'education': 'Use payment on CBI or 1% of balance',
    'proposedLoan': 'Enter the proposed loan payment amount',
    'totalDebtService': 'Calculated field - sum of all annual debt service amounts',
    'debtServiceCoverage': 'Calculated field - Net Cash Flow divided by Total Debt Service',
    'debtToIncomeRatio': 'Calculated field - Total Debt Service divided by monthly Gross Cash Flow',
    'cashAvailable': 'Calculated field - Net Cash Flow minus Total Debt Service'
  };

  const getFieldKey = (fieldName: string, year: string) => `debt_${fieldName}_${year}`;

  // Calculate debt summary values for the current year (2023)
  const currentYear = selectedYears[0] || '2023';
  
  const calculateAnnualDebtService = (fieldName: string) => {
    const monthlyPayment = parseFloat(formValues[getFieldKey(fieldName, currentYear)] || '0');
    return monthlyPayment * 12;
  };

  const totalDebtService = [
    'mortgage', 'homeEquityLine', 'auto', 'revolvingCredit', 
    'creditCard', 'storeCard', 'education', 'proposedLoan'
  ].reduce((sum, field) => sum + calculateAnnualDebtService(field), 0);

  const debtServiceCoverage = calculatedValues.netCashFlow === 0 || totalDebtService === 0 
    ? 0 
    : calculatedValues.netCashFlow / totalDebtService;

  const monthlyGrossCashFlow = calculatedValues.grossCashFlow / 12;
  const debtToIncomeRatio = monthlyGrossCashFlow === 0 
    ? 0 
    : (totalDebtService / 12) / monthlyGrossCashFlow;

  const cashAvailable = calculatedValues.netCashFlow - totalDebtService;

  const renderInputCell = (fieldName: string, year: string, isReadOnly: boolean = false) => {
    const key = getFieldKey(fieldName, year);
    let value = formValues[key] || '';
    
    // For calculated fields, show calculated values
    if (isReadOnly && year === currentYear) {
      if (fieldName === 'totalDebtService') {
        value = totalDebtService.toFixed(2);
      } else if (fieldName === 'debtServiceCoverage') {
        value = debtServiceCoverage.toFixed(3);
      } else if (fieldName === 'debtToIncomeRatio') {
        value = (debtToIncomeRatio * 100).toFixed(2) + '%';
      } else if (fieldName === 'cashAvailable') {
        value = cashAvailable.toFixed(2);
      }
    }
    
    return (
      <TableCell className="p-2">
        <Input
          type={fieldName.includes('Ratio') ? "text" : "number"}
          placeholder="0"
          value={value}
          onChange={(e) => onInputChange(key, e.target.value)}
          readOnly={isReadOnly}
          className={`text-center ${isReadOnly ? "bg-muted-foreground/10" : ""}`}
        />
      </TableCell>
    );
  };

  const renderAnnualDebtServiceCell = (fieldName: string, year: string) => {
    const annualValue = calculateAnnualDebtService(fieldName);
    return (
      <TableCell className="p-2">
        <Input
          type="text"
          value={annualValue.toFixed(2)}
          readOnly
          className="text-center bg-muted-foreground/10"
        />
      </TableCell>
    );
  };

  const renderDebtRow = (
    fieldName: string,
    label: string,
    isCalculated: boolean = false,
    isTotal: boolean = false
  ) => {
    const note = debtFieldNotes[fieldName];
    
    return (
      <TableRow className={isCalculated || isTotal ? "bg-muted font-semibold" : ""}>
        <TableCell className="font-medium w-1/5 p-3">
          <div className="flex items-center gap-2">
            <span>{label}</span>
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
        {selectedYears.map((year) => renderInputCell(`${fieldName}HighCredit`, year, false))}
        {selectedYears.map((year) => renderInputCell(`${fieldName}Balance`, year, false))}
        {selectedYears.map((year) => renderInputCell(fieldName, year, false))}
        {selectedYears.map((year) => 
          isTotal ? (
            <TableCell key={year} className="p-2">
              <Input
                type="text"
                value={totalDebtService.toFixed(2)}
                readOnly
                className="text-center bg-muted-foreground/10 font-semibold"
              />
            </TableCell>
          ) : (
            renderAnnualDebtServiceCell(fieldName, year)
          )
        )}
      </TableRow>
    );
  };

  const renderCalculationRow = (fieldName: string, label: string, value: string) => {
    const note = debtFieldNotes[fieldName];
    
    return (
      <TableRow className="bg-muted font-semibold">
        <TableCell colSpan={selectedYears.length * 4 + 1} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{label}</span>
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
            <div className="text-right font-bold">
              {value}
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Lender / Collateral Description</TableHead>
              {selectedYears.map((year) => (
                <TableHead key={`high-${year}`} className="text-center">
                  High Credit / Limit ({year})
                </TableHead>
              ))}
              {selectedYears.map((year) => (
                <TableHead key={`balance-${year}`} className="text-center">
                  Balance Owed ({year})
                </TableHead>
              ))}
              {selectedYears.map((year) => (
                <TableHead key={`monthly-${year}`} className="text-center">
                  Monthly Payment ({year})
                </TableHead>
              ))}
              {selectedYears.map((year) => (
                <TableHead key={`annual-${year}`} className="text-center">
                  Annual Debt Service ({year})
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderDebtRow('mortgage', 'Mortgage')}
            {renderDebtRow('homeEquityLine', 'Home Equity Line')}
            {renderDebtRow('auto', 'Auto')}
            {renderDebtRow('revolvingCredit', 'Revolving Credit')}
            {renderDebtRow('creditCard', 'Credit Card')}
            {renderDebtRow('storeCard', 'Store Card')}
            {renderDebtRow('education', 'Education')}
            {renderDebtRow('proposedLoan', 'Proposed Loan')}
            {renderDebtRow('total', 'Total Debt Service', false, true)}
            
            {renderCalculationRow(
              'debtServiceCoverage',
              'Debt Service Coverage (based on Net Cash Flow)',
              debtServiceCoverage.toFixed(3)
            )}
            
            {renderCalculationRow(
              'debtToIncomeRatio',
              'Debt to Income Ratio (based on Gross Cash Flow)',
              (debtToIncomeRatio * 100).toFixed(2) + '%'
            )}
            
            {renderCalculationRow(
              'cashAvailable',
              'Cash Available for Additional Debt Service, etc.',
              '$' + cashAvailable.toFixed(2)
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DebtSummarySection;
