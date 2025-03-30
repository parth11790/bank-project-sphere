
import { FormTemplate, Document } from '@/types/form';
import { individualFormsData, businessFormsData, individualDocumentsData, businessDocumentsData } from '../mockData';

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

// Helper to get a random sample of items
const sampleItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
