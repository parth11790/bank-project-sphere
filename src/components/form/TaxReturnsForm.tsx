
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ContributionIndicator from './ContributionIndicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface TaxReturnsFormProps {
  formValues: Record<string, string>;
  calculatedValues: {
    grossCashFlow: number;
    netCashFlow: number;
    livingExpenses: number;
  };
  onInputChange: (field: string, value: string) => void;
}

const TaxReturnsForm: React.FC<TaxReturnsFormProps> = ({
  formValues,
  calculatedValues,
  onInputChange
}) => {
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022', '2021']);
  const availableYears = ['2023', '2022', '2021', '2020', '2019'];

  // Notes for specific fields
  const fieldNotes: Record<string, string> = {
    'scheduleCInterest': 'Exclude Interest from K-1s if Distributions included for that entity below',
    'iraDistributions': 'Only include if recurring & over age 59 1/2',
    'pensionsAnnuities': 'Only include if recurring',
    'socialSecurityBenefits': 'Only include if recurring',
    'scheduleCDepreciation': 'Include Amortization, if applicable',
    'scheduleERentalDepreciation': 'Include Amortization, if applicable',
    'scheduleFDepreciation': 'Include Amortization, if applicable',
    'capitalContributions': 'Enter as negative',
    'otherCashIncome': 'Example: Guaranteed payments to partners for Partnerships',
    'livingExpenses': 'Autocalculates as the greater of $5,000 per household member or 15% of AGI'
  };

  const handleYearChange = (index: number, year: string) => {
    const newYears = [...selectedYears];
    newYears[index] = year;
    setSelectedYears(newYears);
  };

  const getFieldKey = (fieldName: string, year: string) => `${fieldName}_${year}`;

  const renderInputCell = (fieldName: string, year: string, isReadOnly: boolean = false) => {
    const key = getFieldKey(fieldName, year);
    let value = formValues[key] || '';
    
    // For calculated fields, use the calculated values for the current year (2023)
    if (isReadOnly && year === '2023') {
      if (fieldName === 'grossCashFlow') {
        value = calculatedValues.grossCashFlow.toFixed(2);
      } else if (fieldName === 'netCashFlow') {
        value = calculatedValues.netCashFlow.toFixed(2);
      } else if (fieldName === 'livingExpenses') {
        value = calculatedValues.livingExpenses.toFixed(2);
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
    isIncome: boolean = false,
    isExpense: boolean = false,
    isCalculated: boolean = false
  ) => {
    const hasNote = fieldNotes[fieldName];
    
    return (
      <TableRow className={isCalculated ? "bg-muted font-semibold" : ""}>
        <TableCell className="font-medium w-1/3 p-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {(isIncome || isExpense) && (
                <ContributionIndicator fieldType={isIncome ? "income" : "expense"} />
              )}
              <span>{label}</span>
            </div>
            {hasNote && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{hasNote}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </TableCell>
        {selectedYears.map((year) => renderInputCell(fieldName, year, isCalculated))}
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Returns Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Tax Returns Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Field</TableHead>
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
              {/* Basic Information */}
              {renderFormRow('adjustedGrossIncome', 'Adjusted Gross Income ($)', true)}
              {renderFormRow('householdMembers', 'Number of Household Members')}

              {/* Income Fields */}
              {renderFormRow('wages', 'Wages, Salaries ($)', true)}
              {renderFormRow('interestDividend', 'Interest & Dividend Income ($)', true)}
              {renderFormRow('alimonyReceived', 'Alimony Received ($)', true)}
              {renderFormRow('iraDistributions', 'IRA Distributions ($)', true)}
              {renderFormRow('pensionsAnnuities', 'Pensions / Annuities ($)', true)}
              {renderFormRow('socialSecurityBenefits', 'Social Security Benefits ($)', true)}
              {renderFormRow('scheduleCIncome', 'Schedule C - Business Income / Loss ($)', true)}
              {renderFormRow('scheduleCDepreciation', 'Schedule C - Business Depreciation / Amortization ($)', true)}
              {renderFormRow('scheduleCInterest', 'Schedule C - Business Interest ($)', true)}
              {renderFormRow('scheduleERentalIncome', 'Schedule E - Rental Real Estate Income / Loss ($)', true)}
              {renderFormRow('scheduleERentalInterest', 'Schedule E - Rental Real Estate Interest ($)', true)}
              {renderFormRow('scheduleERentalDepreciation', 'Schedule E - Rental Real Estate Depreciation / Amortization ($)', true)}
              {renderFormRow('scheduleFIncome', 'Schedule F - Farm Income / Loss ($)', true)}
              {renderFormRow('scheduleFInterest', 'Schedule F - Farm Interest ($)', true)}
              {renderFormRow('scheduleFDepreciation', 'Schedule F - Farm Depreciation / Amortization ($)', true)}
              {renderFormRow('partnershipDistributions', 'Partnership / S-Corp Distributions ($)', true)}
              {renderFormRow('capitalContributions', 'Capital Contributions ($)', true)}
              {renderFormRow('otherCashIncome', 'Other Cash Income ($)', true)}

              {/* Calculated Gross Cash Flow */}
              {renderFormRow('grossCashFlow', 'Gross Cash Flow ($)', true, false, true)}

              {/* Expense Fields */}
              {renderFormRow('federalStateTaxes', 'Federal & State Taxes ($)', false, true)}
              {renderFormRow('otherExpenses', 'Other Expenses ($)', false, true)}
              {renderFormRow('livingExpenses', 'Living Expenses ($)', false, true, true)}

              {/* Calculated Net Cash Flow */}
              {renderFormRow('netCashFlow', 'Net Cash Flow ($)', false, false, true)}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxReturnsForm;
