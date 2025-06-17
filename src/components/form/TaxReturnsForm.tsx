
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ContributionIndicator from './ContributionIndicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Plus, Minus, Upload } from 'lucide-react';

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
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const availableYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

  // Instructions for each field from the image
  const fieldNotes: Record<string, string> = {
    'adjustedGrossIncome': '(1040, line 11)',
    'householdMembers': 'Count Taxpayers + Dependents',
    'wages': '(1040, line 1)',
    'interestDividend': '(1040, lines 2a, 2b & 3a) - Exclude Interest from K-1s if Distributions included for that entity below (can be found on Sch B)',
    'alimonyReceived': '(Schedule 1, line 2a)',
    'iraDistributions': '(1040, line 4a) - Only include if recurring & over age 59 1/2',
    'pensionsAnnuities': '(1040, line 5a) - Only include if recurring',
    'socialSecurityBenefits': '(1040, line 6a) - Only include if recurring',
    'scheduleCIncome': '(Schedule C, line 31)',
    'scheduleCDepreciation': '(Schedule C, line 13) - Include Amortization, if applicable',
    'scheduleCInterest': '(Schedule C, line 16a & 16b) - Exclude Interest from K-1s if Distributions included for that entity below',
    'scheduleERentalIncome': '(Schedule E, line 21)',
    'scheduleERentalInterest': '(Schedule E, line 12 & 13)',
    'scheduleERentalDepreciation': '(Schedule E, line 18) - Include Amortization, if applicable',
    'scheduleFIncome': '(Schedule F, line 34)',
    'scheduleFInterest': '(Schedule F, line 21a & 21b)',
    'scheduleFDepreciation': '(Schedule F, line 14) - Include Amortization, if applicable',
    'partnershipDistributions': '(Business - Sch K-1, line 16 - "17")',
    'capitalContributions': '(Business - Sch K-1) - Enter as negative',
    'otherCashIncome': 'Example: Guaranteed payments to partners for Partnerships',
    'grossCashFlow': 'Calculated field - sum of all income items above',
    'federalStateTaxes': 'Federal (1040, line 24) & State Taxes (D-400, line 17 or Sch A, line 5a) (Sch 1, lines 11[2022] or lines 12 [2022, 2023] , 17, 18a, and 13 + Sch A, lines 1, 5a, 6, 11)',
    'otherExpenses': 'Other cash expenses not included above',
    'livingExpenses': 'This autocalculates the greater of $5000 per household member or 15% of AGI',
    'netCashFlow': 'Calculated field - Gross Cash Flow minus all expenses'
  };

  const handleYearChange = (index: number, year: string) => {
    const newYears = [...selectedYears];
    newYears[index] = year;
    setSelectedYears(newYears);
  };

  const addYear = () => {
    const nextAvailableYear = availableYears.find(year => !selectedYears.includes(year));
    if (nextAvailableYear && selectedYears.length < 8) {
      setSelectedYears([...selectedYears, nextAvailableYear]);
    }
  };

  const removeYear = (index: number) => {
    if (selectedYears.length > 1) {
      const newYears = selectedYears.filter((_, i) => i !== index);
      setSelectedYears(newYears);
    }
  };

  const handleFileUpload = (year: string, file: File | null) => {
    setUploadedFiles(prev => ({
      ...prev,
      [year]: file
    }));
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

  const renderUploadCell = (year: string) => {
    return (
      <TableCell className="p-2">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-2 text-center">
          <input
            type="file"
            id={`tax-return-${year}`}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(year, e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor={`tax-return-${year}`}
            className="cursor-pointer flex flex-col items-center gap-1"
          >
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {uploadedFiles[year] ? uploadedFiles[year]?.name?.substring(0, 10) + '...' : 'Upload'}
            </span>
          </label>
        </div>
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
    const note = fieldNotes[fieldName];
    
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
        <div className="flex items-center justify-between">
          <CardTitle>Tax Returns Information</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addYear}
              disabled={selectedYears.length >= 8}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Year
            </Button>
          </div>
        </div>
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
                    <div className="flex items-center justify-center gap-2">
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
                      {selectedYears.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeYear(index)}
                          className="h-6 w-6 p-0 text-destructive"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
              
              {/* Document Upload Row */}
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Tax Return Documents</TableHead>
                {selectedYears.map((year) => (
                  <TableHead key={`upload-${year}`} className="text-center p-2">
                    {renderUploadCell(year)}
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
