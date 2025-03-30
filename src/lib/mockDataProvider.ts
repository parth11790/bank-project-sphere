import { 
  users, 
  businesses, 
  projects,
  getUserById,
  getBusinessById,
  individualFormsData,
  businessFormsData,
  individualDocumentsData,
  businessDocumentsData
} from './mockData';
import { Project, isProject } from '@/types/project';
import { Business, isBusiness, BusinessFinancialData } from '@/types/business';
import { FormTemplate, Document, isFormTemplate } from '@/types/form';
import { Participant, isParticipant, ParticipantWithDetails } from '@/types/participant';

// Mock implementations of the service functions
export const getProjectsData = async (): Promise<Project[]> => {
  return projects.map(project => ({
    ...project,
    // Ensure status is present in each project
    status: project.status || 'active',
    // For list view, we just return the loan type strings
    created_by_user: { 
      name: users.find(u => u.user_id === project.created_by)?.name || 'Unknown',
      user_id: users.find(u => u.user_id === project.created_by)?.user_id || '',
      email: users.find(u => u.user_id === project.created_by)?.email || '',
      role: users.find(u => u.user_id === project.created_by)?.role || ''
    }
  }));
};

export const getProjectByIdData = async (projectId: string): Promise<Project | null> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return null;
  
  return {
    ...project,
    status: project.status || 'active',
    created_by_user: { 
      name: users.find(u => u.user_id === project.created_by)?.name || 'Unknown',
      user_id: users.find(u => u.user_id === project.created_by)?.user_id || '',
      email: users.find(u => u.user_id === project.created_by)?.email || '',
      role: users.find(u => u.user_id === project.created_by)?.role || ''
    }
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
    
    // For bank roles, don't include business
    const isBankRole = ['bank_officer', 'loan_specialist', 'bank_manager'].includes(participant.role);
    
    // Assign forms and documents - more for buyers and sellers
    const formCount = isBankRole ? 0 : (participant.role === 'buyer' ? 3 : 2);
    const docCount = isBankRole ? 0 : (participant.role === 'buyer' ? 2 : 1);
    
    const individualForms = sampleItems(individualFormsData, formCount);
    const individualDocs = sampleItems(individualDocumentsData, docCount);
    
    // Always include a business for buyers and sellers unless they don't have one
    const hasBusiness = userBusinesses.length > 0 && !isBankRole;
    
    return {
      participant_id: `part_${participant.userId}`,
      user_id: participant.userId,
      name: user.name,
      email: user.email,
      role: participant.role,
      documents: individualDocs,
      forms: individualForms,
      business: hasBusiness ? {
        business_id: userBusinesses[0].business_id,
        name: userBusinesses[0].name,
        entity_type: userBusinesses[0].entity_type,
        title: getRandomTitle(),
        ownership_percentage: getRandomOwnership(),
        documents: sampleItems(businessDocumentsData, docCount + 1),
        forms: sampleItems(businessFormsData, formCount + 1),
      } : undefined
    };
  }).filter(Boolean) as ParticipantWithDetails[];
};

export const getBusinessesByOwnerIdData = async (userId: string): Promise<Business[]> => {
  return businesses.filter(b => b.owner_id === userId);
};

export const getBusinessFinancialDataData = async (businessId: string): Promise<BusinessFinancialData[]> => {
  const business = getBusinessById(businessId);
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

export const getFormTemplatesData = async (entityType: string): Promise<FormTemplate[]> => {
  return entityType === 'individual' ? individualFormsData : businessFormsData;
};

export const getDocumentsData = async (entityType: string): Promise<Document[]> => {
  return entityType === 'individual' ? individualDocumentsData : businessDocumentsData;
};

export const getAssignedFormsData = async (participantId: string, businessId?: string) => {
  // Mock assigned forms - for demo purposes, assign a variable number of forms
  const numberOfForms = Math.floor(Math.random() * 3) + 1; // 1 to 3 forms
  const forms = businessId ? 
    sampleItems(businessFormsData, numberOfForms) : 
    sampleItems(individualFormsData, numberOfForms);
    
  return forms.map(form => ({
    assignment_id: `af_${participantId}_${form.form_id}`,
    participant_id: participantId,
    business_id: businessId,
    form_id: form.form_id,
    form
  }));
};

export const getAssignedDocumentsData = async (participantId: string, businessId?: string) => {
  // Mock assigned documents - for demo purposes, assign a variable number of documents
  const numberOfDocs = Math.floor(Math.random() * 3) + 1; // 1 to 3 documents
  const documents = businessId ? 
    sampleItems(businessDocumentsData, numberOfDocs) : 
    sampleItems(individualDocumentsData, numberOfDocs);
    
  return documents.map(document => ({
    assignment_id: `ad_${participantId}_${document.document_id}`,
    participant_id: participantId,
    business_id: businessId,
    document_id: document.document_id,
    document
  }));
};

// Mock cash flow analysis data for businesses
export const getCashFlowAnalysisData = async (businessId: string) => {
  const business = getBusinessById(businessId);
  
  if (!business || !business.financial_data) return null;
  
  // Import the getSeasionalFactor function dynamically to avoid circular imports
  const { getSeasionalFactor } = await import('./mockData');
  
  // Extract years and create cash flow analysis
  const years = Object.keys(business.financial_data);
  const monthlyData = years.map(year => {
    const yearData = business.financial_data![year];
    
    // Create monthly breakdown (simulate monthly variations)
    return Array(12).fill(0).map((_, index) => {
      const month = index + 1;
      const seasonalFactor = getSeasionalFactor(month, business.entity_type);
      
      return {
        period: `${year}-${month.toString().padStart(2, '0')}`,
        revenue: Math.round(yearData.revenue / 12 * seasonalFactor),
        expenses: Math.round((yearData.wages + yearData.cogs + yearData.other_expenses) / 12 * seasonalFactor),
        cashFlow: Math.round(yearData.total_noi / 12 * seasonalFactor),
      };
    });
  }).flat();
  
  return {
    businessId,
    businessName: business.name,
    entityType: business.entity_type,
    cashFlowData: monthlyData,
    annualSummary: years.map(year => {
      const yearData = business.financial_data![year];
      return {
        year,
        totalRevenue: yearData.revenue,
        totalExpenses: yearData.wages + yearData.cogs + yearData.other_expenses,
        netCashFlow: yearData.total_noi,
        profitMargin: yearData.nom_percentage
      };
    })
  };
};
