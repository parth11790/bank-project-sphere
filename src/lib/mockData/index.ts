
// Export all mock data from a central file
import { users } from './users';
import { businesses } from './businesses';
import { businesses2 } from './businesses2';
import { projects } from './projects';
import { 
  individualFormsData, 
  businessFormsData,
  individualDocumentsData,
  businessDocumentsData 
} from './forms';
import {
  individualTaxReturnsData,
  businessTaxReturnsData,
  getBusinessTaxDataById,
  getIndividualTaxDataById
} from './individualTaxReturns';
import { businessTaxReturnsData as businessTaxData } from './businessTaxReturns';
import {
  getUserById,
  getBusinessById,
  getProjectById,
  mockUseOfProceedsColumns,
  mockUseOfProceedsRows,
  getBankById,
  getUseOfProceedsForProject,
  getSeasionalFactor
} from './utilities';

// Combine the two business arrays for export
const allBusinesses = [...businesses, ...businesses2];

// Re-export everything
export {
  users,
  allBusinesses as businesses,
  projects,
  individualFormsData,
  businessFormsData,
  individualDocumentsData,
  businessDocumentsData,
  individualTaxReturnsData,
  businessTaxReturnsData,
  businessTaxData,
  getBusinessTaxDataById,
  getIndividualTaxDataById,
  getUserById,
  getBusinessById,
  getProjectById,
  mockUseOfProceedsColumns,
  mockUseOfProceedsRows,
  getBankById,
  getUseOfProceedsForProject,
  getSeasionalFactor
};

// Export types
export * from './types';
export * from './individualTaxReturns';
export * from './businessTaxReturns';
