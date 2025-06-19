
export interface ReferralFee {
  referral_id: string;
  name: string;
  fee_type: 'percentage' | 'flat';
  fee_amount: number;
  discussion_notes: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectReferral {
  project_id: string;
  referral_fees: ReferralFee[];
  total_referral_cost: number;
}

export const isReferralFee = (obj: any): obj is ReferralFee => {
  return (
    obj &&
    typeof obj === 'object' &&
    'referral_id' in obj &&
    'name' in obj &&
    'fee_type' in obj &&
    'fee_amount' in obj
  );
};
