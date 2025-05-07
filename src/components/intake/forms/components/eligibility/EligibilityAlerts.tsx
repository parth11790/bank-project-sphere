
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface EligibilityAlertsProps {
  hasIneligibleTypes: boolean;
  hasPrincipalStatusIssues: boolean;
  hasPriorDebt: boolean;
}

export const EligibilityAlerts: React.FC<EligibilityAlertsProps> = ({ 
  hasIneligibleTypes, 
  hasPrincipalStatusIssues, 
  hasPriorDebt 
}) => {
  const showAlerts = hasIneligibleTypes || hasPrincipalStatusIssues || hasPriorDebt;
  
  if (!showAlerts) return null;
  
  return (
    <Alert variant="destructive" className="bg-red-50">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <span className="font-bold">Warning:</span> This application has eligibility issues that require further review:
        <ul className="list-disc list-inside mt-2">
          {hasIneligibleTypes && <li>Ineligible business type selected</li>}
          {hasPrincipalStatusIssues && <li>Principal status issues identified</li>}
          {hasPriorDebt && <li>Prior government debt reported</li>}
        </ul>
      </AlertDescription>
    </Alert>
  );
};
