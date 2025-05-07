
import { ReactElement } from "react";

export interface IntakeFormData {
  // Basic lead information
  project_name: string;
  project_type: string;
  lead_source: string;
  date_entered: string;
  assigned_loan_officer: string;
  business_legal_name: string;
  business_dba_name: string;
  primary_contact_name: string;
  primary_contact_phone: string;
  primary_contact_email: string;
  requested_loan_amount: number;
  loan_purpose: string;
  lead_status: string;
  city: string;
  state: string;
  
  // Eligibility information
  is_operating_business: boolean | null;
  is_for_profit: boolean | null;
  is_us_location: boolean | null;
  ineligible_business_types: string[];
  principal_status: {
    is_incarcerated: boolean | null;
    is_on_parole: boolean | null;
    is_indicted: boolean | null;
  };
  has_prior_government_debt: boolean | null;
  has_robs_esop_involvement: boolean | null;
  pre_screening_status: string;
  eligibility_notes: string;
  
  // Ownership information
  current_owners: {
    name: string;
    tax_id: string;
    address: string;
    ownership_percentage: number;
    citizenship_status: string;
  }[];
  former_owners: {
    name: string;
    tax_id: string;
    address: string;
    ownership_percentage: number;
    former_ownership_percentage: number;
    citizenship_status: string;
    date_ownership_ceased: Date;
    is_still_associate: boolean;
    is_still_employed: boolean;
  }[];
  
  // Pre-approval letter
  pre_approval_content: string;
  preliminary_conditions: string[];
  pre_approval_status: string;
}

export interface FormComponentProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

export interface FormStep {
  id: string;
  title: string;
  component: React.ComponentType<FormComponentProps>;
}
