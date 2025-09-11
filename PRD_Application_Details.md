# SBA Loan Management System - Product Requirements Document

## Application Structure Overview

This document provides a comprehensive tabular breakdown of all pages, sections, fields, and their specifications within the SBA Loan Management System.

## Pages and Routes

| Page Name | Route | Description | Primary Purpose |
|-----------|--------|-------------|-----------------|
| Dashboard | `/` | Main dashboard with overview stats | Landing page with portfolio summary |
| Projects List | `/projects` | List of all projects | Project management and navigation |
| Project Details | `/project/:projectId` | Individual project overview | Project management hub |
| Create Project | `/create-project` | New project creation form | Project initialization |
| Users Management | `/users` | User administration | User account management |
| Admin Settings | `/admin-settings` | System configuration | Administrative controls |
| Project Analysis | `/project/analysis/:projectId` | Financial analysis and calculations | Analysis and reporting |
| Project Documentation | `/project/documentation/:projectId` | Document management | Document workflow |
| Use of Proceeds | `/project/use-of-proceeds/:projectId` | Loan allocation tracking | Financial planning |
| Consolidated Cash Flow | `/project/consolidated-cash-flow/:projectId` | Multi-business cash flow | Financial analysis |
| Business Information | `/business/:projectId` | Business entity details | Business profile management |
| Personal Information | `/project/participants/:projectId/personal-info/:participantId` | Individual participant details | Personal data collection |
| Net Worth | `/project/participants/:projectId/net-worth/:participantId` | Financial statement | Asset/liability tracking |
| Loan Details | `/project/:projectId/loan/:loanId` | Loan configuration | Loan parameters |
| Cash Flow Analysis | `/project/cash-flow-analysis/:projectId` | Business cash flow analysis | Financial assessment |
| Form View | `/form/:formId` | Generic form display | Data collection |
| Template Details | `/template/:templateId` | Document template configuration | Template management |
| Integration Details | `/integration/:integrationId` | Third-party integrations | System integration |
| Dropdown Details | `/admin-settings/dropdown/:dropdownId` | Dropdown configuration | Field options management |
| Lender Settings | `/lender-settings` | Lender configuration | Institution settings |
| Seller Individual | `/seller-individual/:projectId` | Individual seller information | Seller profile (person) |
| Seller Business | `/seller-business/:projectId` | Business seller information | Seller profile (business) |
| Owner Business | `/owner-business/:projectId` | Business owner information | Ownership tracking |
| Affiliated Business | `/affiliated-business/:projectId` | Affiliated entity information | Related business tracking |
| Acquisition Business | `/acquisition-business/:projectId` | Target business for acquisition | Acquisition details |
| Borrower Landing | `/borrower` | Public borrower portal | Customer-facing entry |
| Borrower Intake | `/borrower/intake` | Initial application | Lead generation |
| Borrower Auth | `/borrower/login`, `/borrower/register` | Authentication | User authentication |
| Borrower Dashboard | `/borrower/dashboard` | Customer portal | Borrower self-service |
| Borrower Form View | `/borrower/form/:formId` | Customer form completion | Data collection portal |

## Section Configurations

### Business Information Section

| Section ID | Field Name | Field Type | Label | Required | Options | Placeholder | Description |
|------------|------------|------------|-------|----------|---------|-------------|-------------|
| business_information | business_name | text | Business Name | Yes | - | Enter business name | Legal business name |
| business_information | entity_type | select | Entity Type | Yes | Corporation, LLC, Partnership, Sole Proprietorship | - | Business legal structure |
| business_information | ein | text | EIN | Yes | - | XX-XXXXXXX | Federal tax identification |
| business_information | date_established | date | Date Established | Yes | - | - | Business founding date |
| business_information | industry_naics_code | text | Industry/NAICS Code | Yes | - | Enter NAICS code | Industry classification |
| business_information | business_description | textarea | Business Description | Yes | - | Describe your business | Business overview |
| business_information | business_address | text | Business Address | Yes | - | 123 Business Street | Physical address |
| business_information | business_city | text | City | Yes | - | Enter city | Business city |
| business_information | business_state | text | State | Yes | - | CA | Business state |
| business_information | business_zip | text | ZIP Code | Yes | - | 12345 | Postal code |
| business_information | business_phone | phone | Phone Number | Yes | - | (555) 123-4567 | Contact phone |
| business_information | business_email | email | Email Address | Yes | - | business@example.com | Contact email |
| business_information | website | text | Website | No | - | www.business.com | Business website |

