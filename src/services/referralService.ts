
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReferralFee, ProjectReferral } from '@/types/referral';
import { Project } from '@/types/project';

// Flag to use mock data or actual supabase
const USE_MOCK_DATA = true;

// Mock data for referral fees
const mockReferralData: Record<string, ReferralFee[]> = {
  project_1: [
    {
      referral_id: 'ref_1_1',
      name: 'Bay Area Business Brokers',
      fee_type: 'percentage',
      fee_amount: 2.5,
      discussion_notes: 'Initial discussion completed. Agreed on 2.5% fee structure for successful loan closure. They will provide ongoing support throughout the process.',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      referral_id: 'ref_1_2',
      name: 'San Francisco CPA Group',
      fee_type: 'flat',
      fee_amount: 7500,
      discussion_notes: 'Flat fee agreed upon for accounting services referral. Payment due within 30 days of loan funding.',
      created_at: '2024-01-16T14:30:00Z',
      updated_at: '2024-01-16T14:30:00Z'
    }
  ],
  project_2: [
    {
      referral_id: 'ref_2_1',
      name: 'Tech Startup Advisors',
      fee_type: 'percentage',
      fee_amount: 1.5,
      discussion_notes: 'Reduced rate due to existing relationship. They will assist with equipment vendor negotiations.',
      created_at: '2024-02-01T09:15:00Z',
      updated_at: '2024-02-01T09:15:00Z'
    }
  ],
  project_5: [
    {
      referral_id: 'ref_5_1',
      name: 'Seattle Retail Consultants',
      fee_type: 'flat',
      fee_amount: 12000,
      discussion_notes: 'Comprehensive referral package including site selection assistance and lease negotiation support.',
      created_at: '2024-02-15T16:20:00Z',
      updated_at: '2024-02-15T16:20:00Z'
    }
  ]
};

export const getReferralFees = async (projectId: string): Promise<ReferralFee[]> => {
  if (USE_MOCK_DATA) {
    return mockReferralData[projectId] || [];
  }

  try {
    console.log('Supabase query would be made here for referral fees:', projectId);
    return mockReferralData[projectId] || [];
  } catch (error: any) {
    console.error(`Error fetching referral fees for project ${projectId}:`, error.message);
    toast.error('Failed to load referral fees');
    return [];
  }
};

export const saveReferralFees = async (projectId: string, fees: ReferralFee[]): Promise<boolean> => {
  if (USE_MOCK_DATA) {
    // Simulate successful save
    mockReferralData[projectId] = fees;
    toast.success('Referral fees saved successfully');
    return true;
  }

  try {
    console.log('Supabase save would be made here for referral fees:', projectId, fees);
    mockReferralData[projectId] = fees;
    toast.success('Referral fees saved successfully');
    return true;
  } catch (error: any) {
    console.error('Error saving referral fees:', error.message);
    toast.error('Failed to save referral fees');
    return false;
  }
};

export const calculateTotalLoanAmount = (project: Project): number => {
  let totalAmount = 0;

  // Calculate from new loans structure if available
  if (project.loans && project.loans.length > 0) {
    totalAmount = project.loans.reduce((sum, loan) => sum + loan.amount, 0);
  }
  // Fall back to legacy loan_types if no new structure
  else if (project.loan_types && project.loan_types.length > 0) {
    totalAmount = project.loan_types.reduce((sum, loanType) => {
      if (typeof loanType === 'object' && loanType.amount) {
        return sum + loanType.amount;
      }
      return sum;
    }, 0);
  }

  return totalAmount;
};

export const calculateTotalReferralCost = (fees: ReferralFee[], loanAmount?: number): number => {
  return fees.reduce((total, fee) => {
    if (fee.fee_type === 'flat') {
      return total + fee.fee_amount;
    } else if (fee.fee_type === 'percentage' && loanAmount) {
      return total + (loanAmount * fee.fee_amount / 100);
    }
    return total;
  }, 0);
};

export const calculatePercentageFeeAmount = (feePercentage: number, loanAmount: number): number => {
  return (loanAmount * feePercentage) / 100;
};
