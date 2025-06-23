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
  participant_type?: string; // Added this property
  
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
  
  // Eligibility Fields
  is_operating_business?: boolean | null;
  is_for_profit?: boolean | null;
  is_us_location?: boolean | null;
  ineligible_business_types?: string[];
  principal_status: {
    is_incarcerated: boolean | null;
    is_on_parole: boolean | null;
    is_indicted: boolean | null;
  };
  has_prior_government_debt?: boolean | null;
  has_robs_esop_involvement?: boolean | null;
  pre_screening_status?: string;
  eligibility_notes?: string;
  
  // Legacy Eligibility (for compatibility)
  business_in_operation?: boolean;
  time_in_business?: string;
  business_type?: string;
  annual_revenue?: number;
  credit_score_range?: string;
  industry?: string;
  employees_count?: string;
  collateral_available?: boolean;
  debt_service_coverage?: string;
  sba_eligibility?: string;
  environmental_concerns?: boolean;
  government_contracting?: boolean;
  franchise_business?: boolean;
  real_estate_component?: boolean;
  
  // Ownership
  current_owners: CurrentOwner[];
  former_owners: FormerOwner[];
  ownership_changes_last_2_years?: boolean;
  ownership_change_details?: string;
  management_changes_last_2_years?: boolean;
  management_change_details?: string;
  
  // Pre-Approval
  pre_approval_content?: string;
  preliminary_conditions?: string[];
  pre_approval_status?: string;
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

// Add missing type exports
export interface FormComponentProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

export interface FormStep {
  id: string;
  title: string;
  component: React.ComponentType<FormComponentProps>;
}
