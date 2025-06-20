
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceSheetData {
  // Assets
  cash: number;
  accountsReceivable: number;
  inventory: number;
  prepaidExpenses: number;
  equipment: number;
  buildings: number;
  land: number;
  otherAssets: number;
  
  // Liabilities
  accountsPayable: number;
  shortTermLoans: number;
  accruedExpenses: number;
  currentPortionLongTermDebt: number;
  longTermDebt: number;
  mortgagePayable: number;
  otherLiabilities: number;
  
  // Equity
  ownerCapital: number;
  retainedEarnings: number;
  additionalPaidInCapital: number;
}

const BusinessBalanceSheetForm: React.FC = () => {
  const [formData, setFormData] = useState<BalanceSheetData>({
    cash: 125000,
    accountsReceivable: 85000,
    inventory: 65000,
    prepaidExpenses: 12000,
    equipment: 150000,
    buildings: 325000,
    land: 200000,
    otherAssets: 38000,
    accountsPayable: 45000,
    shortTermLoans: 25000,
    accruedExpenses: 18000,
    currentPortionLongTermDebt: 35000,
    longTermDebt: 180000,
    mortgagePayable: 220000,
    otherLiabilities: 27000,
    ownerCapital: 200000,
    retainedEarnings: 175000,
    additionalPaidInCapital: 75000
  });

  const handleInputChange = (field: keyof BalanceSheetData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Calculations
  const currentAssets = formData.cash + formData.accountsReceivable + formData.inventory + formData.prepaidExpenses;
  const fixedAssets = formData.equipment + formData.buildings + formData.land;
  const totalAssets = currentAssets + fixedAssets + formData.otherAssets;
  
  const currentLiabilities = formData.accountsPayable + formData.shortTermLoans + formData.accruedExpenses + formData.currentPortionLongTermDebt;
  const longTermLiabilities = formData.longTermDebt + formData.mortgagePayable;
  const totalLiabilities = currentLiabilities + longTermLiabilities + formData.otherLiabilities;
  
  const totalEquity = formData.ownerCapital + formData.retainedEarnings + formData.additionalPaidInCapital;
  
  const balanceCheck = totalAssets - (totalLiabilities + totalEquity);
  const isBalanced = Math.abs(balanceCheck) < 0.01;

  // Financial ratios
  const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const debtToEquityRatio = totalEquity > 0 ? totalLiabilities / totalEquity : 0;
  const assetTurnover = totalAssets > 0 ? 850000 / totalAssets : 0; // Assuming annual revenue of $850k

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getBalanceStatus = () => {
    if (isBalanced) {
      return <Badge className="bg-green-100 text-green-800"><TrendingUp className="h-3 w-3 mr-1" />Balanced</Badge>;
    }
    return <Badge variant="destructive"><TrendingDown className="h-3 w-3 mr-1" />Out of Balance</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Business Balance Sheet</h3>
          <p className="text-sm text-muted-foreground">Enter your business financial position as of the reporting date</p>
        </div>
        {getBalanceStatus()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assets Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assets</CardTitle>
            <CardDescription>Resources owned by the business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3 text-sm">Current Assets</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cash">Cash & Cash Equivalents</Label>
                  <Input
                    id="cash"
                    type="number"
                    value={formData.cash}
                    onChange={(e) => handleInputChange('cash', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="accounts-receivable">Accounts Receivable</Label>
                  <Input
                    id="accounts-receivable"
                    type="number"
                    value={formData.accountsReceivable}
                    onChange={(e) => handleInputChange('accountsReceivable', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={formData.inventory}
                    onChange={(e) => handleInputChange('inventory', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="prepaid-expenses">Prepaid Expenses</Label>
                  <Input
                    id="prepaid-expenses"
                    type="number"
                    value={formData.prepaidExpenses}
                    onChange={(e) => handleInputChange('prepaidExpenses', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="pt-2 border-t mt-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Current Assets:</span>
                  <span>{formatCurrency(currentAssets)}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3 text-sm">Fixed Assets</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="equipment">Equipment</Label>
                  <Input
                    id="equipment"
                    type="number"
                    value={formData.equipment}
                    onChange={(e) => handleInputChange('equipment', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="buildings">Buildings</Label>
                  <Input
                    id="buildings"
                    type="number"
                    value={formData.buildings}
                    onChange={(e) => handleInputChange('buildings', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="land">Land</Label>
                  <Input
                    id="land"
                    type="number"
                    value={formData.land}
                    onChange={(e) => handleInputChange('land', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="other-assets">Other Assets</Label>
                  <Input
                    id="other-assets"
                    type="number"
                    value={formData.otherAssets}
                    onChange={(e) => handleInputChange('otherAssets', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="pt-2 border-t mt-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Fixed Assets:</span>
                  <span>{formatCurrency(fixedAssets + formData.otherAssets)}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-blue-50 p-3 rounded">
              <div className="flex justify-between font-semibold">
                <span>TOTAL ASSETS:</span>
                <span>{formatCurrency(totalAssets)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liabilities Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Liabilities</CardTitle>
            <CardDescription>Obligations owed by the business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3 text-sm">Current Liabilities</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="accounts-payable">Accounts Payable</Label>
                  <Input
                    id="accounts-payable"
                    type="number"
                    value={formData.accountsPayable}
                    onChange={(e) => handleInputChange('accountsPayable', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="short-term-loans">Short-term Loans</Label>
                  <Input
                    id="short-term-loans"
                    type="number"
                    value={formData.shortTermLoans}
                    onChange={(e) => handleInputChange('shortTermLoans', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="accrued-expenses">Accrued Expenses</Label>
                  <Input
                    id="accrued-expenses"
                    type="number"
                    value={formData.accruedExpenses}
                    onChange={(e) => handleInputChange('accruedExpenses', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="current-portion-debt">Current Portion of Long-term Debt</Label>
                  <Input
                    id="current-portion-debt"
                    type="number"
                    value={formData.currentPortionLongTermDebt}
                    onChange={(e) => handleInputChange('currentPortionLongTermDebt', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="pt-2 border-t mt-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Current Liabilities:</span>
                  <span>{formatCurrency(currentLiabilities)}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3 text-sm">Long-term Liabilities</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="long-term-debt">Long-term Debt</Label>
                  <Input
                    id="long-term-debt"
                    type="number"
                    value={formData.longTermDebt}
                    onChange={(e) => handleInputChange('longTermDebt', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="mortgage-payable">Mortgage Payable</Label>
                  <Input
                    id="mortgage-payable"
                    type="number"
                    value={formData.mortgagePayable}
                    onChange={(e) => handleInputChange('mortgagePayable', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="other-liabilities">Other Liabilities</Label>
                  <Input
                    id="other-liabilities"
                    type="number"
                    value={formData.otherLiabilities}
                    onChange={(e) => handleInputChange('otherLiabilities', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="pt-2 border-t mt-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Long-term Liabilities:</span>
                  <span>{formatCurrency(longTermLiabilities + formData.otherLiabilities)}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-red-50 p-3 rounded">
              <div className="flex justify-between font-semibold">
                <span>TOTAL LIABILITIES:</span>
                <span>{formatCurrency(totalLiabilities)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equity Section & Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Owner's Equity</CardTitle>
            <CardDescription>Owner's stake in the business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="owner-capital">Owner's Capital</Label>
                <Input
                  id="owner-capital"
                  type="number"
                  value={formData.ownerCapital}
                  onChange={(e) => handleInputChange('ownerCapital', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="retained-earnings">Retained Earnings</Label>
                <Input
                  id="retained-earnings"
                  type="number"
                  value={formData.retainedEarnings}
                  onChange={(e) => handleInputChange('retainedEarnings', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="additional-paid-capital">Additional Paid-in Capital</Label>
                <Input
                  id="additional-paid-capital"
                  type="number"
                  value={formData.additionalPaidInCapital}
                  onChange={(e) => handleInputChange('additionalPaidInCapital', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <Separator />

            <div className="bg-green-50 p-3 rounded">
              <div className="flex justify-between font-semibold">
                <span>TOTAL EQUITY:</span>
                <span>{formatCurrency(totalEquity)}</span>
              </div>
            </div>

            <Separator />

            {/* Financial Analysis */}
            <div>
              <h4 className="font-medium mb-3 text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Financial Analysis
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Ratio:</span>
                  <span className={currentRatio >= 2 ? 'text-green-600 font-medium' : currentRatio >= 1 ? 'text-yellow-600' : 'text-red-600'}>
                    {currentRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Debt-to-Equity:</span>
                  <span className={debtToEquityRatio <= 1 ? 'text-green-600 font-medium' : debtToEquityRatio <= 2 ? 'text-yellow-600' : 'text-red-600'}>
                    {debtToEquityRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Turnover:</span>
                  <span className="font-medium">{assetTurnover.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Balance Check */}
            <div className={`p-3 rounded border ${isBalanced ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between text-sm">
                <span>Balance Check:</span>
                <span className={isBalanced ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {isBalanced ? 'Balanced' : `Off by ${formatCurrency(Math.abs(balanceCheck))}`}
                </span>
              </div>
              {!isBalanced && (
                <p className="text-xs text-red-600 mt-1">
                  Assets must equal Liabilities + Equity
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessBalanceSheetForm;
