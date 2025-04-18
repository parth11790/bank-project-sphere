
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
    // Check if projectId is a valid UUID format before querying
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(projectId)) {
      console.warn(`Invalid UUID format for project ID: ${projectId}, falling back to mock data`);
      const { getUseOfProceedsForProject } = await import('@/lib/mockData');
      return getUseOfProceedsForProject(projectId);
    }
    
    const { data, error } = await supabase
      .from('use_of_proceeds')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) throw error;
    return data || [];
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
    // Check if projectId is a valid UUID format before saving
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(projectId)) {
      console.warn(`Invalid UUID format for project ID: ${projectId}, using mock save`);
      toast.success('Use of proceeds data saved successfully (Mock)');
      return proceedsData;
    }
    
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
