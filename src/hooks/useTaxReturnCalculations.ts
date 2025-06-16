
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
    if (formName === 'Tax Returns' || formName === 'Personal Tax Returns (3 Years)') {
      // For multi-year tax returns, we'll calculate based on the most recent year (2023)
      const currentYear = '2023';
      
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
      
      const expenseFields = [
        'federalStateTaxes',
        'otherExpenses',
        'livingExpenses'
      ];
      
      const income = incomeFields.reduce((sum, field) => {
        const fieldKey = `${field}_${currentYear}`;
        const value = parseFloat(formValues[fieldKey] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const expenses = expenseFields.reduce((sum, field) => {
        const fieldKey = `${field}_${currentYear}`;
        const value = parseFloat(formValues[fieldKey] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const grossCashFlow = income;
      const netCashFlow = income - expenses;
      
      setCalculatedValues({ grossCashFlow, netCashFlow });
    }
  }, [formValues, formName]);

  return calculatedValues;
};
