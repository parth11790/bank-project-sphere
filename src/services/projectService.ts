
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
    return data?.filter(item => isProject(item as unknown as any))
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
    
    return isProject(data as unknown as any) ? (data as unknown as Project) : null;
  } catch (error: any) {
    console.error(`Error fetching project ${projectId}:`, error.message);
    toast.error('Failed to load project details');
    return null;
  }
};

// Update project
export const updateProject = async (
  projectId: string, 
  projectData: Partial<Project>
): Promise<Project> => {
  if (USE_MOCK_DATA) {
    // For mock data, we'll simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentProject = getProjectByIdData(projectId);
        if (currentProject) {
          // Merge the current project with the updates
          const updatedProject = {
            ...currentProject,
            ...projectData,
            updated_at: new Date().toISOString()
          };
          // In a real implementation, we would update the mock data store
          // Here we just return the updated project
          resolve(updatedProject);
        } else {
          throw new Error('Project not found');
        }
      }, 500); // simulate network delay
    });
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .update({
        ...projectData,
        updated_at: new Date().toISOString()
      })
      .eq('id', Number(projectId))
      .select()
      .single();
    
    if (error) throw error;
    
    return data as unknown as Project;
  } catch (error: any) {
    console.error(`Error updating project ${projectId}:`, error.message);
    toast.error('Failed to update project');
    throw error;
  }
};
