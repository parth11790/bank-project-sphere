
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const processingDropdownFields: DropdownField[] = [
  {
    id: 'projectStatus_Processing',
    label: 'Project Status (Processing)',
    description: 'Current status of the project during processing phase',
    customizationLevel: 'Lender Customizable',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Processing - Data Collection', 
      'Processing - Borrower Portal Active', 
      'Processing - 3rd Party Reports Ordered', 
      'Processing - Ready for Underwriting', 
      'Underwriting - Assigned', 
      'Underwriting - In Review', 
      'Underwriting - Pending Additional Info', 
      'Underwriting - Analysis Complete', 
      'Pending Credit Decision', 
      'Approved - Pending Closing', 
      'Declined - Underwriting', 
      'Withdrawn - Processing'
    ]
  },
  {
    id: 'loanProgram',
    label: 'Loan Program',
    description: 'Primary SBA loan program',
    customizationLevel: 'Lender Customizable',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'SBA 7(a)', 
      'SBA 504', 
      'Conventional', 
      'Seller Note', 
      'Other'
    ]
  },
  {
    id: 'loanSubProgram_7a',
    label: 'Loan Sub-Program (7a)',
    description: '7(a) loan sub-programs',
    customizationLevel: 'SBA Defined',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Standard 7(a)', 
      '7(a) Small', 
      'SBA Express', 
      'Export Express', 
      'EWCP (Export Working Capital Program)', 
      'IT (International Trade)', 
      'CAPLines - Working Capital', 
      'CAPLines - Contract', 
      'CAPLines - Seasonal', 
      'CAPLines - Builders'
    ]
  },
  {
    id: 'businessStructure',
    label: 'Business Structure',
    description: 'Legal structure of the business',
    customizationLevel: 'Lender Customizable',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Sole Proprietorship', 
      'General Partnership', 
      'Limited Partnership (LP)', 
      'Limited Liability Partnership (LLP)', 
      'C-Corporation', 
      'S-Corporation', 
      'Limited Liability Company (LLC)', 
      'Professional Corporation (PC)', 
      'Professional LLC (PLLC)', 
      'Cooperative', 
      'Trust (Revocable)', 
      'Trust (Irrevocable)', 
      'Trust (ESOP)', 
      'Non-Profit', 
      'Other'
    ]
  }
];
