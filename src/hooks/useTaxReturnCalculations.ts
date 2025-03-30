
import { useState, useEffect } from 'react';

interface CalculatedValues {
  grossCashFlow: number;
  netCashFlow: number;
}

export const useTaxReturnCalculations = (
  formValues: Record<string, string>,
  formName: string
): CalculatedValues => {
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    grossCashFlow: 0,
    netCashFlow: 0
  });

  useEffect(() => {
    if (formName === 'Tax Returns') {
      // Remove adjustedGrossIncome from income fields calculation
      const incomeFields = [
        'wages', 'interest', 'alimony', 'ira', 'pensions',
        'socialSecurity', 'businessIncome', 'rentalIncome', 
        'farmIncome', 'partnershipDistributions', 'capitalContributions',
        'otherIncome'
      ];
      
      const expenseFields = ['taxes', 'otherExpenses', 'livingExpenses'];
      
      const income = incomeFields.reduce((sum, field) => {
        const value = parseFloat(formValues[field] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const expenses = expenseFields.reduce((sum, field) => {
        const value = parseFloat(formValues[field] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const grossCashFlow = income;
      const netCashFlow = income - expenses;
      
      setCalculatedValues({ grossCashFlow, netCashFlow });
    }
  }, [formValues, formName]);

  return calculatedValues;
};
