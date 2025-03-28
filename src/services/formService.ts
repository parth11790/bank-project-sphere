
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FormTemplate, Document, isFormTemplate } from '@/types/form';
import { 
  getFormTemplatesData, 
  getDocumentsData, 
  getAssignedFormsData, 
  getAssignedDocumentsData 
} from '@/lib/mockDataProvider';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

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
    return data?.filter(item => isFormTemplate(item as any))
      .map(item => item as unknown as FormTemplate) || [];
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
    
    return (data || []).map(item => item as unknown as Document);
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
