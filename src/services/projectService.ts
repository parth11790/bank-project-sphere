
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Project, isProject } from '@/types/project';

// Flag to use actual Supabase data
const USE_MOCK_DATA = false;

// Project Services
export const getProjects = async (): Promise<Project[]> => {
  if (USE_MOCK_DATA) {
    const { getProjectsData } = await import('@/lib/mockDataProvider');
    return getProjectsData();
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        created_by_user:profiles(name, email),
        loans(loan_type, amount),
        project_participants(participant_id, name, role)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
      return [];
    }

    // Transform the data to match the expected Project type
    const transformedProjects: Project[] = data.map(project => ({
      project_id: project.project_id,
      project_name: project.project_name,
      project_type: project.project_type,
      status: project.status,
      description: project.description,
      location: project.location,
      loan_amount: project.loan_amount || 0, // Add missing loan_amount
      created_at: project.created_at,
      updated_at: project.updated_at,
      created_by_user: project.created_by_user ? {
        name: project.created_by_user.name,
        email: project.created_by_user.email,
        user_id: project.created_by || '',
        role: 'user'
      } : undefined,
      loan_types: project.loans?.map((loan: any) => ({
        type: loan.loan_type,
        amount: loan.amount
      })) || [],
      participants: project.project_participants?.map((p: any) => ({
        userId: p.participant_id, // Map participant_id to userId for compatibility
        role: p.role
      })) || []
    }));

    return transformedProjects;
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    toast.error('Failed to load projects');
    return [];
  }
};

export const getProjectById = async (projectId: string): Promise<Project | null> => {
  if (USE_MOCK_DATA) {
    const { getProjectByIdData } = await import('@/lib/mockDataProvider');
    return getProjectByIdData(projectId);
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        created_by_user:profiles(name, email),
        loans(loan_type, amount, term, rate),
        project_participants(participant_id, name, role, email),
        owners(owner_id, name, ownership_percentage, type),
        businesses(business_id, name, entity_type, description)
      `)
      .eq('project_id', projectId)
      .single();

    if (error) {
      console.error(`Error fetching project ${projectId}:`, error);
      toast.error('Failed to load project details');
      return null;
    }

    // Transform the data to match the expected Project type
    const transformedProject: Project = {
      project_id: data.project_id,
      project_name: data.project_name,
      project_type: data.project_type,
      status: data.status,
      description: data.description,
      location: data.location,
      loan_amount: data.loan_amount || 0, // Add missing loan_amount
      created_at: data.created_at,
      updated_at: data.updated_at,
      created_by_user: data.created_by_user ? {
        name: data.created_by_user.name,
        email: data.created_by_user.email,
        user_id: data.created_by || '',
        role: 'user'
      } : undefined,
      loan_types: data.loans?.map((loan: any) => ({
        type: loan.loan_type,
        amount: loan.amount,
        term: loan.term,
        rate: loan.rate
      })) || [],
      participants: data.project_participants?.map((p: any) => ({
        userId: p.participant_id, // Map participant_id to userId for compatibility
        role: p.role
      })) || [],
      owners: data.owners?.map((owner: any) => ({
        owner_id: owner.owner_id,
        name: owner.name,
        ownership_percentage: owner.ownership_percentage,
        type: owner.type
      })) || [],
      businesses: data.businesses?.map((business: any) => ({
        business_id: business.business_id,
        name: business.name,
        entity_type: business.entity_type,
        description: business.description
      })) || []
    };

    return transformedProject;
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
        const { getProjectByIdData } = require('@/lib/mockDataProvider');
        const currentProject = getProjectByIdData(projectId);
        if (currentProject) {
          const updatedProject = {
            ...currentProject,
            ...projectData,
            updated_at: new Date().toISOString()
          };
          resolve(updatedProject);
        } else {
          throw new Error('Project not found');
        }
      }, 500);
    });
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        project_name: projectData.project_name,
        project_type: projectData.project_type,
        description: projectData.description,
        location: projectData.location,
        loan_amount: projectData.loan_amount,
        updated_at: new Date().toISOString()
      })
      .eq('project_id', projectId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating project ${projectId}:`, error);
      toast.error('Failed to update project');
      throw error;
    }

    return data as Project;
  } catch (error: any) {
    console.error(`Error updating project ${projectId}:`, error.message);
    toast.error('Failed to update project');
    throw error;
  }
};
