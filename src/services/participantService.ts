
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Participant } from '@/types/participant';

// Flag to use actual Supabase data
const USE_MOCK_DATA = false;

// Participants Services
export const getProjectParticipants = async (projectId: string): Promise<Participant[]> => {
  if (USE_MOCK_DATA) {
    const { getParticipantsWithDetailsData } = await import('@/lib/mockDataProvider');
    return getParticipantsWithDetailsData(projectId);
  }
  
  try {
    const { data, error } = await supabase
      .from('project_participants')
      .select(`
        *,
        user:profiles(name, email, phone),
        assigned_forms:form_assignments(
          assignment_id,
          status,
          form:forms(name, description)
        ),
        documents(document_id, name, status, uploaded_at)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(`Error fetching participants for project ${projectId}:`, error);
      toast.error('Failed to load project participants');
      return [];
    }

    // Transform the data to match the expected Participant type
    const transformedParticipants: Participant[] = data.map(participant => ({
      participant_id: participant.participant_id,
      user_id: participant.user_id || '',
      name: participant.name,
      email: participant.email || '',
      role: participant.role,
      participant_type: participant.participant_type,
      forms: participant.assigned_forms?.map((assignment: any) => ({
        form_id: assignment.form?.form_id || '',
        name: assignment.form?.name || ''
      })) || [],
      business: undefined // Will be populated separately if needed
    }));

    return transformedParticipants;
  } catch (error: any) {
    console.error(`Error fetching participants for project ${projectId}:`, error.message);
    toast.error('Failed to load project participants');
    return [];
  }
};
