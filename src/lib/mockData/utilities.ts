
import { users } from './users';
import { businesses } from './businesses';
import { businesses2 } from './businesses2';
import { projects } from './projects';
import { User, Business } from './types';

// Utility functions
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.user_id === userId);
};

export const getBusinessById = (businessId: string): Business | undefined => {
  // Search in both business arrays
  return businesses.find(business => business.business_id === businessId) || 
         businesses2.find(business => business.business_id === businessId);
};

export const getProjectById = (projectId: string) => {
  return projects.find(project => project.project_id === projectId);
};

// Mock data for UseOfProceedsTable
export const mockUseOfProceedsColumns = [
  { column_id: 'col_1', column_name: 'Total' },
  { column_id: 'col_2', column_name: 'Phase 1' },
  { column_id: 'col_3', column_name: 'Phase 2' }
];

export const mockUseOfProceedsRows = [
  { row_id: 'row_1', row_name: 'LAND & BUILDING', overall_category: 'Land' },
  { row_id: 'row_2', row_name: 'CONSTRUCTION', overall_category: 'Construction' },
  { row_id: 'row_3', row_name: 'EQUIPMENT', overall_category: 'Furniture Fixtures and Equipment' },
  { row_id: 'row_4', row_name: 'WORKING CAPITAL', overall_category: 'Working Capital' },
  { row_id: 'row_5', row_name: 'TOTAL', overall_category: '' }
];

// Function for bank lookup
export const getBankById = (bankId: string) => {
  return {
    bank_id: bankId,
    name: `Bank ${bankId}`,
    location: 'New York, NY'
  };
};

// Mock function for use of proceeds data
export const getUseOfProceedsForProject = (projectId: string) => {
  // Just return some sample data for demonstration
  return [
    { id: 1, overall_category: 'Land', row_name: 'LAND & BUILDING', value: 500000 },
    { id: 2, overall_category: 'Construction', row_name: 'CONSTRUCTION', value: 1000000 },
    { id: 3, overall_category: 'Furniture Fixtures and Equipment', row_name: 'EQUIPMENT', value: 300000 },
    { id: 4, overall_category: 'Working Capital', row_name: 'WORKING CAPITAL', value: 200000 }
  ];
};

// Helper to simulate seasonal variations in cash flow
export const getSeasionalFactor = (month: number, entityType: string): number => {
  // Different business types have different seasonal patterns
  if (entityType === 'LLC' || entityType === 'Partnership') {
    // Service businesses - relatively stable with slight year-end increase
    const seasonality = [0.95, 0.92, 0.96, 0.98, 1.0, 1.02, 1.0, 0.98, 1.05, 1.08, 1.12, 0.94];
    return seasonality[month - 1];
  } else if (entityType === 'C-Corp') {
    // Manufacturing - stronger in Q2 and Q4
    const seasonality = [0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1];
    return seasonality[month - 1];
  } else {
    // Retail/others - stronger in Q4 (holiday season)
    const seasonality = [0.85, 0.8, 0.85, 0.9, 0.95, 1.0, 0.9, 0.95, 1.0, 1.1, 1.2, 1.5];
    return seasonality[month - 1];
  }
};
