
export type CustomizationLevel = 'SBA Defined' | 'SBA Influenced' | 'Lender Customizable';

export interface DropdownField {
  id: string;
  label: string;
  description: string;
  customizationLevel: CustomizationLevel;
  module: string;
  initialValues: string[];
}

export const sbaDropdownFields: DropdownField[] = [
  // Module 1: Intake & Pre-Screening
  {
    id: 'leadSource',
    label: 'Lead Source',
    description: 'Source of the loan lead or inquiry',
    customizationLevel: 'Lender Customizable',
    module: 'Intake & Pre-Screening',
    initialValues: [
      'Website Inquiry', 
      'Phone Inquiry', 
      'Email Inquiry', 
      'Lender Event', 
      'Existing Customer Referral', 
      'External Referral (Broker)', 
      'Internal Referral (Other Dept)', 
      'Walk-in', 
      'Marketing Campaign'
    ]
  },
  {
    id: 'projectStatus_PreScreening',
    label: 'Project Status (Pre-Screening)',
    description: 'Current status of the project during pre-screening phase',
    customizationLevel: 'Lender Customizable',
    module: 'Intake & Pre-Screening',
    initialValues: [
      'New Lead', 
      'Contact Attempted', 
      'Contact Made', 
      'Pre-Screening Started', 
      'Initial Docs Requested', 
      'Initial Docs Received', 
      'Pre-Qualified', 
      'Pre-Approved', 
      'Additional Info Needed', 
      'Declined - Pre-Screening', 
      'Withdrawn - Pre-Screening'
    ]
  },
  {
    id: 'ineligibleBusinessType',
    label: 'Ineligible Business Type',
    description: 'Business types ineligible for SBA loans (SOP 50 10 8, Section A, Ch 1, E)',
    customizationLevel: 'SBA Defined',
    module: 'Intake & Pre-Screening',
    initialValues: [
      'Lending/Investment (Primary Activity)', 
      'Passive Business (Landlord/Developer - Non-EPC)', 
      'Passive Business (Rental Model - Non-Compliant)', 
      'Life Insurance Carrier', 
      'Located Outside U.S.', 
      'Pyramid/Multilevel Sales', 
      'Gambling (>1/3 Revenue or Primary Purpose)', 
      'Illegal Activity (Federal/State/Local)', 
      'Discriminatory Practices (Patronage/Hiring)', 
      'Government-Owned (Non-Tribal)', 
      'Loan Packager (>1/3 Revenue)', 
      'Speculative Activity', 
      'Other (Specify)'
    ]
  },
  {
    id: 'citizenshipStatus',
    label: 'Citizenship Status',
    description: 'Citizenship status (SOP 50 10 8, Section A, Ch 1, F)',
    customizationLevel: 'SBA Defined',
    module: 'Intake & Pre-Screening',
    initialValues: [
      'U.S. Citizen', 
      'Lawful Permanent Resident (LPR)', 
      'U.S. National', 
      'Other/Ineligible Person'
    ]
  },
  
  // Module 2: Application Processing & Underwriting
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
    customizationLevel: 'SBA Influenced',
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
    customizationLevel: 'SBA Influenced',
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
  },
  
  // New fields requested by user
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
    id: 'environmentalReviewType',
    label: 'Environmental Review Type',
    description: 'Types of environmental reviews required for commercial real estate (Based on SOP 50 10 8, Section A, Ch 5, E)',
    customizationLevel: 'SBA Defined',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Environmental Questionnaire (EQ)',
      'Records Search w/ Risk Assessment (RSRA)',
      'Transaction Screen Assessment (TSA)',
      'Phase I ESA',
      'Phase II ESA',
      'Remediation Plan Review',
      'No Review Required'
    ]
  },
  {
    id: 'environmentalReviewStatus',
    label: 'Environmental Review Status',
    description: 'Current status of environmental review process',
    customizationLevel: 'Lender Customizable',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Pending Determination',
      'EQ Completed - OK',
      'RSRA Completed - Low Risk',
      'RSRA Completed - Elevated/High Risk (Phase I Req\'d)',
      'TSA Completed - OK',
      'TSA Completed - Further Action Req\'d',
      'Phase I Completed - OK',
      'Phase I Completed - Phase II Req\'d',
      'Phase II Completed - OK',
      'Phase II Completed - Remediation Req\'d',
      'Remediation Plan Submitted to SBA',
      'Remediation Ongoing',
      'Remediation Complete - NFA Received',
      'SBA Concurrence Pending',
      'SBA Concurrence Received'
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
  },
  
  // Module 3: Documentation & Closing
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
  },
  
  // Module 5: Administration & Settings
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
