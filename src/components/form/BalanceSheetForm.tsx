
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BalanceSheetForm: React.FC = () => {
  return (
    <>
      <div>
        <Label htmlFor="current-assets">Current Assets ($)</Label>
        <Input id="current-assets" name="current-assets" type="number" placeholder="Enter current assets" />
      </div>
      
      <div>
        <Label htmlFor="fixed-assets">Fixed Assets ($)</Label>
        <Input id="fixed-assets" name="fixed-assets" type="number" placeholder="Enter fixed assets" />
      </div>
      
      <div>
        <Label htmlFor="current-liabilities">Current Liabilities ($)</Label>
        <Input id="current-liabilities" name="current-liabilities" type="number" placeholder="Enter current liabilities" />
      </div>
      
      <div>
        <Label htmlFor="long-term-liabilities">Long Term Liabilities ($)</Label>
        <Input id="long-term-liabilities" name="long-term-liabilities" type="number" placeholder="Enter long term liabilities" />
      </div>
      
      <div>
        <Label htmlFor="equity">Owner's Equity ($)</Label>
        <Input id="equity" name="equity" type="number" placeholder="Enter owner's equity" />
      </div>
    </>
  );
};

export default BalanceSheetForm;
