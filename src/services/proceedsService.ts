
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCategoriesByOverallType, getOverallTypeForCategory } from '@/components/useOfProceeds/categoryOptions';

// Flag to use actual Supabase data
const USE_MOCK_DATA = true; // Changed to true to ensure we use mock data while fixing the UUID issue

// Use of Proceeds Services
export const getUseOfProceeds = async (projectId: string) => {
  // Always use mock data if the flag is set to true
  if (USE_MOCK_DATA) {
    const { getUseOfProceedsForProject } = await import('@/lib/mockData');
    return getUseOfProceedsForProject(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    console.log('Supabase query would be made here for use of proceeds:', projectId);
    
    // Fallback to mock data since no tables exist
    const { getUseOfProceedsForProject } = await import('@/lib/mockData');
    return getUseOfProceedsForProject(projectId);
  } catch (error: any) {
    console.error(`Error fetching use of proceeds for project ${projectId}:`, error.message);
    toast.error('Failed to load use of proceeds data');
    
    // Fallback to mock data in case of any error
    const { getUseOfProceedsForProject } = await import('@/lib/mockData');
    return getUseOfProceedsForProject(projectId);
  }
};

export const saveUseOfProceeds = async (projectId: string, proceedsData: Array<{
  row_name: string;
  column_name: string;
  value: number;
  overall_category?: string;
}>) => {
  if (USE_MOCK_DATA) {
    // Simulate successful save with mock data
    toast.success('Use of proceeds data saved successfully (Mock)');
    return proceedsData;
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    console.log('Supabase save would be made here for use of proceeds:', projectId, proceedsData);
    
    // Simulate successful save with mock data
    toast.success('Use of proceeds data saved successfully (Mock)');
    return proceedsData;
  } catch (error: any) {
    console.error('Error saving use of proceeds:', error.message);
    toast.error('Failed to save use of proceeds data');
    return null;
  }
};

// New utility functions that leverage the category organization
export const getCategoriesForLoanType = (loanType: string) => {
  // Map loan types to relevant overall categories
  switch (loanType) {
    case '7(a)':
      return getCategoriesByOverallType('workingCapital');
    case '504':
      return [
        ...getCategoriesByOverallType('land'),
        ...getCategoriesByOverallType('construction')
      ];
    default:
      return [];
  }
};
