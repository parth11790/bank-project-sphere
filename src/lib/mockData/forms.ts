
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
];

export const individualDocumentsData: Document[] = [
  { document_id: "doc_1", name: "Driver's License", entity_type: "individual", status: "submitted" },
  { document_id: "doc_2", name: "Tax Returns", entity_type: "individual", status: "pending" },
  { document_id: "doc_3", name: "Resume", entity_type: "individual", status: "submitted" },
  { document_id: "doc_7", name: "Bank Statements", entity_type: "individual" },
  { document_id: "doc_8", name: "Credit Report", entity_type: "individual" },
  { document_id: "doc_9", name: "Management Resume", entity_type: "individual" },
];

export const businessDocumentsData: Document[] = [
  { document_id: "doc_4", name: "Business License", entity_type: "business", status: "submitted" },
  { document_id: "doc_5", name: "Tax Returns", entity_type: "business", status: "pending" },
  { document_id: "doc_6", name: "Financial Statements", entity_type: "business", status: "pending" },
  { document_id: "doc_10", name: "Articles of Incorporation", entity_type: "business" },
  { document_id: "doc_11", name: "Operating Agreement", entity_type: "business" },
  { document_id: "doc_12", name: "Lease Agreement", entity_type: "business" },
  { document_id: "doc_13", name: "Equipment List", entity_type: "business" },
  { document_id: "doc_14", name: "Insurance Policies", entity_type: "business" },
];
