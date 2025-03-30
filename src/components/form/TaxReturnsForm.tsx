
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ContributionIndicator from './ContributionIndicator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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
  const renderFormRow = (
    field: string,
    label: string,
    isIncome: boolean = false,
    isExpense: boolean = false,
    isReadOnly: boolean = false
  ) => {
    return (
      <TableRow>
        <TableCell className="font-medium w-1/2">
          {isIncome || isExpense ? (
            <ContributionIndicator fieldType={isIncome ? "income" : "expense"} />
          ) : null}{' '}
          {label}
        </TableCell>
        <TableCell className="w-1/2">
          <Input
            id={field}
            type="number"
            placeholder="0.00"
            value={formValues[field] || ''}
            onChange={(e) => onInputChange(field, e.target.value)}
            readOnly={isReadOnly}
            className={isReadOnly ? "bg-muted-foreground/10" : ""}
          />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          {/* Household Members - not income or expense */}
          {renderFormRow('householdMembers', 'Number of Household Members')}

          {/* Adjusted Gross Income - no longer calculated */}
          {renderFormRow('adjustedGrossIncome', 'Adjusted Gross Income ($)', true)}

          {/* Income Fields */}
          {renderFormRow('wages', 'Wages, Salaries ($)', true)}
          {renderFormRow('interest', 'Interest & Dividend Income ($)', true)}
          {renderFormRow('alimony', 'Alimony Received ($)', true)}
          {renderFormRow('ira', 'IRA Distributions ($)', true)}
          {renderFormRow('pensions', 'Pensions / Annuities ($)', true)}
          {renderFormRow('socialSecurity', 'Social Security Benefits ($)', true)}
          {renderFormRow('businessIncome', 'Schedule C - Business Income / Loss ($)', true)}
          {renderFormRow('businessDepreciation', 'Schedule C - Business Depreciation / Amortization ($)', true)}
          {renderFormRow('businessInterest', 'Schedule C - Business Interest ($)', true)}
          {renderFormRow('rentalIncome', 'Schedule E - Rental Real Estate Income / Loss ($)', true)}
          {renderFormRow('rentalInterest', 'Schedule E - Rental Real Estate Interest ($)', true)}
          {renderFormRow('rentalDepreciation', 'Schedule E - Rental Real Estate Depreciation / Amortization ($)', true)}
          {renderFormRow('farmIncome', 'Schedule F - Farm Income / Loss ($)', true)}
          {renderFormRow('farmInterest', 'Schedule F - Farm Interest ($)', true)}
          {renderFormRow('farmDepreciation', 'Schedule F - Farm Depreciation / Amortization ($)', true)}
          {renderFormRow('partnershipDistributions', 'Partnership / S-Corp Distributions ($)', true)}
          {renderFormRow('capitalContributions', 'Capital Contributions ($)', true)}
          {renderFormRow('otherIncome', 'Other Cash Income ($)', true)}

          {/* Calculated Gross Cash Flow */}
          <TableRow className="bg-muted">
            <TableCell className="font-medium w-1/2">
              <ContributionIndicator fieldType="income" /> Gross Cash Flow ($)
            </TableCell>
            <TableCell className="w-1/2">
              <Input 
                id="grossCashFlow" 
                type="number" 
                value={calculatedValues.grossCashFlow.toFixed(2)} 
                readOnly
                className="bg-muted-foreground/10"
              />
            </TableCell>
          </TableRow>

          {/* Expense Fields */}
          {renderFormRow('taxes', 'Federal & State Taxes ($)', false, true)}
          {renderFormRow('otherExpenses', 'Other Expenses ($)', false, true)}
          {renderFormRow('livingExpenses', 'Living Expenses ($)', false, true)}

          {/* Calculated Net Cash Flow */}
          <TableRow className="bg-muted">
            <TableCell className="font-medium w-1/2">
              Net Cash Flow ($)
            </TableCell>
            <TableCell className="w-1/2">
              <Input 
                id="netCashFlow" 
                type="number" 
                value={calculatedValues.netCashFlow.toFixed(2)} 
                readOnly
                className="bg-muted-foreground/10"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TaxReturnsForm;
