
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountsReceivablePayableFormProps {
  formValues?: Record<string, string>;
  onInputChange?: (field: string, value: string) => void;
}

const AccountsReceivablePayableForm: React.FC<AccountsReceivablePayableFormProps> = ({
  formValues = {},
  onInputChange = () => {}
}) => {
  const handleChange = (field: string, value: string) => {
    onInputChange(field, value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accounts Receivable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total-ar">Total Accounts Receivable ($)</Label>
              <Input 
                id="total-ar" 
                type="number" 
                placeholder="0"
                value={formValues['total_accounts_receivable'] || ''}
                onChange={(e) => handleChange('total_accounts_receivable', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="current-ar">Current (0-30 days) ($)</Label>
              <Input 
                id="current-ar" 
                type="number" 
                placeholder="0"
                value={formValues['current_0_30'] || ''}
                onChange={(e) => handleChange('current_0_30', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ar-31-60">31-60 days ($)</Label>
              <Input 
                id="ar-31-60" 
                type="number" 
                placeholder="0"
                value={formValues['ar_31_60'] || ''}
                onChange={(e) => handleChange('ar_31_60', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ar-61-90">61-90 days ($)</Label>
              <Input 
                id="ar-61-90" 
                type="number" 
                placeholder="0"
                value={formValues['ar_61_90'] || ''}
                onChange={(e) => handleChange('ar_61_90', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ar-over-90">Over 90 days ($)</Label>
              <Input 
                id="ar-over-90" 
                type="number" 
                placeholder="0"
                value={formValues['ar_over_90'] || ''}
                onChange={(e) => handleChange('ar_over_90', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bad-debt-allowance">Bad Debt Allowance ($)</Label>
              <Input 
                id="bad-debt-allowance" 
                type="number" 
                placeholder="0"
                value={formValues['bad_debt_allowance'] || ''}
                onChange={(e) => handleChange('bad_debt_allowance', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="major-customers">Major Customers (Name and Amount Owed)</Label>
            <Textarea 
              id="major-customers" 
              placeholder="List major customers and amounts owed..."
              value={formValues['major_customers'] || ''}
              onChange={(e) => handleChange('major_customers', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accounts Payable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total-ap">Total Accounts Payable ($)</Label>
              <Input 
                id="total-ap" 
                type="number" 
                placeholder="0"
                value={formValues['total_accounts_payable'] || ''}
                onChange={(e) => handleChange('total_accounts_payable', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="current-ap">Current (0-30 days) ($)</Label>
              <Input 
                id="current-ap" 
                type="number" 
                placeholder="0"
                value={formValues['current_ap_0_30'] || ''}
                onChange={(e) => handleChange('current_ap_0_30', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ap-31-60">31-60 days ($)</Label>
              <Input 
                id="ap-31-60" 
                type="number" 
                placeholder="0"
                value={formValues['ap_31_60'] || ''}
                onChange={(e) => handleChange('ap_31_60', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ap-61-90">61-90 days ($)</Label>
              <Input 
                id="ap-61-90" 
                type="number" 
                placeholder="0"
                value={formValues['ap_61_90'] || ''}
                onChange={(e) => handleChange('ap_61_90', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ap-over-90">Over 90 days ($)</Label>
              <Input 
                id="ap-over-90" 
                type="number" 
                placeholder="0"
                value={formValues['ap_over_90'] || ''}
                onChange={(e) => handleChange('ap_over_90', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="trade-credit-terms">Trade Credit Terms</Label>
              <Input 
                id="trade-credit-terms" 
                type="text" 
                placeholder="e.g., Net 30, 2/10 Net 30"
                value={formValues['trade_credit_terms'] || ''}
                onChange={(e) => handleChange('trade_credit_terms', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="major-suppliers">Major Suppliers (Name and Amount Owed)</Label>
            <Textarea 
              id="major-suppliers" 
              placeholder="List major suppliers and amounts owed..."
              value={formValues['major_suppliers'] || ''}
              onChange={(e) => handleChange('major_suppliers', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsReceivablePayableForm;
