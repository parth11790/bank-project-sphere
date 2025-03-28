
// Re-export all service functions for easier imports
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

// Export the mock data functions as our main service functions
export const getProjects = getProjectsData;
export const getProjectById = getProjectByIdData;
export const getProjectParticipants = getProjectParticipantsData;
export const getBusinessesByOwnerId = getBusinessesByOwnerIdData;
export const getBusinessFinancialData = getBusinessFinancialDataData;
export const getFormTemplates = getFormTemplatesData;
export const getDocuments = getDocumentsData;
export const getAssignedForms = getAssignedFormsData;
export const getAssignedDocuments = getAssignedDocumentsData;
