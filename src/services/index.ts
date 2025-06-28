
// Re-export all service functions for easier imports
export { getProjects, getProjectById, updateProject } from './projectService';
export { getProjectParticipants } from './participantService';
export { getBusinessById, getBusinessFinancials } from './businessService';
export { getFormTemplates, getDocuments, getAssignedForms, getAssignedDocuments } from './formService';
export { getReferralFees, saveReferralFees } from './referralService';

// For backward compatibility, also export some aliases
export const getParticipantsWithDetails = getProjectParticipants;
export const getBusinessesByOwnerId = async (ownerId: string) => {
  // This would need to be implemented based on your business logic
  return [];
};
export const getBusinessFinancialData = getBusinessFinancials;

// Mock data provider functions are still available as fallback
export {
  getProjectsData,
  getProjectByIdData,
  getParticipantsWithDetailsData,
  getBusinessesByOwnerIdData,
  getBusinessFinancialDataData,
  getFormTemplatesData,
  getDocumentsData,
  getAssignedFormsData,
  getAssignedDocumentsData
} from '@/lib/mockDataProvider';
