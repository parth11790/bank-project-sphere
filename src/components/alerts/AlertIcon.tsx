
import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { AlertSeverity } from './types';

interface AlertIconProps {
  severity: AlertSeverity;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ severity }) => {
  switch (severity) {
    case 'error':
      return <AlertTriangle className="h-4 w-4" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'info':
      return <Info className="h-4 w-4" />;
    case 'success':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};
