
import { useQuery } from '@tanstack/react-query';
import { getFormTemplates, getDocuments } from '@/services';
import { FormTemplate, isFormTemplate, Document } from '@/types/form';

export const useFormDocumentData = () => {
  // Load individual forms and documents
  const { data: individualFormsData } = useQuery({
    queryKey: ['forms', 'individual'],
    queryFn: () => getFormTemplates('individual'),
  });

  const { data: individualDocumentsData } = useQuery({
    queryKey: ['documents', 'individual'],
    queryFn: () => getDocuments('individual'),
  });

  // Load business forms and documents
  const { data: businessFormsData } = useQuery({
    queryKey: ['forms', 'business'],
    queryFn: () => getFormTemplates('business'),
  });

  const { data: businessDocumentsData } = useQuery({
    queryKey: ['documents', 'business'],
    queryFn: () => getDocuments('business'),
  });

  // Process form data to ensure it matches expected format
  const individualForms = individualFormsData || [];
  const businessForms = businessFormsData || [];
  const individualDocuments = individualDocumentsData || [];
  const businessDocuments = businessDocumentsData || [];

  return {
    individualForms,
    businessForms,
    individualDocuments,
    businessDocuments,
    formTemplates: { 
      individual: individualForms.filter(isFormTemplate), 
      business: businessForms.filter(isFormTemplate) 
    }
  };
};
