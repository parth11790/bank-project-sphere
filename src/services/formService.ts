
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
    console.log('Supabase query would be made here for form templates:', entityType);
    
    // Fallback to mock data since no tables exist
    return getFormTemplatesData(entityType);
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
    console.log('Supabase query would be made here for documents:', entityType);
    
    // Fallback to mock data since no tables exist
    return getDocumentsData(entityType);
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
    console.log('Supabase query would be made here for assigned forms:', participantId);
    
    // Fallback to mock data since no tables exist
    return getAssignedFormsData(participantId, businessId);
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
    console.log('Supabase query would be made here for assigned documents:', participantId);
    
    // Fallback to mock data since no tables exist
    return getAssignedDocumentsData(participantId, businessId);
  } catch (error: any) {
    console.error('Error fetching assigned documents:', error.message);
    toast.error('Failed to load assigned documents');
    return [];
  }
};
