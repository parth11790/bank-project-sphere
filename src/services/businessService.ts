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
    // Currently we only have a "test" table in Supabase, so we're using mock data instead
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .eq('id', parseInt(businessId))
      .single();
    
    if (error) throw error;
    
    // This is a placeholder - in a real implementation you would map the database fields
    // to the expected business object structure
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
    // Since we only have a 'test' table and it doesn't match our needed structure,
    // we're returning mock data for now
    const mockData = getBusinessFinancialDataData(businessId);
    return mockData;
    
    /* This code would be used when the proper tables exist:
    const { data, error } = await supabase
      .from('business_financials')
      .select('*')
      .eq('business_id', businessId);
    
    if (error) throw error;
    
    // Transform data to match BusinessFinancialData type
    return data.map(item => ({
      data_id: item.id,
      business_id: item.business_id,
      year: item.year,
      revenue: item.revenue,
      wages: item.wages,
      cogs: item.cogs,
      gross_profit: item.gross_profit,
      other_expenses: item.other_expenses,
      total_noi: item.total_noi,
      nom_percentage: item.nom_percentage,
      // ... other fields
    }));
    */
  } catch (error: any) {
    console.error(`Error fetching business financials for ${businessId}:`, error.message);
    toast.error('Failed to load business financial data');
    return [];
  }
};
