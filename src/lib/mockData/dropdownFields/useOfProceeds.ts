
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const useOfProceedsDropdownFields: DropdownField[] = [
  {
    id: 'useOfProceedsCategory',
    label: 'Use of Proceeds Category',
    description: 'Categories for classifying loan proceeds usage (Based on SOP & Project Cost Worksheet)',
    customizationLevel: 'SBA Influenced',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Land Purchase',
      'Building Purchase',
      'New Building Construction',
      'Building Improvements/Renovations',
      'Leasehold Improvements',
      'Equipment Purchase',
      'Inventory Purchase',
      'Working Capital',
      'Business Acquisition - Goodwill',
      'Business Acquisition - Tangible Assets',
      'Debt Refinance - Business CC',
      'Debt Refinance - HELOC (Business Use)',
      'Debt Refinance - Term Loan',
      'Debt Refinance - Line of Credit',
      'Debt Refinance - SBA Loan',
      'Debt Refinance - Other',
      'Soft Costs - SBA Guarantee Fee',
      'Soft Costs - Lender Fees',
      'Soft Costs - Closing Costs (3rd Party)',
      'Franchise Fee',
      'Other (Specify)'
    ]
  },
  {
    id: 'sourceFundsCategory',
    label: 'Source of Funds Category',
    description: 'Categories for classifying funding sources (Based on Project Structure & Funding Plan)',
    customizationLevel: 'SBA Influenced',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Borrower Equity - Cash',
      'Borrower Equity - Assets',
      'Seller Note - Standby',
      'Seller Note - Non-Standby',
      'SBA 7(a) Loan',
      'SBA 504 Debenture',
      'Third Party Loan (504)',
      'Conventional Loan (Lender)',
      'Conventional Loan (Other FI)',
      'Grant',
      'Other (Specify)'
    ]
  }
];
