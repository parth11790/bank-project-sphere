
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, TrendingDown, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';
import DocumentUploadCard from './DocumentUploadCard';

interface BusinessBalanceSheetData {
  [year: string]: {
    // Assets
    cash: number;
    accountsReceivable: number;
    inventory: number;
    otherCurrentAssets: number;
    netFixedAssets: number;
    otherAssets: number;
    
    // Liabilities
    accountsPayable: number;
    currentPortionLTD: number;
    notesPayable: number;
    accruedExpenses: number;
    otherCurrentLiabilities: number;
    shareholderLoans: number;
    longTermDebt: number;
    
    // Equity
    equity: number;
  };
}

interface BusinessBalanceSheetMultiYearProps {
  formValues: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const BusinessBalanceSheetMultiYear: React.FC<BusinessBalanceSheetMultiYearProps> = ({
  formValues,
  onInputChange
}) => {
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022', '2021']);
  const [file, setFile] = useState<File | null>(null);

  const availableYears = ['2023', '2022', '2021', '2020', '2019'];

  const handleYearToggle = (year: string) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year].sort((a, b) => parseInt(b) - parseInt(a))
    );
  };

  const getFieldKey = (fieldName: string, year: string) => `${fieldName}_${year}`;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const parseValue = (value: string): number => {
    const cleanValue = value.replace(/[$,]/g, '');
    return parseFloat(cleanValue) || 0;
  };

  const formatInputValue = (value: string): string => {
    if (!value || value === '0') return '';
    const numericValue = parseValue(value);
    if (isNaN(numericValue)) return value;
    return formatCurrency(numericValue);
  };

  const parseInputValue = (value: string): string => {
    if (!value) return '';
    const cleanValue = value.replace(/[$,]/g, '');
    return cleanValue;
  };

  const calculateTotals = (year: string) => {
    const cash = parseValue(formValues[getFieldKey('cash', year)] || '0');
    const ar = parseValue(formValues[getFieldKey('accountsReceivable', year)] || '0');
    const inventory = parseValue(formValues[getFieldKey('inventory', year)] || '0');
    const otherCurrentAssets = parseValue(formValues[getFieldKey('otherCurrentAssets', year)] || '0');
    const netFixedAssets = parseValue(formValues[getFieldKey('netFixedAssets', year)] || '0');
    const otherAssets = parseValue(formValues[getFieldKey('otherAssets', year)] || '0');

    const accountsPayable = parseValue(formValues[getFieldKey('accountsPayable', year)] || '0');
    const currentPortionLTD = parseValue(formValues[getFieldKey('currentPortionLTD', year)] || '0');
    const notesPayable = parseValue(formValues[getFieldKey('notesPayable', year)] || '0');
    const accruedExpenses = parseValue(formValues[getFieldKey('accruedExpenses', year)] || '0');
    const otherCurrentLiab = parseValue(formValues[getFieldKey('otherCurrentLiabilities', year)] || '0');
    const shareholderLoans = parseValue(formValues[getFieldKey('shareholderLoans', year)] || '0');
    const longTermDebt = parseValue(formValues[getFieldKey('longTermDebt', year)] || '0');
    const equity = parseValue(formValues[getFieldKey('equity', year)] || '0');

    const currentAssets = cash + ar + inventory + otherCurrentAssets;
    const totalAssets = currentAssets + netFixedAssets + otherAssets;
    const currentLiabilities = accountsPayable + currentPortionLTD + notesPayable + accruedExpenses + otherCurrentLiab;
    const totalLiabilities = currentLiabilities + shareholderLoans + longTermDebt;
    const totalLiabilitiesAndEquity = totalLiabilities + equity;
    const balanceCheck = totalAssets - totalLiabilitiesAndEquity;

    return {
      currentAssets,
      totalAssets,
      currentLiabilities, 
      totalLiabilities,
      totalLiabilitiesAndEquity,
      balanceCheck,
      isBalanced: Math.abs(balanceCheck) < 0.01
    };
  };

  const renderInputRow = (
    label: string,
    fieldName: string,
    category: string = '',
    isCalculated: boolean = false,
    calculatedValue?: number
  ) => (
    <tr key={fieldName} className={isCalculated ? "bg-muted font-semibold" : ""}>
      <td className="p-2 text-xs text-muted-foreground">{category}</td>
      <td className="p-2 font-medium">{label}</td>
      {selectedYears.map(year => {
        const key = getFieldKey(fieldName, year);
        const value = isCalculated && calculatedValue !== undefined 
          ? formatCurrency(calculatedValue) 
          : formatInputValue(formValues[key] || '');
        
        return (
          <td key={year} className="p-2">
            {isCalculated ? (
              <div className="text-center bg-muted-foreground/10 px-3 py-2 rounded border">
                {value}
              </div>
            ) : (
              <Input
                type="text"
                placeholder="$0"
                value={value}
                onChange={(e) => {
                  const cleanValue = parseInputValue(e.target.value);
                  onInputChange(key, cleanValue);
                }}
                className="text-center"
              />
            )}
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Year Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Years</CardTitle>
          <CardDescription>Choose which years to include in your balance sheet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {availableYears.map(year => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => handleYearToggle(year)}
                />
                <Label htmlFor={`year-${year}`} className="font-medium">{year}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <DocumentUploadCard file={file} setFile={setFile} />

      {/* Balance Sheet Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Balance Sheet</CardTitle>
          <CardDescription>Enter your business financial position for selected years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left text-xs">Category</th>
                  <th className="p-2 text-left">Item</th>
                  {selectedYears.map(year => (
                    <th key={year} className="p-2 text-center font-semibold">{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Assets Section */}
                <tr className="bg-blue-50">
                  <td colSpan={2 + selectedYears.length} className="p-2 font-bold text-blue-800">ASSETS</td>
                </tr>
                {renderInputRow('Cash', 'cash', 'Current Assets')}
                {renderInputRow('A/R', 'accountsReceivable', 'Current Assets')}
                {renderInputRow('Inventory', 'inventory', 'Current Assets')}
                {renderInputRow('Other Current Assets', 'otherCurrentAssets', 'Current Assets')}
                
                <tr className="bg-blue-100">
                  <td className="p-2"></td>
                  <td className="p-2 font-semibold">Current Assets</td>
                  {selectedYears.map(year => {
                    const totals = calculateTotals(year);
                    return (
                      <td key={year} className="p-2 text-center font-semibold">
                        {formatCurrency(totals.currentAssets)}
                      </td>
                    );
                  })}
                </tr>

                {renderInputRow('Net Fixed Assets', 'netFixedAssets', 'Net Fixed Assets')}
                {renderInputRow('Other Assets', 'otherAssets', 'Other Assets')}

                <tr className="bg-blue-200">
                  <td className="p-2"></td>
                  <td className="p-2 font-bold">Total Assets</td>
                  {selectedYears.map(year => {
                    const totals = calculateTotals(year);
                    return (
                      <td key={year} className="p-2 text-center font-bold">
                        {formatCurrency(totals.totalAssets)}
                      </td>
                    );
                  })}
                </tr>

                {/* Spacer */}
                <tr><td colSpan={2 + selectedYears.length} className="p-2"></td></tr>

                {/* Liabilities Section */}
                <tr className="bg-red-50">
                  <td colSpan={2 + selectedYears.length} className="p-2 font-bold text-red-800">LIABILITIES</td>
                </tr>
                {renderInputRow('Acct Payable', 'accountsPayable', 'Current Liabilities')}
                {renderInputRow('Curr. Portion LTD', 'currentPortionLTD', 'Current Liabilities')}
                {renderInputRow('Notes Payable', 'notesPayable', 'Current Liabilities')}
                {renderInputRow('Accrued Expenses', 'accruedExpenses', 'Current Liabilities')}
                {renderInputRow('Other Current Liab', 'otherCurrentLiabilities', 'Current Liabilities')}

                <tr className="bg-red-100">
                  <td className="p-2"></td>
                  <td className="p-2 font-semibold">Current Liabilities</td>
                  {selectedYears.map(year => {
                    const totals = calculateTotals(year);
                    return (
                      <td key={year} className="p-2 text-center font-semibold">
                        {formatCurrency(totals.currentLiabilities)}
                      </td>
                    );
                  })}
                </tr>

                {renderInputRow('Shareholder Loans', 'shareholderLoans', 'Shareholder Loans')}
                {renderInputRow('Long Term Debt', 'longTermDebt', 'Long Term Debt')}

                <tr className="bg-red-200">
                  <td className="p-2"></td>
                  <td className="p-2 font-bold">Total Liabilities</td>
                  {selectedYears.map(year => {
                    const totals = calculateTotals(year);
                    return (
                      <td key={year} className="p-2 text-center font-bold">
                        {formatCurrency(totals.totalLiabilities)}
                      </td>
                    );
                  })}
                </tr>

                {/* Equity Section */}
                <tr className="bg-green-50">
                  <td colSpan={2 + selectedYears.length} className="p-2 font-bold text-green-800">EQUITY</td>
                </tr>
                {renderInputRow('Equity', 'equity', 'Equity')}

                <tr className="bg-gray-200">
                  <td className="p-2"></td>
                  <td className="p-2 font-bold">Total Liabilities & Equity</td>
                  {selectedYears.map(year => {
                    const totals = calculateTotals(year);
                    return (
                      <td key={year} className="p-2 text-center font-bold">
                        {formatCurrency(totals.totalLiabilitiesAndEquity)}
                      </td>
                    );
                  })}
                </tr>

                {/* Balance Check */}
                <tr className="border-t-2">
                  <td className="p-2"></td>
                  <td className="p-2 font-bold">Balance Check</td>
                  {selectedYears.map(year => {
                    const totals = calculateTotals(year);
                    return (
                      <td key={year} className="p-2 text-center">
                        <Badge 
                          className={totals.isBalanced ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {totals.isBalanced ? (
                            <><TrendingUp className="h-3 w-3 mr-1" />Balanced</>
                          ) : (
                            <><TrendingDown className="h-3 w-3 mr-1" />Off by {formatCurrency(Math.abs(totals.balanceCheck))}</>
                          )}
                        </Badge>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessBalanceSheetMultiYear;
