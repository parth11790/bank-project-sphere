
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const auditTrailDropdownFields: DropdownField[] = [
  {
    id: 'auditEventType',
    label: 'Audit Event Type',
    description: 'Types of events tracked in the audit trail',
    customizationLevel: 'SBA Influenced',
    module: 'Audit & Compliance',
    initialValues: [
      'Document Upload',
      'Document Download',
      'Document Deletion',
      'Form Submission',
      'Form Edit',
      'Project Status Change',
      'Project Creation',
      'User Login',
      'User Logout',
      'User Permission Change',
      'E-Tran Submission',
      'Loan Approval',
      'Loan Decline',
      'Setting Change'
    ]
  },
  {
    id: 'auditSeverity',
    label: 'Audit Severity',
    description: 'Severity levels for audit events',
    customizationLevel: 'Lender Customizable',
    module: 'Audit & Compliance',
    initialValues: [
      'Informational',
      'Low',
      'Medium',
      'High',
      'Critical'
    ]
  },
  {
    id: 'auditRetentionPolicy',
    label: 'Audit Retention Policy',
    description: 'Retention periods for audit trail data',
    customizationLevel: 'SBA Defined',
    module: 'Audit & Compliance',
    initialValues: [
      '1 Year',
      '3 Years',
      '5 Years',
      '7 Years',
      '10 Years',
      'Indefinite'
    ]
  }
];
