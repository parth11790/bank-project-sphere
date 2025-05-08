
import { AlertSeverity } from './types';

export const getAlertVariant = (severity: AlertSeverity) => {
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

export const getAlertClass = (severity: AlertSeverity) => {
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
