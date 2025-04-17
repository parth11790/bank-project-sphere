import { FormTemplate, Document } from '@/types/form';

export const individualFormsData: FormTemplate[] = [
  { form_id: "form_1", name: "Personal Information Form", entity_type: "individual", status: "submitted" },
  { form_id: "form_2", name: "Intent Form", entity_type: "individual", status: "pending" },
  { form_id: "form_3", name: "Personal Financial Statement", entity_type: "individual", status: "pending" },
  { form_id: "form_4", name: "Resume", entity_type: "individual", status: "submitted" },
  { form_id: "form_5", name: "Tax Returns", entity_type: "individual" },
  { form_id: "form_6", name: "Acquisition Questionnaire", entity_type: "individual" },
  { form_id: "form_7", name: "Broker Listing Form", entity_type: "individual" },
  { form_id: "form_17", name: "Personal Credit History", entity_type: "individual" },
  { form_id: "form_18", name: "Management Experience", entity_type: "individual" },
  { form_id: "form_19", name: "Personal References", entity_type: "individual" },
];

export const businessFormsData: FormTemplate[] = [
  { form_id: "form_8", name: "Tax Returns", entity_type: "business", status: "submitted" },
  { form_id: "form_9", name: "Balance Sheet", entity_type: "business", status: "pending" },
  { form_id: "form_10", name: "Profit & Loss Report", entity_type: "business", status: "pending" },
  { form_id: "form_11", name: "Accounts Receivable & Accounts Payable", entity_type: "business" },
  { form_id: "form_12", name: "Inventory and Equipment List", entity_type: "business" },
  { form_id: "form_13", name: "Broker Listing", entity_type: "business" },
  { form_id: "form_14", name: "Acquisition Questionnaire", entity_type: "business" },
  { form_id: "form_15", name: "Business Debt Schedule", entity_type: "business" },
  { form_id: "form_16", name: "K1 Schedules", entity_type: "business" },
  { form_id: "form_20", name: "Customer Concentration", entity_type: "business" },
  { form_id: "form_21", name: "Vendor Relationships", entity_type: "business" },
  { form_id: "form_22", name: "Employee Information", entity_type: "business" },
  { form_id: "form_23", name: "Lease Agreements", entity_type: "business" },
  { form_id: "form_24", name: "Intellectual Property", entity_type: "business" },
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
