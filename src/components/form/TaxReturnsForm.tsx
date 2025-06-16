
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ContributionIndicator from './ContributionIndicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaxReturnsFormProps {
  formValues: Record<string, string>;
  calculatedValues: {
    grossCashFlow: number;
    netCashFlow: number;
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

  const handleYearChange = (index: number, year: string) => {
    const newYears = [...selectedYears];
    newYears[index] = year;
    setSelectedYears(newYears);
  };

  const getFieldKey = (fieldName: string, year: string) => `${fieldName}_${year}`;

  const renderInputCell = (fieldName: string, year: string, isReadOnly: boolean = false) => {
    const key = getFieldKey(fieldName, year);
    return (
      <TableCell className="p-2">
        <Input
          type="number"
          placeholder="0"
          value={formValues[key] || ''}
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
    return (
      <TableRow className={isCalculated ? "bg-muted font-semibold" : ""}>
        <TableCell className="font-medium w-1/3 p-3">
          {(isIncome || isExpense) && (
            <ContributionIndicator fieldType={isIncome ? "income" : "expense"} />
          )}{' '}
          {label}
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
          {/* Year Selection */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {selectedYears.map((year, index) => (
              <div key={index} className="space-y-2">
                <Label>Tax Year {index + 1}</Label>
                <Select value={year} onValueChange={(value) => handleYearChange(index, value)}>
                  <SelectTrigger>
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
              </div>
            ))}
          </div>

          {/* Tax Returns Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Field</TableHead>
                {selectedYears.map((year) => (
                  <TableHead key={year} className="text-center font-bold text-blue-600">
                    {year}
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
              {renderFormRow('livingExpenses', 'Living Expenses ($)', false, true)}

              {/* Calculated Net Cash Flow */}
              {renderFormRow('netCashFlow', 'Net Cash Flow ($)', false, false, true)}
            </TableBody>
          </Table>

          {/* Instructions and Notes */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Additional Notes:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Exclude Interest from K-1s if Distributions included for that entity below</li>
              <li>• Only include if recurring & over age 59 1/2 (IRA Distributions)</li>
              <li>• Only include if recurring (Pensions/Annuities, Social Security)</li>
              <li>• Include Amortization, if applicable (Business & Rental Depreciation)</li>
              <li>• Enter as negative (Capital Contributions)</li>
              <li>• Example: Guaranteed payments to partners for Partnerships</li>
              <li>• This autocalculates the greater of $5M per household member or 15% of AGI (Living Expenses)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxReturnsForm;
