
import { useState } from 'react';
import { IntakeFormData } from '../types/intakeTypes';

const defaultFormData: IntakeFormData = {
  project_name: "",
  project_type: "",
  lead_source: "",
  date_entered: new Date().toISOString(),
  assigned_loan_officer: "",
  business_legal_name: "",
  business_dba_name: "",
  primary_contact_name: "",
  primary_contact_phone: "",
  primary_contact_email: "",
  requested_loan_amount: 0,
  loan_purpose: "",
  city: "",
  state: "",
  
  // Eligibility fields
  is_operating_business: null,
  is_for_profit: null,
  is_us_location: null,
  ineligible_business_types: [],
  principal_status: {
    is_incarcerated: null,
    is_on_parole: null,
    is_indicted: null,
  },
  has_prior_government_debt: null,
  has_robs_esop_involvement: null,
  pre_screening_status: "",
  eligibility_notes: "",
  
  current_owners: [],
  former_owners: [],
  
  pre_approval_content: "",
  preliminary_conditions: [],
  pre_approval_status: "Draft"
};

export const useIntakeFormState = () => {
  const [formData, setFormData] = useState<IntakeFormData>(defaultFormData);

  const updateFormData = (data: Partial<IntakeFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  return { formData, updateFormData };
};
