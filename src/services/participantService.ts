
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Participant, isParticipant } from '@/types/participant';
import { getProjectParticipantsData } from '@/lib/mockDataProvider';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Participants Services
export const getProjectParticipants = async (projectId: string): Promise<Participant[]> => {
  if (USE_MOCK_DATA) {
    return getProjectParticipantsData(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our Participant type
    return data?.filter(item => isParticipant(item as any))
      .map(item => item as unknown as Participant) || [];
  } catch (error: any) {
    console.error(`Error fetching participants for project ${projectId}:`, error.message);
    toast.error('Failed to load project participants');
    return [];
  }
};
