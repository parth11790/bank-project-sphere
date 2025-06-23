
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ContributionIndicator from './ContributionIndicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Plus, Minus, Upload } from 'lucide-react';

interface BusinessTaxReturnsFormProps {
  formValues: Record<string, string>;
  calculatedValues: {
    grossIncome: number;
    netIncome: number;
    totalDeductions: number;
  };
  onInputChange: (field: string, value: string) => void;
}

const BusinessTaxReturnsForm: React.FC<BusinessTaxReturnsFormProps> = ({
  formValues,
  calculatedValues,
  onInputChange
}) => {
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022', '2021']);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const availableYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

  // Instructions for each field specific to business tax returns
  const fieldNotes: Record<string, string> = {
    'grossReceipts': 'Total gross receipts or sales (1120, line 1a or 1120S, line 1a)',
    'totalIncome': 'Total income (1120, line 11 or 1120S, line 11)',
    'costOfGoodsSold': 'Cost of goods sold (1120, line 2 or 1120S, line 2)',
    'grossProfit': 'Gross profit (line 1c minus line 2)',
    'officerCompensation': 'Compensation of officers (1120, line 12 or 1120S, line 7)',
    'salariesWages': 'Salaries and wages (1120, line 13 or 1120S, line 8)',
    'repairsDeductions': 'Repairs and maintenance (1120, line 14 or 1120S, line 9)',
    'badDebts': 'Bad debts (1120, line 15 or 1120S, line 10)',
    'rentsExpenses': 'Rents (1120, line 16 or 1120S, line 11)',
    'taxesLicenses': 'Taxes and licenses (1120, line 17 or 1120S, line 12)',
    'interestExpense': 'Interest (1120, line 18 or 1120S, line 13)',
    'charitableContributions': 'Charitable contributions (1120, line 19 or 1120S, line 14)',
    'depreciationDepletion': 'Depreciation and depletion (1120, line 20 or 1120S, line 15)',
    'advertisingExpenses': 'Advertising (1120, line 21 or 1120S, line 16)',
    'pensionBenefits': 'Pension, profit-sharing plans (1120, line 22 or 1120S, line 17)',
    'employeeBenefits': 'Employee benefit programs (1120, line 23 or 1120S, line 18)',
    'otherDeductions': 'Other deductions (1120, line 24 or 1120S, line 19)',
    'totalDeductions': 'Total deductions (1120, line 25 or 1120S, line 20)',
    'taxableIncome': 'Taxable income before NOL (1120, line 26 or 1120S, line 21)',
    'ordinaryBusinessIncome': 'Ordinary business income (loss) - S Corp only',
    'netIncome': 'Net income after all deductions',
    'cashDistributions': 'Cash distributions to shareholders/partners',
    'depreciation': 'Depreciation (add back for cash flow analysis)',
    'amortization': 'Amortization (add back for cash flow analysis)',
    'operatingCashFlow': 'Operating cash flow (Net Income + Depreciation + Amortization - Distributions)'
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
      if (fieldName === 'grossIncome') {
        value = calculatedValues.grossIncome.toFixed(2);
      } else if (fieldName === 'netIncome') {
        value = calculatedValues.netIncome.toFixed(2);
      } else if (fieldName === 'totalDeductions') {
        value = calculatedValues.totalDeductions.toFixed(2);
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
            id={`business-tax-return-${year}`}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(year, e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor={`business-tax-return-${year}`}
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
          <CardTitle>Business Tax Returns Information</CardTitle>
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
                <TableHead className="font-medium">Business Tax Return Documents</TableHead>
                {selectedYears.map((year) => (
                  <TableHead key={`upload-${year}`} className="text-center p-2">
                    {renderUploadCell(year)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Income Section */}
              {renderFormRow('grossReceipts', 'Gross Receipts or Sales ($)', true)}
              {renderFormRow('costOfGoodsSold', 'Cost of Goods Sold ($)', false, true)}
              {renderFormRow('grossProfit', 'Gross Profit ($)', true, false, true)}
              {renderFormRow('totalIncome', 'Total Income ($)', true)}

              {/* Deductions Section */}
              {renderFormRow('officerCompensation', 'Compensation of Officers ($)', false, true)}
              {renderFormRow('salariesWages', 'Salaries and Wages ($)', false, true)}
              {renderFormRow('repairsDeductions', 'Repairs and Maintenance ($)', false, true)}
              {renderFormRow('badDebts', 'Bad Debts ($)', false, true)}
              {renderFormRow('rentsExpenses', 'Rents ($)', false, true)}
              {renderFormRow('taxesLicenses', 'Taxes and Licenses ($)', false, true)}
              {renderFormRow('interestExpense', 'Interest Expense ($)', false, true)}
              {renderFormRow('charitableContributions', 'Charitable Contributions ($)', false, true)}
              {renderFormRow('depreciationDepletion', 'Depreciation and Depletion ($)', false, true)}
              {renderFormRow('advertisingExpenses', 'Advertising ($)', false, true)}
              {renderFormRow('pensionBenefits', 'Pension, Profit-sharing Plans ($)', false, true)}
              {renderFormRow('employeeBenefits', 'Employee Benefit Programs ($)', false, true)}
              {renderFormRow('otherDeductions', 'Other Deductions ($)', false, true)}

              {/* Calculated Fields */}
              {renderFormRow('totalDeductions', 'Total Deductions ($)', false, true, true)}
              {renderFormRow('taxableIncome', 'Taxable Income Before NOL ($)', true, false, true)}
              {renderFormRow('ordinaryBusinessIncome', 'Ordinary Business Income (S-Corp) ($)', true)}
              {renderFormRow('netIncome', 'Net Income ($)', true, false, true)}

              {/* Cash Flow Analysis */}
              {renderFormRow('cashDistributions', 'Cash Distributions ($)', false, true)}
              {renderFormRow('depreciation', 'Depreciation (Add Back) ($)', true)}
              {renderFormRow('amortization', 'Amortization (Add Back) ($)', true)}
              {renderFormRow('operatingCashFlow', 'Operating Cash Flow ($)', true, false, true)}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessTaxReturnsForm;
