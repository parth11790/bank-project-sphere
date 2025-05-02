
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const administrationDropdownFields: DropdownField[] = [
  {
    id: 'userRole',
    label: 'User Role',
    description: 'User role within the system',
    customizationLevel: 'SBA Influenced',
    module: 'Administration & Settings',
    initialValues: [
      'Loan Officer', 
      'Processor', 
      'Underwriter', 
      'Closer', 
      'Credit Admin/Manager', 
      'Compliance Officer', 
      'Lender Administrator', 
      'System Administrator', 
      'Read-Only/Auditor', 
      'Borrower/Guarantor'
    ]
  },
  {
    id: 'userStatus',
    label: 'User Status',
    description: 'Current status of user account',
    customizationLevel: 'Lender Customizable',
    module: 'Administration & Settings',
    initialValues: [
      'Active', 
      'Inactive', 
      'Locked'
    ]
  },
  {
    id: 'delegatedAuthorityLevel',
    label: 'Delegated Authority Level',
    description: 'SBA delegated authority level',
    customizationLevel: 'SBA Defined',
    module: 'Administration & Settings',
    initialValues: [
      'None (Non-Delegated Only)', 
      'PLP (Preferred Lender Program)', 
      'SBA Express', 
      'Export Express', 
      'PLP-EWCP', 
      'ALP (Accredited Lender Program - CDC)', 
      'PCLP (Premier Certified Lender - CDC)'
    ]
  }
];
