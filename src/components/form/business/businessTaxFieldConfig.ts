
export const fieldNotes: Record<string, string> = {
  'grossReceipts': 'Total gross receipts or sales (1120, line 1a or 1120S, line 1a)',
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
  'amortizationExp': 'Amortization expense (1120, line 20a or 1120S, line 15a)',
  'advertisingExpenses': 'Advertising (1120, line 21 or 1120S, line 16)',
  'pensionBenefits': 'Pension, profit-sharing plans (1120, line 22 or 1120S, line 17)',
  'employeeBenefits': 'Employee benefit programs (1120, line 23 or 1120S, line 18)',
  'otherDeductions': 'Other deductions (1120, line 24 or 1120S, line 19)',
  'totalDeductions': 'Total deductions (1120, line 25 or 1120S, line 20)',
  'netIncome': 'Net income after all deductions',
  'cashDistributions': 'Cash distributions to shareholders/partners',
  'depreciation': 'Depreciation (add back for cash flow analysis)',
  'amortization': 'Amortization (add back for cash flow analysis)',
  'operatingCashFlow': 'Operating cash flow (Net Income + All Add-back Adjustments - Distributions)',
  'depreciationAddBack': 'Depreciation expense added back to net income for cash flow calculation',
  'amortizationAddBack': 'Amortization expense added back to net income for cash flow calculation'
};

export const formFields = [
  // Revenue Section
  { fieldName: 'grossReceipts', label: 'Gross Receipts or Sales ($)', isIncome: true, category: 'Revenue' },

  // COGS Section
  { fieldName: 'costOfGoodsSold', label: 'Cost of Goods Sold ($)', isExpense: true, category: 'COGS' },
  { fieldName: 'grossProfit', label: 'Gross Profit ($)', isIncome: true, isCalculated: true, category: 'Gross Income' },

  // Expense Section
  { fieldName: 'officerCompensation', label: 'Compensation of Officers ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'salariesWages', label: 'Salaries and Wages ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'repairsDeductions', label: 'Repairs and Maintenance ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'badDebts', label: 'Bad Debts ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'rentsExpenses', label: 'Rent or Lease ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'taxesLicenses', label: 'Taxes and Licenses ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'interestExpense', label: 'Interest Expense ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'charitableContributions', label: 'Charitable Contributions ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'depreciationDepletion', label: 'Depreciation and Depletion ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'amortizationExp', label: 'Amortization Exp ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'advertisingExpenses', label: 'Advertising ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'pensionBenefits', label: 'Pension, Profit-sharing Plans ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'employeeBenefits', label: 'Employee Benefit Programs ($)', isExpense: true, category: 'Expense' },
  { fieldName: 'otherDeductions', label: 'Other Deductions ($)', isExpense: true, category: 'Expense' },

  // Net Income Book M-1 Section
  { fieldName: 'totalDeductions', label: 'Total Deductions ($)', isExpense: true, isCalculated: true, category: 'Net Income Book M-1' },
  { fieldName: 'netIncome', label: 'Net Income ($)', isIncome: true, isCalculated: true, category: 'Net Income Book M-1' },

  // Adjustments Section
  { fieldName: 'depreciationAddBack', label: 'Depreciation (Add Back) ($)', isIncome: true, isSection: 'addback', category: 'Adjustments' },
  { fieldName: 'amortizationAddBack', label: 'Amortization (Add Back) ($)', isIncome: true, isSection: 'addback', category: 'Adjustments' },

  // M-1 Adjusted Income Section
  { fieldName: 'cashDistributions', label: 'Cash Distributions ($)', isExpense: true, category: 'Distribution' },
  { fieldName: 'operatingCashFlow', label: 'Operating Cash Flow ($)', isIncome: true, isCalculated: true, category: 'Cash Flow' }
];
