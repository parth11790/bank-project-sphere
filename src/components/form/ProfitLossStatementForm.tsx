
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfitLossStatementFormProps {
  formValues?: Record<string, string>;
  onInputChange?: (field: string, value: string) => void;
}

const ProfitLossStatementForm: React.FC<ProfitLossStatementFormProps> = ({
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
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gross-sales">Gross Sales ($)</Label>
            <Input 
              id="gross-sales" 
              type="number" 
              placeholder="0"
              value={formValues['gross_sales'] || ''}
              onChange={(e) => handleChange('gross_sales', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="returns-allowances">Returns & Allowances ($)</Label>
            <Input 
              id="returns-allowances" 
              type="number" 
              placeholder="0"
              value={formValues['returns_allowances'] || ''}
              onChange={(e) => handleChange('returns_allowances', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="net-sales">Net Sales ($)</Label>
            <Input 
              id="net-sales" 
              type="number" 
              placeholder="0"
              value={formValues['net_sales'] || ''}
              onChange={(e) => handleChange('net_sales', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="other-income">Other Income ($)</Label>
            <Input 
              id="other-income" 
              type="number" 
              placeholder="0"
              value={formValues['other_income'] || ''}
              onChange={(e) => handleChange('other_income', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost of Goods Sold</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="beginning-inventory">Beginning Inventory ($)</Label>
            <Input 
              id="beginning-inventory" 
              type="number" 
              placeholder="0"
              value={formValues['beginning_inventory'] || ''}
              onChange={(e) => handleChange('beginning_inventory', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="purchases">Purchases ($)</Label>
            <Input 
              id="purchases" 
              type="number" 
              placeholder="0"
              value={formValues['purchases'] || ''}
              onChange={(e) => handleChange('purchases', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="direct-labor">Direct Labor ($)</Label>
            <Input 
              id="direct-labor" 
              type="number" 
              placeholder="0"
              value={formValues['direct_labor'] || ''}
              onChange={(e) => handleChange('direct_labor', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ending-inventory">Ending Inventory ($)</Label>
            <Input 
              id="ending-inventory" 
              type="number" 
              placeholder="0"
              value={formValues['ending_inventory'] || ''}
              onChange={(e) => handleChange('ending_inventory', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Operating Expenses</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="salaries-wages">Salaries & Wages ($)</Label>
            <Input 
              id="salaries-wages" 
              type="number" 
              placeholder="0"
              value={formValues['salaries_wages'] || ''}
              onChange={(e) => handleChange('salaries_wages', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rent">Rent ($)</Label>
            <Input 
              id="rent" 
              type="number" 
              placeholder="0"
              value={formValues['rent'] || ''}
              onChange={(e) => handleChange('rent', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="utilities">Utilities ($)</Label>
            <Input 
              id="utilities" 
              type="number" 
              placeholder="0"
              value={formValues['utilities'] || ''}
              onChange={(e) => handleChange('utilities', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="insurance">Insurance ($)</Label>
            <Input 
              id="insurance" 
              type="number" 
              placeholder="0"
              value={formValues['insurance'] || ''}
              onChange={(e) => handleChange('insurance', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="depreciation">Depreciation ($)</Label>
            <Input 
              id="depreciation" 
              type="number" 
              placeholder="0"
              value={formValues['depreciation'] || ''}
              onChange={(e) => handleChange('depreciation', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="marketing-advertising">Marketing & Advertising ($)</Label>
            <Input 
              id="marketing-advertising" 
              type="number" 
              placeholder="0"
              value={formValues['marketing_advertising'] || ''}
              onChange={(e) => handleChange('marketing_advertising', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="professional-fees">Professional Fees ($)</Label>
            <Input 
              id="professional-fees" 
              type="number" 
              placeholder="0"
              value={formValues['professional_fees'] || ''}
              onChange={(e) => handleChange('professional_fees', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="other-expenses">Other Operating Expenses ($)</Label>
            <Input 
              id="other-expenses" 
              type="number" 
              placeholder="0"
              value={formValues['other_expenses'] || ''}
              onChange={(e) => handleChange('other_expenses', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLossStatementForm;
