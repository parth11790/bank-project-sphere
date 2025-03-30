
import { Project } from '@/types/project';
import { projects, getUserById } from '../mockData';
import { User } from '@/types/user';

// Mock implementations of the project service functions
export const getProjectsData = async (): Promise<Project[]> => {
  return projects.map(project => ({
    ...project,
    // Ensure status is present in each project
    status: project.status || 'active',
    // Map participants to match the Project interface
    participants: project.participants?.map(p => {
      const user = getUserById(p.userId);
      return {
        id: p.userId,
        role: p.role,
        user: {
          user_id: user?.user_id || '',
          name: user?.name || 'Unknown',
          email: user?.email || '',
          role: user?.role || ''
        }
      };
    }),
    // For list view, add created_by_user
    created_by_user: { 
      name: getUserById(project.created_by)?.name || 'Unknown',
      user_id: getUserById(project.created_by)?.user_id || '',
      email: getUserById(project.created_by)?.email || '',
      role: getUserById(project.created_by)?.role || ''
    }
  }));
};

export const getProjectByIdData = async (projectId: string): Promise<Project | null> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return null;
  
  return {
    ...project,
    status: project.status || 'active',
    // Map participants to match the Project interface
    participants: project.participants?.map(p => {
      const user = getUserById(p.userId);
      return {
        id: p.userId,
        role: p.role,
        user: {
          user_id: user?.user_id || '',
          name: user?.name || 'Unknown',
          email: user?.email || '',
          role: user?.role || ''
        }
      };
    }),
    created_by_user: { 
      name: getUserById(project.created_by)?.name || 'Unknown',
      user_id: getUserById(project.created_by)?.user_id || '',
      email: getUserById(project.created_by)?.email || '',
      role: getUserById(project.created_by)?.role || ''
    }
  };
};
