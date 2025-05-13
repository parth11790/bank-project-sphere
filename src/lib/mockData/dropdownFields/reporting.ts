
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const reportingDropdownFields: DropdownField[] = [
  {
    id: 'jobsMetric',
    label: 'Jobs Metric Type',
    description: 'Types of job metrics tracked for SBA reporting (Form 1919)',
    customizationLevel: 'SBA Defined',
    module: 'Reporting & Analytics',
    initialValues: [
      'Jobs Created',
      'Jobs Retained',
      'Full-Time Equivalent (FTE)',
      'Part-Time',
      'Seasonal'
    ]
  },
  {
    id: 'reportingFrequency',
    label: 'Reporting Frequency',
    description: 'Frequency of required reporting to SBA',
    customizationLevel: 'SBA Defined',
    module: 'Reporting & Analytics',
    initialValues: [
      'Monthly',
      'Quarterly',
      'Semi-Annually',
      'Annually'
    ]
  },
  {
    id: 'complianceMetric',
    label: 'Compliance Metrics',
    description: 'Metrics tracked for compliance reporting',
    customizationLevel: 'SBA Influenced',
    module: 'Reporting & Analytics',
    initialValues: [
      'Eligibility Verification',
      'Borrower Certifications',
      'Loan Documentation',
      'Collateral Validation',
      'Closing Requirements',
      'Servicing Requirements',
      'Site Visit Verification'
    ]
  },
  {
    id: 'portfolioMetric',
    label: 'Portfolio Metrics',
    description: 'Key metrics for portfolio performance analysis',
    customizationLevel: 'Lender Customizable',
    module: 'Reporting & Analytics',
    initialValues: [
      'Loan Volume',
      'Approval Rate',
      'Funded Rate',
      'Average Loan Size',
      'Delinquency Rate',
      'Default Rate',
      'Loss Rate',
      'Average Processing Time',
      'Industry Distribution'
    ]
  }
];