### Business Ownership Section

| Section ID | Field Name | Field Type | Label | Required | Options | Placeholder | Description |
|------------|------------|------------|-------|----------|---------|-------------|-------------|
| business_ownership | entity_type | select | Entity Type | Yes | Individual, Business | - | Owner type |
| business_ownership | ownership_percentage | number | Ownership % | Yes | - | 0-100 | Ownership percentage |
| business_ownership | owner_name | text | Name | Yes | - | Enter owner name | Owner full name |
| business_ownership | title | text | Title | Yes | - | Enter title | Position/title |
| business_ownership | email_address | email | Email Address | Yes | - | owner@example.com | Owner contact email |

### Personal Information Section

| Section ID | Field Name | Field Type | Label | Required | Options | Placeholder | Description |
|------------|------------|------------|-------|----------|---------|-------------|-------------|
| personal_information | first_name | text | First Name | Yes | - | Enter first name | Individual's first name |
| personal_information | middle_name | text | Middle Name | No | - | Enter middle name | Individual's middle name |
| personal_information | last_name | text | Last Name | Yes | - | Enter last name | Individual's last name |
| personal_information | date_of_birth | date | Date of Birth | Yes | - | - | Individual's birth date |
| personal_information | ssn | text | Social Security Number | Yes | - | XXX-XX-XXXX | Social security number |
| personal_information | phone | phone | Phone | Yes | - | (555) 123-4567 | Contact phone number |
| personal_information | home_street | text | Home Address (Street) | Yes | - | 123 Main Street | Residential address |
| personal_information | home_city | text | City | Yes | - | Enter city | Residential city |
| personal_information | home_state | text | State | Yes | - | CA | Residential state |
| personal_information | home_zip | text | ZIP Code | Yes | - | 12345 | Residential postal code |
| personal_information | mailing_address_different | checkbox | Mailing Address (if different) | No | - | - | Alternative mailing address flag |
| personal_information | email_address | email | Email Address | Yes | - | individual@example.com | Contact email |

### Personal Details Section

| Section ID | Field Name | Field Type | Label | Required | Options | Placeholder | Description |
|------------|------------|------------|-------|----------|---------|-------------|-------------|
| personal_details | marital_status | select | Marital Status | Yes | married, unmarried, divorced, separated, widowed | - | Marital status |
| personal_details | number_of_dependents | number | Number of Dependents | No | - | 0 | Dependent count |
| personal_details | liable_for_alimony | select | Liable for Alimony | Yes | yes, no | - | Alimony obligation |
| personal_details | delinquent_child_support | select | Delinquent Child Support | Yes | yes, no | - | Child support status |

### Affiliated Business Ownership Section

| Section ID | Field Name | Field Type | Label | Required | Options | Placeholder | Description |
|------------|------------|------------|-------|----------|---------|-------------|-------------|
| affiliated_business_ownership | affiliated_entity_type | select | Entity Type | Yes | Individual, Business | - | Affiliated entity type |
| affiliated_business_ownership | affiliated_ownership_percentage | number | Ownership % | Yes | - | 0-100 | Ownership percentage |
| affiliated_business_ownership | affiliated_name | text | Name | Yes | - | Enter name | Entity name |
| affiliated_business_ownership | affiliated_title | text | Title | Yes | - | Enter title | Position/role |
| affiliated_business_ownership | affiliated_email | email | Email Address | Yes | - | affiliated@example.com | Contact email |

