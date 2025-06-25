
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PersonalFinancialStatementForm: React.FC = () => {
  return (
    <>
      <div>
        <Label htmlFor="assets">Total Assets ($)</Label>
        <Input id="assets" name="assets" type="number" placeholder="Enter total assets" />
      </div>
      
      <div>
        <Label htmlFor="liabilities">Total Liabilities ($)</Label>
        <Input id="liabilities" name="liabilities" type="number" placeholder="Enter total liabilities" />
      </div>
      
      <div>
        <Label htmlFor="annual-income">Annual Income ($)</Label>
        <Input id="annual-income" name="annual-income" type="number" placeholder="Enter annual income" />
      </div>
    </>
  );
};

export default PersonalFinancialStatementForm;
