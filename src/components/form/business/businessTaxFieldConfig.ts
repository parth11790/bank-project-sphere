
export const fieldNotes: Record<string, string> = {
  'grossReceipts': 'Total gross receipts or sales (1120, line 1a or 1120S, line 1a)',
  'totalIncome': 'Total income (1120, line 11 or 1120S, line 11)',
  'costOfGoodsSold': 'Cost of goods sold (1120, line 2 or 1120S, line 2)',
  'grossProfit': 'Gross profit (line 1c minus line 2)',
  'officerCompensation': 'Compensation of officers (1120, line 12 or 1120S, line 7)',
  'salariesWages': 'Salaries and wages (1120, line 13 or 1120S, line 8)',
  'repairsDeductions': 'Repairs and maintenance (1120, line 14 or 1120S, line 9)',
  'badDebts': 'Bad debts (1120, line 15 or 1120S, line 10)',
  'rentsExpenses': 'Rents (1120, line 16 or 1120S, line 11)',
  'taxesLicenses': 'Taxes and licenses (1120, line 17 or 1120S, line 12)',
  'interestExpense': 'Interest (1120, line 18 or 1120S, line 13)',
  'charitableContributions': 'Charitable contributions (1120, line 19 or 1120S, line 14)',
  'depreciationDepletion': 'Depreciation and depletion (1120, line 20 or 1120S, line 15)',
  'advertisingExpenses': 'Advertising (1120, line 21 or 1120S, line 16)',
  'pensionBenefits': 'Pension, profit-sharing plans (1120, line 22 or 1120S, line 17)',
  'employeeBenefits': 'Employee benefit programs (1120, line 23 or 1120S, line 18)',
  'otherDeductions': 'Other deductions (1120, line 24 or 1120S, line 19)',
  'totalDeductions': 'Total deductions (1120, line 25 or 1120S, line 20)',
  'taxableIncome': 'Taxable income before NOL (1120, line 26 or 1120S, line 21)',
  'ordinaryBusinessIncome': 'Ordinary business income (loss) - S Corp only',
  'netIncome': 'Net income after all deductions',
  'cashDistributions': 'Cash distributions to shareholders/partners',
  'depreciation': 'Depreciation (add back for cash flow analysis)',
  'amortization': 'Amortization (add back for cash flow analysis)',
  'operatingCashFlow': 'Operating cash flow (Net Income + All Add-back Adjustments - Distributions)',
  'depreciationAddBack': 'Depreciation expense added back to net income for cash flow calculation',
  'amortizationAddBack': 'Amortization expense added back to net income for cash flow calculation'
};

export const formFields = [
  // Income Section
  { fieldName: 'grossReceipts', label: 'Gross Receipts or Sales ($)', isIncome: true },
  { fieldName: 'costOfGoodsSold', label: 'Cost of Goods Sold ($)', isExpense: true },
  { fieldName: 'grossProfit', label: 'Gross Profit ($)', isIncome: true, isCalculated: true },
  { fieldName: 'totalIncome', label: 'Total Income ($)', isIncome: true },

  // Deductions Section
  { fieldName: 'officerCompensation', label: 'Compensation of Officers ($)', isExpense: true },
  { fieldName: 'salariesWages', label: 'Salaries and Wages ($)', isExpense: true },
  { fieldName: 'repairsDeductions', label: 'Repairs and Maintenance ($)', isExpense: true },
  { fieldName: 'badDebts', label: 'Bad Debts ($)', isExpense: true },
  { fieldName: 'rentsExpenses', label: 'Rents ($)', isExpense: true },
  { fieldName: 'taxesLicenses', label: 'Taxes and Licenses ($)', isExpense: true },
  { fieldName: 'interestExpense', label: 'Interest Expense ($)', isExpense: true },
  { fieldName: 'charitableContributions', label: 'Charitable Contributions ($)', isExpense: true },
  { fieldName: 'depreciationDepletion', label: 'Depreciation and Depletion ($)', isExpense: true },
  { fieldName: 'advertisingExpenses', label: 'Advertising ($)', isExpense: true },
  { fieldName: 'pensionBenefits', label: 'Pension, Profit-sharing Plans ($)', isExpense: true },
  { fieldName: 'employeeBenefits', label: 'Employee Benefit Programs ($)', isExpense: true },
  { fieldName: 'otherDeductions', label: 'Other Deductions ($)', isExpense: true },

  // Calculated Fields
  { fieldName: 'totalDeductions', label: 'Total Deductions ($)', isExpense: true, isCalculated: true },
  { fieldName: 'taxableIncome', label: 'Taxable Income Before NOL ($)', isIncome: true, isCalculated: true },
  { fieldName: 'ordinaryBusinessIncome', label: 'Ordinary Business Income (S-Corp) ($)', isIncome: true },
  { fieldName: 'netIncome', label: 'Net Income ($)', isIncome: true, isCalculated: true },

  // Add back / Adjustments Section
  { fieldName: 'depreciationAddBack', label: 'Depreciation (Add Back) ($)', isIncome: true, isSection: 'addback' },
  { fieldName: 'amortizationAddBack', label: 'Amortization (Add Back) ($)', isIncome: true, isSection: 'addback' },

  // Cash Flow Analysis (moved after add-back section)
  { fieldName: 'cashDistributions', label: 'Cash Distributions ($)', isExpense: true },
  { fieldName: 'operatingCashFlow', label: 'Operating Cash Flow ($)', isIncome: true, isCalculated: true }
];
