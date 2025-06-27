
import { DropdownField } from '../dropdownTypes';

export const fundingPurposeDropdownFields: DropdownField[] = [
  {
    id: 'fundPurpose',
    label: 'Funding Purpose',
    description: 'Primary purpose for the business loan request',
    customizationLevel: 'Lender Customizable',
    module: 'Intake',
    initialValues: [
      'Working Capital',
      'Business Acquisition',
      'Real Estate Purchase',
      'Equipment Purchase',
      'Property Improvements',
      'Refinance Debt',
      'Refinance Real Estate',
      'Inventory Purchase',
      'Startup Costs',
      'Expansion',
      'Franchise Fee',
      'Construction/Renovation',
      'Debt Consolidation',
      'Other'
    ]
  }
];
