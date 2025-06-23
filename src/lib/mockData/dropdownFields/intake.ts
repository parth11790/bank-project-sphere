
import { DropdownField } from '../dropdownTypes';

export const intakeDropdownFields: DropdownField[] = [
  {
    id: 'entity_type',
    label: 'Entity Type',
    description: 'Classification of participant entity (Business or Individual)',
    customizationLevel: 'Lender Customizable',
    module: 'Intake',
    initialValues: ['Business', 'Individual']
  },
  {
    id: 'business_type',
    label: 'Business Type',
    description: 'Type of business entity for loan applications',
    customizationLevel: 'SBA Defined',
    module: 'Intake',
    initialValues: [
      'Sole Proprietorship',
      'Partnership',
      'Limited Liability Company (LLC)',
      'Corporation (C-Corp)',
      'S-Corporation',
      'Professional Corporation',
      'Limited Partnership',
      'Limited Liability Partnership'
    ]
  },
  {
    id: 'loan_purpose',
    label: 'Loan Purpose',
    description: 'Primary purpose for the SBA loan request',
    customizationLevel: 'SBA Defined',
    module: 'Intake',
    initialValues: [
      'Business Acquisition',
      'Working Capital',
      'Equipment Purchase',
      'Real Estate Purchase',
      'Refinancing',
      'Startup Costs',
      'Franchise Fee',
      'Inventory Purchase',
      'Construction/Renovation',
      'Debt Consolidation'
    ]
  },
  {
    id: 'industry_type',
    label: 'Industry Type',
    description: 'NAICS industry classification for the business',
    customizationLevel: 'SBA Defined',
    module: 'Intake',
    initialValues: [
      'Retail Trade',
      'Accommodation and Food Services',
      'Professional Services',
      'Construction',
      'Manufacturing',
      'Healthcare',
      'Transportation',
      'Real Estate',
      'Finance and Insurance',
      'Information Technology',
      'Agriculture',
      'Arts and Entertainment',
      'Educational Services',
      'Other Services'
    ]
  },
  {
    id: 'applicant_status',
    label: 'Applicant Status',
    description: 'Current status of the loan applicant in the process',
    customizationLevel: 'Lender Customizable',
    module: 'Intake',
    initialValues: [
      'New Inquiry',
      'Pre-Qualified',
      'Application Submitted',
      'Under Review',
      'Additional Info Required',
      'Approved',
      'Declined',
      'Withdrawn'
    ]
  },
  {
    id: 'lead_source',
    label: 'Lead Source',
    description: 'How the applicant learned about or was referred to the lender',
    customizationLevel: 'Lender Customizable',
    module: 'Intake',
    initialValues: [
      'Website',
      'Referral Partner',
      'Existing Customer',
      'Marketing Campaign',
      'Trade Show',
      'Cold Call',
      'Social Media',
      'Search Engine',
      'Print Advertisement',
      'Other'
    ]
  }
];
