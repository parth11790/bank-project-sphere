
import { users, businesses, projects } from './mockData';
import { Project, isProject } from '@/types/project';
import { Business, isBusiness, BusinessFinancialData } from '@/types/business';
import { User, isUser } from '@/types/user';
import { FormTemplate, Document, isFormTemplate } from '@/types/form';
import { Participant, isParticipant } from '@/types/participant';

// Mock implementations of the Supabase service functions
export const getProjectsData = async (): Promise<Project[]> => {
  return projects.map(project => ({
    project_id: project.project_id,
    project_name: project.project_name,
    project_type: project.project_type,
    loan_amount: project.loan_amount,
    // Return the loan types as array of strings for list views
    loan_types: project.loan_types.map(lt => lt.type),
    created_at: project.created_at,
    updated_at: project.updated_at,
    city: project.city,
    state: project.state,
    created_by: project.created_by,
    created_by_user: { name: users.find(u => u.user_id === project.created_by)?.name || 'Unknown' }
  }));
};

export const getProjectByIdData = async (projectId: string): Promise<Project | null> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return null;
  
  return {
    project_id: project.project_id,
    project_name: project.project_name,
    project_type: project.project_type,
    loan_amount: project.loan_amount,
    // Pass the complete loan_types objects for this function to display details
    loan_types: project.loan_types,
    created_at: project.created_at,
    updated_at: project.updated_at,
    city: project.city,
    state: project.state,
    created_by: project.created_by,
    created_by_user: { name: users.find(u => u.user_id === project.created_by)?.name || 'Unknown' }
  };
};

export const getProjectParticipantsData = async (projectId: string): Promise<Participant[]> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return [];
  
  return project.participants.map(participant => {
    const user = users.find(u => u.user_id === participant.userId);
    return {
      participant_id: `part_${participant.userId}`,
      user_id: participant.userId,
      project_id: projectId,
      user: {
        name: user?.name || 'Unknown',
        email: user?.email || 'unknown@example.com',
        role: participant.role
      }
    };
  });
};

export const getBusinessesByOwnerIdData = async (userId: string): Promise<Business[]> => {
  return businesses.filter(b => b.owner_id === userId);
};

export const getBusinessFinancialDataData = async (businessId: string): Promise<BusinessFinancialData[]> => {
  const business = businesses.find(b => b.business_id === businessId);
  if (!business || !business.financial_data) return [];
  
  return Object.entries(business.financial_data).map(([year, data]) => ({
    data_id: `fin_${businessId}_${year}`,
    business_id: businessId,
    year,
    revenue: data.revenue,
    wages: data.wages,
    cogs: data.cogs,
    gross_profit: data.gross_profit,
    other_expenses: data.other_expenses,
    total_noi: data.total_noi,
    nom_percentage: data.nom_percentage
  }));
};

// Mock form templates and documents data
const individualForms: FormTemplate[] = [
  { form_id: "form_1", name: "Personal Information Form", entity_type: "individual" },
  { form_id: "form_2", name: "Intent Form", entity_type: "individual" },
  { form_id: "form_3", name: "Personal Financial Statement", entity_type: "individual" },
  { form_id: "form_4", name: "Resume", entity_type: "individual" },
  { form_id: "form_5", name: "Tax Returns", entity_type: "individual" },
  { form_id: "form_6", name: "Acquisition Questionnaire", entity_type: "individual" },
  { form_id: "form_7", name: "Broker Listing Form", entity_type: "individual" },
];

const businessForms: FormTemplate[] = [
  { form_id: "form_8", name: "Tax Returns", entity_type: "business" },
  { form_id: "form_9", name: "Balance Sheet", entity_type: "business" },
  { form_id: "form_10", name: "Profit & Loss Report", entity_type: "business" },
  { form_id: "form_11", name: "Accounts Receivable & Accounts Payable", entity_type: "business" },
  { form_id: "form_12", name: "Inventory and Equipment List", entity_type: "business" },
  { form_id: "form_13", name: "Broker Listing", entity_type: "business" },
  { form_id: "form_14", name: "Acquisition Questionnaire", entity_type: "business" },
  { form_id: "form_15", name: "Business Debt Schedule", entity_type: "business" },
  { form_id: "form_16", name: "K1 Schedules", entity_type: "business" },
];

const individualDocuments: Document[] = [
  { document_id: "doc_1", name: "Driver's License", entity_type: "individual" },
  { document_id: "doc_2", name: "Tax Returns", entity_type: "individual" },
  { document_id: "doc_3", name: "Resume", entity_type: "individual" },
];

const businessDocuments: Document[] = [
  { document_id: "doc_4", name: "Business License", entity_type: "business" },
  { document_id: "doc_5", name: "Tax Returns", entity_type: "business" },
  { document_id: "doc_6", name: "Financial Statements", entity_type: "business" },
];

export const getFormTemplatesData = async (entityType: string): Promise<FormTemplate[]> => {
  return entityType === 'individual' ? individualForms : businessForms;
};

export const getDocumentsData = async (entityType: string): Promise<Document[]> => {
  return entityType === 'individual' ? individualDocuments : businessDocuments;
};

export const getAssignedFormsData = async (participantId: string, businessId?: string) => {
  // Mock assigned forms - for demo purposes, assign first 2 forms
  const forms = businessId ? businessForms.slice(0, 2) : individualForms.slice(0, 2);
  return forms.map(form => ({
    assignment_id: `af_${participantId}_${form.form_id}`,
    participant_id: participantId,
    business_id: businessId,
    form_id: form.form_id,
    form
  }));
};

export const getAssignedDocumentsData = async (participantId: string, businessId?: string) => {
  // Mock assigned documents - for demo purposes, assign first 2 documents
  const documents = businessId ? businessDocuments.slice(0, 2) : individualDocuments.slice(0, 2);
  return documents.map(document => ({
    assignment_id: `ad_${participantId}_${document.document_id}`,
    participant_id: participantId,
    business_id: businessId,
    document_id: document.document_id,
    document
  }));
};
