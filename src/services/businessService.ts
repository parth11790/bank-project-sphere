
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Business, isBusiness, BusinessFinancialData } from '@/types/business';
import { getBusinessesByOwnerIdData, getBusinessFinancialDataData } from '@/lib/mockDataProvider';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Business Services
export const getBusinessesByOwnerId = async (userId: string): Promise<Business[]> => {
  if (USE_MOCK_DATA) {
    return getBusinessesByOwnerIdData(userId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // Filter and transform API data to match our Business type
    return data?.filter(item => isBusiness(item as any))
      .map(item => item as unknown as Business) || [];
  } catch (error: any) {
    console.error(`Error fetching businesses for user ${userId}:`, error.message);
    toast.error('Failed to load business data');
    return [];
  }
};

export const getBusinessFinancialData = async (businessId: string): Promise<BusinessFinancialData[]> => {
  if (USE_MOCK_DATA) {
    return getBusinessFinancialDataData(businessId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    const { data, error } = await supabase
      .from('test')
      .select('*');
    
    if (error) throw error;
    
    // We'll need to add type checking for BusinessFinancialData
    return (data || []).map(item => item as unknown as BusinessFinancialData);
  } catch (error: any) {
    console.error(`Error fetching financial data for business ${businessId}:`, error.message);
    toast.error('Failed to load financial data');
    return [];
  }
};
