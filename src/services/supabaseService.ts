
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

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Project Services
export const getProjects = async () => {
  if (USE_MOCK_DATA) {
    return getProjectsData();
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    toast.error('Failed to load projects');
    return [];
  }
};

export const getProjectById = async (projectId: string) => {
  if (USE_MOCK_DATA) {
    return getProjectByIdData(projectId);
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(`Error fetching project ${projectId}:`, error.message);
    toast.error('Failed to load project details');
    return null;
  }
};

// Participants Services
export const getProjectParticipants = async (projectId: string) => {
  if (USE_MOCK_DATA) {
    return getProjectParticipantsData(projectId);
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching participants for project ${projectId}:`, error.message);
    toast.error('Failed to load project participants');
    return [];
  }
};

// Business Services
export const getBusinessesByOwnerId = async (userId: string) => {
  if (USE_MOCK_DATA) {
    return getBusinessesByOwnerIdData(userId);
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching businesses for user ${userId}:`, error.message);
    toast.error('Failed to load business data');
    return [];
  }
};

export const getBusinessFinancialData = async (businessId: string) => {
  if (USE_MOCK_DATA) {
    return getBusinessFinancialDataData(businessId);
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching financial data for business ${businessId}:`, error.message);
    toast.error('Failed to load financial data');
    return [];
  }
};

// Forms and Documents Services
export const getFormTemplates = async (entityType: string) => {
  if (USE_MOCK_DATA) {
    return getFormTemplatesData(entityType);
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching form templates for ${entityType}:`, error.message);
    toast.error('Failed to load form templates');
    return [];
  }
};

export const getDocuments = async (entityType: string) => {
  if (USE_MOCK_DATA) {
    return getDocumentsData(entityType);
  }
  
  try {
    // This will be replaced with actual Supabase query once database is set up
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
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
    // This will be replaced with actual Supabase query once database is set up
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
    // This will be replaced with actual Supabase query once database is set up
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
    // This will be replaced with actual Supabase query once database is set up
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
