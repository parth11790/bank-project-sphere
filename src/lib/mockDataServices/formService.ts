import { FormTemplate, Document } from '@/types/form';
import { individualFormsData, businessFormsData } from '../mockData';

export const getFormTemplatesData = async (entityType: string): Promise<FormTemplate[]> => {
  return entityType === 'individual' ? individualFormsData : businessFormsData;
};

// Keep for backward compatibility but return empty arrays
export const getDocumentsData = async (entityType: string): Promise<Document[]> => {
  return [];
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

// Keep for backward compatibility but return empty arrays
export const getAssignedDocumentsData = async (participantId: string, businessId?: string) => {
  return [];
};

// Helper to get a random sample of items
const sampleItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
