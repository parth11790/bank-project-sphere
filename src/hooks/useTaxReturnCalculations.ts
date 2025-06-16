import { useState, useEffect } from 'react';

interface CalculatedValues {
  grossCashFlow: number;
  netCashFlow: number;
  livingExpenses: number;
}

export const useTaxReturnCalculations = (
  formValues: Record<string, string>,
  formName: string
): CalculatedValues => {
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    grossCashFlow: 0,
    netCashFlow: 0,
    livingExpenses: 0
  });

  useEffect(() => {
    if (formName === 'Tax Returns' || formName === 'Personal Tax Returns (3 Years)') {
      // For multi-year tax returns, we'll calculate based on the most recent year (2023)
      const currentYear = '2023';
      
      // Income fields that contribute to Gross Cash Flow
      const incomeFields = [
        'adjustedGrossIncome',
        'wages',
        'interestDividend',
        'alimonyReceived',
        'iraDistributions',
        'pensionsAnnuities',
        'socialSecurityBenefits',
        'scheduleCIncome',
        'scheduleCDepreciation',
        'scheduleCInterest',
        'scheduleERentalIncome',
        'scheduleERentalInterest',
        'scheduleERentalDepreciation',
        'scheduleFIncome',
        'scheduleFInterest',
        'scheduleFDepreciation',
        'partnershipDistributions',
        'capitalContributions',
        'otherCashIncome'
      ];
      
      // Calculate Gross Cash Flow (SUM of all income fields)
      const grossCashFlow = incomeFields.reduce((sum, field) => {
        const fieldKey = `${field}_${currentYear}`;
        const value = parseFloat(formValues[fieldKey] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      // Get AGI and household members for Living Expenses calculation
      const agi = parseFloat(formValues[`adjustedGrossIncome_${currentYear}`] || '0');
      const householdMembers = parseFloat(formValues[`householdMembers_${currentYear}`] || '1');
      
      // Living Expenses formula: =IF((F7*0.15)>(J9*5000),(F7*0.15),(J9*5000))
      // This is: IF(AGI * 0.15 > householdMembers * 5000, AGI * 0.15, householdMembers * 5000)
      const agiBasedExpenses = agi * 0.15;
      const memberBasedExpenses = householdMembers * 5000;
      const livingExpenses = Math.max(agiBasedExpenses, memberBasedExpenses);
      
      // Other expense fields
      const expenseFields = [
        'federalStateTaxes',
        'otherExpenses'
      ];
      
      const otherExpenses = expenseFields.reduce((sum, field) => {
        const fieldKey = `${field}_${currentYear}`;
        const value = parseFloat(formValues[fieldKey] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      // Net Cash Flow = Gross Cash Flow - (Federal & State Taxes + Other Expenses + Living Expenses)
      const netCashFlow = grossCashFlow - (otherExpenses + livingExpenses);
      
      setCalculatedValues({ 
        grossCashFlow, 
        netCashFlow, 
        livingExpenses 
      });
    }
  }, [formValues, formName]);

  return calculatedValues;
};
