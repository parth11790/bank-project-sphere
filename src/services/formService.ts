import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FormTemplate, Document } from '@/types/form';

// Flag to use actual Supabase data
const USE_MOCK_DATA = true;

// Forms and Documents Services
export const getFormTemplates = async (entityType: string): Promise<FormTemplate[]> => {
  if (USE_MOCK_DATA) {
    const { getFormTemplatesData } = await import('@/lib/mockDataProvider');
    return getFormTemplatesData(entityType);
  }
  
  try {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('is_template', true)
      .or(`entity_type.eq.${entityType},entity_type.is.null`)
      .order('name');

    if (error) {
      console.error(`Error fetching form templates for ${entityType}:`, error);
      toast.error('Failed to load form templates');
      return [];
    }

    return data.map(form => ({
      form_id: form.form_id,
      name: form.name,
      entity_type: form.entity_type,
      description: form.description,
      is_template: form.is_template,
      created_at: form.created_at
    }));
  } catch (error: any) {
    console.error(`Error fetching form templates for ${entityType}:`, error.message);
    toast.error('Failed to load form templates');
    return [];
  }
};

export const getDocuments = async (entityType: string): Promise<Document[]> => {
  if (USE_MOCK_DATA) {
    const { getDocumentsData } = await import('@/lib/mockDataProvider');
    return getDocumentsData(entityType);
  }
  
  try {
    // For now, return a basic document structure since we don't have document templates
    // This should be enhanced based on your specific document requirements
    const basicDocuments: Document[] = [
      {
        document_id: 'doc-1',
        name: 'Business Tax Returns',
        entity_type: entityType as any
      },
      {
        document_id: 'doc-2',
        name: 'Financial Statements',
        entity_type: entityType as any
      },
      {
        document_id: 'doc-3',
        name: 'Bank Statements',
        entity_type: entityType as any
      }
    ];

    return basicDocuments;
  } catch (error: any) {
    console.error(`Error fetching documents for ${entityType}:`, error.message);
    toast.error('Failed to load document types');
    return [];
  }
};

export const getAssignedForms = async (participantId: string, businessId?: string) => {
  if (USE_MOCK_DATA) {
    const { getAssignedFormsData } = await import('@/lib/mockDataProvider');
    return getAssignedFormsData(participantId, businessId);
  }
  
  try {
    let query = supabase
      .from('form_assignments')
      .select(`
        *,
        form:forms(name, description),
        participant:project_participants(name, email),
        business:businesses(name)
      `)
      .eq('participant_id', participantId);

    if (businessId) {
      query = query.eq('business_id', businessId);
    }

    const { data, error } = await query.order('assigned_at', { ascending: false });

    if (error) {
      console.error('Error fetching assigned forms:', error);
      toast.error('Failed to load assigned forms');
      return [];
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching assigned forms:', error.message);
    toast.error('Failed to load assigned forms');
    return [];
  }
};

export const getAssignedDocuments = async (participantId: string, businessId?: string) => {
  if (USE_MOCK_DATA) {
    const { getAssignedDocumentsData } = await import('@/lib/mockDataProvider');
    return getAssignedDocumentsData(participantId, businessId);
  }
  
  try {
    let query = supabase
      .from('documents')
      .select(`
        *,
        participant:project_participants(name, email),
        business:businesses(name),
        uploaded_by_user:profiles(name, email)
      `)
      .eq('participant_id', participantId);

    if (businessId) {
      query = query.eq('business_id', businessId);
    }

    const { data, error } = await query.order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching assigned documents:', error);
      toast.error('Failed to load assigned documents');
      return [];
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching assigned documents:', error.message);
    toast.error('Failed to load assigned documents');
    return [];
  }
};
