
import { useState, useEffect } from 'react';

interface BusinessCalculatedValues {
  grossIncome: number;
  netIncome: number;
  totalDeductions: number;
  grossProfit: number;
  grossMargin: number;
  operatingCashFlow: number;
}

export const useBusinessTaxReturnCalculations = (
  formValues: Record<string, string>,
  formName: string
): BusinessCalculatedValues => {
  const [calculatedValues, setCalculatedValues] = useState<BusinessCalculatedValues>({
    grossIncome: 0,
    netIncome: 0,
    totalDeductions: 0,
    grossProfit: 0,
    grossMargin: 0,
    operatingCashFlow: 0
  });

  useEffect(() => {
    if (formName === 'Business Tax Returns' || formName === 'Business Tax Returns (3 years)') {
      // For multi-year business tax returns, calculate based on the most recent year (2023)
      const currentYear = '2023';
      
      // Get basic values
      const grossReceipts = parseFloat(formValues[`grossReceipts_${currentYear}`] || '0');
      const costOfGoodsSold = parseFloat(formValues[`costOfGoodsSold_${currentYear}`] || '0');
      
      // Calculate Gross Profit (Gross Receipts - Cost of Goods Sold)
      const grossProfit = grossReceipts - costOfGoodsSold;
      
      // Calculate Gross Margin (Gross Profit / Gross Receipts * 100)
      const grossMargin = grossReceipts > 0 ? (grossProfit / grossReceipts) * 100 : 0;
      
      // Deduction fields that contribute to Total Deductions
      const deductionFields = [
        'officerCompensation',
        'salariesWages',
        'repairsDeductions',
        'badDebts',
        'rentsExpenses',
        'taxesLicenses',
        'interestExpense',
        'charitableContributions',
        'depreciationDepletion',
        'amortizationExp',
        'advertisingExpenses',
        'pensionBenefits',
        'employeeBenefits',
        'otherDeductions'
      ];
      
      // Calculate Total Deductions
      const totalDeductions = deductionFields.reduce((sum, field) => {
        const fieldKey = `${field}_${currentYear}`;
        const value = parseFloat(formValues[fieldKey] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      // Calculate Net Income (Gross Profit - Total Deductions)
      const netIncome = grossProfit - totalDeductions;
      
      // Cash flow calculation values
      const cashDistributions = parseFloat(formValues[`cashDistributions_${currentYear}`] || '0');
      
      // Add-back adjustment fields (predefined)
      const depreciationAddBack = parseFloat(formValues[`depreciationAddBack_${currentYear}`] || '0');
      const amortizationAddBack = parseFloat(formValues[`amortizationAddBack_${currentYear}`] || '0');
      
      // Calculate custom add-back adjustments
      let customAddBacks = 0;
      Object.keys(formValues).forEach(key => {
        if (key.startsWith('custom_') && key.endsWith(`_${currentYear}`)) {
          const value = parseFloat(formValues[key] || '0');
          customAddBacks += isNaN(value) ? 0 : value;
        }
      });
      
      // Operating Cash Flow = Net Income + All Add-back Adjustments - Cash Distributions
      const totalAddBacks = depreciationAddBack + amortizationAddBack + customAddBacks;
      const operatingCashFlow = netIncome + totalAddBacks - cashDistributions;
      
      console.log('Business Tax Calculations Debug:', {
        grossReceipts,
        costOfGoodsSold,
        grossProfit,
        grossMargin: grossMargin.toFixed(2) + '%',
        totalDeductions,
        netIncome,
        depreciationAddBack,
        amortizationAddBack,
        customAddBacks,
        totalAddBacks,
        cashDistributions,
        operatingCashFlow
      });
      
      setCalculatedValues({ 
        grossIncome: grossProfit, // Changed from totalIncome to grossProfit
        netIncome, 
        totalDeductions,
        grossProfit,
        grossMargin,
        operatingCashFlow
      });
    }
  }, [formValues, formName]);

  return calculatedValues;
};
