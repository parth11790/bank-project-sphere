
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const intakeDropdownFields: DropdownField[] = [
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
  }
];
