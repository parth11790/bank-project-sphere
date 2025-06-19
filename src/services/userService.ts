
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { users } from '@/lib/mockData';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// User Services
export const getUsers = async (): Promise<User[]> => {
  if (USE_MOCK_DATA) {
    return users;
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    console.log('Supabase query would be made here for users');
    
    // Fallback to mock data since no tables exist
    return users;
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    toast.error('Failed to load users');
    return [];
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  if (USE_MOCK_DATA) {
    return users.find(user => user.user_id === userId) || null;
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    console.log('Supabase query would be made here for user:', userId);
    
    // Fallback to mock data since no tables exist
    return users.find(user => user.user_id === userId) || null;
  } catch (error: any) {
    console.error(`Error fetching user ${userId}:`, error.message);
    toast.error('Failed to load user details');
    return null;
  }
};
