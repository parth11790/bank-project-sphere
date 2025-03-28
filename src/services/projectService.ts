
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Project, isProject } from '@/types/project';
import { getProjectsData, getProjectByIdData } from '@/lib/mockDataProvider';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Project Services
export const getProjects = async (): Promise<Project[]> => {
  if (USE_MOCK_DATA) {
    return getProjectsData();
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our Project type
    // Use proper type casting with unknown as intermediary
    return data?.filter(item => isProject(item as any))
      .map(item => item as unknown as Project) || [];
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    toast.error('Failed to load projects');
    return [];
  }
};

export const getProjectById = async (projectId: string): Promise<Project | null> => {
  if (USE_MOCK_DATA) {
    return getProjectByIdData(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .eq('id', Number(projectId))
      .single();
    
    if (error) throw error;
    
    return isProject(data as any) ? (data as unknown as Project) : null;
  } catch (error: any) {
    console.error(`Error fetching project ${projectId}:`, error.message);
    toast.error('Failed to load project details');
    return null;
  }
};
