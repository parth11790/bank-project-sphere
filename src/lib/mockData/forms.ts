import { FormTemplate, Document } from '@/types/form';

export const individualFormsData: FormTemplate[] = [
  { 
    form_id: "pif_001", 
    name: "Personal Information Form", 
    entity_type: "individual" 
  },
  { 
    form_id: "networth_001", 
    name: "Net Worth Assessment", 
    entity_type: "individual" 
  },
  { 
    form_id: "pfs_001", 
    name: "Personal Financial Statement", 
    entity_type: "individual" 
  },
  { 
    form_id: "credit_001", 
    name: "Credit Authorization Form", 
    entity_type: "individual" 
  },
  { 
    form_id: "intent_001", 
    name: "Letter of Intent", 
    entity_type: "individual" 
  },
  { 
    form_id: "resume_001", 
    name: "Professional Resume", 
    entity_type: "individual" 
  },
  { 
    form_id: "ref_001", 
    name: "Professional References Form", 
    entity_type: "individual" 
  },
  { 
    form_id: "exp_001", 
    name: "Management Experience Questionnaire", 
    entity_type: "individual" 
  },
  { 
    form_id: "acquire_001", 
    name: "Acquisition Questionnaire", 
    entity_type: "individual" 
  },
  { 
    form_id: "bank_001", 
    name: "Bank Statements (6 Months)", 
    entity_type: "individual" 
  },
  { 
    form_id: "form_2", 
    name: "Tax Returns", 
    entity_type: "individual" 
  },
  { 
    form_id: "drivers_license_001", 
    name: "Driver's License Upload", 
    entity_type: "individual" 
  },
  { 
    form_id: "credit_report_001", 
    name: "Credit Report Upload", 
    entity_type: "individual" 
  },
  { 
    form_id: "mgmt_resume_001", 
    name: "Management Resume Upload", 
    entity_type: "individual" 
  },
];

export const businessFormsData: FormTemplate[] = [
  { form_id: "form_8", name: "Business Tax Returns (3 years)", entity_type: "business", status: "submitted" },
  { form_id: "form_9", name: "Balance Sheet", entity_type: "business", status: "pending" },
  { form_id: "form_10", name: "Profit & Loss Statement", entity_type: "business", status: "pending" },
  { form_id: "form_11", name: "Accounts Receivable & Accounts Payable", entity_type: "business" },
  { form_id: "form_12", name: "Inventory and Equipment List", entity_type: "business" },
  { form_id: "form_13", name: "Broker Listing Agreement", entity_type: "business" },
  { form_id: "form_14", name: "Business Acquisition Questionnaire", entity_type: "business" },
  { form_id: "form_15", name: "Business Debt Schedule", entity_type: "business" },
  { form_id: "form_16", name: "K1 Schedules", entity_type: "business" },
  { form_id: "form_20", name: "Customer Concentration Analysis", entity_type: "business" },
  { form_id: "form_21", name: "Vendor Relationship Documentation", entity_type: "business" },
  { form_id: "form_22", name: "Employee Information & Payroll", entity_type: "business" },
  { form_id: "form_23", name: "Lease Agreements & Contracts", entity_type: "business" },
  { form_id: "form_24", name: "Intellectual Property Documentation", entity_type: "business" },
  { form_id: "form_25", name: "Business Insurance Policies", entity_type: "business" },
  { form_id: "form_26", name: "Operating Procedures Manual", entity_type: "business" },
  { form_id: "form_27", name: "Financial Projections (5 years)", entity_type: "business" },
  { form_id: "form_28", name: "Market Analysis Report", entity_type: "business" },
  { form_id: "business_license_001", name: "Business License Upload", entity_type: "business" },
  { form_id: "articles_inc_001", name: "Articles of Incorporation Upload", entity_type: "business" },
  { form_id: "operating_agreement_001", name: "Operating Agreement Upload", entity_type: "business" },
  { form_id: "lease_agreement_001", name: "Lease Agreement Upload", entity_type: "business" },
  { form_id: "equipment_list_001", name: "Equipment List Upload", entity_type: "business" },
  { form_id: "insurance_policies_001", name: "Insurance Policies Upload", entity_type: "business" },
];

// Keep empty arrays for backward compatibility but these won't be used
export const individualDocumentsData: Document[] = [];
export const businessDocumentsData: Document[] = [];