### Forms Assignment Section

| Section ID | Field Name | Field Type | Label | Required | Options | Placeholder | Description |
|------------|------------|------------|-------|----------|---------|-------------|-------------|
| forms | assigned_forms | checkbox | Assigned Forms | No | - | - | Forms assigned to entity |

## Schema-Based Forms

### New Lead Schema Fields

| Schema | Field Name | Field Type | Label | Required | Validation | Description |
|---------|------------|------------|-------|----------|------------|-------------|
| newLeadSchema | project_name | text | Project Name | Yes | Min 3 characters | Project identifier |
| newLeadSchema | project_type | select | Project Type | Yes | - | Type of loan project |
| newLeadSchema | lead_source | select | Lead Source | Yes | - | How lead was generated |
| newLeadSchema | assigned_loan_officer | select | Assigned Loan Officer | Yes | - | Responsible loan officer |
| newLeadSchema | business_legal_name | text | Business Legal Name | Yes | Min 2 characters | Official business name |
| newLeadSchema | business_dba_name | text | DBA Name | No | - | Doing business as name |
| newLeadSchema | participant_type | select | Participant Type | Yes | - | Participant classification |
| newLeadSchema | primary_contact_name | text | Primary Contact Name | Yes | Min 2 characters | Main contact person |
| newLeadSchema | primary_contact_email | email | Primary Contact Email | Yes | Valid email | Contact email address |
| newLeadSchema | primary_contact_phone | text | Primary Contact Phone | Yes | Min 10 characters | Contact phone number |
| newLeadSchema | requested_loan_amount | number | Requested Loan Amount | Yes | Min 1 | Loan amount requested |
| newLeadSchema | loan_purpose | text | Loan Purpose | Yes | Min 10 characters | Purpose description |
| newLeadSchema | city | text | City | Yes | Min 1 character | Business city |
| newLeadSchema | state | text | State | Yes | Min 1 character | Business state |

### Eligibility Schema Fields

| Schema | Field Name | Field Type | Label | Required | Options | Description |
|---------|------------|------------|-------|----------|---------|-------------|
| eligibilitySchema | is_operating_business | boolean | Is Operating Business | Yes | true/false | Business operation status |
| eligibilitySchema | is_for_profit | boolean | Is For Profit | Yes | true/false | Profit motive |
| eligibilitySchema | is_us_location | boolean | Is US Location | Yes | true/false | US location requirement |
| eligibilitySchema | ineligible_business_types | array | Ineligible Business Types | No | - | Business type restrictions |
| eligibilitySchema | principal_status.is_incarcerated | boolean | Is Incarcerated | Yes | true/false | Incarceration status |
| eligibilitySchema | principal_status.is_on_parole | boolean | Is On Parole | Yes | true/false | Parole status |
| eligibilitySchema | principal_status.is_indicted | boolean | Is Indicted | Yes | true/false | Indictment status |
| eligibilitySchema | has_prior_government_debt | boolean | Has Prior Government Debt | Yes | true/false | Government debt history |
| eligibilitySchema | has_robs_esop_involvement | boolean | Has ROBS/ESOP Involvement | Yes | true/false | ROBS/ESOP participation |
| eligibilitySchema | pre_screening_status | select | Pre-screening Status | Yes | - | Screening result |
| eligibilitySchema | eligibility_notes | textarea | Eligibility Notes | No | - | Additional notes |

### Ownership Schema Fields

