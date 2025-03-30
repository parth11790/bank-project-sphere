
import { users, businesses, projects } from './mockData';
import { Project, isProject } from '@/types/project';
import { Business, isBusiness, BusinessFinancialData } from '@/types/business';
import { FormTemplate, Document, isFormTemplate } from '@/types/form';
import { Participant, isParticipant, ParticipantWithDetails } from '@/types/participant';

// Mock implementations of the service functions
export const getProjectsData = async (): Promise<Project[]> => {
  return projects.map(project => ({
    ...project,
    // For list view, we just return the loan type strings
    created_by_user: { name: users.find(u => u.user_id === project.created_by)?.name || 'Unknown' }
  }));
};

export const getProjectByIdData = async (projectId: string): Promise<Project | null> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return null;
  
  return {
    ...project,
    created_by_user: { name: users.find(u => u.user_id === project.created_by)?.name || 'Unknown' }
  };
};

// Mock participant data
export const getProjectParticipantsData = async (projectId: string): Promise<Participant[]> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return [];
  
  return project.participants.map(participant => {
    const user = users.find(u => u.user_id === participant.userId);
    return {
      participant_id: `part_${participant.userId}`,
      user_id: participant.userId,
      name: user?.name || 'Unknown',
      email: user?.email || 'unknown@example.com',
      role: participant.role,
      documents: [],
      forms: []
    };
  });
};

// Helper to get a random sample of items
const sampleItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper to generate random title
const getRandomTitle = (): string => {
  const titles = ['CEO', 'President', 'Owner', 'Managing Partner', 'Director', 'Founder', 'Managing Member'];
  return titles[Math.floor(Math.random() * titles.length)];
};

// Helper to generate random ownership percentage
const getRandomOwnership = (): number => {
  return Math.floor(Math.random() * 80) + 20; // 20-100%
};

// Mock detailed participant data for participants page
export const getParticipantsWithDetailsData = async (projectId: string): Promise<ParticipantWithDetails[]> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return [];
  
  return project.participants.map(participant => {
    const user = users.find(u => u.user_id === participant.userId);
    if (!user) return null;
    
    // Find if this participant has any businesses 
    const userBusinesses = businesses.filter(b => b.owner_id === user.user_id);
    const hasBusiness = userBusinesses.length > 0;
    
    // For bank roles, don't include business
    const isBankRole = ['bank_officer', 'loan_specialist', 'bank_manager'].includes(participant.role);
    
    // Randomly assign some forms and documents
    const individualForms = isBankRole ? [] : sampleItems(individualFormsData, 2);
    const individualDocs = isBankRole ? [] : sampleItems(individualDocumentsData, 2);
    
    return {
      participant_id: `part_${participant.userId}`,
      user_id: participant.userId,
      name: user.name,
      email: user.email,
      role: participant.role,
      documents: individualDocs,
      forms: individualForms,
      business: (!isBankRole && hasBusiness) ? {
        business_id: userBusinesses[0].business_id,
        name: userBusinesses[0].name,
        entity_type: userBusinesses[0].entity_type,
        title: getRandomTitle(), // Add a random title
        ownership_percentage: getRandomOwnership(), // Add a random ownership percentage
        documents: sampleItems(businessDocumentsData, 2),
        forms: sampleItems(businessFormsData, 3),
      } : undefined
    };
  }).filter(Boolean) as ParticipantWithDetails[];
};

export const getBusinessesByOwnerIdData = async (userId: string): Promise<Business[]> => {
  return businesses.filter(b => b.owner_id === userId);
};

export const getBusinessFinancialDataData = async (businessId: string): Promise<BusinessFinancialData[]> => {
  const business = businesses.find(b => b.business_id === businessId);
  if (!business || !business.financial_data) return [];
  
  return Object.entries(business.financial_data).map(([year, data]) => {
    // Create the BusinessFinancialData object with proper years field
    const financialData: BusinessFinancialData = {
      data_id: `fin_${businessId}_${year}`,
      business_id: businessId,
      year,
      revenue: data.revenue,
      wages: data.wages,
      cogs: data.cogs,
      gross_profit: data.gross_profit,
      other_expenses: data.other_expenses,
      total_noi: data.total_noi,
      nom_percentage: data.nom_percentage,
      business_name: business.name,
      entity_type: business.entity_type,
      years: [{
        year,
        revenue: data.revenue,
        wages: data.wages,
        cogs: data.cogs,
        gross_profit: data.gross_profit,
        gross_margin: data.revenue > 0 ? (data.gross_profit / data.revenue) * 100 : 0,
        other_expenses: data.other_expenses,
        total_noi: data.total_noi,
        nom: data.nom_percentage,
      }]
    };
    
    return financialData;
  });
};

// Mock form templates and documents data
const individualFormsData: FormTemplate[] = [
  { form_id: "form_1", name: "Personal Information Form", entity_type: "individual" },
  { form_id: "form_2", name: "Intent Form", entity_type: "individual" },
  { form_id: "form_3", name: "Personal Financial Statement", entity_type: "individual" },
  { form_id: "form_4", name: "Resume", entity_type: "individual" },
  { form_id: "form_5", name: "Tax Returns", entity_type: "individual" },
  { form_id: "form_6", name: "Acquisition Questionnaire", entity_type: "individual" },
  { form_id: "form_7", name: "Broker Listing Form", entity_type: "individual" },
];

const businessFormsData: FormTemplate[] = [
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

const individualDocumentsData: Document[] = [
  { document_id: "doc_1", name: "Driver's License", entity_type: "individual" },
  { document_id: "doc_2", name: "Tax Returns", entity_type: "individual" },
  { document_id: "doc_3", name: "Resume", entity_type: "individual" },
];

const businessDocumentsData: Document[] = [
  { document_id: "doc_4", name: "Business License", entity_type: "business" },
  { document_id: "doc_5", name: "Tax Returns", entity_type: "business" },
  { document_id: "doc_6", name: "Financial Statements", entity_type: "business" },
];

export const getFormTemplatesData = async (entityType: string): Promise<FormTemplate[]> => {
  return entityType === 'individual' ? individualFormsData : businessFormsData;
};

export const getDocumentsData = async (entityType: string): Promise<Document[]> => {
  return entityType === 'individual' ? individualDocumentsData : businessDocumentsData;
};

export const getAssignedFormsData = async (participantId: string, businessId?: string) => {
  // Mock assigned forms - for demo purposes, assign first 2 forms
  const forms = businessId ? businessFormsData.slice(0, 2) : individualFormsData.slice(0, 2);
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
  const documents = businessId ? businessDocumentsData.slice(0, 2) : individualDocumentsData.slice(0, 2);
  return documents.map(document => ({
    assignment_id: `ad_${participantId}_${document.document_id}`,
    participant_id: participantId,
    business_id: businessId,
    document_id: document.document_id,
    document
  }));
};
