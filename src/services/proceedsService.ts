
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCategoriesByOverallType, getOverallTypeForCategory } from '@/components/useOfProceeds/categoryOptions';

// Flag to use actual Supabase data
const USE_MOCK_DATA = false;

// Use of Proceeds Services
export const getUseOfProceeds = async (projectId: string) => {
  if (USE_MOCK_DATA) {
    const { getUseOfProceedsForProject } = await import('@/lib/mockData');
    return getUseOfProceedsForProject(projectId);
  }
  
  try {
    const { data, error } = await supabase
      .from('use_of_proceeds')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching use of proceeds for project ${projectId}:`, error.message);
    toast.error('Failed to load use of proceeds data');
    return [];
  }
};

export const saveUseOfProceeds = async (projectId: string, proceedsData: Array<{
  row_name: string;
  column_name: string;
  value: number;
  overall_category?: string;
}>) => {
  try {
    // Format the data for upsert
    const formattedData = proceedsData.map(item => ({
      project_id: projectId,
      row_name: item.row_name,
      column_name: item.column_name,
      value: item.value,
      overall_category: item.overall_category || ''
    }));
    
    const { data, error } = await supabase
      .from('use_of_proceeds')
      .upsert(formattedData, {
        onConflict: 'project_id,row_name,column_name'
      });
    
    if (error) throw error;
    
    toast.success('Use of proceeds data saved successfully');
    return data;
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