| Schema | Field Name | Field Type | Label | Required | Validation | Description |
|---------|------------|------------|-------|----------|------------|-------------|
| ownerSchema | name | text | Owner Name | Yes | Min 2 characters | Owner full name |
| ownerSchema | tax_id | text | Tax ID | Yes | Min 4 characters | Tax identification |
| ownerSchema | address | text | Address | Yes | Min 5 characters | Owner address |
| ownerSchema | ownership_percentage | number | Ownership Percentage | Yes | 0.01-100 | Percentage owned |
| ownerSchema | citizenship_status | select | Citizenship Status | Yes | - | Citizenship classification |
| formerOwnerSchema | name | text | Former Owner Name | Yes | Min 2 characters | Former owner name |
| formerOwnerSchema | tax_id | text | Tax ID | Yes | Min 4 characters | Tax identification |
| formerOwnerSchema | address | text | Address | Yes | Min 5 characters | Former owner address |
| formerOwnerSchema | ownership_percentage | number | Current Ownership % | Yes | 0.01-100 | Current percentage |
| formerOwnerSchema | former_ownership_percentage | number | Former Ownership % | Yes | 0.01-100 | Previous percentage |
| formerOwnerSchema | is_still_associate | boolean | Still Associate | Yes | true/false | Association status |
| formerOwnerSchema | is_still_employed | boolean | Still Employed | Yes | true/false | Employment status |

### Personal Information Schema Fields (Extended)

| Schema | Field Name | Field Type | Label | Required | Validation | Description |
|---------|------------|------------|-------|----------|------------|-------------|
| personalInformationSchema | applicant_name | text | Applicant Name | Yes | Min 2 characters | Full applicant name |
| personalInformationSchema | first_name | text | First Name | Yes | Min 2 characters | First name |
| personalInformationSchema | middle_name | text | Middle Name | No | - | Middle name |
| personalInformationSchema | last_name | text | Last Name | Yes | Min 2 characters | Last name |
| personalInformationSchema | date_of_birth | date | Date of Birth | Yes | - | Birth date |
| personalInformationSchema | social_security_number | text | Social Security Number | Yes | XXX-XX-XXXX format | SSN |
| personalInformationSchema | primary_phone_number | text | Primary Phone | Yes | Min 10 characters | Primary phone |
| personalInformationSchema | primary_phone_type | select | Primary Phone Type | Yes | cell/home/work/other | Phone type |
| personalInformationSchema | email_address | email | Email Address | Yes | Valid email | Email address |
| personalInformationSchema | residence_address | text | Residence Address | Yes | Min 5 characters | Home address |
| personalInformationSchema | residence_city | text | Residence City | Yes | Min 2 characters | Home city |
| personalInformationSchema | residence_state | text | Residence State | Yes | Min 2 characters | Home state |
| personalInformationSchema | residence_zip | text | Residence ZIP | Yes | Min 5 characters | Home ZIP code |
| personalInformationSchema | marital_status | select | Marital Status | Yes | married/unmarried/separated | Marital status |
| personalInformationSchema | spouse_name | text | Spouse Name | No | - | Spouse name |
| personalInformationSchema | dependents_count | number | Dependents Count | No | Min 0 | Number of dependents |
| personalInformationSchema | liable_for_alimony | select | Liable for Alimony | Yes | yes/no | Alimony obligation |
| personalInformationSchema | delinquent_child_support | select | Delinquent Child Support | Yes | yes/no | Child support status |
| personalInformationSchema | us_citizen | select | US Citizen | Yes | yes/no | Citizenship status |
| personalInformationSchema | military_service | select | Military Service | Yes | yes/no | Military service history |
| personalInformationSchema | declared_bankrupt | select | Declared Bankrupt | Yes | yes/no | Bankruptcy history |
| personalInformationSchema | criminal_charges | select | Criminal Charges | Yes | yes/no | Criminal background |
| personalInformationSchema | federal_debt_delinquent | select | Federal Debt Delinquent | Yes | yes/no | Federal debt status |

### Net Worth Schema Fields

| Schema | Field Name | Field Type | Label | Required | Description |
|---------|------------|------------|-------|----------|-------------|
| netWorthSchema | participant_id | text | Participant ID | Yes | Participant identifier |
| netWorthSchema | participant_name | text | Participant Name | Yes | Participant full name |
| netWorthSchema | credit_individual_name | text | Credit Individual Name | No | Credit report name |
| netWorthSchema | credit_individual_score | text | Credit Individual Score | No | Credit score |
| netWorthSchema | credit_individual_source | text | Credit Source | No | Credit report source |
| netWorthSchema | credit_individual_date | text | Credit Date | No | Credit report date |

