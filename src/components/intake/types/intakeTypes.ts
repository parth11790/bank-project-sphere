
export interface IntakeFormData {
  // Project Information
  project_name: string;
  project_type: string;
  date_entered: string;
  
  // Lead Source
  lead_source: string;
  assigned_loan_officer: string;
  
  // Business Information
  business_legal_name: string;
  business_dba_name?: string;
  
  // Contact Information
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  
  // Loan Details
  requested_loan_amount: number;
  loan_purpose: string;
  funding_purposes?: string[]; // Add support for multiple funding purposes
  
  // Location
  city: string;
  state: string;
  
  // Eligibility
  business_in_operation: boolean;
  time_in_business: string;
  business_type: string;
  annual_revenue: number;
  credit_score_range: string;
  industry: string;
  employees_count: string;
  collateral_available: boolean;
  debt_service_coverage: string;
  
  // SBA Specific
  sba_eligibility: string;
  environmental_concerns: boolean;
  government_contracting: boolean;
  franchise_business: boolean;
  real_estate_component: boolean;
  
  // Ownership
  current_owners: CurrentOwner[];
  former_owners: FormerOwner[];
  ownership_changes_last_2_years: boolean;
  ownership_change_details?: string;
  management_changes_last_2_years: boolean;
  management_change_details?: string;
}

export interface CurrentOwner {
  id: string;
  first_name: string;
  last_name: string;
  ownership_percentage: number;
  title: string;
  is_guarantor: boolean;
  citizenship_status: string;
  date_of_birth: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
}

export interface FormerOwner {
  id: string;
  first_name: string;
  last_name: string;
  ownership_percentage: number;
  reason_for_leaving: string;
  date_ownership_ended: string;
  current_involvement: string;
  settlement_terms: string;
}
