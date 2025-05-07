
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, InfoIcon, XOctagon, CheckCircle } from 'lucide-react';

// Define specific alert types with detailed messages
interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

interface EligibilityAlertsProps {
  hasIneligibleTypes: boolean;
  hasPrincipalStatusIssues: boolean;
  hasPriorDebt: boolean;
  ineligibleBusinessTypes?: string[];
  principalIssues?: {
    isIncarcerated: boolean;
    isOnParole: boolean;
    isIndicted: boolean;
  };
  customAlerts?: AlertItem[];
}

export const EligibilityAlerts: React.FC<EligibilityAlertsProps> = ({ 
  hasIneligibleTypes, 
  hasPrincipalStatusIssues, 
  hasPriorDebt,
  ineligibleBusinessTypes = [],
  principalIssues = {
    isIncarcerated: false,
    isOnParole: false,
    isIndicted: false
  },
  customAlerts = []
}) => {
  const showAlerts = hasIneligibleTypes || hasPrincipalStatusIssues || hasPriorDebt || customAlerts.length > 0;
  
  if (!showAlerts) return null;
  
  // Generate system alerts
  const systemAlerts: AlertItem[] = [];
  
  if (hasIneligibleTypes) {
    systemAlerts.push({
      id: 'ineligible-business-type',
      title: 'Ineligible Business Type',
      description: `The applicant has selected an ineligible business type${ineligibleBusinessTypes.length > 0 ? `: ${ineligibleBusinessTypes.join(', ')}` : '.'}`,
      severity: 'error'
    });
  }
  
  if (hasPrincipalStatusIssues) {
    const issues = [];
    if (principalIssues.isIncarcerated) issues.push('Principal is currently incarcerated');
    if (principalIssues.isOnParole) issues.push('Principal is currently on parole/probation');
    if (principalIssues.isIndicted) issues.push('Principal is under indictment');
    
    systemAlerts.push({
      id: 'principal-status',
      title: 'Principal Status Issues',
      description: issues.length > 0 ? `Principal status issues identified: ${issues.join('; ')}` : 'One or more principal status issues have been identified.',
      severity: 'error'
    });
  }
  
  if (hasPriorDebt) {
    systemAlerts.push({
      id: 'prior-debt',
      title: 'Prior Government Debt',
      description: 'The applicant or a principal has prior government debt or loss. Per SBA SOP 50 10 6, additional documentation and approval may be required.',
      severity: 'warning'
    });
  }
  
  // Combine system and custom alerts
  const allAlerts = [...systemAlerts, ...customAlerts];
  
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XOctagon className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <InfoIcon className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const getAlertVariant = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      default:
        return 'default';
    }
  };
  
  const getAlertClass = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-3">
      {allAlerts.map((alert) => (
        <Alert 
          key={alert.id} 
          variant={getAlertVariant(alert.severity)} 
          className={getAlertClass(alert.severity)}
        >
          {getAlertIcon(alert.severity)}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
