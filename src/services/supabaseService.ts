
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  getProjectsData, 
  getProjectByIdData, 
  getProjectParticipantsData,
  getBusinessesByOwnerIdData,
  getBusinessFinancialDataData,
  getFormTemplatesData,
  getDocumentsData,
  getAssignedFormsData,
  getAssignedDocumentsData
} from '@/lib/mockDataProvider';
import { Project, ApiResponse as ProjectApiResponse, isProject } from '@/types/project';
import { Business, BusinessFinancialData, ApiResponse as BusinessApiResponse, isBusiness } from '@/types/business';
import { FormTemplate, Document, ApiResponse as FormApiResponse, isFormTemplate } from '@/types/form';
import { Participant, ApiResponse as ParticipantApiResponse, isParticipant } from '@/types/participant';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Project Services
export const getProjects = async (): Promise<Project[]> => {
  if (USE_MOCK_DATA) {
    return getProjectsData();
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our Project type
    return (data || []).filter((item: any) => isProject(item)) as Project[];
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    toast.error('Failed to load projects');
    return [];
  }
};

export const getProjectById = async (projectId: string): Promise<Project | null> => {
  if (USE_MOCK_DATA) {
    return getProjectByIdData(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .eq('id', Number(projectId))
      .single();
    
    if (error) throw error;
    
    return isProject(data) ? data : null;
  } catch (error: any) {
    console.error(`Error fetching project ${projectId}:`, error.message);
    toast.error('Failed to load project details');
    return null;
  }
};

// Participants Services
export const getProjectParticipants = async (projectId: string): Promise<Participant[]> => {
  if (USE_MOCK_DATA) {
    return getProjectParticipantsData(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our Participant type
    return (data || []).filter((item: any) => isParticipant(item)) as Participant[];
  } catch (error: any) {
    console.error(`Error fetching participants for project ${projectId}:`, error.message);
    toast.error('Failed to load project participants');
    return [];
  }
};

// Business Services
export const getBusinessesByOwnerId = async (userId: string): Promise<Business[]> => {
  if (USE_MOCK_DATA) {
    return getBusinessesByOwnerIdData(userId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our Business type
    return (data || []).filter((item: any) => isBusiness(item)) as Business[];
  } catch (error: any) {
    console.error(`Error fetching businesses for user ${userId}:`, error.message);
    toast.error('Failed to load business data');
    return [];
  }
};

export const getBusinessFinancialData = async (businessId: string): Promise<BusinessFinancialData[]> => {
  if (USE_MOCK_DATA) {
    return getBusinessFinancialDataData(businessId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Cast to unknown first to avoid TypeScript errors
    return (data || []) as unknown as BusinessFinancialData[];
  } catch (error: any) {
    console.error(`Error fetching financial data for business ${businessId}:`, error.message);
    toast.error('Failed to load financial data');
    return [];
  }
};

// Forms and Documents Services
export const getFormTemplates = async (entityType: string): Promise<FormTemplate[]> => {
  if (USE_MOCK_DATA) {
    return getFormTemplatesData(entityType);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our FormTemplate type
    return (data || []).filter((item: any) => isFormTemplate(item)) as FormTemplate[];
  } catch (error: any) {
    console.error(`Error fetching form templates for ${entityType}:`, error.message);
    toast.error('Failed to load form templates');
    return [];
  }
};

export const getDocuments = async (entityType: string): Promise<Document[]> => {
  if (USE_MOCK_DATA) {
    return getDocumentsData(entityType);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Cast to unknown first to avoid TypeScript errors
    return (data || []) as unknown as Document[];
  } catch (error: any) {
    console.error(`Error fetching documents for ${entityType}:`, error.message);
    toast.error('Failed to load document types');
    return [];
  }
};

export const getAssignedForms = async (participantId: string, businessId?: string) => {
  if (USE_MOCK_DATA) {
    return getAssignedFormsData(participantId, businessId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching assigned forms:', error.message);
    toast.error('Failed to load assigned forms');
    return [];
  }
};

export const getAssignedDocuments = async (participantId: string, businessId?: string) => {
  if (USE_MOCK_DATA) {
    return getAssignedDocumentsData(participantId, businessId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching assigned documents:', error.message);
    toast.error('Failed to load assigned documents');
    return [];
  }
};

// Use of Proceeds Services
export const getUseOfProceeds = async (projectId: string) => {
  if (USE_MOCK_DATA) {
    const { getUseOfProceedsForProject } = await import('@/lib/mockData');
    return getUseOfProceedsForProject(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching use of proceeds for project ${projectId}:`, error.message);
    toast.error('Failed to load use of proceeds data');
    return [];
  }
};
