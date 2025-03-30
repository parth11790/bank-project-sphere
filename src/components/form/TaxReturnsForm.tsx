
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ContributionIndicator from './ContributionIndicator';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="householdMembers" className="w-1/3">
          Number of Household Members
        </Label>
        <Input 
          id="householdMembers" 
          type="number" 
          placeholder="0"
          className="flex-1"
          value={formValues.householdMembers || ''}
          onChange={(e) => onInputChange('householdMembers', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="wages" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Wages, Salaries ($)
        </Label>
        <Input 
          id="wages" 
          type="number" 
          placeholder="0.00" 
          className="flex-1"
          value={formValues.wages || ''} 
          onChange={(e) => onInputChange('wages', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="interest" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Interest & Dividend Income ($)
        </Label>
        <Input 
          id="interest" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.interest || ''}
          onChange={(e) => onInputChange('interest', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="alimony" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Alimony Received ($)
        </Label>
        <Input 
          id="alimony" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.alimony || ''}
          onChange={(e) => onInputChange('alimony', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="ira" className="w-1/3">
          <ContributionIndicator fieldType="income" /> IRA Distributions ($)
        </Label>
        <Input 
          id="ira" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.ira || ''}
          onChange={(e) => onInputChange('ira', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="pensions" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Pensions / Annuities ($)
        </Label>
        <Input 
          id="pensions" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.pensions || ''}
          onChange={(e) => onInputChange('pensions', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="socialSecurity" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Social Security Benefits ($)
        </Label>
        <Input 
          id="socialSecurity" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.socialSecurity || ''}
          onChange={(e) => onInputChange('socialSecurity', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="businessIncome" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule C - Business Income / Loss ($)
        </Label>
        <Input 
          id="businessIncome" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.businessIncome || ''}
          onChange={(e) => onInputChange('businessIncome', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="businessDepreciation" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule C - Business Depreciation / Amortization ($)
        </Label>
        <Input 
          id="businessDepreciation" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.businessDepreciation || ''}
          onChange={(e) => onInputChange('businessDepreciation', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="businessInterest" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule C - Business Interest ($)
        </Label>
        <Input 
          id="businessInterest" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.businessInterest || ''}
          onChange={(e) => onInputChange('businessInterest', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="rentalIncome" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule E - Rental Real Estate Income / Loss ($)
        </Label>
        <Input 
          id="rentalIncome" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.rentalIncome || ''}
          onChange={(e) => onInputChange('rentalIncome', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="rentalInterest" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule E - Rental Real Estate Interest ($)
        </Label>
        <Input 
          id="rentalInterest" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.rentalInterest || ''}
          onChange={(e) => onInputChange('rentalInterest', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="rentalDepreciation" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule E - Rental Real Estate Depreciation / Amortization ($)
        </Label>
        <Input 
          id="rentalDepreciation" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.rentalDepreciation || ''}
          onChange={(e) => onInputChange('rentalDepreciation', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="farmIncome" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule F - Farm Income / Loss ($)
        </Label>
        <Input 
          id="farmIncome" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.farmIncome || ''}
          onChange={(e) => onInputChange('farmIncome', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="farmInterest" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule F - Farm Interest ($)
        </Label>
        <Input 
          id="farmInterest" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.farmInterest || ''}
          onChange={(e) => onInputChange('farmInterest', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="farmDepreciation" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Schedule F - Farm Depreciation / Amortization ($)
        </Label>
        <Input 
          id="farmDepreciation" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.farmDepreciation || ''}
          onChange={(e) => onInputChange('farmDepreciation', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="partnershipDistributions" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Partnership / S-Corp Distributions ($)
        </Label>
        <Input 
          id="partnershipDistributions" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.partnershipDistributions || ''}
          onChange={(e) => onInputChange('partnershipDistributions', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="capitalContributions" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Capital Contributions ($)
        </Label>
        <Input 
          id="capitalContributions" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.capitalContributions || ''}
          onChange={(e) => onInputChange('capitalContributions', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="otherIncome" className="w-1/3">
          <ContributionIndicator fieldType="income" /> Other Cash Income ($)
        </Label>
        <Input 
          id="otherIncome" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.otherIncome || ''}
          onChange={(e) => onInputChange('otherIncome', e.target.value)}
        />
      </div>

      <div className="col-span-full bg-muted p-4 rounded-md flex items-center space-x-4">
        <Label htmlFor="grossCashFlow" className="w-1/3 font-semibold">
          <ContributionIndicator fieldType="income" /> Gross Cash Flow ($)
        </Label>
        <Input 
          id="grossCashFlow" 
          type="number" 
          value={calculatedValues.grossCashFlow.toFixed(2)} 
          readOnly
          className="flex-1 bg-muted-foreground/10"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="taxes" className="w-1/3">
          <ContributionIndicator fieldType="expense" /> Federal & State Taxes ($)
        </Label>
        <Input 
          id="taxes" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.taxes || ''}
          onChange={(e) => onInputChange('taxes', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="otherExpenses" className="w-1/3">
          <ContributionIndicator fieldType="expense" /> Other Expenses ($)
        </Label>
        <Input 
          id="otherExpenses" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.otherExpenses || ''}
          onChange={(e) => onInputChange('otherExpenses', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label htmlFor="livingExpenses" className="w-1/3">
          <ContributionIndicator fieldType="expense" /> Living Expenses ($)
        </Label>
        <Input 
          id="livingExpenses" 
          type="number" 
          placeholder="0.00"
          className="flex-1"
          value={formValues.livingExpenses || ''}
          onChange={(e) => onInputChange('livingExpenses', e.target.value)}
        />
      </div>

      <div className="col-span-full bg-muted p-4 rounded-md flex items-center space-x-4">
        <Label htmlFor="netCashFlow" className="w-1/3 font-semibold">
          Net Cash Flow ($)
        </Label>
        <Input 
          id="netCashFlow" 
          type="number" 
          value={calculatedValues.netCashFlow.toFixed(2)} 
          readOnly
          className="flex-1 bg-muted-foreground/10"
        />
      </div>
    </div>
  );
};

export default TaxReturnsForm;
