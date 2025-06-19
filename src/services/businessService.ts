import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BusinessFinancialData } from '@/types/business';
import { getBusinessFinancialDataData } from '@/lib/mockDataProvider';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Business Services
export const getBusinessById = async (businessId: string) => {
  if (USE_MOCK_DATA) {
    // Return mock business data
    return {
      id: businessId,
      name: 'Example Business, LLC',
      entity_type: 'LLC',
      address: '123 Main St, San Francisco, CA 94105',
      industry: 'Technology',
      annual_revenue: '$2.5M',
      employee_count: 15,
      founding_year: 2018,
    };
  }

  try {
    // When Supabase tables are set up, replace this with proper queries
    // Currently we only have an empty database, so we're using mock data instead
    console.log('Supabase query would be made here for business:', businessId);
    
    // Fallback to mock data since no tables exist
    return {
      id: businessId,
      name: 'Retrieved Business',
      entity_type: 'LLC',
      // ... other fields would be mapped from the data
    };
  } catch (error: any) {
    console.error(`Error fetching business ${businessId}:`, error.message);
    toast.error('Failed to load business data');
    return null;
  }
};

export const getBusinessFinancials = async (businessId: string): Promise<BusinessFinancialData[]> => {
  if (USE_MOCK_DATA) {
    // Return mock financial data
    return getBusinessFinancialDataData(businessId);
  }
  
  try {
    // When Supabase tables are set up, replace this with proper queries
    // Since we only have an empty database, we're returning mock data for now
    const mockData = getBusinessFinancialDataData(businessId);
    return mockData;
  } catch (error: any) {
    console.error(`Error fetching business financials for ${businessId}:`, error.message);
    toast.error('Failed to load business financial data');
    return [];
  }
};
