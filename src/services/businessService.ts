
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BusinessFinancialData } from '@/types/business';

// Flag to use actual Supabase data
const USE_MOCK_DATA = false;

// Business Services
export const getBusinessById = async (businessId: string) => {
  if (USE_MOCK_DATA) {
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
    const { data, error } = await supabase
      .from('businesses')
      .select(`
        *,
        business_addresses(address_type, street, city, state, zip_code),
        business_financial_data(year, revenue, wages, total_noi),
        business_existing_debt(lender, current_balance, payment, rate)
      `)
      .eq('business_id', businessId)
      .single();

    if (error) {
      console.error(`Error fetching business ${businessId}:`, error);
      toast.error('Failed to load business data');
      return null;
    }

    return {
      id: data.business_id,
      name: data.name,
      entity_type: data.entity_type,
      ein: data.ein,
      description: data.description,
      website: data.website,
      phone: data.phone,
      email: data.email,
      founding_date: data.founding_date,
      employee_count: data.employee_count,
      industry: data.industry,
      naics_code: data.naics_code,
      addresses: data.business_addresses || [],
      financial_data: data.business_financial_data || [],
      existing_debt: data.business_existing_debt || []
    };
  } catch (error: any) {
    console.error(`Error fetching business ${businessId}:`, error.message);
    toast.error('Failed to load business data');
    return null;
  }
};

export const getBusinessFinancials = async (businessId: string): Promise<BusinessFinancialData[]> => {
  if (USE_MOCK_DATA) {
    const { getBusinessFinancialDataData } = await import('@/lib/mockDataProvider');
    return getBusinessFinancialDataData(businessId);
  }
  
  try {
    const { data, error } = await supabase
      .from('business_financial_data')
      .select('*')
      .eq('business_id', businessId)
      .order('year', { ascending: false });

    if (error) {
      console.error(`Error fetching business financials for ${businessId}:`, error);
      toast.error('Failed to load business financial data');
      return [];
    }

    // Transform data to match BusinessFinancialData type
    return data.map(item => ({
      data_id: item.data_id,
      business_id: item.business_id,
      year: item.year.toString(), // Convert number to string to match type
      revenue: item.revenue,
      wages: item.wages,
      cogs: item.cogs,
      gross_profit: item.gross_profit,
      other_expenses: item.other_expenses,
      total_noi: item.total_noi,
      nom_percentage: item.nom_percentage,
      business_name: '', // Will be filled from business data if needed
      entity_type: 'LLC', // Default value, should be joined from business table
      years: [{
        year: item.year.toString(),
        revenue: item.revenue,
        wages: item.wages,
        cogs: item.cogs,
        gross_profit: item.gross_profit,
        gross_margin: item.revenue > 0 ? (item.gross_profit / item.revenue) * 100 : 0,
        other_expenses: item.other_expenses,
        total_noi: item.total_noi,
        nom: item.nom_percentage,
      }]
    }));
  } catch (error: any) {
    console.error(`Error fetching business financials for ${businessId}:`, error.message);
    toast.error('Failed to load business financial data');
    return [];
  }
};
