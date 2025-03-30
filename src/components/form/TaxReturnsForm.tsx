import React, { useEffect } from 'react';
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
  // Calculate Adjusted Gross Income
  const adjustedGrossIncome = React.useMemo(() => {
    const wages = parseFloat(formValues.wages || '0');
    const interest = parseFloat(formValues.interest || '0');
    const businessIncome = parseFloat(formValues.businessIncome || '0');
    const rentalIncome = parseFloat(formValues.rentalIncome || '0');
    const farmIncome = parseFloat(formValues.farmIncome || '0');
    
    return wages + interest + businessIncome + rentalIncome + farmIncome;
  }, [formValues]);

  // Update the form with the calculated AGI
  useEffect(() => {
    onInputChange('adjustedGrossIncome', adjustedGrossIncome.toString());
  }, [adjustedGrossIncome, onInputChange]);

  return (
    <div className="space-y-6">
      {/* Adjusted Gross Income (New field at the top) */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="mb-2">
          <Label htmlFor="adjustedGrossIncome" className="text-lg font-semibold">
            <ContributionIndicator fieldType="income" /> Adjusted Gross Income ($)
          </Label>
        </div>
        <Input 
          id="adjustedGrossIncome" 
          type="number" 
          value={adjustedGrossIncome.toFixed(2)} 
          readOnly
          className="bg-muted-foreground/10"
        />
      </div>

      {/* Household Members */}
      <div>
        <div className="mb-2">
          <Label htmlFor="householdMembers">
            Number of Household Members
          </Label>
        </div>
        <Input 
          id="householdMembers" 
          type="number" 
          placeholder="0"
          value={formValues.householdMembers || ''}
          onChange={(e) => onInputChange('householdMembers', e.target.value)}
        />
      </div>

      {/* Wages, Salaries */}
      <div>
        <div className="mb-2">
          <Label htmlFor="wages">
            <ContributionIndicator fieldType="income" /> Wages, Salaries ($)
          </Label>
        </div>
        <Input 
          id="wages" 
          type="number" 
          placeholder="0.00" 
          value={formValues.wages || ''} 
          onChange={(e) => onInputChange('wages', e.target.value)}
        />
      </div>

      {/* Interest & Dividend Income */}
      <div>
        <div className="mb-2">
          <Label htmlFor="interest">
            <ContributionIndicator fieldType="income" /> Interest & Dividend Income ($)
          </Label>
        </div>
        <Input 
          id="interest" 
          type="number" 
          placeholder="0.00"
          value={formValues.interest || ''}
          onChange={(e) => onInputChange('interest', e.target.value)}
        />
      </div>

      {/* Alimony Received */}
      <div>
        <div className="mb-2">
          <Label htmlFor="alimony">
            <ContributionIndicator fieldType="income" /> Alimony Received ($)
          </Label>
        </div>
        <Input 
          id="alimony" 
          type="number" 
          placeholder="0.00"
          value={formValues.alimony || ''}
          onChange={(e) => onInputChange('alimony', e.target.value)}
        />
      </div>

      {/* IRA Distributions */}
      <div>
        <div className="mb-2">
          <Label htmlFor="ira">
            <ContributionIndicator fieldType="income" /> IRA Distributions ($)
          </Label>
        </div>
        <Input 
          id="ira" 
          type="number" 
          placeholder="0.00"
          value={formValues.ira || ''}
          onChange={(e) => onInputChange('ira', e.target.value)}
        />
      </div>

      {/* Pensions / Annuities */}
      <div>
        <div className="mb-2">
          <Label htmlFor="pensions">
            <ContributionIndicator fieldType="income" /> Pensions / Annuities ($)
          </Label>
        </div>
        <Input 
          id="pensions" 
          type="number" 
          placeholder="0.00"
          value={formValues.pensions || ''}
          onChange={(e) => onInputChange('pensions', e.target.value)}
        />
      </div>

      {/* Social Security Benefits */}
      <div>
        <div className="mb-2">
          <Label htmlFor="socialSecurity">
            <ContributionIndicator fieldType="income" /> Social Security Benefits ($)
          </Label>
        </div>
        <Input 
          id="socialSecurity" 
          type="number" 
          placeholder="0.00"
          value={formValues.socialSecurity || ''}
          onChange={(e) => onInputChange('socialSecurity', e.target.value)}
        />
      </div>

      {/* Business Income / Loss */}
      <div>
        <div className="mb-2">
          <Label htmlFor="businessIncome">
            <ContributionIndicator fieldType="income" /> Schedule C - Business Income / Loss ($)
          </Label>
        </div>
        <Input 
          id="businessIncome" 
          type="number" 
          placeholder="0.00"
          value={formValues.businessIncome || ''}
          onChange={(e) => onInputChange('businessIncome', e.target.value)}
        />
      </div>

      {/* Business Depreciation / Amortization */}
      <div>
        <div className="mb-2">
          <Label htmlFor="businessDepreciation">
            <ContributionIndicator fieldType="income" /> Schedule C - Business Depreciation / Amortization ($)
          </Label>
        </div>
        <Input 
          id="businessDepreciation" 
          type="number" 
          placeholder="0.00"
          value={formValues.businessDepreciation || ''}
          onChange={(e) => onInputChange('businessDepreciation', e.target.value)}
        />
      </div>

      {/* Business Interest */}
      <div>
        <div className="mb-2">
          <Label htmlFor="businessInterest">
            <ContributionIndicator fieldType="income" /> Schedule C - Business Interest ($)
          </Label>
        </div>
        <Input 
          id="businessInterest" 
          type="number" 
          placeholder="0.00"
          value={formValues.businessInterest || ''}
          onChange={(e) => onInputChange('businessInterest', e.target.value)}
        />
      </div>

      {/* Rental Real Estate Income / Loss */}
      <div>
        <div className="mb-2">
          <Label htmlFor="rentalIncome">
            <ContributionIndicator fieldType="income" /> Schedule E - Rental Real Estate Income / Loss ($)
          </Label>
        </div>
        <Input 
          id="rentalIncome" 
          type="number" 
          placeholder="0.00"
          value={formValues.rentalIncome || ''}
          onChange={(e) => onInputChange('rentalIncome', e.target.value)}
        />
      </div>

      {/* Rental Real Estate Interest */}
      <div>
        <div className="mb-2">
          <Label htmlFor="rentalInterest">
            <ContributionIndicator fieldType="income" /> Schedule E - Rental Real Estate Interest ($)
          </Label>
        </div>
        <Input 
          id="rentalInterest" 
          type="number" 
          placeholder="0.00"
          value={formValues.rentalInterest || ''}
          onChange={(e) => onInputChange('rentalInterest', e.target.value)}
        />
      </div>

      {/* Rental Real Estate Depreciation / Amortization */}
      <div>
        <div className="mb-2">
          <Label htmlFor="rentalDepreciation">
            <ContributionIndicator fieldType="income" /> Schedule E - Rental Real Estate Depreciation / Amortization ($)
          </Label>
        </div>
        <Input 
          id="rentalDepreciation" 
          type="number" 
          placeholder="0.00"
          value={formValues.rentalDepreciation || ''}
          onChange={(e) => onInputChange('rentalDepreciation', e.target.value)}
        />
      </div>

      {/* Farm Income / Loss */}
      <div>
        <div className="mb-2">
          <Label htmlFor="farmIncome">
            <ContributionIndicator fieldType="income" /> Schedule F - Farm Income / Loss ($)
          </Label>
        </div>
        <Input 
          id="farmIncome" 
          type="number" 
          placeholder="0.00"
          value={formValues.farmIncome || ''}
          onChange={(e) => onInputChange('farmIncome', e.target.value)}
        />
      </div>

      {/* Farm Interest */}
      <div>
        <div className="mb-2">
          <Label htmlFor="farmInterest">
            <ContributionIndicator fieldType="income" /> Schedule F - Farm Interest ($)
          </Label>
        </div>
        <Input 
          id="farmInterest" 
          type="number" 
          placeholder="0.00"
          value={formValues.farmInterest || ''}
          onChange={(e) => onInputChange('farmInterest', e.target.value)}
        />
      </div>

      {/* Farm Depreciation / Amortization */}
      <div>
        <div className="mb-2">
          <Label htmlFor="farmDepreciation">
            <ContributionIndicator fieldType="income" /> Schedule F - Farm Depreciation / Amortization ($)
          </Label>
        </div>
        <Input 
          id="farmDepreciation" 
          type="number" 
          placeholder="0.00"
          value={formValues.farmDepreciation || ''}
          onChange={(e) => onInputChange('farmDepreciation', e.target.value)}
        />
      </div>

      {/* Partnership / S-Corp Distributions */}
      <div>
        <div className="mb-2">
          <Label htmlFor="partnershipDistributions">
            <ContributionIndicator fieldType="income" /> Partnership / S-Corp Distributions ($)
          </Label>
        </div>
        <Input 
          id="partnershipDistributions" 
          type="number" 
          placeholder="0.00"
          value={formValues.partnershipDistributions || ''}
          onChange={(e) => onInputChange('partnershipDistributions', e.target.value)}
        />
      </div>

      {/* Capital Contributions */}
      <div>
        <div className="mb-2">
          <Label htmlFor="capitalContributions">
            <ContributionIndicator fieldType="income" /> Capital Contributions ($)
          </Label>
        </div>
        <Input 
          id="capitalContributions" 
          type="number" 
          placeholder="0.00"
          value={formValues.capitalContributions || ''}
          onChange={(e) => onInputChange('capitalContributions', e.target.value)}
        />
      </div>

      {/* Other Cash Income */}
      <div>
        <div className="mb-2">
          <Label htmlFor="otherIncome">
            <ContributionIndicator fieldType="income" /> Other Cash Income ($)
          </Label>
        </div>
        <Input 
          id="otherIncome" 
          type="number" 
          placeholder="0.00"
          value={formValues.otherIncome || ''}
          onChange={(e) => onInputChange('otherIncome', e.target.value)}
        />
      </div>

      {/* Gross Cash Flow */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="mb-2">
          <Label htmlFor="grossCashFlow" className="font-semibold">
            <ContributionIndicator fieldType="income" /> Gross Cash Flow ($)
          </Label>
        </div>
        <Input 
          id="grossCashFlow" 
          type="number" 
          value={calculatedValues.grossCashFlow.toFixed(2)} 
          readOnly
          className="bg-muted-foreground/10"
        />
      </div>

      {/* Federal & State Taxes */}
      <div>
        <div className="mb-2">
          <Label htmlFor="taxes">
            <ContributionIndicator fieldType="expense" /> Federal & State Taxes ($)
          </Label>
        </div>
        <Input 
          id="taxes" 
          type="number" 
          placeholder="0.00"
          value={formValues.taxes || ''}
          onChange={(e) => onInputChange('taxes', e.target.value)}
        />
      </div>

      {/* Other Expenses */}
      <div>
        <div className="mb-2">
          <Label htmlFor="otherExpenses">
            <ContributionIndicator fieldType="expense" /> Other Expenses ($)
          </Label>
        </div>
        <Input 
          id="otherExpenses" 
          type="number" 
          placeholder="0.00"
          value={formValues.otherExpenses || ''}
          onChange={(e) => onInputChange('otherExpenses', e.target.value)}
        />
      </div>

      {/* Living Expenses */}
      <div>
        <div className="mb-2">
          <Label htmlFor="livingExpenses">
            <ContributionIndicator fieldType="expense" /> Living Expenses ($)
          </Label>
        </div>
        <Input 
          id="livingExpenses" 
          type="number" 
          placeholder="0.00"
          value={formValues.livingExpenses || ''}
          onChange={(e) => onInputChange('livingExpenses', e.target.value)}
        />
      </div>

      {/* Net Cash Flow */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="mb-2">
          <Label htmlFor="netCashFlow" className="font-semibold">
            Net Cash Flow ($)
          </Label>
        </div>
        <Input 
          id="netCashFlow" 
          type="number" 
          value={calculatedValues.netCashFlow.toFixed(2)} 
          readOnly
          className="bg-muted-foreground/10"
        />
      </div>
    </div>
  );
};

export default TaxReturnsForm;
