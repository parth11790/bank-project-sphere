
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

// Helper function to generate dynamic data for a specific overall category
const generateCategoryData = (overall_category: string, baseAmount: number, varianceFactor = 0.3) => {
  const categoryData = [];
  // Generate 3-8 items per category
  const itemCount = Math.floor(Math.random() * 6) + 3;
  
  const categoryWords: Record<string, string[]> = {
    'Land': ['Land Acquisition', 'Property Purchase', 'Site Preparation', 'Land Survey', 'Environmental Assessment', 'Lot Development', 'Zoning Fees'],
    'Construction': ['General Construction', 'Framing', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Flooring', 'Foundation', 'Insulation', 'Windows & Doors'],
    'Furniture Fixtures and Equipment': ['Office Furniture', 'Machinery', 'IT Equipment', 'Computer Hardware', 'Production Equipment', 'Software Licenses', 'Vehicles', 'Specialized Tools'],
    'Working Capital': ['Inventory', 'Payroll', 'Marketing', 'Operating Expenses', 'Insurance', 'Utilities', 'Lease Payments', 'Professional Fees', 'Training'],
    'Other': ['Contingency', 'Miscellaneous', 'Closing Costs', 'Legal Fees', 'Permit Fees', 'Design Costs', 'Consulting']
  };
  
  // Get random unique items for this category
  const categoryItems = categoryWords[overall_category] || categoryWords['Other'];
  const selectedItems = [...categoryItems].sort(() => 0.5 - Math.random()).slice(0, itemCount);
  
  // Create data for each item
  selectedItems.forEach((item, index) => {
    // Calculate a value with some randomness
    const variance = (Math.random() * varianceFactor * 2) - varianceFactor;
    const value = Math.round(baseAmount * (1 + variance) / itemCount);
    
    categoryData.push({
      id: index + 1,
      overall_category,
      row_name: item,
      value
    });
  });
  
  return categoryData;
};

// Enhanced mock function for use of proceeds data
export const getUseOfProceedsForProject = (projectId: string) => {
  // Generate random but somewhat realistic data
  const landValue = Math.round(Math.random() * 800000) + 400000; // $400k-$1.2M
  const constructionValue = Math.round(Math.random() * 1500000) + 800000; // $800k-$2.3M
  const equipmentValue = Math.round(Math.random() * 400000) + 200000; // $200k-$600k
  const workingCapitalValue = Math.round(Math.random() * 300000) + 100000; // $100k-$400k
  
  // Generate data for each category
  const landData = generateCategoryData('Land', landValue);
  const constructionData = generateCategoryData('Construction', constructionValue);
  const equipmentData = generateCategoryData('Furniture Fixtures and Equipment', equipmentValue);
  const workingCapitalData = generateCategoryData('Working Capital', workingCapitalValue);
  const otherData = generateCategoryData('Other', Math.round(Math.random() * 200000) + 50000);
  
  // Combine all data
  return [...landData, ...constructionData, ...equipmentData, ...workingCapitalData, ...otherData];
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