## Financial Forms and Calculations

### Use of Proceeds Categories

| Category | Description | Typical Usage |
|----------|-------------|---------------|
| Working Capital | Operating expenses and cash flow | General business operations |
| Business Acquisition | Purchase of existing business | Acquisition transactions |
| Real Estate Purchase | Property acquisition | Commercial real estate |
| Equipment Purchase | Machinery and equipment | Capital investments |
| Property Improvements | Building renovations | Property enhancements |
| Refinance Debt | Debt consolidation | Debt restructuring |
| Inventory Purchase | Stock and materials | Inventory management |
| Startup Costs | Initial business expenses | New business launch |
| Expansion | Growth initiatives | Business expansion |
| Construction/Renovation | Building projects | Construction activities |

## Document Templates and Requirements

### Form Types by Entity

| Entity Type | Required Forms | Optional Forms | Document Requirements |
|-------------|---------------|----------------|----------------------|
| Individual | Personal Financial Statement, Tax Returns (3 years), Resume | Professional References, Education History | ID verification, Credit report |
| Business | Business Tax Returns (3 years), Financial Statements, Debt Schedule | Business Plan, Projections | Entity documents, Banking records |
| Seller | Personal/Business Financial Statements | Purchase Agreement | Sales documentation |
| Guarantor | Personal Financial Statement, Tax Returns | - | Guarantee documentation |

## System Administration

### User Roles and Permissions

| Role | Permissions | Access Level | Description |
|------|-------------|--------------|-------------|
| Loan Officer | Create/Edit Projects, Assign Forms | Project Level | Primary project management |
| Processor | Process Forms, Upload Documents | Project Level | Document processing |
| Underwriter | Review/Approve Applications | Portfolio Level | Risk assessment |
| Closer | Finalize Loans, Generate Documents | Project Level | Loan closing |
| Credit Admin/Manager | Credit Analysis, Risk Assessment | Portfolio Level | Credit management |
| Compliance Officer | Audit, Compliance Review | System Level | Regulatory compliance |
| Lender Administrator | System Configuration, User Management | System Level | Administrative control |
| System Administrator | Full System Access | System Level | Technical administration |
| Borrower/Guarantor | Submit Forms, Upload Documents | Own Projects | Self-service portal |

### Dropdown Configurations

| Module | Dropdown Type | Customization Level | Purpose |
|--------|---------------|-------------------|---------|
| Intake | Project Types, Lead Sources, Funding Purpose | Lender Customizable | Lead management |
| Processing | Loan Status, Document Status, Review Status | Lender Customizable | Workflow management |
| Documentation | Document Types, E-Tran Status | SBA Defined | Document workflow |
| Use of Proceeds | Categories, Loan Types | Lender Customizable | Financial planning |
| Reporting | Job Metrics, Compliance Metrics | SBA Defined | Regulatory reporting |
| Administration | User Roles, Authority Levels | SBA Defined | System administration |
| Environmental | Review Types, Review Status | SBA Defined | Environmental compliance |
| Audit Trail | Event Types, Severity Levels | Lender Customizable | Audit management |

## Integration Points

### External Systems

| Integration | Purpose | Data Exchange | Frequency |
|-------------|---------|---------------|-----------|
| E-Tran | SBA loan submission | Loan applications, status updates | Real-time |
| Credit Bureaus | Credit reporting | Credit scores, reports | On-demand |
| Document Management | Document storage | Files, metadata | Real-time |
| Banking APIs | Financial verification | Account information | On-demand |
| OCR Services | Document processing | Text extraction | Real-time |
| Email/SMS | Notifications | Status updates, reminders | Real-time |

This PRD provides a comprehensive overview of all application components, their relationships, and specifications for development and maintenance purposes.