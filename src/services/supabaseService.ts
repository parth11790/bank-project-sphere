
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Project Services
export const getProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        loan_types (*),
        created_by_user:users(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    toast.error('Failed to load projects');
    return [];
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        loan_types (*),
        created_by_user:users(name)
      `)
      .eq('project_id', projectId)
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
  try {
    const { data, error } = await supabase
      .from('project_participants')
      .select(`
        *,
        user:users(*)
      `)
      .eq('project_id', projectId);
    
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
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_id', userId);
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching businesses for user ${userId}:`, error.message);
    toast.error('Failed to load business data');
    return [];
  }
};

export const getBusinessFinancialData = async (businessId: string) => {
  try {
    const { data, error } = await supabase
      .from('business_financial_data')
      .select('*')
      .eq('business_id', businessId)
      .order('year', { ascending: true });
    
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
  try {
    const { data, error } = await supabase
      .from('form_templates')
      .select('*')
      .eq('entity_type', entityType);
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching form templates for ${entityType}:`, error.message);
    toast.error('Failed to load form templates');
    return [];
  }
};

export const getDocuments = async (entityType: string) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('entity_type', entityType);
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching documents for ${entityType}:`, error.message);
    toast.error('Failed to load document types');
    return [];
  }
};

export const getAssignedForms = async (participantId: string, businessId?: string) => {
  try {
    let query = supabase
      .from('assigned_forms')
      .select(`
        *,
        form:form_templates(*)
      `)
      .eq('participant_id', participantId);
    
    if (businessId) {
      query = query.eq('business_id', businessId);
    } else {
      query = query.is('business_id', null);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching assigned forms:', error.message);
    toast.error('Failed to load assigned forms');
    return [];
  }
};

export const getAssignedDocuments = async (participantId: string, businessId?: string) => {
  try {
    let query = supabase
      .from('assigned_documents')
      .select(`
        *,
        document:documents(*)
      `)
      .eq('participant_id', participantId);
    
    if (businessId) {
      query = query.eq('business_id', businessId);
    } else {
      query = query.is('business_id', null);
    }
    
    const { data, error } = await query;
    
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
  try {
    const { data, error } = await supabase
      .from('use_of_proceeds')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching use of proceeds for project ${projectId}:`, error.message);
    toast.error('Failed to load use of proceeds data');
    return [];
  }
};
