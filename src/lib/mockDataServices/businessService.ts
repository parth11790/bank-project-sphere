
import { Business, BusinessFinancialData } from '@/types/business';
import { businesses, getBusinessById } from '../mockData';
import { getSeasionalFactor } from '../mockData/utilities';

export const getBusinessesByOwnerIdData = async (userId: string): Promise<Business[]> => {
  return businesses.filter(b => b.owner_id === userId);
};

export const getBusinessFinancialDataData = async (businessId: string): Promise<BusinessFinancialData[]> => {
  const business = getBusinessById(businessId);
  if (!business || !business.financial_data) return [];
  
  return Object.entries(business.financial_data).map(([year, data]) => {
    // Create the BusinessFinancialData object with proper years field
    const financialData: BusinessFinancialData = {
      data_id: `fin_${businessId}_${year}`,
      business_id: businessId,
      year,
      revenue: data.revenue,
      wages: data.wages,
      cogs: data.cogs,
      gross_profit: data.gross_profit,
      other_expenses: data.other_expenses,
      total_noi: data.total_noi,
      nom_percentage: data.nom_percentage,
      business_name: business.name,
      entity_type: business.entity_type,
      years: [{
        year,
        revenue: data.revenue,
        wages: data.wages,
        cogs: data.cogs,
        gross_profit: data.gross_profit,
        gross_margin: data.revenue > 0 ? (data.gross_profit / data.revenue) * 100 : 0,
        other_expenses: data.other_expenses,
        total_noi: data.total_noi,
        nom: data.nom_percentage,
      }]
    };
    
    return financialData;
  });
};

// Mock cash flow analysis data for businesses
export const getCashFlowAnalysisData = async (businessId: string) => {
  const business = getBusinessById(businessId);
  
  if (!business || !business.financial_data) return null;
  
  // Extract years and create cash flow analysis
  const years = Object.keys(business.financial_data);
  const monthlyData = years.map(year => {
    const yearData = business.financial_data![year];
    
    // Create monthly breakdown (simulate monthly variations)
    return Array(12).fill(0).map((_, index) => {
      const month = index + 1;
      const seasonalFactor = getSeasionalFactor(month, business.entity_type);
      
      return {
        period: `${year}-${month.toString().padStart(2, '0')}`,
        revenue: Math.round(yearData.revenue / 12 * seasonalFactor),
        expenses: Math.round((yearData.wages + yearData.cogs + yearData.other_expenses) / 12 * seasonalFactor),
        cashFlow: Math.round(yearData.total_noi / 12 * seasonalFactor),
      };
    });
  }).flat();
  
  return {
    businessId,
    businessName: business.name,
    entityType: business.entity_type,
    cashFlowData: monthlyData,
    annualSummary: years.map(year => {
      const yearData = business.financial_data![year];
      return {
        year,
        totalRevenue: yearData.revenue,
        totalExpenses: yearData.wages + yearData.cogs + yearData.other_expenses,
        netCashFlow: yearData.total_noi,
        profitMargin: yearData.nom_percentage
      };
    })
  };
};
