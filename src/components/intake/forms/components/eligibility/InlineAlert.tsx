
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, XOctagon, Info } from 'lucide-react';

export interface AlertProps {
  condition: boolean;
  title: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
}

export const InlineAlert: React.FC<AlertProps> = ({ 
  condition, 
  title, 
  description, 
  severity 
}) => {
  if (!condition) return null;
  
  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <XOctagon className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const getAlertClass = () => {
    switch (severity) {
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return '';
    }
  };
  
  const getAlertVariant = () => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };
  
  return (
    <Alert variant={getAlertVariant()} className={`${getAlertClass()} mt-2 mb-2`}>
      {getIcon()}
      <AlertDescription>
        <span className="font-bold">{title}:</span> {description}
      </AlertDescription>
    </Alert>
  );
};
