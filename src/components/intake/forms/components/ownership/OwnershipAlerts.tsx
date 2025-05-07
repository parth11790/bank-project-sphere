
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, InfoIcon } from 'lucide-react';
import { Owner, FormerOwner } from '../../schemas/ownershipSchema';

interface OwnershipAlertsProps {
  hasRiskyOwner: boolean;
  totalCurrentOwnership: number;
  currentOwnersExist: boolean;
  riskyOwners?: {
    current: Owner[];
    former: FormerOwner[];
  };
}

export const OwnershipAlerts: React.FC<OwnershipAlertsProps> = ({ 
  hasRiskyOwner, 
  totalCurrentOwnership, 
  currentOwnersExist,
  riskyOwners = { current: [], former: [] }
}) => {
  if (!hasRiskyOwner && (totalCurrentOwnership === 100 || !currentOwnersExist)) {
    return null;
  }
  
  return (
    <div className="space-y-3">
      {hasRiskyOwner && (
        <Alert variant="destructive" className="bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Eligibility Warning</AlertTitle>
          <AlertDescription>
            {riskyOwners.current.length > 0 || riskyOwners.former.length > 0 ? (
              <>
                <p>Ineligible persons identified in ownership structure:</p>
                <ul className="list-disc list-inside mt-1">
                  {riskyOwners.current.map((owner, index) => (
                    <li key={`current-${index}`}>{owner.name} (Current Owner - {owner.ownership_percentage}%)</li>
                  ))}
                  {riskyOwners.former.map((owner, index) => (
                    <li key={`former-${index}`}>{owner.name} (Former Owner - ceased {owner.date_ownership_ceased.toLocaleDateString()})</li>
                  ))}
                </ul>
                <p className="mt-2">Additional review required per SOP 6-month lookback rule.</p>
              </>
            ) : (
              <>
                One or more ineligible persons identified in ownership.
                Additional review required per SOP 6-month lookback rule.
              </>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {totalCurrentOwnership !== 100 && currentOwnersExist && (
        <Alert className="bg-amber-50 border-amber-200">
          <InfoIcon className="h-4 w-4 text-amber-500" />
          <AlertTitle>Ownership Percentage Issue</AlertTitle>
          <AlertDescription>
            <span className="font-medium">Total ownership percentage is {totalCurrentOwnership}%. </span> 
            {totalCurrentOwnership < 100 ? 
              `You're missing ${(100 - totalCurrentOwnership).toFixed(2)}% of ownership allocation.` : 
              `You've allocated ${(totalCurrentOwnership - 100).toFixed(2)}% too much ownership.`
            } Total should equal exactly 100%.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
