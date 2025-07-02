
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Participant } from '@/types/participant';
import { getProjectParticipantsData, getParticipantsWithDetailsData } from '@/lib/mockDataProvider';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Participants Services
export const getProjectParticipants = async (projectId: string): Promise<Participant[]> => {
  if (USE_MOCK_DATA) {
    // Use the detailed participant data instead of the basic one
    return getParticipantsWithDetailsData(projectId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    console.log('Supabase query would be made here for project participants:', projectId);
    
    // Fallback to mock data since no tables exist
    return getParticipantsWithDetailsData(projectId);
  } catch (error: any) {
    console.error(`Error fetching participants for project ${projectId}:`, error.message);
    toast.error('Failed to load project participants');
    return [];
  }
};
