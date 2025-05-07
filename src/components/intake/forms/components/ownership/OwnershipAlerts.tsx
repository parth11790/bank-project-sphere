
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Owner, FormerOwner } from '../../schemas/ownershipSchema';

interface OwnershipAlertsProps {
  hasRiskyOwner: boolean;
  totalCurrentOwnership: number;
  currentOwnersExist: boolean;
}

export const OwnershipAlerts: React.FC<OwnershipAlertsProps> = ({ 
  hasRiskyOwner, 
  totalCurrentOwnership, 
  currentOwnersExist 
}) => {
  return (
    <>
      {hasRiskyOwner && (
        <Alert variant="destructive" className="bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <span className="font-bold">Eligibility Warning:</span> One or more ineligible persons identified in ownership.
            Additional review required per SOP 6-month lookback rule.
          </AlertDescription>
        </Alert>
      )}
      
      {totalCurrentOwnership !== 100 && currentOwnersExist && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            <span className="font-medium">Note:</span> Total ownership percentage is {totalCurrentOwnership}%. 
            It should equal 100%.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
