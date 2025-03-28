
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, isUser } from '@/types/user';
import { users as mockUsers } from '@/lib/mockData';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// User Services
export const getUsers = async (): Promise<User[]> => {
  if (USE_MOCK_DATA) {
    return mockUsers as User[];
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our User type
    return data?.filter(item => isUser(item as any))
      .map(item => item as unknown as User) || [];
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    toast.error('Failed to load users');
    return [];
  }
};
