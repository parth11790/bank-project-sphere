
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, DollarSign, Percent } from 'lucide-react';
import { ReferralFee } from '@/types/referral';
import { Project } from '@/types/project';
import { ReferralDialog } from './ReferralDialog';
import { calculateTotalLoanAmount, calculatePercentageFeeAmount } from '@/services/referralService';

interface ReferralSectionProps {
  projectId: string;
  project: Project;
  referralFees?: ReferralFee[];
  onUpdate?: (fees: ReferralFee[]) => void;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({
  projectId,
  project,
  referralFees = [],
  onUpdate
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<ReferralFee | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalLoanAmount = calculateTotalLoanAmount(project);

  const formatFee = (fee: ReferralFee) => {
    if (fee.fee_type === 'percentage') {
      const dollarAmount = calculatePercentageFeeAmount(fee.fee_amount, totalLoanAmount);
      return `${fee.fee_amount}% (${formatCurrency(dollarAmount)})`;
    }
    return formatCurrency(fee.fee_amount);
  };

  const calculateTotalCost = () => {
    return referralFees.reduce((total, fee) => {
      if (fee.fee_type === 'flat') {
        return total + fee.fee_amount;
      } else if (fee.fee_type === 'percentage') {
        return total + calculatePercentageFeeAmount(fee.fee_amount, totalLoanAmount);
      }
      return total;
    }, 0);
  };

  const handleAddFee = () => {
    setEditingFee(null);
    setIsDialogOpen(true);
  };

  const handleEditFee = (fee: ReferralFee) => {
    setEditingFee(fee);
    setIsDialogOpen(true);
  };

  const handleDeleteFee = (feeId: string) => {
    const updatedFees = referralFees.filter(fee => fee.referral_id !== feeId);
    onUpdate?.(updatedFees);
  };

  const handleSaveFee = (feeData: Partial<ReferralFee>) => {
    let updatedFees: ReferralFee[];
    
    if (editingFee) {
      // Update existing fee
      updatedFees = referralFees.map(fee =>
        fee.referral_id === editingFee.referral_id
          ? { ...fee, ...feeData, updated_at: new Date().toISOString() }
          : fee
      );
    } else {
      // Add new fee
      const newFee: ReferralFee = {
        referral_id: `referral_${Date.now()}`,
        name: feeData.name || '',
        fee_type: feeData.fee_type || 'percentage',
        fee_amount: feeData.fee_amount || 0,
        discussion_notes: feeData.discussion_notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      updatedFees = [...referralFees, newFee];
    }
    
    onUpdate?.(updatedFees);
    setIsDialogOpen(false);
    setEditingFee(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Referral Information
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage referral fees and discussions about referral sources
            </p>
          </div>
          <Button onClick={handleAddFee} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Referral Fee
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Total Loan Amount Display */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Total Project Loan Amount:
            </span>
            <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
              {formatCurrency(totalLoanAmount)}
            </span>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Used for calculating percentage-based referral fees
          </p>
        </div>

        {referralFees.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Referral Fees</h3>
            <p className="text-muted-foreground mb-4">
              Add referral fee information to track referral sources and costs
            </p>
            <Button onClick={handleAddFee} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add First Referral Fee
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Total Referral Fees</p>
                <p className="text-lg font-semibold">{referralFees.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-lg font-semibold">{formatCurrency(calculateTotalCost())}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Percentage Fees</p>
                <p className="text-lg font-semibold">
                  {referralFees.filter(fee => fee.fee_type === 'percentage').length}
                </p>
              </div>
            </div>

            {/* Referral Fees List */}
            <div className="space-y-3">
              {referralFees.map((fee) => (
                <div key={fee.referral_id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{fee.name}</h4>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {fee.fee_type === 'percentage' ? (
                            <Percent className="h-3 w-3" />
                          ) : (
                            <DollarSign className="h-3 w-3" />
                          )}
                          {formatFee(fee)}
                        </Badge>
                      </div>
                      
                      {fee.discussion_notes && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-1">Discussion Notes:</p>
                          <p className="text-sm">{fee.discussion_notes}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Created: {new Date(fee.created_at).toLocaleDateString()}</span>
                        {fee.updated_at !== fee.created_at && (
                          <span>Updated: {new Date(fee.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditFee(fee)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFee(fee.referral_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <ReferralDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          referralFee={editingFee}
          onSave={handleSaveFee}
        />
      </CardContent>
    </Card>
  );
};
