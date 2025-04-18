
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCategoriesByOverallType, getOverallTypeForCategory } from '@/components/useOfProceeds/categoryOptions';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Use of Proceeds Services
export const getUseOfProceeds = async (projectId: string) => {
  if (USE_MOCK_DATA) {
    const { getUseOfProceedsForProject } = await import('@/lib/mockData');
    return getUseOfProceedsForProject(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching use of proceeds for project ${projectId}:`, error.message);
    toast.error('Failed to load use of proceeds data');
    return [];
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
