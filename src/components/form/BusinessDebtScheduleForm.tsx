
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface DebtItem {
  creditor: string;
  originalAmount: string;
  currentBalance: string;
  monthlyPayment: string;
  interestRate: string;
  maturityDate: string;
  collateral: string;
}

interface BusinessDebtScheduleFormProps {
  formValues?: Record<string, string>;
  onInputChange?: (field: string, value: string) => void;
}

const BusinessDebtScheduleForm: React.FC<BusinessDebtScheduleFormProps> = ({
  formValues = {},
  onInputChange = () => {}
}) => {
  const [debtItems, setDebtItems] = React.useState<DebtItem[]>([
    {
      creditor: '',
      originalAmount: '',
      currentBalance: '',
      monthlyPayment: '',
      interestRate: '',
      maturityDate: '',
      collateral: ''
    }
  ]);

  const handleChange = (field: string, value: string) => {
    onInputChange(field, value);
  };

  const addDebtItem = () => {
    setDebtItems([...debtItems, {
      creditor: '',
      originalAmount: '',
      currentBalance: '',
      monthlyPayment: '',
      interestRate: '',
      maturityDate: '',
      collateral: ''
    }]);
  };

  const removeDebtItem = (index: number) => {
    if (debtItems.length > 1) {
      setDebtItems(debtItems.filter((_, i) => i !== index));
    }
  };

  const updateDebtItem = (index: number, field: keyof DebtItem, value: string) => {
    const updatedItems = [...debtItems];
    updatedItems[index][field] = value;
    setDebtItems(updatedItems);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Debt Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="total-debt">Total Business Debt ($)</Label>
            <Input 
              id="total-debt" 
              type="number" 
              placeholder="0"
              value={formValues['total_business_debt'] || ''}
              onChange={(e) => handleChange('total_business_debt', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="monthly-debt-service">Monthly Debt Service ($)</Label>
            <Input 
              id="monthly-debt-service" 
              type="number" 
              placeholder="0"
              value={formValues['monthly_debt_service'] || ''}
              onChange={(e) => handleChange('monthly_debt_service', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="debt-service-ratio">Debt Service Coverage Ratio</Label>
            <Input 
              id="debt-service-ratio" 
              type="number" 
              step="0.01"
              placeholder="1.25"
              value={formValues['debt_service_ratio'] || ''}
              onChange={(e) => handleChange('debt_service_ratio', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="working-capital">Working Capital ($)</Label>
            <Input 
              id="working-capital" 
              type="number" 
              placeholder="0"
              value={formValues['working_capital'] || ''}
              onChange={(e) => handleChange('working_capital', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detailed Debt Schedule</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addDebtItem}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Debt
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {debtItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Debt #{index + 1}</h4>
                {debtItems.length > 1 && (
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => removeDebtItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`creditor-${index}`}>Creditor/Lender</Label>
                  <Input 
                    id={`creditor-${index}`}
                    type="text" 
                    placeholder="Bank name or creditor"
                    value={item.creditor}
                    onChange={(e) => updateDebtItem(index, 'creditor', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`original-amount-${index}`}>Original Amount ($)</Label>
                  <Input 
                    id={`original-amount-${index}`}
                    type="number" 
                    placeholder="0"
                    value={item.originalAmount}
                    onChange={(e) => updateDebtItem(index, 'originalAmount', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`current-balance-${index}`}>Current Balance ($)</Label>
                  <Input 
                    id={`current-balance-${index}`}
                    type="number" 
                    placeholder="0"
                    value={item.currentBalance}
                    onChange={(e) => updateDebtItem(index, 'currentBalance', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`monthly-payment-${index}`}>Monthly Payment ($)</Label>
                  <Input 
                    id={`monthly-payment-${index}`}
                    type="number" 
                    placeholder="0"
                    value={item.monthlyPayment}
                    onChange={(e) => updateDebtItem(index, 'monthlyPayment', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`interest-rate-${index}`}>Interest Rate (%)</Label>
                  <Input 
                    id={`interest-rate-${index}`}
                    type="number" 
                    step="0.01"
                    placeholder="5.25"
                    value={item.interestRate}
                    onChange={(e) => updateDebtItem(index, 'interestRate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`maturity-date-${index}`}>Maturity Date</Label>
                  <Input 
                    id={`maturity-date-${index}`}
                    type="date"
                    value={item.maturityDate}
                    onChange={(e) => updateDebtItem(index, 'maturityDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`collateral-${index}`}>Collateral/Security</Label>
                <Textarea 
                  id={`collateral-${index}`}
                  placeholder="Describe collateral or security for this debt..."
                  value={item.collateral}
                  onChange={(e) => updateDebtItem(index, 'collateral', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="debt-history">Credit History & Payment Record</Label>
            <Textarea 
              id="debt-history" 
              placeholder="Describe payment history, any defaults, or credit issues..."
              value={formValues['debt_history'] || ''}
              onChange={(e) => handleChange('debt_history', e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="future-borrowing">Future Borrowing Plans</Label>
            <Textarea 
              id="future-borrowing" 
              placeholder="Describe any planned future borrowing or debt restructuring..."
              value={formValues['future_borrowing'] || ''}
              onChange={(e) => handleChange('future_borrowing', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDebtScheduleForm;
