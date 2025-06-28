
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReferralFee } from '@/types/referral';

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
      project_id: fee.project_id,
      referral_source: fee.referral_source,
      fee_type: fee.fee_type,
      fee_amount: fee.fee_amount,
      fee_percentage: fee.fee_percentage,
      notes: fee.notes,
      created_at: fee.created_at
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
          referral_source: fee.referral_source,
          fee_type: fee.fee_type,
          fee_amount: fee.fee_amount,
          fee_percentage: fee.fee_percentage,
          notes: fee.notes
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
