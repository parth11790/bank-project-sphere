
import { DropdownField } from '../dropdownTypes';

export const intakeDropdownFields: DropdownField[] = [
  {
    id: 'leadSource',
    label: 'Lead Source',
    description: 'Source of the business lead or application',
    module: 'Intake',
    customizationLevel: 'Lender Customizable',
    initialValues: [
      'Referral',
      'Website',
      'Cold Call',
      'Trade Show',
      'Social Media',
      'Email Campaign',
      'Print Advertisement',
      'Radio',
      'Television',
      'Direct Mail',
      'Other'
    ]
  },
  {
    id: 'fundPurpose',
    label: 'Fund Purpose',
    description: 'Purpose for which the loan funds will be used',
    module: 'Intake',
    customizationLevel: 'SBA Influenced',
    initialValues: [
      'Buy a business',
      'Purchase or Refinance Commercial Real Estate',
      'Constructions',
      'Renovate',
      'Working Capital',
      'Business Expansion',
      'Equipment Purchase',
      'Inventory',
      'Payroll',
      'Marketing / Sales',
      'Refinance Debt',
      'Buy Out a partner',
      'Open a Franchise',
      'Other'
    ]
  },
  {
    id: 'businessType',
    label: 'Business Type',
    description: 'Type or category of business',
    module: 'Intake',
    customizationLevel: 'SBA Influenced',
    initialValues: [
      'Retail',
      'Restaurant',
      'Manufacturing',
      'Service',
      'Professional Services',
      'Healthcare',
      'Technology',
      'Construction',
      'Real Estate',
      'Agriculture',
      'Transportation',
      'Wholesale',
      'Other'
    ]
  },
  {
    id: 'applicationStatus',
    label: 'Application Status',
    description: 'Current status of the loan application',
    module: 'Intake',
    customizationLevel: 'Lender Customizable',
    initialValues: [
      'New',
      'In Review',
      'Documentation Required',
      'Under Review',
      'Approved',
      'Conditionally Approved',
      'Declined',
      'Withdrawn',
      'Funded'
    ]
  },
  {
    id: 'loanOfficer',
    label: 'Loan Officer',
    description: 'Assigned loan officer for the application',
    module: 'Intake',
    customizationLevel: 'Lender Customizable',
    initialValues: [
      'John Smith',
      'Sarah Johnson',
      'Michael Brown',
      'Jessica Williams',
      'David Miller',
      'Emily Davis',
      'Robert Wilson',
      'Lisa Anderson'
    ]
  }
];
