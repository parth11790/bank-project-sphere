
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ContributionIndicator from './ContributionIndicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface DebtSummaryFormProps {
  formValues: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const DebtSummaryForm: React.FC<DebtSummaryFormProps> = ({
  formValues,
  onInputChange
}) => {
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022', '2021']);
  const availableYears = ['2023', '2022', '2021', '2020', '2019'];

  // Field instructions
  const fieldNotes: Record<string, string> = {
    'primaryResidence': 'Monthly payment for primary residence mortgage',
    'secondResidence': 'Monthly payment for second home/vacation property',
    'investmentProperties': 'Total monthly payments for all investment properties',
    'businessLoans': 'Monthly payments for business debt obligations',
    'vehicleLoans': 'Monthly payments for car, truck, boat, RV loans',
    'creditCards': 'Minimum monthly payments for all credit cards',
    'studentLoans': 'Monthly student loan payments',
    'personalLoans': 'Monthly payments for personal loans and lines of credit',
    'otherDebt': 'Any other monthly debt obligations not listed above',
    'totalDebtService': 'Calculated: Sum of all monthly debt payments',
    'grossMonthlyIncome': 'Total monthly income before taxes (from tax returns)',
    'debtServiceCoverage': 'Calculated: Gross Monthly Income ÷ Total Debt Service',
    'debtToIncomeRatio': 'Calculated: (Total Debt Service ÷ Gross Monthly Income) × 100',
    'cashAvailable': 'Calculated: Gross Monthly Income - Total Debt Service'
  };

  const handleYearChange = (index: number, year: string) => {
    const newYears = [...selectedYears];
    newYears[index] = year;
    setSelectedYears(newYears);
  };

  const getFieldKey = (fieldName: string, year: string) => `${fieldName}_${year}`;

  // Calculate totals for each year
  const calculateDebtTotals = (year: string) => {
    const debtFields = [
      'primaryResidence', 'secondResidence', 'investmentProperties', 
      'businessLoans', 'vehicleLoans', 'creditCards', 
      'studentLoans', 'personalLoans', 'otherDebt'
    ];
    
    const total = debtFields.reduce((sum, field) => {
      const value = parseFloat(formValues[getFieldKey(field, year)] || '0');
      return sum + value;
    }, 0);
    
    return total;
  };

  const calculateRatios = (year: string) => {
    const totalDebt = calculateDebtTotals(year);
    const grossIncome = parseFloat(formValues[getFieldKey('grossMonthlyIncome', year)] || '0');
    
    const debtServiceCoverage = grossIncome > 0 ? grossIncome / totalDebt : 0;
    const debtToIncomeRatio = grossIncome > 0 ? (totalDebt / grossIncome) * 100 : 0;
    const cashAvailable = grossIncome - totalDebt;
    
    return {
      totalDebt,
      debtServiceCoverage,
      debtToIncomeRatio,
      cashAvailable
    };
  };

  const renderInputCell = (fieldName: string, year: string, isReadOnly: boolean = false) => {
    const key = getFieldKey(fieldName, year);
    let value = formValues[key] || '';
    
    // For calculated fields, use the calculated values
    if (isReadOnly) {
      const calculations = calculateRatios(year);
      if (fieldName === 'totalDebtService') {
        value = calculations.totalDebt.toFixed(2);
      } else if (fieldName === 'debtServiceCoverage') {
        value = calculations.debtServiceCoverage.toFixed(2);
      } else if (fieldName === 'debtToIncomeRatio') {
        value = calculations.debtToIncomeRatio.toFixed(2);
      } else if (fieldName === 'cashAvailable') {
        value = calculations.cashAvailable.toFixed(2);
      }
    }
    
    return (
      <TableCell className="p-2">
        <Input
          type="number"
          placeholder="0"
          value={value}
          onChange={(e) => onInputChange(key, e.target.value)}
          readOnly={isReadOnly}
          className={`text-center ${isReadOnly ? "bg-muted-foreground/10" : ""}`}
        />
      </TableCell>
    );
  };

  const renderFormRow = (
    fieldName: string,
    label: string,
    isExpense: boolean = false,
    isCalculated: boolean = false
  ) => {
    const note = fieldNotes[fieldName];
    
    return (
      <TableRow className={isCalculated ? "bg-muted font-semibold" : ""}>
        <TableCell className="font-medium w-1/3 p-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {isExpense && (
                <ContributionIndicator fieldType="expense" />
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Debt Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Debt Category</TableHead>
                {selectedYears.map((year, index) => (
                  <TableHead key={year} className="text-center">
                    <Select value={year} onValueChange={(value) => handleYearChange(index, value)}>
                      <SelectTrigger className="w-full font-bold text-blue-600 border-none shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableYears.map((availableYear) => (
                          <SelectItem key={availableYear} value={availableYear}>
                            {availableYear}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Monthly Debt Payments */}
              {renderFormRow('primaryResidence', 'Primary Residence ($)', true)}
              {renderFormRow('secondResidence', 'Second Residence ($)', true)}
              {renderFormRow('investmentProperties', 'Investment Properties ($)', true)}
              {renderFormRow('businessLoans', 'Business Loans ($)', true)}
              {renderFormRow('vehicleLoans', 'Vehicle Loans ($)', true)}
              {renderFormRow('creditCards', 'Credit Cards ($)', true)}
              {renderFormRow('studentLoans', 'Student Loans ($)', true)}
              {renderFormRow('personalLoans', 'Personal Loans ($)', true)}
              {renderFormRow('otherDebt', 'Other Debt ($)', true)}

              {/* Calculated Total */}
              {renderFormRow('totalDebtService', 'Total Debt Service ($)', true, true)}

              {/* Income and Ratios */}
              {renderFormRow('grossMonthlyIncome', 'Gross Monthly Income ($)')}
              {renderFormRow('debtServiceCoverage', 'Debt Service Coverage Ratio', false, true)}
              {renderFormRow('debtToIncomeRatio', 'Debt to Income Ratio (%)', false, true)}
              {renderFormRow('cashAvailable', 'Cash Available ($)', false, true)}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtSummaryForm;
