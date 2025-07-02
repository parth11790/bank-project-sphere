
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
    console.log('Supabase query would be made here for projects');
    
    // Fallback to mock data since no tables exist
    return getProjectsData();
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
    console.log('Supabase query would be made here for project:', projectId);
    
    // Fallback to mock data since no tables exist
    return getProjectByIdData(projectId);
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
    console.log('Supabase update would be made here for project:', projectId, projectData);
    
    // Simulate successful update with mock data
    const currentProject = getProjectByIdData(projectId);
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        ...projectData,
        updated_at: new Date().toISOString()
      };
      return updatedProject;
    } else {
      throw new Error('Project not found');
    }
  } catch (error: any) {
    console.error(`Error updating project ${projectId}:`, error.message);
    toast.error('Failed to update project');
    throw error;
  }
};
