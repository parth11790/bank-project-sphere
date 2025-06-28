
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReferralFee } from '@/types/referral';
import { Project } from '@/types/project';

// Utility functions for referral calculations
export const calculateTotalLoanAmount = (project: Project): number => {
  if (!project.loan_types) return project.loan_amount || 0;
  
  return project.loan_types.reduce((total, loan) => {
    if (typeof loan === 'string') return total;
    return total + (loan.amount || 0);
  }, 0);
};

export const calculatePercentageFeeAmount = (percentage: number, totalLoanAmount: number): number => {
  return (percentage / 100) * totalLoanAmount;
};

// Referral Services
export const getReferralFees = async (projectId: string): Promise<ReferralFee[]> => {
  try {
    const { data, error } = await supabase
      .from('referral_fees')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching referral fees for project ${projectId}:`, error);
      toast.error('Failed to load referral fees');
      return [];
    }

    return data.map(fee => ({
      referral_id: fee.referral_id,
      name: fee.referral_source, // Map referral_source to name
      fee_type: fee.fee_type,
      fee_amount: fee.fee_amount || 0,
      discussion_notes: fee.notes || '', // Map notes to discussion_notes
      created_at: fee.created_at,
      updated_at: fee.created_at // Use created_at as updated_at fallback
    }));
  } catch (error: any) {
    console.error(`Error fetching referral fees for project ${projectId}:`, error.message);
    toast.error('Failed to load referral fees');
    return [];
  }
};

export const saveReferralFees = async (projectId: string, fees: ReferralFee[]): Promise<boolean> => {
  try {
    // Delete existing fees for this project
    const { error: deleteError } = await supabase
      .from('referral_fees')
      .delete()
      .eq('project_id', projectId);

    if (deleteError) {
      console.error('Error deleting existing referral fees:', deleteError);
      toast.error('Failed to update referral fees');
      return false;
    }

    // Insert new fees
    if (fees.length > 0) {
      const { error: insertError } = await supabase
        .from('referral_fees')
        .insert(fees.map(fee => ({
          project_id: projectId,
          referral_source: fee.name, // Map name to referral_source
          fee_type: fee.fee_type,
          fee_amount: fee.fee_amount,
          fee_percentage: fee.fee_type === 'percentage' ? fee.fee_amount : null,
          notes: fee.discussion_notes // Map discussion_notes to notes
        })));

      if (insertError) {
        console.error('Error inserting referral fees:', insertError);
        toast.error('Failed to save referral fees');
        return false;
      }
    }

    toast.success('Referral fees updated successfully');
    return true;
  } catch (error: any) {
    console.error('Error saving referral fees:', error.message);
    toast.error('Failed to save referral fees');
    return false;
  }
};
