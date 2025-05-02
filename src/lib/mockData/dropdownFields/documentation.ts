
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const documentationDropdownFields: DropdownField[] = [
  {
    id: 'documentStatus',
    label: 'Document Status',
    description: 'Status of required documentation',
    customizationLevel: 'Lender Customizable',
    module: 'Documentation & Closing',
    initialValues: [
      'Needed', 
      'Requested from Borrower', 
      'Requested from 3rd Party', 
      'Received - Pending Review', 
      'Reviewed - Accepted', 
      'Reviewed - Revisions Needed', 
      'Executed', 
      'Recorded', 
      'Waived'
    ]
  },
  {
    id: 'eTranSubmissionStatus',
    label: 'E-Tran Submission Status',
    description: 'Status of E-Tran submission to SBA',
    customizationLevel: 'Lender Customizable',
    module: 'Documentation & Closing',
    initialValues: [
      'Not Submitted', 
      'Ready for Submission', 
      'Submitted - Pending SBA Review', 
      'Approved - Loan # Issued', 
      'Declined by SBA', 
      'Withdrawn by Lender', 
      'Information Requested by SBA'
    ]
  }
];
